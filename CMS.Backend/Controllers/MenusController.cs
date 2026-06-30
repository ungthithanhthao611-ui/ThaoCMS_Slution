/*Sinh vien:Ung Thị Thanh Thảo 
 Ma sv:2123110174
 Lop:CCQ2311E
 Mo ta: API Controller trả dữ liệu Menu cho Frontend React
 Ngay thuc hien:12/6/2026
*/

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CMS.Data;
using CMS.Backend.DTOs;

namespace CMS.Backend.Controllers
{
    // API endpoint: GET /api/menus
    [Route("api/[controller]")]
    [ApiController]
    public class MenusController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public MenusController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/menus - Lấy toàn bộ menu đang hiển thị, sắp xếp theo thứ tự
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<MenuOutDTO>), 200)]
        public async Task<IActionResult> GetAll()
        {
            var menus = await _context.Menus
                .Where(m => m.IsActive)
                .OrderBy(m => m.DisplayOrder)
                .Select(m => new
                {
                    m.Id,
                    m.Name,
                    m.LinkUrl,
                    m.DisplayOrder,
                    m.ParentId
                })
                .ToListAsync();

            return Ok(menus);
        }
    }
}
