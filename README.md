# ThaoCMS Solution

Dự án Hệ thống quản trị nội dung (CMS) và Bán hàng trực tuyến. Hệ thống được xây dựng theo kiến trúc 3 phân tầng chuẩn:
- **CMS.Data**: Chứa các Entity Models, Database Context và Migrations.
- **CMS.Backend**: Tầng Controller xử lý API, xử lý nghiệp vụ và cung cấp giao diện Admin (MVC).
- **cms.frontend**: Ứng dụng người dùng (Customer) xây dựng bằng ReactJS.

## Yêu cầu hệ thống
- [.NET 8 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/8.0)
- [Node.js](https://nodejs.org/) (Khuyến nghị bản LTS)
- SQL Server (hoặc SQL Server Express)
- Trình soạn thảo Visual Studio 2022 (khuyên dùng) hoặc VS Code.

## Hướng dẫn khởi chạy dự án

### 1. Cấu hình Cơ sở dữ liệu và Chạy Backend
**Bước 1:** Cấu hình chuỗi kết nối
- Mở file `CMS.Backend/appsettings.json`.
- Tìm chuỗi `DefaultConnection` và thay đổi thông tin Server phù hợp với SQL Server trên máy bạn.
Ví dụ: `Server=.\\SQLEXPRESS;Database=ThanhThaoCMS_DB;Trusted_Connection=True;MultipleActiveResultSets=true;Encrypt=False`

**Bước 2:** Cập nhật Cơ sở dữ liệu (Migration)
- Mở **Package Manager Console** trong Visual Studio.
- Chọn `Default project` là `CMS.Data`.
- Chạy lệnh sau để tự động tạo Database:
  ```powershell
  Update-Database
  ```

**Bước 3:** Khởi chạy Backend
- Đặt `CMS.Backend` làm Startup Project.
- Nhấn phím **F5** (hoặc nút Run trên Visual Studio) để khởi động server Backend và Swagger API. Backend sẽ cung cấp API tại địa chỉ cấu hình (ví dụ: `https://localhost:7290`).

---

### 2. Khởi chạy Frontend (ReactJS)
**Bước 1:** Mở terminal mới (Command Prompt hoặc PowerShell).
**Bước 2:** Di chuyển vào thư mục `cms.frontend`:
```bash
cd cms.frontend
```
**Bước 3:** Cài đặt các gói phụ thuộc (chỉ cần chạy lần đầu):
```bash
npm install
```
**Bước 4:** Khởi động ứng dụng ReactJS:
```bash
npm start
```
Ứng dụng Frontend sẽ tự động mở trên trình duyệt tại địa chỉ: [http://localhost:3000](http://localhost:3000)

## Thông tin sinh viên
- **Họ và tên:** Ứng Thị Thanh Thảo
- **Mã sinh viên:** 2123110174
- **Lớp:** CCQ2311E
