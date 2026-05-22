/*Sinh vien:Ung Thị Thanh Thảo 
 Ma sv:2123110174
Lop:CCQ2311E
Mo ta: Thực hiện quản lý bài viết - Index + Details (kèm tên danh mục)
*/
using CMS.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace CMS.Backend.Controllers
{
    //Controller quản lý bài viết
    public class PostController : Controller
    {
        private readonly ApplicationDbContext _context;

        public PostController(ApplicationDbContext context)
        {
            _context = context;
        }

        //index: Danh sách bài viết
        public IActionResult Index()
        {
            var posts = _context.Posts
                        .Include(p => p.Category) // Lấy kèm tên danh mục
                        .OrderByDescending(p => p.CreatedDate)
                        .ToList();
            return View(posts);
        }

        // Chi tiết bài viết - YÊU CẦU 1: Hiển thị tên danh mục bằng .Include()
        public IActionResult Details(int id)
        {
            var post = _context.Posts
                       .Include(p => p.Category) // Lấy kèm tên danh mục để hiển thị
                       .FirstOrDefault(p => p.Id == id);
            if (post == null) return NotFound();
            return View(post);
        }
    }
}