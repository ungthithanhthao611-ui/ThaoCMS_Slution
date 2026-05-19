using CMS.Data;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace CMS.Backend.Controllers
{
    public class UserController : Controller
    {
        private readonly ApplicationDbContext _context;

        public UserController(ApplicationDbContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            var users = _context.Users.ToList();
            return View(users);
        }
    }
}