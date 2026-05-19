using CMS.Data;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace CMS.Backend.Controllers
{
    public class PostController : Controller
    {
        private readonly ApplicationDbContext _context;

        public PostController(ApplicationDbContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            var posts = _context.Posts.ToList();
            return View(posts);
        }
    }
}