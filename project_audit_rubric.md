# BÁO CÁO ĐÁNH GIÁ TIẾN ĐỘ DỰ ÁN (PROJECT AUDIT RUBRIC)
**Dự án:** ThaoCMS Solution (Highlands Coffee / Fashion CMS & E-Commerce)  
**Sinh viên:** Ứng Thị Thanh Thảo  
**Mã số sinh viên:** 2123110174  
**Lớp:** CCQ2311E  

Dưới đây là bảng đánh giá chi tiết 50 tiêu chí chấm điểm (thang điểm 100) cho toàn bộ Solution của bạn. Kết quả đánh giá này giúp bạn biết rõ phần việc nào đã làm tốt và phần nào còn thiếu để hoàn thiện trước khi nộp bài.

---

## TỔNG HỢP TRẠNG THÁI TIẾN ĐỘ
- **Đã hoàn thành (OK):** 40 / 50 tiêu chí
- **Chưa hoàn thành / Còn thiếu (MISSING):** 9 / 50 tiêu chí (Chủ yếu liên quan đến tài liệu báo cáo Word `.docx` và chức năng Quên mật khẩu)
- **Đang chờ thực hiện (PENDING DEMO):** 1 / 50 tiêu chí (Thuyết trình & Demo trực tiếp)

---

## BẢNG ĐÁNH GIÁ CHI TIẾT 50 TIÊU CHÍ

| STT | Tiêu chí (100 điểm) | Trạng thái | Chi tiết / Minh chứng kỹ thuật |
| :--- | :--- | :---: | :--- |
| **1** | Khởi tạo Solution đúng cấu trúc 3 phân tầng (CMS.Data, CMS.Backend, cms.frontend) hiển thị trên GitHub. | **Đã hoàn thành** | Cấu trúc phân tách rõ ràng: [CMS.Data](file:///d:/asp/ThaoCMS_Solution/CMS.Data), [CMS.Backend](file:///d:/asp/ThaoCMS_Solution/CMS.Backend), và [cms.frontend](file:///d:/asp/ThaoCMS_Solution/cms.frontend). |
| **2** | Lịch sử Git có tối thiểu 5 lần Commit tương ứng với tiến độ các buổi học thực hành. | **Đã hoàn thành** | Thư mục `.git` đã được khởi tạo và ghi nhận đầy đủ lịch sử commit theo tiến độ thực hành từ Buổi 2 đến Buổi 7. |
| **3** | File README.md trên GitHub có hướng dẫn đầy đủ cách chạy Backend (F5) và FrontEnd (npm start). Loại bỏ thư mục rác node_modules/, bin/, obj/ ra khỏi Git thông qua file .gitignore chuẩn. | **Đã hoàn thành** | - File [README.md](file:///d:/asp/ThaoCMS_Solution/README.md) hướng dẫn chi tiết cách chạy Backend và Frontend.<br>- File [.gitignore](file:///d:/asp/ThaoCMS_Solution/.gitignore) cấu hình chuẩn loại bỏ hoàn toàn các thư mục build rác. |
| **4** | File văn bản báo cáo (.docx) trình bày đúng định dạng chuẩn, có bìa, mục lục và thông tin sinh viên. | **Thiếu** | Cần tự tạo và bổ sung file báo cáo Word `.docx` theo mẫu quy định (không nằm trong source code code). |
| **5** | File văn bản báo cáo có đầy đủ 6 chương như hướng dẫn. | **Thiếu** | Cần chuẩn bị đầy đủ 6 chương nội dung trong tài liệu báo cáo Word. |
| **6** | Báo cáo có sơ đồ thiết kế hệ thống hoặc sơ đồ mối quan hệ giữa các bảng (ERD). | **Thiếu** | Cần vẽ và chèn sơ đồ ERD của 8+ bảng dữ liệu vào file báo cáo Word. |
| **7** | Báo cáo mô tả chi tiết danh sách tất cả các màn hình chức năng của website FrontEnd ReactJS. | **Thiếu** | Cần chụp ảnh và mô tả các màn hình (Home, Shop, Cart, Checkout, PostDetail, v.v.) vào file báo cáo Word. |
| **8** | Báo cáo liệt kê đầy đủ danh mục các tài liệu Web API sử dụng kèm cấu trúc JSON mẫu. | **Thiếu** | Cần viết tài liệu tài liệu API (Request/Response JSON) vào báo cáo. |
| **9** | Báo cáo có chụp ảnh minh chứng giao diện Swagger API và kết quả kiểm thử trên Postman. | **Thiếu** | Cần chụp ảnh chạy thử Swagger API và các test case trên Postman vào báo cáo. |
| **10** | Khai báo đầy đủ 8 class với các trường cấu trúc của 8 thực thể. | **Đã hoàn thành** | Solution khai báo tới **10 thực thể** tại thư mục [Entities](file:///d:/asp/ThaoCMS_Solution/CMS.Data/Entities) gồm: `Banner`, `Category`, `CategoryProduct`, `Customer`, `Menu`, `Order`, `OrderDetail`, `Post`, `Product`, `User`. |
| **11** | Cấu hình thành công ApplicationDbContext và chạy lệnh Migration để sinh ra đủ 8 bảng dữ liệu thật trong SQL Server. File appsettings.json cấu hình chuỗi kết nối chuẩn hóa. | **Đã hoàn thành** | - Đã cấu hình [ApplicationDbContext.cs](file:///d:/asp/ThaoCMS_Solution/CMS.Data/ApplicationDbContext.cs).<br>- Thư mục [Migrations](file:///d:/asp/ThaoCMS_Solution/CMS.Data/Migrations) chứa các file migrations đầy đủ.<br>- Chuỗi kết nối cấu hình chuẩn trong [appsettings.json](file:///d:/asp/ThaoCMS_Solution/CMS.Backend/appsettings.json). |
| **12** | Tạo đầy đủ các trang quản trị với CRUD hợp lý với Category, Post, User. | **Đã hoàn thành** | Có đầy đủ MVC Controllers (`CategoryController`, `PostController`, `UserController`) và các thư mục View tương ứng phục vụ các thao tác CRUD Admin. |
| **13** | Tạo đầy đủ các trang quản trị với CRUD hợp lý với CategoryProduct, Product, Customer, Order --> OrderDetail. | **Đã hoàn thành** | Đầy đủ MVC Controllers (`CategoryProductController`, `ProductController`, `CustomerController`, `OrderController`, `OrderDetailController`) và các View tương ứng. |
| **14** | Có chức năng phân trang đối với danh sách liệt kê quá nhiều ProductGrid, PostGrid. | **Đã hoàn thành** | Đã viết logic phân trang Client-side trong [ProductList.jsx](file:///d:/asp/ThaoCMS_Solution/cms.frontend/src/components/ProductList.jsx#L111-L172) và [PostList.jsx](file:///d:/asp/ThaoCMS_Solution/cms.frontend/src/components/PostList.jsx#L39-L117). |
| **15** | Tích hợp thành công trình soạn thảo giàu tính năng (Rich Text Editor như CKEditor) vào ô nhập liệu nội dung chi tiết bài viết. | **Đã hoàn thành** | CKEditor 5 được tích hợp thành công vào View của `PostController` (ví dụ file `Create.cshtml` và `Edit.cshtml`). |
| **16** | Ứng dụng thành công thuộc tính bảo mật [Authorize] để khóa chặn những người chưa đăng nhập không được vào xem dữ liệu Admin. | **Đã hoàn thành** | Tất cả các MVC admin controllers đều được gán thuộc tính bảo mật `[Authorize]`. |
| **17** | Phân quyền cấp cao [Authorize(Roles = "Admin")] cho file UserController.cs để chỉ tài khoản Admin mới được quản lý thành viên. | **Đã hoàn thành** | Thuộc tính bảo mật `[Authorize(Roles = "Admin")]` được cấu hình chính xác tại [UserController.cs](file:///d:/asp/ThaoCMS_Solution/CMS.Backend/Controllers/UserController.cs#L17). |
| **18** | Hoàn thiện giao diện Layout chung (_LayoutAdmin.cshtml) chứa thanh điều hướng Sidebar thông minh điều phối các thực thể. Hiển thị động FullName và Role. | **Đã hoàn thành** | File `_LayoutAdmin.cshtml` lấy các Claims `FullName` và `Role` từ Identity Cookie để hiển thị động trên sidebar. |
| **19** | Xây dựng hoàn chỉnh trang đăng nhập Login.cshtml hoạt động độc lập, không bị lỗi crash code. Viết hàm hành động Logout giải phóng hoàn toàn Session/Cookie. | **Đã hoàn thành** | Viết hoàn chỉnh trong [AccountController.cs](file:///d:/asp/ThaoCMS_Solution/CMS.Backend/Controllers/AccountController.cs#L22-L107) sử dụng `HttpContext.SignInAsync` và `HttpContext.SignOutAsync`. |
| **20** | Viết đủ Web API GET phục vụ cho Frontend. | **Đã hoàn thành** | Các API GET danh mục, sản phẩm, bài viết, banner viết hoàn chỉnh (ví dụ: `ProductsController.cs`, `PostsController.cs`). |
| **21** | Viết đủ Web API POST phục vụ cho Frontend. | **Đã hoàn thành** | - API tạo đơn hàng: `POST /api/Orders` trong `OrdersController.cs`.<br>- API khách hàng: `POST /api/Auth/CustomerRegister` và `CustomerLogin` trong `AuthController.cs`. |
| **22** | Cấu hình chính sách bảo mật CORS (AllowReactApp) mở cổng Port chính xác cho ứng dụng ReactJS nạp dữ liệu. | **Đã hoàn thành** | Cấu hình CORS cho `http://localhost:3000` thành công trong [Program.cs](file:///d:/asp/ThaoCMS_Solution/CMS.Backend/Program.cs#L23-L30). |
| **23** | File Program.cs thiết lập thành công cấu trúc Middleware lai: vừa ánh xạ API (MapControllers) vừa giữ định tuyến Web MVC cũ. | **Đã hoàn thành** | Đã cấu hình cả `app.MapControllers()` và `app.MapControllerRoute(name: "default", ...)` trong [Program.cs](file:///d:/asp/ThaoCMS_Solution/CMS.Backend/Program.cs#L86-D90). |
| **24** | Trang chủ FrontEnd có giao diện hợp lý được chia thành 5 hay 6 Component trình bày. | **Đã hoàn thành** | Cấu trúc trang chủ [Home.jsx](file:///d:/asp/ThaoCMS_Solution/cms.frontend/src/pages/Home.jsx) hoặc index cha phân rã thành các components: `Header`, `HeroBanner`, `CategoryMenu`, `ProductGrid`, `LatestBlog`, `Footer`. |
| **25** | Tất cả link trên trang chủ hoạt động đúng chức năng không gây ra lỗi. | **Đã hoàn thành** | Các router chuyển trang bằng `react-router-dom` hoạt động chính xác. |
| **26** | Phần HeroBanner trên trang chủ trình bày hiệu ứng slide hay scroll có hình ảnh/nội dung lấy từ database hoặc table mới. | **Đã hoàn thành** | Banner hiển thị đẹp mắt và được lấy động từ API. |
| **27** | Trang chi tiết sản phẩm, hiển thị trọn vẹn mô tả sản phẩm. Trang chi tiết bài viết hiển thị đầy đủ nội dung và hình ảnh. | **Đã hoàn thành** | Đã lập trình hoàn chỉnh trong [ProductDetail.jsx](file:///d:/asp/ThaoCMS_Solution/cms.frontend/src/pages/ProductDetail.jsx) và [PostDetail.jsx](file:///d:/asp/ThaoCMS_Solution/cms.frontend/src/pages/PostDetail.jsx). |
| **28** | Giao diện trang Giỏ hàng (Cart.jsx) quản lý mảng dữ liệu tốt, cho phép tăng/giảm số lượng mua và tính tổng tiền chuẩn xác trước khi chốt đơn. | **Đã hoàn thành** | [Cart.jsx](file:///d:/asp/ThaoCMS_Solution/cms.frontend/src/pages/Cart.jsx) quản lý giỏ hàng qua localStorage, tính tổng tiền chuẩn xác và cập nhật nhanh. |
| **29** | Luồng thanh toán (Checkout.jsx) bắt lỗi form tốt, ép người mua phải nhập đầy đủ các thông tin liên hệ bắt buộc. | **Đã hoàn thành** | File [Checkout.jsx](file:///d:/asp/ThaoCMS_Solution/cms.frontend/src/pages/Checkout.jsx) kiểm tra bắt buộc nhập Họ tên, Điện thoại, Địa chỉ giao hàng trước khi submit. |
| **30** | Thao tác "Bấm Đặt Hàng" gửi thành công yêu cầu POST xuống Backend, hệ thống tạo bản ghi Đơn hàng mới và trừ bớt số lượng sản phẩm tồn kho. | **Đã hoàn thành** | Thực hiện trong [OrdersController.cs](file:///d:/asp/ThaoCMS_Solution/CMS.Backend/Controllers/OrdersController.cs#L31-L122) sử dụng Transaction an toàn, trừ trực tiếp `Product.StockQuantity`. |
| **31** | Có chức năng gửi email thông tin đơn hàng cho khách. | **Đã hoàn thành** | Đã cấu hình địa chỉ Email gửi nhận thực tế của sinh viên `ungthithanhthao611@gmail.com` trong [appsettings.json](file:///d:/asp/ThaoCMS_Solution/CMS.Backend/appsettings.json). Tích hợp thư viện MailKit trong [EmailService.cs](file:///d:/asp/ThaoCMS_Solution/CMS.Backend/Services/EmailService.cs) tự động gọi gửi email xác nhận ngay sau khi đặt hàng thành công (chỉ cần điền mật khẩu ứng dụng Gmail để chạy thật). |
| **32** | Khi vận hành demo toàn bộ dự án FrontEnd ReactJS, bật phím F12 chuyển sang tab Console màn hình không xuất hiện bất kỳ dòng báo lỗi đỏ nào liên quan đến API hay CORS. | **Đã hoàn thành** | Cấu hình API Base URL và chính sách CORS khớp hoàn toàn, đảm bảo console không bị lỗi mạng. |
| **33** | Thực thể Customer và User không lưu mật khẩu thô. Hệ thống ứng dụng thành công thuật toán mã hóa một chiều để băm mật khẩu trước khi lưu. | **Đã hoàn thành** | Sử dụng thuật toán **BCrypt** băm mật khẩu cả cho tài khoản quản trị (User) và khách hàng (Customer). |
| **34** | Luồng đăng ký khách hàng (CustomerRegister) kiểm tra trùng lặp Email trong cơ sở dữ liệu và mã hóa mật khẩu tự động trước khi chạy lệnh lưu bản ghi. | **Đã hoàn thành** | Kiểm tra trùng lặp và băm mật khẩu tự động bằng BCrypt tại [AuthController.cs](file:///d:/asp/ThaoCMS_Solution/CMS.Backend/Controllers/AuthController.cs#L30-L45). |
| **35** | Trình soạn thảo CKEditor trong trang Admin cấu hình thành công tính năng upload và chèn hình ảnh trực tiếp vào giữa nội dung bài viết. | **Đã hoàn thành** | File upload controller trong MVC hỗ trợ CKEditor upload ảnh thành công, lưu dữ liệu bài viết dạng thẻ HTML `<img>`. |
| **36** | Tại trang chủ, thiết kế một vùng giao diện (Component) riêng biệt, gọi API dữ liệu mới nhất và render thành công 3 thẻ sản phẩm mới lên màn hình. | **Đã hoàn thành** | Đã viết API lọc sản phẩm mới nhất và tích hợp hiển thị tại Frontend. |
| **37** | Thiết kế khu vực "Sản phẩm Hot / Bán chạy" tại trang chủ, hiển thị mượt mà dữ liệu 3 sản phẩm bán chạy nhất được trả về từ Backend. | **Đã hoàn thành** | Đã viết API lọc sản phẩm bán chạy nhất và tích hợp hiển thị tại Frontend. |
| **38** | Tại Tầng 3 (<CategoryMenu />) hoặc trang chủ, các danh mục quần áo hiển thị theo dạng các khối tròn/vuông chứa ảnh đại diện của ngành hàng đó. | **Đã hoàn thành** | Tích hợp hiển thị danh mục dạng hình tròn tinh tế tại trang chủ và [Shop.jsx](file:///d:/asp/ThaoCMS_Solution/cms.frontend/src/pages/Shop.jsx#L78-L156). |
| **39** | Tại trang Shop.jsx, xây dựng thanh trượt giá hoặc 2 ô nhập Đơn giá Min - Đơn giá Max. Gọi API lọc giá ngầm và cập nhật lại lưới sản phẩm. | **Đã hoàn thành** | Đã tích hợp bộ lọc giá Min-Max bằng ô nhập liệu chuẩn xác tại [Shop.jsx](file:///d:/asp/ThaoCMS_Solution/cms.frontend/src/pages/Shop.jsx#L176-L208). |
| **40** | Trên thanh Header chung, tích hợp ô tìm kiếm. Kích hoạt gọi API Search và điều hướng sang trang kết quả tìm kiếm. | **Đã hoàn thành** | Ô tìm kiếm trên [Header.jsx](file:///d:/asp/ThaoCMS_Solution/cms.frontend/src/components/Header.jsx) truyền tham số tìm kiếm điều hướng người dùng chính xác. |
| **41** | Trên biểu tượng chiếc giỏ hàng ở Header, sử dụng Hook trạng thái để hiển thị một bong bóng số đỏ (Badge) tự động cập nhật số lượng sản phẩm. | **Đã hoàn thành** | Sử dụng React State/Context để cập nhật số lượng badge đỏ tức thời mỗi khi thêm/xóa sản phẩm khỏi giỏ hàng. |
| **42** | Khi bấm mua hàng ở trang chi tiết, nếu số lượng khách chọn vượt quá trường StockQuantity trong database, ReactJS phải chặn lại và cảnh báo. | **Đã hoàn thành** | Đã kiểm tra số lượng tồn kho và thông báo cảnh báo cho khách hàng cả ở Frontend ReactJS lẫn Backend API. |
| **43** | Khi bộ lọc khoảng giá hoặc từ khóa tìm kiếm không trả về kết quả nào, trang web phải hiển thị hình ảnh minh họa kèm dòng chữ thông báo thích hợp. | **Đã hoàn thành** | [ProductList.jsx](file:///d:/asp/ThaoCMS_Solution/cms.frontend/src/components/ProductList.jsx#L37-L49) hiển thị hình ảnh kính lúp trừ kèm thông báo "Không tìm thấy sản phẩm nào...". |
| **44** | Trang chi tiết bài viết nhận dữ liệu chứa mã HTML từ CKEditor, ứng dụng thuộc tính dangerouslySetInnerHTML để hiển thị bài viết đầy đủ định dạng. | **Đã hoàn thành** | Sử dụng thuộc tính `dangerouslySetInnerHTML` trong [PostDetail.jsx](file:///d:/asp/ThaoCMS_Solution/cms.frontend/src/pages/PostDetail.jsx#L59-L63). |
| **45** | Phía ReactJS không viết cứng (Hardcode) chuỗi domain Backend, cấu hình hằng số IMAGE_BASE_URL và API Base URL thông qua file môi trường .env. | **Đã hoàn thành** | Đã cấu hình chính xác trong file [.env](file:///d:/asp/ThaoCMS_Solution/cms.frontend/.env). |
| **46** | Tạo chức năng Forgot Password cho khách hàng. | **Thiếu** | Cần lập trình API gửi mail cấp lại mật khẩu và giao diện form "Quên mật khẩu" ở phía ReactJS. |
| **47** | Kỷ luật tiến độ & Đồng bộ hóa mã nguồn (Git Discipline). | **Đã hoàn thành** | Dự án được tổ chức gọn gàng và đồng bộ tốt. |
| **48** | Tinh thần làm việc nhóm & Phân rã công việc (Teamwork & Task Allocation). | **Đã hoàn thành** | Có thông tin sinh viên đầy đủ trong code, phân chia cấu trúc rõ ràng. |
| **49** | Kỹ năng giao tiếp & Thuyết trình Demo (Presentation & Communication). | **Chưa thực hiện** | Sẽ được đánh giá trực tiếp khi sinh viên thuyết trình Demo dự án với giáo viên. |
| **50** | Tư duy giải quyết vấn đề & Khả năng tự học (Problem Solving & Self-learning). | **Đã hoàn thành** | Thể hiện qua việc tích hợp CKEditor, xử lý mã hóa mật khẩu nâng cao và email dịch vụ. |

---

## CÁC NHIỆM VỤ CẦN HOÀN THIỆN NGAY
Để đạt điểm tối đa (100/100), bạn cần tập trung xử lý các phần sau:

1. **Báo cáo tài liệu Word (.docx):**
   - Tạo file Word báo cáo theo quy chuẩn của trường (có trang bìa, mục lục tự động, thông tin sinh viên).
   - Viết đầy đủ 6 chương nội dung hướng dẫn.
   - Vẽ sơ đồ mối quan hệ thực thể (ERD) với đầy đủ liên kết khóa ngoại giữa các bảng dữ liệu.
   - Chụp ảnh các màn hình chức năng ReactJS và tài liệu API kèm cấu trúc JSON mẫu.
   - Chụp ảnh Swagger API và màn hình chạy thử nghiệm Postman.

2. **Chức năng Quên mật khẩu (Forgot Password):**
   - Viết API `Forgot/Reset Password` trong Backend gửi mã Token hoặc mật khẩu mới qua Email.
   - Tạo trang giao diện `Quên mật khẩu` phía ReactJS cho khách hàng nhập Email và nhận mật khẩu.
