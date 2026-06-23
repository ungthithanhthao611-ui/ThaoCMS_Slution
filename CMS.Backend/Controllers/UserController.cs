/* Sinh vien: Ung Thị Thanh Thảo 
   Ma sv: 2123110174
   Lop: CCQ2311E
   Mo ta: Thực hiện quản lý thành viên (User) - CRUD đầy đủ, phân biệt rõ Buổi 3/4 và giải thích chi tiết
*/
using CMS.Data;
using CMS.Data.Entities; // [BUỔI 3] Sử dụng thực thể User
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;

using Microsoft.AspNetCore.Authorization; // [BUỔI 5]

namespace CMS.Backend.Controllers
{
    // Controller quản lý người dùng / thành viên hệ thống
    [Authorize(Roles = "Admin")] // [BUỔI 5] Chỉ tài khoản có vai trò là "Admin" mới được phép quản lý thành viên
    public class UserController : Controller
    {
        private readonly ApplicationDbContext _context;

        // Constructor tiêm kết nối cơ sở dữ liệu DbContext - [BUỔI 2/3]
        public UserController(ApplicationDbContext context)
        {
            _context = context;
        }

        // ==========================================
        // [BUỔI 3] HIỂN THỊ DANH SÁCH THÀNH VIÊN
        // ==========================================
        // Index: Hiển thị danh sách tất cả thành viên trong Database
        public IActionResult Index() 
        {
            // [BUỔI 3] Truy xuất danh sách người dùng đổ lên View
            var users = _context.Users.ToList();
            return View(users);
        }

        // ==========================================
        // [BUỔI 4] THÊM MỚI THÀNH VIÊN (CREATE)
        // ==========================================
        // GET: Hiển thị form tạo mới tài khoản
        [HttpGet]
        public IActionResult Create()
        {
            return View();
        }

        // POST: Tiếp nhận dữ liệu, kiểm tra trùng tên và lưu thành viên mới
        [HttpPost]
        public IActionResult Create(User model)
        {
            // 1. Kiểm tra tính duy nhất (tránh lỗi trùng Username trong Database)
            var checkExist = _context.Users.Any(u => u.Username == model.Username);
            if (checkExist)
            {
                // Nếu Username đã có người dùng, add lỗi vào ModelState và trả lại view để báo lỗi
                ModelState.AddModelError("Username", "Tên đăng nhập này đã có người dùng!");
                return View(model);
            }

            // 2. Mã hóa mật khẩu và lưu User mới vào Database
            model.PasswordHash = BCrypt.Net.BCrypt.HashPassword(model.PasswordHash);

            _context.Users.Add(model); // Đưa vào hàng chờ tracking
            _context.SaveChanges();    // Thực thi lệnh INSERT INTO Users
            return RedirectToAction("Index"); // Điều hướng quay lại danh sách
        }

        // ==========================================
        // [BUỔI 4] CHỈNH SỬA THÀNH VIÊN (EDIT)
        // ==========================================
        // GET: Lấy thông tin tài khoản cũ theo ID để điền vào Form chỉnh sửa
        [HttpGet]
        public IActionResult Edit(int id)
        {
            // Tìm người dùng theo ID khóa chính
            var user = _context.Users.Find(id);
            if (user == null) return NotFound();
            
            return View(user); // Gửi đối tượng sang trang Edit
        }

        // POST: Cập nhật thông tin thành viên, hỗ trợ giữ nguyên mật khẩu cũ nếu để trống
        [HttpPost]
        public IActionResult Edit(User model, string NewPassword)
        {
            // 1. Tìm User gốc hiện tại trong Database bằng phương thức AsNoTracking
            // Sử dụng AsNoTracking để đọc độc lập, tránh làm xung đột bộ nhớ theo dõi (Tracking) của EF Core
            var existingUser = _context.Users.AsNoTracking().FirstOrDefault(u => u.Id == model.Id);
            
            if (existingUser == null) return NotFound();

            // 2. Xử lý logic Mật khẩu cực kỳ quan trọng:
            // - Nếu admin nhập mật khẩu mới: thì lấy mật khẩu mới
            // - Nếu ô mật khẩu mới để trống: thì giữ nguyên mật khẩu cũ từ Database
            if (!string.IsNullOrEmpty(NewPassword))
            {
                model.PasswordHash = BCrypt.Net.BCrypt.HashPassword(NewPassword); // Đổi sang mật khẩu mới (đã mã hóa)
            }
            else
            {
                model.PasswordHash = existingUser.PasswordHash; // Giữ lại mật khẩu cũ
            }

            // 3. Tiến hành cập nhật thực thể và lưu xuống SQL Server
            _context.Users.Update(model);
            _context.SaveChanges();

            return RedirectToAction("Index");
        }

        // ==========================================
        // [BUỔI 4] XÓA THÀNH VIÊN (DELETE)
        // ==========================================
        // Delete: Xóa tài khoản thành viên khỏi Database dựa theo ID nhận được
        public IActionResult Delete(int id)
        {
            // 1. Tìm tài khoản trong database
            var user = _context.Users.Find(id);
            if (user != null)
            {
                // 2. Xóa khỏi tập hợp
                _context.Users.Remove(user);
                // 3. Chốt lưu thay đổi thật xuống SQL Server
                _context.SaveChanges();
            }
            return RedirectToAction("Index");
        }
    }
}