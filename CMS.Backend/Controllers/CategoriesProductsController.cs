using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CMS.Data;
using CMS.Backend.DTOs;
using System.Threading.Tasks;
using System.Linq;
using System.Collections.Generic;

namespace CMS.Backend.Controllers
{
    // [BUỔI 6] 1. Cấu hình đường dẫn API: api/CategoriesProducts
    [Route("api/[controller]")]
    
    // [BUỔI 6] 2. Kích hoạt tính năng tự động kiểm tra lỗi dữ liệu (Validation)
    [ApiController]
    
    // [BUỔI 6] 3. Kế thừa ControllerBase để tối ưu bộ nhớ cho API thuần dữ liệu JSON
    public class CategoriesProductsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        // [BUỔI 6] 4. Hàm khởi tạo: Nạp cơ sở dữ liệu SQL Server vào Controller thông qua DI
        public CategoriesProductsController(ApplicationDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// API lấy toàn bộ danh mục sản phẩm thời trang (Giao thức GET)
        /// Đường dẫn gọi dữ liệu: GET https://localhost:xxxx/api/CategoriesProducts
        /// </summary>
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<CategoryProductOutDTO>), 200)]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                // [BUỔI 6] Bước A: Quét bảng dữ liệu CategoriesProducts số nhiều dưới SQL Server lên
                var categories = await _context.CategoriesProducts
                    .Include(c => c.Subcategories) // Include subcategories
                    .OrderByDescending(c => c.Id)                    
                    .Select(c => new {
                        // [BUỔI 6] Bước B: Kỹ thuật gọt tỉa (Projection) - chỉ lấy các trường cần thiết ra FrontEnd
                        c.Id,
                        c.Name,
                        c.Description,
                        c.ImageUrl,
                        c.ParentId,
                        Subcategories = c.Subcategories.Select(sub => new {
                            sub.Id,
                            sub.Name,
                            sub.Description,
                            sub.ImageUrl,
                            sub.ParentId
                        }).ToList()
                    })
                    .ToListAsync(); // Chuyển đổi bất đồng bộ sang dạng danh sách mảng

                // [BUỔI 6] Bước C: Trả về mã thành công HTTP 200 OK đính kèm chuỗi chữ JSON sạch
                return Ok(categories);
            }
            catch (System.Exception ex)
            {
                // [BUỔI 6] Bảo vệ hệ thống: Nếu sập kết nối SQL thì trả về lỗi 500 kèm lời nhắn lý do lỗi
                return StatusCode(500, new { 
                    message = "Lỗi kết nối cơ sở dữ liệu hệ thống", 
                    detail = ex.Message 
                });
            }
        }
    }
}
