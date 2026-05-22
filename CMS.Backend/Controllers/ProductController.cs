/*Sinh vien:Ung Thị Thanh Thảo 
 Ma sv:2123110174
Lop:CCQ2311E
Mo ta: thuc hien quan ly sản phẩm 
*/
using CMS.Data;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

//Controller quản lý sản phẩm
namespace CMS.Backend.Controllers
{
    public class ProductController : Controller
    {
        private readonly ApplicationDbContext _context;

        public ProductController(ApplicationDbContext context)
        {
            _context = context;
        }   
        //index: Hiển thị danh sách sản phẩm
        public IActionResult Index()
        {
            var data = _context.Products.ToList();
            return View(data);
        }
    }
}