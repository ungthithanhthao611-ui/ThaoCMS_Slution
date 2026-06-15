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

        public AuthController(ApplicationDbContext context)
        {
            _context = context;
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
}
