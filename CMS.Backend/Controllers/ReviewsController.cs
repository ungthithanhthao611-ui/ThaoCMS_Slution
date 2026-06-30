using CMS.Data;
using CMS.Data.Entities;
using CMS.Backend.DTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace CMS.Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IWebHostEnvironment _env;

        public ReviewsController(ApplicationDbContext context, IWebHostEnvironment env)
        {
            _context = context;
            _env = env;
        }

        // 1. Lấy danh sách đánh giá của 1 sản phẩm
        [HttpGet("product/{productId}")]
        [ProducesResponseType(typeof(IEnumerable<ReviewOutDTO>), 200)]
        public async Task<IActionResult> GetReviewsByProduct(int productId)
        {
            var reviews = await _context.Reviews
                .Include(r => r.Customer)
                .Where(r => r.ProductId == productId)
                .OrderByDescending(r => r.CreatedDate)
                .Select(r => new
                {
                    r.Id,
                    r.ProductId,
                    r.CustomerId,
                    r.Rating,
                    r.Comment,
                    r.ImageUrl,
                    r.CreatedDate,
                    CustomerName = r.Customer != null ? r.Customer.FullName : "Khách hàng"
                })
                .ToListAsync();

            return Ok(reviews);
        }

        // 2. Lấy danh sách đánh giá của 1 khách hàng (dành cho trang Profile)
        [HttpGet("customer/{customerId}")]
        [ProducesResponseType(typeof(IEnumerable<ReviewOutDTO>), 200)]
        public async Task<IActionResult> GetReviewsByCustomer(int customerId)
        {
            var reviews = await _context.Reviews
                .Include(r => r.Product)
                .Where(r => r.CustomerId == customerId)
                .OrderByDescending(r => r.CreatedDate)
                .Select(r => new
                {
                    r.Id,
                    r.ProductId,
                    r.CustomerId,
                    r.Rating,
                    r.Comment,
                    r.ImageUrl,
                    r.CreatedDate,
                    ProductName = r.Product != null ? r.Product.Name : "Sản phẩm",
                    ProductImageUrl = r.Product != null ? r.Product.ImageUrl : ""
                })
                .ToListAsync();

            return Ok(reviews);
        }

        // 3. Kiểm tra xem khách hàng có được phép đánh giá không
        // Điều kiện: Đã mua sản phẩm này và đơn hàng đã hoàn thành (Status = 2)
        [HttpGet("check-can-review")]
        public async Task<IActionResult> CheckCanReview([FromQuery] int productId, [FromQuery] int customerId)
        {
            // Kiểm tra xem đã từng đánh giá chưa (mỗi người chỉ được đánh giá 1 lần cho 1 sản phẩm)
            var alreadyReviewed = await _context.Reviews
                .AnyAsync(r => r.ProductId == productId && r.CustomerId == customerId);
            
            if (alreadyReviewed)
            {
                return Ok(new { canReview = false, reason = "already_reviewed" });
            }

            // Kiểm tra xem đã mua chưa
            var hasCompletedOrder = await _context.OrderDetails
                .Include(od => od.Order)
                .AnyAsync(od => od.ProductId == productId 
                             && od.Order.CustomerId == customerId 
                             && od.Order.Status == 2);

            return Ok(new { canReview = hasCompletedOrder, reason = hasCompletedOrder ? "ok" : "not_purchased_or_completed" });
        }

        // 4. Thêm Đánh giá mới
        [HttpPost]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> AddReview([FromForm] int productId, [FromForm] int customerId, [FromForm] int rating, [FromForm] string? comment, IFormFile? uploadImage)
        {
            // Xác thực lại quyền
            var hasCompletedOrder = await _context.OrderDetails
                .Include(od => od.Order)
                .AnyAsync(od => od.ProductId == productId 
                             && od.Order.CustomerId == customerId 
                             && od.Order.Status == 2);

            if (!hasCompletedOrder)
            {
                return BadRequest("Bạn chưa mua sản phẩm này hoặc đơn hàng chưa hoàn thành.");
            }

            var review = new Review
            {
                ProductId = productId,
                CustomerId = customerId,
                Rating = rating,
                Comment = comment,
                CreatedDate = DateTime.Now
            };

            // Xử lý upload ảnh
            if (uploadImage != null && uploadImage.Length > 0)
            {
                // Thư mục lưu ảnh reviews
                string uploadsFolder = Path.Combine(_env.WebRootPath, "uploads", "reviews");
                if (!Directory.Exists(uploadsFolder))
                {
                    Directory.CreateDirectory(uploadsFolder);
                }

                string uniqueFileName = Guid.NewGuid().ToString() + "_" + Path.GetFileName(uploadImage.FileName);
                string filePath = Path.Combine(uploadsFolder, uniqueFileName);

                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await uploadImage.CopyToAsync(fileStream);
                }

                review.ImageUrl = "/uploads/reviews/" + uniqueFileName;
            }

            _context.Reviews.Add(review);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Cảm ơn bạn đã đánh giá sản phẩm!", reviewId = review.Id });
        }
    }
}
