/*Sinh vien:Ung Thị Thanh Thảo 
 Ma sv:2123110174
Lop:CCQ2311E
Mo ta: thuc hien quan ly danh mục sản phẩm 
*/
using Microsoft.AspNetCore.Mvc;

namespace CMS.Backend.Controllers
{   //Controller quản lý danh mục sản phẩm
    public class CustomerController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
