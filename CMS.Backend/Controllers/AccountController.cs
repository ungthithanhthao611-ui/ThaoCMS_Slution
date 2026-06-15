using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using System.Security.Claims;
using CMS.Data;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CMS.Backend.Controllers
{
    // [BUỔI 5] AccountController - Điều hướng các thao tác liên quan đến tài khoản, Đăng nhập, Đăng xuất, Phân quyền
    public class AccountController : Controller
    {
        private readonly ApplicationDbContext _context;

        public AccountController(ApplicationDbContext context)
        {
            _context = context;
        }

        // [BUỔI 5] GET: /Account/Login
        [HttpGet]
        public IActionResult Login()
        {
            // Nếu đã đăng nhập rồi thì chuyển hướng về trang chủ luôn
            if (User.Identity.IsAuthenticated)
            {
                return RedirectToAction("Index", "Home");
            }
            return View();
        }

        // [BUỔI 5] POST: /Account/Login
        [HttpPost]
        public async Task<IActionResult> Login(string username, string password)
        {
            // 1. Tìm User theo Username
            var user = _context.Users.FirstOrDefault(u => u.Username == username);

            if (user == null)
            {
                ViewBag.Error = "Tên đăng nhập hoặc mật khẩu không đúng!";
                return View();
            }

            // 2. Kiểm tra mật khẩu — tự động xử lý cả 2 trường hợp:
            //    - Mật khẩu CŨ (chưa hash, lưu dạng text thô)
            //    - Mật khẩu MỚI (đã được BCrypt hash)
            bool isPasswordValid = false;

            if (user.PasswordHash != null && user.PasswordHash.StartsWith("$2"))
            {
                // Mật khẩu đã được mã hóa BCrypt → dùng Verify
                try
                {
                    isPasswordValid = BCrypt.Net.BCrypt.Verify(password, user.PasswordHash);
                }
                catch
                {
                    isPasswordValid = false;
                }
            }
            else
            {
                // Mật khẩu cũ còn dạng text thô → so sánh trực tiếp
                isPasswordValid = (user.PasswordHash == password);

                // Tự động nâng cấp: hash luôn mật khẩu cũ và lưu lại
                if (isPasswordValid)
                {
                    user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(password);
                    _context.Users.Update(user);
                    await _context.SaveChangesAsync();
                }
            }

            if (!isPasswordValid)
            {
                ViewBag.Error = "Tên đăng nhập hoặc mật khẩu không đúng!";
                return View();
            }


            // 3. Đăng nhập thành công — tạo Claims và lưu Cookie
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Role, user.Role),   // Lưu vai trò: Admin / Editor
                new Claim("FullName", user.FullName)     // Lưu tên đầy đủ
            };

            var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);

            await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme,
                new ClaimsPrincipal(claimsIdentity));

            return RedirectToAction("Index", "Home");
        }


        // [BUỔI 5] GET: /Account/Logout - Đăng xuất người dùng, xóa Cookie xác thực
        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return RedirectToAction("Login");
        }

        // [BUỔI 5] GET: /Account/AccessDenied - Hiển thị thông báo khi không có quyền truy cập
        [HttpGet]
        public IActionResult AccessDenied()
        {
            return View();
        }

        // GET: /Account/MigratePasswords - Mã hóa toàn bộ mật khẩu cũ đang lưu dạng thô (CHỈ CHẠY 1 LẦN)
        [HttpGet]
        public async Task<IActionResult> MigratePasswords()
        {
            var users = _context.Users.ToList();
            int count = 0;
            foreach (var u in users)
            {
                // Kiểm tra xem mật khẩu đã được mã hóa chưa bằng độ dài (BCrypt hash thường có độ dài 60 ký tự)
                // Lưu ý: logic này chỉ mang tính tương đối cho việc kiểm tra password chưa hash.
                if (!string.IsNullOrEmpty(u.PasswordHash) && !u.PasswordHash.StartsWith("$2"))
                {
                    u.PasswordHash = BCrypt.Net.BCrypt.HashPassword(u.PasswordHash);
                    count++;
                }
            }
            if (count > 0)
            {
                await _context.SaveChangesAsync();
            }
            return Content($"Đã mã hóa thành công {count} mật khẩu trong bảng Users.");
        }
    }
}
