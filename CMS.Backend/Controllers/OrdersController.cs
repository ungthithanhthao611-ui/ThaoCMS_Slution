using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CMS.Data; 
using CMS.Data.Entities;
using System;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;

using CMS.Backend.Services;

namespace CMS.Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IEmailService _emailService;

        public OrdersController(ApplicationDbContext context, IEmailService emailService)
        {
            _context = context;
            _emailService = emailService;
        }

        /// <summary>
        /// API: Tiếp nhận đơn đặt hàng từ giỏ hàng FrontEnd gửi lên
        /// Đường dẫn: POST https://localhost:xxxx/api/Orders
        /// </summary>
        [HttpPost]
        public async Task<IActionResult> CreateOrder([FromBody] OrderInputDTO input)
        {
            // [BUỔI 6] 1. Kiểm tra kịch bản lỗi bảo vệ: Nếu dữ liệu truyền lên trống rỗng
            if (input == null || input.Items == null || !input.Items.Any())
            {
                return BadRequest(new { message = "Dữ liệu đơn hàng không hợp lệ hoặc giỏ hàng trống." });
            }

            // Sử dụng Transaction để đảm bảo tính toàn vẹn dữ liệu: nếu lỗi thì hoàn tác tất cả (Rollback)
            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                // [BUỔI 6] Bước A: Tự động khởi tạo cấu trúc thực thể Đơn hàng mới
                var newOrder = new Order
                {
                    OrderDate = DateTime.Now,
                    CustomerId = input.CustomerId,
                    Status = 0,
                    Notes = input.Notes,
                    DeliveryAddress = input.DeliveryAddress,
                    DeliveryTime = input.DeliveryTime
                };

                // Thêm vào bảng Order
                _context.Orders.Add(newOrder);
                await _context.SaveChangesAsync(); // Lưu để sinh ra mã ID Đơn hàng

                // [BUỔI 6] Bước B: Xử lý Chi tiết đơn hàng và Trừ tồn kho
                foreach (var item in input.Items)
                {
                    // Lấy sản phẩm từ DB để biết giá hiện tại và số lượng kho
                    var product = await _context.Products.FindAsync(item.ProductId);
                    if (product == null)
                    {
                        return BadRequest(new { message = $"Sản phẩm có ID {item.ProductId} không tồn tại." });
                    }

                    if (product.StockQuantity < item.Quantity)
                    {
                        return BadRequest(new { message = $"Sản phẩm '{product.Name}' không đủ số lượng trong kho." });
                    }

                    // 1. Tạo OrderDetail
                    var orderDetail = new OrderDetail
                    {
                        OrderId = newOrder.Id,
                        ProductId = item.ProductId,
                        Quantity = item.Quantity,
                        UnitPrice = product.Price // Lấy đúng giá hiện tại của sản phẩm
                    };
                    _context.OrderDetails.Add(orderDetail);

                    // 2. Khấu trừ tồn kho
                    product.StockQuantity -= item.Quantity;
                }

                await _context.SaveChangesAsync(); // Lưu các OrderDetail và thay đổi tồn kho Product

                // Commit transaction
                await transaction.CommitAsync();

                // Gửi email xác nhận đơn hàng
                try
                {
                    var customer = await _context.Customers.FindAsync(newOrder.CustomerId);
                    if (customer != null)
                    {
                        var details = await _context.OrderDetails
                            .Include(od => od.Product)
                            .Where(od => od.OrderId == newOrder.Id)
                            .ToListAsync();
                        await _emailService.SendOrderConfirmationEmailAsync(newOrder, customer, details);
                        // Gửi thông báo đến Admin
                        await _emailService.SendAdminNewOrderNotificationEmailAsync(newOrder, customer, details);
                    }
                }
                catch (Exception emailEx)
                {
                    Console.WriteLine($"Lỗi gửi email xác nhận hoặc thông báo đơn hàng: {emailEx.Message}");
                }

                // [BUỔI 6] Bước C: Trả về mã thành công 201 Created và gửi ngược lại mã ID đơn hàng vừa tạo
                return StatusCode(201, new { 
                    message = "Đặt hàng thành công!", 
                    orderId = newOrder.Id 
                });
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync(); // Hủy bỏ thao tác nếu có lỗi
                return StatusCode(500, new { message = "Lỗi xử lý tạo đơn hàng ngầm", detail = ex.Message });
            }
        }

        /// <summary>
        /// API: Tra cứu danh sách các đơn hàng mà khách hàng đó từng mua
        /// Đường dẫn: GET https://localhost:xxxx/api/Orders/customer/{customerId}
        /// </summary>
        [HttpGet("customer/{customerId}")]
        public async Task<IActionResult> GetByCustomer(int customerId)
        {
            var orders = await _context.Orders
                .Where(o => o.CustomerId == customerId)
                .OrderByDescending(o => o.OrderDate)
                .Select(o => new {
                    o.Id,
                    o.OrderDate,
                    o.Status,
                    o.Notes,
                    TotalAmount = o.OrderDetails != null ? o.OrderDetails.Sum(od => od.Quantity * od.UnitPrice) : 0,
                    Items = o.OrderDetails != null ? o.OrderDetails.Select(od => new {
                        od.ProductId,
                        ProductName = od.Product != null ? od.Product.Name : "",
                        ProductImageUrl = od.Product != null ? od.Product.ImageUrl : "",
                        od.Quantity,
                        od.UnitPrice
                    }).ToList() : null
                })
                .ToListAsync();

            if (!orders.Any())
            {
                return NotFound(new { message = "Chưa có đơn hàng nào." });
            }

            return Ok(orders);
        }
    }

    // [BUỔI 6] LỚP DTO TRUNG GIAN ĐỂ HỨNG DỮ LIỆU TỪ FRONTEND TRUYỀN LÊN
    public class OrderInputDTO
    {
        public int CustomerId { get; set; }
        public string? Notes { get; set; }
        public string? DeliveryAddress { get; set; }
        public DateTime? DeliveryTime { get; set; }
        public List<CartItemDTO> Items { get; set; } = new List<CartItemDTO>();
    }

    public class CartItemDTO
    {
        public int ProductId { get; set; }
        public int Quantity { get; set; }
    }
}
