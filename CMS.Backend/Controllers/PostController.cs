/* Sinh vien: Ung Thị Thanh Thảo 
   Ma sv: 2123110174
   Lop: CCQ2311E
   Mo ta: Thực hiện quản lý bài viết - CRUD đầy đủ, upload file, CKEditor, phân tách Buổi 3 và Buổi 4 rõ ràng
*/
using CMS.Data;
using CMS.Data.Entities; // [BUỔI 3] Sử dụng thực thể Post và Category
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering; // [BUỔI 4] Sử dụng SelectList cho dropdown chuyên mục
using Microsoft.AspNetCore.Http; // [BUỔI 4] Sử dụng IFormFile để upload ảnh
using Microsoft.EntityFrameworkCore;
using System;
using System.IO; // [BUỔI 4] Sử dụng thao tác với thư mục và file vật lý
using System.Linq;

using Microsoft.AspNetCore.Authorization; // [BUỔI 5]

namespace CMS.Backend.Controllers
{
    // Controller quản lý bài viết
    [Authorize] // [BUỔI 5] Yêu cầu người dùng đăng nhập mới được truy cập các tính năng quản lý bài viết
    public class PostController : Controller
    {
        private readonly ApplicationDbContext _context;

        // Constructor nạp ApplicationDbContext qua Dependency Injection - [BUỔI 2/3]
        public PostController(ApplicationDbContext context)
        {
            _context = context;
        }

        // ==========================================
        // [BUỔI 3] HIỂN THỊ DANH SÁCH BÀI VIẾT
        // ==========================================
        // Index: Lấy toàn bộ danh sách bài viết từ database
        public IActionResult Index()
        {
            // [BUỔI 3] Lọc, sắp xếp và dùng Eager Loading (.Include) để join bảng lấy kèm Category tránh lỗi Null
            var posts = _context.Posts
                        .Include(p => p.Category) // Join với bảng Category để lấy tên danh mục
                        .OrderByDescending(p => p.CreatedDate) // Sắp xếp bài viết mới nhất lên đầu
                        .ToList();
            return View(posts);
        }

        // ==========================================
        // [BUỔI 3] HIỂN THỊ CHI TIẾT BÀI VIẾT
        // ==========================================
        // Details: Chi tiết bài viết theo ID
        public IActionResult Details(int id)
        {
            // [BUỔI 3 - YÊU CẦU 1] Tìm bài viết theo khóa chính và nạp kèm thông tin danh mục
            var post = _context.Posts
                       .Include(p => p.Category) // Lấy kèm thông tin Category
                       .FirstOrDefault(p => p.Id == id);
            
            if (post == null) return NotFound(); // Trả về lỗi 404 nếu không tồn tại bài viết
            return View(post);
        }

        // ==========================================
        // [BUỔI 4] THÊM MỚI BÀI VIẾT (CREATE)
        // ==========================================
        // GET: Hiển thị form tạo mới bài viết
        [HttpGet]
        public IActionResult Create()
        {
            // Chuẩn bị SelectList danh sách các chuyên mục từ DB bỏ vào ViewBag để View dùng cho thẻ dropdown select
            // - "Id" là giá trị gửi về khi submit form
            // - "Name" là tên hiển thị trên giao diện cho người dùng chọn
            ViewBag.CategoryList = new SelectList(_context.Categories, "Id", "Name");
            return View();
        }

        // POST: Nhận dữ liệu bài viết mới, xử lý file ảnh tải lên và lưu vào SQL Server
        [HttpPost]
        public IActionResult Create(Post model, IFormFile uploadImage)
        {
            // Xử lý tệp hình ảnh tải lên nếu người dùng chọn file
            if (uploadImage != null && uploadImage.Length > 0)
            {
                // 1. Xác định đường dẫn lưu file: wwwroot/uploads
                string folder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads");

                // Tạo thư mục uploads nếu nó chưa tồn tại trên máy chủ
                if (!Directory.Exists(folder)) 
                {
                    Directory.CreateDirectory(folder);
                }

                // 2. Tạo tên file duy nhất sử dụng mã GUID ngẫu nhiên để tránh việc trùng tên ảnh bị ghi đè
                string fileName = Guid.NewGuid().ToString() + Path.GetExtension(uploadImage.FileName);
                string filePath = Path.Combine(folder, fileName);

                // 3. Sao chép/Lưu file vật lý vào thư mục trên máy chủ
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    uploadImage.CopyTo(stream);
                }

                // 4. Lưu đường dẫn URL ảo vào thuộc tính ImageUrl của thực thể để lưu xuống Database
                model.ImageUrl = "/uploads/" + fileName;
            }

            // Ghi dữ liệu bài viết vào SQL Server qua EF Core
            _context.Posts.Add(model); // Đăng ký lưu bài viết vào bộ nhớ tạm
            _context.SaveChanges();    // Thực thi câu lệnh INSERT INTO xuống Database thực tế
            return RedirectToAction("Index"); // Quay lại trang danh sách bài viết
        }

        // ==========================================
        // [BUỔI 4] XÓA BÀI VIẾT (DELETE)
        // ==========================================
        // Delete: Xóa bài viết khỏi cơ sở dữ liệu dựa trên ID nhận được
        public IActionResult Delete(int id)
        {
            // 1. Tìm đối tượng bài viết cần xóa trong CSDL theo ID
            var post = _context.Posts.Find(id);
            
            if (post != null)
            {
                // 2. Đánh dấu xóa thực thể khỏi bộ nhớ tạm (Tracking)
                _context.Posts.Remove(post);
                
                // 3. Thực thi câu lệnh DELETE thực sự xuống Database
                _context.SaveChanges();
            }
            // Điều hướng quay lại trang danh sách để cập nhật giao diện
            return RedirectToAction("Index");
        }

        // ==========================================
        // [BUỔI 4] CHỈNH SỬA BÀI VIẾT (EDIT)
        // ==========================================
        // GET: Tìm thông tin bài viết cũ theo ID và đưa lên Form sửa đổi
        [HttpGet]
        public IActionResult Edit(int id)
        {
            // Tìm bài viết theo khóa chính ID
            var post = _context.Posts.Find(id);
            if (post == null) return NotFound();

            // Chuẩn bị dropdown list các danh mục và tự động chọn (select) danh mục hiện tại của bài viết
            ViewBag.CategoryList = new SelectList(_context.Categories, "Id", "Name", post.CategoryId);
            return View(post); // Trả về View Edit cùng với đối tượng bài viết cần sửa
        }

        // POST: Nhận thông tin chỉnh sửa từ Form, xử lý ảnh mới tải lên (hoặc giữ ảnh cũ) và cập nhật Database
        [HttpPost]
        public IActionResult Edit(Post model, IFormFile uploadImage)
        {
            // 1. Kiểm tra xem người dùng có chọn file ảnh mới để thay thế ảnh cũ hay không
            if (uploadImage != null && uploadImage.Length > 0)
            {
                // Quy trình upload tệp ảnh tương tự như trang Create:
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

                // Lưu đường dẫn ảnh mới
                model.ImageUrl = "/uploads/" + fileName;
            }
            else
            {
                // 2. BƯỚC CỰC KỲ QUAN TRỌNG: Nếu không chọn ảnh mới, ta cần giữ nguyên ảnh cũ
                // Dùng AsNoTracking để đọc đối tượng gốc từ Database mà không làm xung đột bộ nhớ tracking của EF Core
                var oldPost = _context.Posts.AsNoTracking().FirstOrDefault(p => p.Id == model.Id);
                if (oldPost != null && string.IsNullOrEmpty(model.ImageUrl))
                {
                    model.ImageUrl = oldPost.ImageUrl; // Giữ lại đường dẫn ảnh cũ
                }
            }

            // 3. Ra lệnh cập nhật đối tượng bài viết vào Database
            _context.Posts.Update(model); // Đánh dấu thực thể thay đổi
            _context.SaveChanges();        // Thực thi câu lệnh SQL UPDATE xuống Database
            return RedirectToAction("Index");
        }
    }
}