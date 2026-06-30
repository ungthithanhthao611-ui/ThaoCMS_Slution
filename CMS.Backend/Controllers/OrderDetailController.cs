/*Sinh vien:Ung Thị Thanh Thảo 
 Ma sv:2123110174
Lop:CCQ2311E
Mo ta: thuc hien quan ly chi tiết đơn hàng 
*/
using CMS.Data;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using Microsoft.AspNetCore.Authorization; // [BUỔI 5] Thư viện phân quyền xác thực
using Microsoft.EntityFrameworkCore; // Hỗ trợ Eager Loading (Include)

//Controller quản lý chi tiết đơn hàng
namespace CMS.Backend.Controllers
{   //Controller quản lý chi tiết đơn hàng
    [Authorize] // [BUỔI 5] Yêu cầu đăng nhập mới được xem chi tiết đơn hàng
    public class OrderDetailController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly Services.IEmailService _emailService;

        public OrderDetailController(ApplicationDbContext context, Services.IEmailService emailService)
        {
            _context = context;
            _emailService = emailService;
        }

        //index: Hiển thị danh sách chi tiết đơn hàng (hỗ trợ lọc theo orderId)
        public IActionResult Index(int? orderId = null)
        {
            var query = _context.OrderDetails
                               .Include(od => od.Product)
                               .Include(od => od.Order)
                                   .ThenInclude(o => o.Customer)
                               .AsQueryable();

            if (orderId.HasValue)
            {
                query = query.Where(od => od.OrderId == orderId.Value);
                ViewBag.OrderId = orderId.Value;
                // Lấy thông tin Order để hiển thị
                ViewBag.Order = _context.Orders
                    .Include(o => o.Customer)
                    .Include(o => o.OrderDetails)
                    .FirstOrDefault(o => o.Id == orderId.Value);
            }

            var data = query.ToList();
            return View(data);
        }

        // ==========================================
        // CẬP NHẬT TRẠNG THÁI ĐƠN HÀNG TRỰC TIẾP TỪ CHI TIẾT
        // ==========================================
        [HttpPost]
        public async System.Threading.Tasks.Task<IActionResult> UpdateStatus(int orderId, int status)
        {
            var order = await _context.Orders.Include(o => o.Customer).FirstOrDefaultAsync(o => o.Id == orderId);
            if (order != null)
            {
                order.Status = status;
                await _context.SaveChangesAsync();
                
                // Gửi email thông báo trạng thái
                await _emailService.SendOrderStatusChangedEmailAsync(order, order.Customer);
                TempData["SuccessMsg"] = "Đã cập nhật trạng thái đơn hàng thành công!";
            }
            return RedirectToAction("Index", new { orderId = orderId });
        }

        // ==========================================
        // CẬP NHẬT SỐ LƯỢNG MÓN VÀ BÙ TRỪ TỒN KHO
        // ==========================================
        [HttpPost]
        public async System.Threading.Tasks.Task<IActionResult> UpdateQuantity(int id, int quantity)
        {
            if (quantity <= 0)
            {
                TempData["ErrorMsg"] = "Số lượng phải lớn hơn 0. Nếu muốn hủy món, vui lòng dùng nút Hủy món.";
                return Redirect(Request.Headers["Referer"].ToString() ?? "/OrderDetail");
            }

            var detail = await _context.OrderDetails
                .Include(od => od.Product)
                .FirstOrDefaultAsync(od => od.Id == id);

            if (detail != null && detail.Product != null)
            {
                int oldQuantity = detail.Quantity;
                int difference = quantity - oldQuantity;

                if (difference > 0)
                {
                    // Muốn tăng số lượng -> Kiểm tra tồn kho có đủ không
                    if (detail.Product.StockQuantity < difference)
                    {
                        TempData["ErrorMsg"] = $"Không đủ hàng! Kho chỉ còn {detail.Product.StockQuantity} sản phẩm, không thể tăng thêm {difference} món.";
                        return RedirectToAction("Index", new { orderId = detail.OrderId });
                    }
                    // Đủ hàng -> Trừ kho
                    detail.Product.StockQuantity -= difference;
                }
                else if (difference < 0)
                {
                    // Muốn giảm số lượng -> Cộng bù lại kho
                    detail.Product.StockQuantity += Math.Abs(difference);
                }

                // Cập nhật số lượng trong chi tiết đơn
                detail.Quantity = quantity;
                await _context.SaveChangesAsync();
                TempData["SuccessMsg"] = $"Đã cập nhật số lượng món {detail.Product.Name} thành {quantity} và tự động điều chỉnh tồn kho.";
                
                return RedirectToAction("Index", new { orderId = detail.OrderId });
            }

            TempData["ErrorMsg"] = "Không tìm thấy chi tiết đơn hàng.";
            return RedirectToAction("Index");
        }

        // ==========================================
        // XÓA 1 SẢN PHẨM KHỎI ĐƠN HÀNG (PARTIAL CANCELLATION)
        // ==========================================
        [HttpPost]
        public async System.Threading.Tasks.Task<IActionResult> Delete(int id, [FromForm] string cancelReason)
        {
            var detail = await _context.OrderDetails
                .Include(od => od.Order).ThenInclude(o => o.Customer)
                .Include(od => od.Product)
                .FirstOrDefaultAsync(od => od.Id == id);

            if (detail != null)
            {
                int orderId = detail.OrderId;
                
                // Gửi mail thông báo hủy món
                await _emailService.SendItemCancelledEmailAsync(detail.Order.Customer, detail.Order, detail.Product, cancelReason);

                // Thêm ghi chú hệ thống
                string sysNote = $"[HỆ THỐNG] Đã hủy sản phẩm {detail.Product?.Name}. Lý do: {cancelReason}";
                detail.Order.Notes = string.IsNullOrEmpty(detail.Order.Notes) ? sysNote : detail.Order.Notes + $"\n{sysNote}";

                // Xóa món khỏi CSDL
                _context.OrderDetails.Remove(detail);
                await _context.SaveChangesAsync();

                TempData["SuccessMsg"] = $"Đã hủy sản phẩm {detail.Product?.Name} và gửi email thông báo cho khách hàng!";
                return RedirectToAction("Index", new { orderId = orderId });
            }

            return RedirectToAction("Index");
        }
    }
}