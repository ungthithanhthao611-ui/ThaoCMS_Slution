using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CMS.Data;
using CMS.Data.Entities;
using System.Threading.Tasks;

namespace CMS.Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly Services.IEmailService _emailService;
        private static readonly System.Collections.Concurrent.ConcurrentDictionary<string, (string Otp, System.DateTime Expiry)> _otpCache = new();

        public AuthController(ApplicationDbContext context, Services.IEmailService emailService)
        {
            _context = context;
            _emailService = emailService;
        }

        // [BUỔI 6] 3. Nhóm API Tài khoản Khách hàng
        // API Đăng ký khách hàng mới
        [HttpPost("CustomerRegister")]
        public async Task<IActionResult> CustomerRegister([FromBody] CustomerRegisterDTO input)
        {
            if (input == null || string.IsNullOrEmpty(input.Email) || string.IsNullOrEmpty(input.Password))
            {
                return BadRequest(new { message = "Dữ liệu đăng ký không hợp lệ." });
            }

            // Kiểm tra xem Email đã tồn tại chưa
            var existingCustomer = await _context.Customers.FirstOrDefaultAsync(c => c.Email == input.Email);
            if (existingCustomer != null)
            {
                return BadRequest(new { message = "Email này đã được sử dụng." });
            }

            try
            {
                // Tạo khách hàng mới
                var newCustomer = new Customer
                {
                    FullName = input.FullName,
                    Email = input.Email,
                    Password = BCrypt.Net.BCrypt.HashPassword(input.Password), // Đã mã hóa mật khẩu
                    Phone = input.Phone,
                    Address = input.Address
                };

                _context.Customers.Add(newCustomer);
                await _context.SaveChangesAsync();

                return StatusCode(201, new { message = "Đăng ký thành công!", customerId = newCustomer.Id });
            }
            catch (System.Exception ex)
            {
                return StatusCode(500, new { message = "Lỗi hệ thống khi đăng ký", detail = ex.Message });
            }
        }

        // API Đăng nhập
        [HttpPost("CustomerLogin")]
        public async Task<IActionResult> CustomerLogin([FromBody] CustomerLoginDTO input)
        {
            if (input == null || string.IsNullOrEmpty(input.Email) || string.IsNullOrEmpty(input.Password))
            {
                return BadRequest(new { message = "Vui lòng nhập Email và Mật khẩu." });
            }

            // Kiểm tra thông tin trong CSDL
            var customer = await _context.Customers
                .FirstOrDefaultAsync(c => c.Email == input.Email);

            if (customer == null || !BCrypt.Net.BCrypt.Verify(input.Password, customer.Password))
            {
                return Unauthorized(new { message = "Email hoặc Mật khẩu không đúng." });
            }

            // Trả về thông tin khách hàng (Có thể sử dụng JWT Token ở thực tế, nhưng ở đây trả về trực tiếp thông tin cơ bản)
            return Ok(new
            {
                message = "Đăng nhập thành công!",
                customer = new
                {
                    id = customer.Id,
                    fullName = customer.FullName,
                    email = customer.Email,
                    phone = customer.Phone,
                    address = customer.Address
                }
            });
        }

        // API Quên mật khẩu - gửi OTP
        [HttpPost("ForgotPassword")]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordDTO input)
        {
            if (input == null || string.IsNullOrEmpty(input.Email))
            {
                return BadRequest(new { message = "Vui lòng nhập Email." });
            }

            var customer = await _context.Customers.FirstOrDefaultAsync(c => c.Email == input.Email);
            if (customer == null)
            {
                return BadRequest(new { message = "Không tìm thấy tài khoản với email này." });
            }

            // Sinh OTP 6 chữ số ngẫu nhiên
            var random = new System.Random();
            var otp = random.Next(100000, 999999).ToString();

            // Lưu OTP vào cache có hiệu lực 5 phút
            _otpCache[input.Email] = (otp, System.DateTime.UtcNow.AddMinutes(5));

            try
            {
                // Gửi email chứa OTP
                await _emailService.SendForgotPasswordOtpEmailAsync(customer, otp);
                return Ok(new { message = "Mã xác thực OTP đã được gửi đến email của bạn." });
            }
            catch (System.Exception ex)
            {
                return StatusCode(500, new { message = "Gửi email thất bại. Vui lòng thử lại sau.", detail = ex.Message });
            }
        }

        // API Xác thực OTP và Reset mật khẩu
        [HttpPost("ResetPassword")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordDTO input)
        {
            if (input == null || string.IsNullOrEmpty(input.Email) || string.IsNullOrEmpty(input.Otp) || string.IsNullOrEmpty(input.NewPassword))
            {
                return BadRequest(new { message = "Dữ liệu yêu cầu không hợp lệ." });
            }

            // Kiểm tra OTP trong cache
            if (!_otpCache.TryGetValue(input.Email, out var cachedData))
            {
                return BadRequest(new { message = "Mã OTP không tồn tại hoặc đã hết hạn." });
            }

            if (cachedData.Expiry < System.DateTime.UtcNow)
            {
                _otpCache.TryRemove(input.Email, out _);
                return BadRequest(new { message = "Mã OTP đã hết hạn." });
            }

            if (cachedData.Otp != input.Otp)
            {
                return BadRequest(new { message = "Mã OTP không chính xác." });
            }

            // OTP đúng, cập nhật mật khẩu mới
            var customer = await _context.Customers.FirstOrDefaultAsync(c => c.Email == input.Email);
            if (customer == null)
            {
                return BadRequest(new { message = "Tài khoản không tồn tại." });
            }

            try
            {
                // Băm mật khẩu mới bằng BCrypt
                customer.Password = BCrypt.Net.BCrypt.HashPassword(input.NewPassword);
                _context.Entry(customer).State = EntityState.Modified;
                await _context.SaveChangesAsync();

                // Xóa OTP khỏi cache sau khi đổi thành công
                _otpCache.TryRemove(input.Email, out _);

                return Ok(new { message = "Đổi mật khẩu thành công! Bạn có thể đăng nhập bằng mật khẩu mới." });
            }
            catch (System.Exception ex)
            {
                return StatusCode(500, new { message = "Đổi mật khẩu thất bại.", detail = ex.Message });
            }
        }
    }

    // Lớp DTO hỗ trợ đăng ký
    public class CustomerRegisterDTO
    {
        public string FullName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string? Phone { get; set; }
        public string? Address { get; set; }
    }

    // Lớp DTO hỗ trợ đăng nhập
    public class CustomerLoginDTO
    {
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }

    public class ForgotPasswordDTO
    {
        public string Email { get; set; } = string.Empty;
    }

    public class ResetPasswordDTO
    {
        public string Email { get; set; } = string.Empty;
        public string Otp { get; set; } = string.Empty;
        public string NewPassword { get; set; } = string.Empty;
    }
}
