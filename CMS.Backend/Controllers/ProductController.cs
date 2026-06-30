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
using X.PagedList; // Import thư viện phân trang

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
        public IActionResult Index(int? page)
        {
            int pageSize = 5; // Số sản phẩm trên mỗi trang
            int pageNumber = page ?? 1;

            // Nạp kèm thông tin Loại sản phẩm (CategoryProduct) để tránh lỗi Null, sắp xếp ID giảm dần
            var data = _context.Products.Include(p => p.CategoryProduct).Where(p => !p.IsDeleted).OrderByDescending(p => p.Id).ToPagedList(pageNumber, pageSize);
            ViewBag.TrashCount = _context.Products.Count(p => p.IsDeleted);
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
                // Kiểm tra xem sản phẩm đã có đơn hàng nào chưa
                bool hasOrders = _context.OrderDetails.Any(od => od.ProductId == id);
                if (hasOrders)
                {
                    TempData["ErrorMsg"] = "Không thể chuyển vào thùng rác vì sản phẩm này đã có khách hàng đặt mua. Hãy đổi trạng thái sang Hết hàng nếu bạn không muốn bán nữa!";
                    return RedirectToAction("Index");
                }

                // Chuyển vào thùng rác (Xóa mềm)
                product.IsDeleted = true;
                _context.SaveChanges();
                TempData["SuccessMsg"] = "Đã chuyển sản phẩm vào Thùng rác.";
            }
            return RedirectToAction("Index");
        }

        // ==========================================
        // 4.1 THÙNG RÁC VÀ KHÔI PHỤC (RECYCLE BIN)
        // ==========================================
        public IActionResult RecycleBin(int? page)
        {
            int pageSize = 10;
            int pageNumber = page ?? 1;

            var data = _context.Products.Include(p => p.CategoryProduct).Where(p => p.IsDeleted).OrderByDescending(p => p.Id).ToPagedList(pageNumber, pageSize);
            return View(data);
        }

        public IActionResult Restore(int id)
        {
            var product = _context.Products.Find(id);
            if (product != null)
            {
                product.IsDeleted = false;
                _context.SaveChanges();
                TempData["SuccessMsg"] = "Đã khôi phục sản phẩm thành công.";
            }
            return RedirectToAction("RecycleBin");
        }

        public IActionResult HardDelete(int id)
        {
            var product = _context.Products.Find(id);
            if (product != null)
            {
                // Kiểm tra lại lần nữa cho chắc
                bool hasOrders = _context.OrderDetails.Any(od => od.ProductId == id);
                if (hasOrders)
                {
                    TempData["ErrorMsg"] = "Không thể xóa vĩnh viễn vì sản phẩm này có liên quan tới đơn hàng. Dữ liệu đơn hàng sẽ bị lỗi!";
                    return RedirectToAction("RecycleBin");
                }

                _context.Products.Remove(product);
                _context.SaveChanges();
                TempData["SuccessMsg"] = "Đã xóa vĩnh viễn sản phẩm khỏi hệ thống.";
            }
            return RedirectToAction("RecycleBin");
        }

        // ==========================================
        // 5. CẬP NHẬT TRẠNG THÁI SẢN PHẨM NHANH (AJAX)
        // ==========================================
        [HttpPost]
        public IActionResult ToggleStatus(int id, string type, decimal? salePrice = null)
        {
            var product = _context.Products.Find(id);
            if (product == null) return NotFound(new { success = false, message = "Không tìm thấy sản phẩm." });

            if (type == "IsNew")
            {
                product.IsNew = !product.IsNew;
            }
            else if (type == "IsBestSeller")
            {
                product.IsBestSeller = !product.IsBestSeller;
            }
            else if (type == "IsPromo")
            {
                product.IsPromo = !product.IsPromo;
                if (product.IsPromo)
                {
                    if (salePrice.HasValue && salePrice.Value > 0)
                    {
                        product.SalePrice = salePrice;
                    }
                    else
                    {
                        // Mặc định giảm 10% nếu không nhập
                        product.SalePrice = Math.Round(product.Price * 0.9m);
                    }
                }
                else
                {
                    product.SalePrice = null;
                }
            }

            _context.SaveChanges();
            return Json(new { 
                success = true, 
                isNew = product.IsNew, 
                isBest = product.IsBestSeller, 
                isPromo = product.IsPromo, 
                salePrice = product.SalePrice,
                price = product.Price
            });
        }
    }
}