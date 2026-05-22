/*Sinh vien:Ung Thị Thanh Thảo 
Ma sv:2123110174
Lop:CCQ2311E
Mo ta: Thực hiện CRUD đầy đủ quản lý Sản phẩm (Product) - BUỔI 5
*/
using CMS.Data;
using CMS.Data.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using System;
using System.IO;
using System.Linq;
using Microsoft.AspNetCore.Authorization; // [BUỔI 5]

namespace CMS.Backend.Controllers
{
    [Authorize] // [BUỔI 5] Yêu cầu đăng nhập mới được quản lý sản phẩm
    public class ProductController : Controller
    {
        private readonly ApplicationDbContext _context;

        public ProductController(ApplicationDbContext context)
        {
            _context = context;
        }

        // ==========================================
        // 1. HIỂN THỊ DANH SÁCH SẢN PHẨM
        // ==========================================
        public IActionResult Index()
        {
            // [BUỔI 3/4] Eager Loading nạp kèm thông tin Loại sản phẩm (CategoryProduct) để tránh lỗi Null
            var data = _context.Products.Include(p => p.CategoryProduct).ToList();
            return View(data);
        }

        // ==========================================
        // 2. THÊM MỚI SẢN PHẨM (CREATE)
        // ==========================================
        [HttpGet]
        public IActionResult Create()
        {
            // Nạp danh sách các Loại sản phẩm để đưa vào dropdown select
            ViewBag.CategoryList = new SelectList(_context.CategoriesProducts, "Id", "Name");
            return View();
        }

        [HttpPost]
        public IActionResult Create(Product model, IFormFile uploadImage)
        {
            // Xử lý tệp hình ảnh tải lên nếu người dùng chọn file
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

            // Ghi nhận sản phẩm mới vào DB
            _context.Products.Add(model);
            _context.SaveChanges();
            return RedirectToAction("Index");
        }

        // ==========================================
        // 3. CHỈNH SỬA SẢN PHẨM (EDIT)
        // ==========================================
        [HttpGet]
        public IActionResult Edit(int id)
        {
            var product = _context.Products.Find(id);
            if (product == null) return NotFound();

            ViewBag.CategoryList = new SelectList(_context.CategoriesProducts, "Id", "Name", product.CategoryProductId);
            return View(product);
        }

        [HttpPost]
        public IActionResult Edit(Product model, IFormFile uploadImage)
        {
            // Lấy thực thể gốc không tracking để giữ nguyên ảnh cũ nếu không chọn file mới và không nhập URL mới
            var existingProduct = _context.Products.AsNoTracking().FirstOrDefault(p => p.Id == model.Id);
            if (existingProduct == null) return NotFound();

            if (uploadImage != null && uploadImage.Length > 0)
            {
                // Upload ảnh vật lý mới
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
                // Nếu người dùng không nhập URL mới và không upload ảnh mới, giữ nguyên ảnh cũ từ Database
                model.ImageUrl = existingProduct.ImageUrl;
            }

            _context.Products.Update(model);
            _context.SaveChanges();
            return RedirectToAction("Index");
        }

        // ==========================================
        // 4. XÓA SẢN PHẨM (DELETE)
        // ==========================================
        public IActionResult Delete(int id)
        {
            var product = _context.Products.Find(id);
            if (product != null)
            {
                _context.Products.Remove(product);
                _context.SaveChanges();
            }
            return RedirectToAction("Index");
        }
    }
}