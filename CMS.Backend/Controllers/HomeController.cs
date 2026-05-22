/*Sinh vien:Ung Thị Thanh Thảo 
 Ma sv:2123110174
Lop:CCQ2311E
Mo ta: Hiển thị 3 bài viết mới nhất lên trang chủ
*/
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CMS.Data;
using System.Linq;

namespace CMS.Backend.Controllers
{
    // Controller quản lý trang chủ
    public class HomeController : Controller
    {
        private readonly ApplicationDbContext _context;

        public HomeController(ApplicationDbContext context)
        {
            _context = context;
        }
        // Index: Hiển thị 3 bài viết mới nhất lên trang chủ
        public IActionResult Index()
        {
            // LINQ: Lấy 3 bài viết mới nhất, kèm tên danh mục
            var latestPosts = _context.Posts
                              .Include(p => p.Category)           // Lấy kèm tên danh mục để hiển thị
                              .OrderByDescending(p => p.CreatedDate) // Sắp xếp ngày mới nhất lên đầu
                              .Take(3)                            // Chỉ lấy đúng 3 bản tin đầu tiên
                              .ToList();
            return View(latestPosts);
        }
        // Privacy: Hiển thị trang quyền riêng tư
        public IActionResult Privacy()
        {
            return View();
        }
    }
}
