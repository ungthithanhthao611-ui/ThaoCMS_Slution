using CMS.Data;
using CMS.Data.Entities;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using Microsoft.AspNetCore.Authorization; // [BUỔI 5]
using Microsoft.AspNetCore.Http;
using System.IO;
using Microsoft.EntityFrameworkCore;

namespace CMS.Backend.Controllers
{
    [Authorize] // [BUỔI 5] Bắt buộc đăng nhập mới được truy cập quản lý Loại sản phẩm
    public class CategoryProductController : Controller
    {
        private readonly ApplicationDbContext _context;

        public CategoryProductController(ApplicationDbContext context)
        {
            _context = context;
        }

        // ==========================================
        // 1. HIỂN THỊ DANH SÁCH LOẠI SẢN PHẨM
        // ==========================================
        public IActionResult Index()
        {
            var data = _context.CategoriesProducts.ToList();
            return View(data);
        }

        // ==========================================
        // 2. THÊM MỚI LOẠI SẢN PHẨM (CREATE)
        // ==========================================
        [HttpGet]
        public IActionResult Create()
        {
            ViewBag.Categories = _context.CategoriesProducts.Where(c => c.ParentId == null).ToList();
            return View();
        }

        [HttpPost]
        public IActionResult Create(CategoryProduct model, IFormFile? uploadImage)
        {
            if (uploadImage != null && uploadImage.Length > 0)
            {
                string folder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads");
                if (!Directory.Exists(folder))
                {
                    Directory.CreateDirectory(folder);
                }

                string fileName = Guid.NewGuid().ToString() + Path.GetExtension(uploadImage.FileName);
                string filePath = Path.Combine(folder, fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    uploadImage.CopyTo(stream);
                }

                model.ImageUrl = "/uploads/" + fileName;
            }

            ModelState.Remove("Parent");
            ModelState.Remove("Subcategories");
            ModelState.Remove("Products");
            ModelState.Remove("uploadImage");

            if (ModelState.IsValid)
            {
                _context.CategoriesProducts.Add(model);
                _context.SaveChanges();
                TempData["SuccessMessage"] = "Thêm mới loại sản phẩm thành công!";
                return RedirectToAction("Index");
            }
            ViewBag.Categories = _context.CategoriesProducts.Where(c => c.ParentId == null).ToList();
            return View(model);
        }

        // ==========================================
        // 3. CHỈNH SỬA LOẠI SẢN PHẨM (EDIT)
        // ==========================================
        [HttpGet]
        public IActionResult Edit(int id)
        {
            var category = _context.CategoriesProducts.Find(id);
            if (category == null) return NotFound();
            ViewBag.Categories = _context.CategoriesProducts.Where(c => c.ParentId == null && c.Id != id).ToList();
            return View(category);
        }

        [HttpPost]
        public IActionResult Edit(CategoryProduct model, IFormFile? uploadImage)
        {
            var existingCategory = _context.CategoriesProducts.AsNoTracking().FirstOrDefault(c => c.Id == model.Id);
            if (existingCategory == null) return NotFound();

            if (uploadImage != null && uploadImage.Length > 0)
            {
                string folder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads");
                if (!Directory.Exists(folder))
                {
                    Directory.CreateDirectory(folder);
                }

                string fileName = Guid.NewGuid().ToString() + Path.GetExtension(uploadImage.FileName);
                string filePath = Path.Combine(folder, fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    uploadImage.CopyTo(stream);
                }

                model.ImageUrl = "/uploads/" + fileName;
            }
            else if (string.IsNullOrEmpty(model.ImageUrl))
            {
                model.ImageUrl = existingCategory.ImageUrl;
            }

            ModelState.Remove("Parent");
            ModelState.Remove("Subcategories");
            ModelState.Remove("Products");
            ModelState.Remove("uploadImage");

            if (ModelState.IsValid)
            {
                _context.CategoriesProducts.Update(model);
                _context.SaveChanges();
                TempData["SuccessMessage"] = "Cập nhật loại sản phẩm thành công!";
                return RedirectToAction("Index");
            }
            ViewBag.Categories = _context.CategoriesProducts.Where(c => c.ParentId == null && c.Id != model.Id).ToList();
            return View(model);
        }

        // ==========================================
        // 4. XÓA LOẠI SẢN PHẨM (DELETE)
        // ==========================================
        public IActionResult Delete(int id)
        {
            var category = _context.CategoriesProducts.Find(id);
            if (category != null)
            {
                // Kiểm tra xem danh mục này có chứa sản phẩm nào không
                bool hasProducts = _context.Products.Any(p => p.CategoryProductId == id);
                if (hasProducts)
                {
                    TempData["ErrorMsg"] = "Không thể xóa Loại sản phẩm này vì đang chứa các sản phẩm bên trong. Hãy xóa các sản phẩm đó trước!";
                    return RedirectToAction("Index");
                }

                _context.CategoriesProducts.Remove(category);
                _context.SaveChanges();
                TempData["SuccessMsg"] = "Đã xóa loại sản phẩm thành công.";
            }
            return RedirectToAction("Index");
        }
    }
}