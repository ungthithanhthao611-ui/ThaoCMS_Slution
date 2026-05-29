using Microsoft.EntityFrameworkCore;
using CMS.Data;
using Microsoft.AspNetCore.Authentication.Cookies; // [BUỔI 5] Thư viện xác thực Cookie

var builder = WebApplication.CreateBuilder(args);

// Đăng ký kết nối Database
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Add services to the container.
builder.Services.AddControllersWithViews();

// [BUỔI 6] Đăng ký dịch vụ lõi giúp hệ thống tự động bóc tách thông tin Endpoint phục vụ Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(); // -- Kích hoạt bộ sinh tài liệu API Swagger

// [BUỔI 6] Giai đoạn 1: Đăng ký chính sách CORS
builder.Services.AddCors(options => {
    options.AddPolicy("AllowAll", policy => {
        // Cho phép mọi nguồn cấp (Origin), mọi phương thức gọi (GET, POST...), và mọi thông tin đi kèm (Header)
        policy.AllowAnyOrigin() 
              .AllowAnyMethod() 
              .AllowAnyHeader(); 
    });
});

// [BUỔI 5] Đăng ký dịch vụ xác thực Cookie
builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(options =>
    {
        options.LoginPath = "/Account/Login";               // Trang đăng nhập khi chưa xác thực
        options.AccessDeniedPath = "/Account/AccessDenied"; // Trang báo lỗi khi không đủ quyền truy cập
    });

var app = builder.Build();

// [BUỔI 6] KHU VỰC CẤU HÌNH MIDDLEWARE (REQUEST PIPELINE) cho Swagger
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "ThaiCMS Web API v1");
    c.RoutePrefix = "swagger"; // -- Đường dẫn truy cập mặc định sẽ là /swagger
});

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

// [BUỔI 6] Giai đoạn 2: Kích hoạt chính sách (Middleware) CORS
app.UseCors("AllowAll");

app.UseAuthentication(); // [BUỔI 5] Kiểm tra xem "Bạn là ai?" (Xác thực danh tính)
app.UseAuthorization();  // [BUỔI 5] Kiểm tra xem "Bạn có quyền gì?" (Xác thực quyền hạn)

// [BUỔI 6] KHU VỰC ĐỊNH TUYẾN PHÂN LUỒNG (ROUTING MAP)
// Ánh xạ các Endpoint API tuân thủ theo cấu trúc [Route("api/[controller]")]
app.MapControllers();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();