using Microsoft.EntityFrameworkCore;
using CMS.Data;
using Microsoft.AspNetCore.Authentication.Cookies; // [BUỔI 5] Thư viện xác thực Cookie

var builder = WebApplication.CreateBuilder(args);

// Đăng ký kết nối Database
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Add services to the container.
builder.Services.AddControllersWithViews();

// [BUỔI 5] Đăng ký dịch vụ xác thực Cookie
builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(options =>
    {
        options.LoginPath = "/Account/Login";               // Trang đăng nhập khi chưa xác thực
        options.AccessDeniedPath = "/Account/AccessDenied"; // Trang báo lỗi khi không đủ quyền truy cập
    });

var app = builder.Build();

// [BUỔI 5] Tự động khởi tạo dữ liệu mẫu (Seed Data) cho tất cả các bảng
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        var context = services.GetRequiredService<ApplicationDbContext>();
        DbSeeder.Seed(context);
    }
    catch (Exception ex)
    {
        var logger = services.GetRequiredService<ILogger<Program>>();
        logger.LogError(ex, "Đã xảy ra lỗi trong quá trình khởi tạo dữ liệu mẫu.");
    }
}

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthentication(); // [BUỔI 5] Kiểm tra xem "Bạn là ai?" (Xác thực danh tính)
app.UseAuthorization();  // [BUỔI 5] Kiểm tra xem "Bạn có quyền gì?" (Xác thực quyền hạn)

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();