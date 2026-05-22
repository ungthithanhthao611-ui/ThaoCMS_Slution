/*Sinh vien:Ung Thị Thanh Thảo 
 Ma sv:2123110174
Lop:CCQ2311E
Mo ta: thuc hien quan ly người dùng 
*/
using CMS.Data;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace CMS.Backend.Controllers
{//Controller quản lý người dùng
    public class UserController : Controller
    {
        private readonly ApplicationDbContext _context;

        public UserController(ApplicationDbContext context)
        {
            _context = context;
        }
        //index: Hiển thị danh sách người dùng
        public IActionResult Index() 
        {
            var users = _context.Users.ToList();
            return View(users);
        }
    }
}