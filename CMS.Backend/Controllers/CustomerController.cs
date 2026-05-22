using CMS.Data;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using Microsoft.AspNetCore.Authorization; // [BUỔI 5]

namespace CMS.Backend.Controllers
{
    // Controller quản lý Khách hàng - BUỔI 4
    [Authorize] // [BUỔI 5]
    public class CustomerController : Controller
    {
        private readonly ApplicationDbContext _context;

        public CustomerController(ApplicationDbContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            var customers = _context.Customers.ToList();
            return View(customers);
        }
    }
}
