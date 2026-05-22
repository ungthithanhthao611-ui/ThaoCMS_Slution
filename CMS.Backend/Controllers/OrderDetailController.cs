/*Sinh vien:Ung Thị Thanh Thảo 
 Ma sv:2123110174
Lop:CCQ2311E
Mo ta: thuc hien quan ly chi tiết đơn hàng 
*/
using CMS.Data;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

//Controller quản lý chi tiết đơn hàng
namespace CMS.Backend.Controllers
{   //Controller quản lý chi tiết đơn hàng
    public class OrderDetailController : Controller
    {
        private readonly ApplicationDbContext _context;

        public OrderDetailController(ApplicationDbContext context)
        {
            _context = context;
        }

        //index: Hiển thị danh sách chi tiết đơn hàng
        public IActionResult Index()
        {
            var data = _context.OrderDetails.ToList();
            return View(data);
        }
    }
}