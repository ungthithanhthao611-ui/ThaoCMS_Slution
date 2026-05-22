# Đồ án môn học — Hệ thống quản trị bán hàng và tin tức (CMS) Full-Stack

## THÔNG TIN SINH VIÊN

| Thông tin | Chi tiết |
| :--- | :--- |
| **Sinh viên thực hiện** | Ung Thị Thanh Thảo |
| **MSSV** | 2123110174 |
| **Lớp** | CCQ2311E |
| **Môn học** | Chuyên đề ASP.NET |
| **Tên Solution** | ThaoCMS_Solution |

---

## 1. TỔNG QUAN KIẾN TRÚC HỆ THỐNG
Dự án được xây dựng dựa trên kiến trúc **3 lớp (3-tier Architecture)** nhằm tách biệt rõ ràng giữa Dữ liệu, Logic xử lý và Giao diện người dùng:

*   **`CMS.Data`**: Lớp thao tác cơ sở dữ liệu (Data Access Layer). Chứa các khai báo Entity (Bảng dữ liệu) và sẽ được tích hợp với Entity Framework Core.
*   **`CMS.Backend`**: Lớp xử lý nghiệp vụ trung tâm (Business Logic Layer & Presentation Layer cho Admin). Được viết bằng ASP.NET Core MVC để quản trị dữ liệu, đồng thời cung cấp Web API.
*   **`cms.frontend`**: Lớp giao diện người dùng cuối (Client-side / Presentation Layer). Được phát triển bằng ReactJS.

---

## 2. CẤU TRÚC THƯ MỤC DỰ ÁN

```text
ThaoCMS_Solution/
├── ThaoCMS_Solution.sln         # File Solution tổng của Visual Studio
├── CMS.Data/                    # Project Class Library (.NET 8)
│   └── Entities/                # Nơi chứa các class Model (8 bảng dữ liệu)
├── CMS.Backend/                 # Project ASP.NET Core 8 Web App (MVC)
│   ├── Controllers/             # Xử lý các logic (Category, Product, Order...)
│   ├── Models/                  # Các view model hỗ trợ (VD: ErrorViewModel)
│   ├── Views/                   # Chứa giao diện (.cshtml) cho trang Quản trị (Admin)
│   └── appsettings.json         # Cấu hình hệ thống (Chuỗi kết nối DB...)
└── cms.frontend/                # Project ReactJS
    ├── public/
    └── src/                     # Code logic của ứng dụng Frontend
```

---

## 3. CHI TIẾT CÁC MODULE TRONG HỆ THỐNG

### 3.1. Dự án `CMS.Data` (Lớp dữ liệu / Entity)
Thư mục `Entities` định nghĩa 8 bảng dữ liệu cốt lõi, phục vụ cho 2 nghiệp vụ chính là: **Tin tức** và **Bán hàng**.

| Tên Model (Entity) | Chức năng nghiệp vụ | Mối quan hệ |
| :--- | :--- | :--- |
| **Category** | Quản lý danh mục bài viết / tin tức | 1 - N với `Post` |
| **Post** | Quản lý nội dung bài viết tin tức | N - 1 với `Category` |
| **CategoryProduct** | Quản lý nhóm / danh mục của sản phẩm | 1 - N với `Product` |
| **Product** | Quản lý thông tin hàng hóa, sản phẩm | N - 1 với `CategoryProduct` |
| **Customer** | Thông tin khách hàng đặt mua | 1 - N với `Order` |
| **Order** | Quản lý hóa đơn / đơn hàng tổng | N - 1 với `Customer`, 1 - N với `OrderDetail` |
| **OrderDetail** | Quản lý chi tiết từng mặt hàng trong đơn hàng | N - 1 với `Order`, N - 1 với `Product` |
| **User** | Quản lý tài khoản đăng nhập (Admin) | Độc lập |

### 3.2. Dự án `CMS.Backend` (Hệ thống quản trị)
Gồm các Controller xử lý các luồng dữ liệu (CRUD) theo mô hình MVC. Tất cả các controller đều được tiêm `ApplicationDbContext` để tương tác trực tiếp với Database.

*   **`HomeController`**: Quản lý trang chủ Admin (hiển thị bài viết mới, Dashboard thống kê).
*   **`CategoryController`**: Xử lý thêm, sửa, xóa danh mục bài viết.
*   **`PostController`**: Quản lý các bài viết tin tức.
*   **`ProductController` / `CategoryProductController`**: Xử lý nghiệp vụ danh mục hàng hóa và sản phẩm.
*   **`OrderController` / `OrderDetailController`**: Theo dõi và cập nhật trạng thái các đơn hàng.
*   **`CustomerController` / `UserController`**: Quản lý tệp khách hàng và phân quyền tài khoản quản trị.

### 3.3. Dự án `cms.frontend` (Giao diện người dùng)
*   **Công nghệ**: ReactJS (Create React App).
*   **Nhiệm vụ**: Cung cấp giao diện xem tin tức và mua hàng cho khách. Fetch dữ liệu từ các API do lớp `CMS.Backend` cung cấp thay vì truy xuất trực tiếp vào cơ sở dữ liệu.

---

## 4. HƯỚNG DẪN CÀI ĐẶT VÀ CHẠY DỰ ÁN

### Yêu cầu môi trường
*   .NET 8 SDK
*   Node.js (Bản LTS)
*   IDE: Visual Studio 2022 (hoặc VS Code)

### Bước 1: Khởi động Backend (ASP.NET Core)
1. Mở Solution bằng Visual Studio.
2. Thiết lập **`CMS.Backend`** làm **Startup Project** (Chuột phải vào thư mục Project -> Chọn *Set as Startup Project*).
3. Nhấn **F5** để chạy dự án. Hệ thống sẽ cấp phát một URL (VD: `https://localhost:7150`).

*(Lưu ý: Bạn cũng có thể dùng Terminal, di chuyển vào thư mục `CMS.Backend` và chạy lệnh `dotnet run`)*

### Bước 2: Khởi động Frontend (ReactJS)
1. Mở một cửa sổ Terminal (hoặc Command Prompt) mới.
2. Trỏ đường dẫn vào thư mục Frontend: `cd d:\asp\ThaoCMS_Solution\cms.frontend`
3. Cài đặt các thư viện (chỉ làm lần đầu): `npm install`
4. Khởi chạy ứng dụng: `npm start`
5. Trình duyệt sẽ tự động mở tại địa chỉ `http://localhost:3000`.

---

> **Bản quyền & Phát triển**
> Đồ án được thực hiện bởi sinh viên **Ung Thị Thanh Thảo**. Mọi source code và tài liệu được sử dụng với mục đích học tập môn Chuyên đề ASP.NET.
