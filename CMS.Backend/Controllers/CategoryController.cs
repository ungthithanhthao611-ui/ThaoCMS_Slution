/*Sinh vien:Ung Thị Thanh Thảo 
 Ma sv:2123110174
Lop:CCQ2311E
Mo ta: Thực hiện quản lý danh mục - CRUD đầy đủ
*/
using CMS.Data;
using CMS.Data.Entities;
using Microsoft.AspNetCore.Mvc;

public class CategoryController : Controller
{
    // Biến _context dùng để kết nối và tương tác với Database (thông qua Entity Framework Core)
    private readonly ApplicationDbContext _context;

    // Constructor: Dependency Injection tự động nạp ApplicationDbContext vào Controller
    public CategoryController(ApplicationDbContext context)
    {
        _context = context;
    }

    // [READ]: Lấy và hiển thị danh sách tất cả danh mục
    public IActionResult Index()
    {
        // 1. Dùng _context để truy vấn toàn bộ dữ liệu từ bảng Categories trong Database
        // 2. Chuyển kết quả truy vấn thành một danh sách (List)
        var data = _context.Categories.ToList();
        
        // 3. Trả danh sách data này sang View (tương ứng với file Views/Category/Index.cshtml) để hiển thị
        return View(data);
    }

    // [CREATE] - Giai đoạn 1 (GET): Hiện Form thêm mới
    [HttpGet] // Phương thức này chỉ chạy khi người dùng truy cập trang bằng URL bình thường (GET Request)
    public IActionResult Create()
    {
        // Chỉ đơn giản là trả về một View rỗng (Views/Category/Create.cshtml) chứa form HTML để người dùng nhập liệu
        return View();
    }

    // [CREATE] - Giai đoạn 2 (POST): Nhận dữ liệu từ Form và lưu vào Database
    [HttpPost] // Phương thức này chạy khi người dùng nhấn nút Submit trên form HTML (POST Request)
    public IActionResult Create(Category model)
    {
        // 1. Thêm đối tượng model (chứa dữ liệu người dùng vừa nhập) vào tập hợp Categories
        _context.Categories.Add(model);
        
        // 2. Lưu các thay đổi vừa thực hiện xuống Database thực tế
        _context.SaveChanges();
        
        // 3. Sau khi lưu thành công, điều hướng (redirect) người dùng về trang danh sách (hàm Index)
        return RedirectToAction("Index");
    }

    // [EDIT] - Giai đoạn 1 (GET): Tìm dữ liệu cũ của danh mục và đổ lên Form
    [HttpGet]
    public IActionResult Edit(int id)
    {
        // 1. Tìm danh mục trong Database dựa vào khóa chính (id)
        var category = _context.Categories.Find(id);
        
        // 2. Nếu không tìm thấy (ví dụ id không tồn tại), trả về trang lỗi 404 Not Found
        if (category == null) return NotFound();
        
        // 3. Nếu tìm thấy, gửi đối tượng category cũ sang View (Views/Category/Edit.cshtml) để hiển thị lên Form
        return View(category);
    }

    // [EDIT] - Giai đoạn 2 (POST): Nhận dữ liệu đã chỉnh sửa từ người dùng và cập nhật vào DB
    [HttpPost]
    public IActionResult Edit(Category model)
    {
        // 1. Đánh dấu đối tượng model này đã bị thay đổi và cần cập nhật
        _context.Categories.Update(model);
        
        // 2. Lưu các thay đổi xuống Database
        _context.SaveChanges();
        
        // 3. Chuyển hướng về trang danh sách sau khi lưu thành công
        return RedirectToAction("Index");
    }

    // [DELETE] - Giai đoạn 1 (GET): Hiện trang xác nhận trước khi xóa
    [HttpGet]
    public IActionResult Delete(int id)
    {
        // 1. Tìm danh mục cần xóa để hiển thị thông tin cho người dùng xem lại
        var category = _context.Categories.Find(id);
        if (category == null) return NotFound();
        
        // 2. Trả dữ liệu sang trang View (Views/Category/Delete.cshtml) để hỏi "Bạn có chắc muốn xóa?"
        return View(category);
    }

    // [DELETE] - Giai đoạn 2 (POST): Thực hiện xóa thực sự khỏi Database
    [HttpPost, ActionName("Delete")] // ActionName("Delete") giúp map form action gửi đến hàm này dù tên hàm là DeleteConfirmed
    public IActionResult DeleteConfirmed(int id)
    {
        // 1. Tìm lại danh mục cần xóa một lần nữa
        var category = _context.Categories.Find(id);
        if (category != null)
        {
            // 2. Nếu tồn tại, ra lệnh xóa khỏi tập hợp Categories
            _context.Categories.Remove(category);
            
            // 3. Lưu lệnh xóa xuống Database
            _context.SaveChanges();
        }
        
        // 4. Quay về trang danh sách
        return RedirectToAction("Index");
    }
}