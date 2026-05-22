/*Sinh vien:Ung Thị Thanh Thảo 
 Ma sv:2123110174
Lop:CCQ2311E
Mo ta: thuc hien quan ly danh mục sản phẩm 
*/
using CMS.Data;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
//Controller quản lý đơn hàng
namespace CMS.Backend.Controllers
{
    public class OrderController : Controller
    {
        private readonly ApplicationDbContext _context;

        public OrderController(ApplicationDbContext context)
        {
            _context = context;
        }
        //index: Hiển thị danh sách đơn hàng
        public IActionResult Index()
        {
            var data = _context.Orders.ToList();
            return View(data);
        }
    }
}