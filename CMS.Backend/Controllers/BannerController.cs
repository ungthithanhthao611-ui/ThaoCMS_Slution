/*Sinh vien:Ung Thị Thanh Thảo 
 Ma sv:2123110174
 Lop:CCQ2311E
 Mo ta: Quản lý CRUD Banner trong trang Admin (MVC) có hỗ trợ tải ảnh vật lý
*/
using CMS.Data;
using CMS.Data.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace CMS.Backend.Controllers
{
    [Authorize]
    public class BannerController : Controller
    {
        private readonly ApplicationDbContext _context;

        public BannerController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: Banner
        public IActionResult Index()
        {
            var data = _context.Banners.OrderBy(b => b.DisplayOrder).ToList();
            return View(data);
        }

        // GET: Banner/Create
        [HttpGet]
        public IActionResult Create()
        {
            return View();
        }

        // POST: Banner/Create
        [HttpPost]
        public async Task<IActionResult> Create(Banner model, IFormFile? uploadImage)
        {
            if (uploadImage != null && uploadImage.Length > 0)
            {
                // Xử lý upload ảnh vật lý
                var fileName = Guid.NewGuid().ToString() + Path.GetExtension(uploadImage.FileName);
                var uploadPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads");

                if (!Directory.Exists(uploadPath))
                {
                    Directory.CreateDirectory(uploadPath);
                }

                var filePath = Path.Combine(uploadPath, fileName);
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await uploadImage.CopyToAsync(stream);
                }

                model.ImageUrl = "/uploads/" + fileName;
            }

            _context.Banners.Add(model);
            _context.SaveChanges();
            return RedirectToAction("Index");
        }

        // GET: Banner/Edit/5
        [HttpGet]
        public IActionResult Edit(int id)
        {
            var banner = _context.Banners.Find(id);
            if (banner == null) return NotFound();
            return View(banner);
        }

        // POST: Banner/Edit/5
        [HttpPost]
        public async Task<IActionResult> Edit(Banner model, IFormFile? uploadImage)
        {
            var existing = _context.Banners.Find(model.Id);
            if (existing == null) return NotFound();

            existing.Title = model.Title;
            existing.LinkUrl = model.LinkUrl;
            existing.Description = model.Description;
            existing.DisplayOrder = model.DisplayOrder;
            existing.IsActive = model.IsActive;

            if (uploadImage != null && uploadImage.Length > 0)
            {
                // Xử lý upload ảnh vật lý mới
                var fileName = Guid.NewGuid().ToString() + Path.GetExtension(uploadImage.FileName);
                var uploadPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads");

                if (!Directory.Exists(uploadPath))
                {
                    Directory.CreateDirectory(uploadPath);
                }

                var filePath = Path.Combine(uploadPath, fileName);
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await uploadImage.CopyToAsync(stream);
                }

                existing.ImageUrl = "/uploads/" + fileName;
            }
            else if (!string.IsNullOrEmpty(model.ImageUrl))
            {
                existing.ImageUrl = model.ImageUrl;
            }

            _context.Banners.Update(existing);
            _context.SaveChanges();
            return RedirectToAction("Index");
        }

        // GET: Banner/Delete/5
        [HttpGet]
        public IActionResult Delete(int id)
        {
            var banner = _context.Banners.Find(id);
            if (banner == null) return NotFound();
            return View(banner);
        }

        // POST: Banner/Delete/5
        [HttpPost, ActionName("Delete")]
        public IActionResult DeleteConfirmed(int id)
        {
            var banner = _context.Banners.Find(id);
            if (banner != null)
            {
                _context.Banners.Remove(banner);
                _context.SaveChanges();
            }
            return RedirectToAction("Index");
        }
    }
}
