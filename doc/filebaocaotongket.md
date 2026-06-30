TRƯỜNG CAO ĐẲNG CÔNG THƯƠNG TP. HỒ CHÍ MINH
KHOA CÔNG NGHỆ THÔNG TIN
NGÀNH CÔNG NGHỆ PHẦN MỀM
---------------o0o---------------


 




ĐỒ ÁN MÔN HỌC
CHUYÊN ĐỀ ASP.NET


 Đồ uống (ThaoCMS.Coffee)
Mô tả: Cà phê phin, Freeze trà xanh, trà trái cây.




HVTH: Ung Thị Thanh Thảo
MSHV: 2123110174
GVHD:Ths. NGUYỄN CAO THÁI








TP. Hồ Chí Minh, 29 tháng  6 năm 2026
MỤC LỤC
CHƯƠNG 1: TỔNG QUAN VỀ ĐỀ TÀI VÀ CƠ SỞ LÝ THUYẾT	6
1.1.	Lý do chọn đề tài (Bối cảnh chuyển đổi số và thương mại điện tử)	6
1.2. Mục tiêu của đồ án	6
1.3. Đối tượng và phạm vi nghiên cứu	6
1.4. Công nghệ áp dụng trong hệ thống	7
1.4.1. Tổng quan về nền tảng .NET Core và C#	7
1.4.2. Thư viện ReactJS và kiến trúc ứng dụng một trang (SPA)	7
1.4.3. Hệ quản trị cơ sở dữ liệu SQL Server và Entity Framework Core	7
1.4.4. Kiến trúc Web API (RESTful API) và giao thức truyền tải JSON	8
CHƯƠNG 2: PHÂN TÍCH VÀ THIẾT KẾ HỆ THỐNG	9
2.1. Phân tích yêu cầu chức năng (Luồng nghiệp vụ mua hàng và quản trị)	9
2.2. Sơ đồ thực thể mối quan hệ (ERD) cho hệ thống 8 thực thể	9
2.2.1. Danh mục các thực thể chính	9
2.2.2. Sơ đồ quan hệ thực thể (ERD Diagram)	14
2.2.3. Quy tắc ràng buộc quan hệ	14
2.3. Chi tiết thiết kế cơ sở dữ liệu (Database Schema)	15
2.3.1. Phân hệ nội dung tin tức (Category, Post)	16
2.3.2. Phân hệ bán hàng E-Commerce (CategoryProduct, Product)	17
2.3.3. Phân hệ khách hàng và đơn hàng (Customer, Order, OrderDetail)	18
2.3.4. Phân hệ tài khoản quản trị và phân quyền (User)	19
2.4. Thiết kế danh mục Web API giữa Backend và Frontend	20
CHƯƠNG 3: TRIỂN KHAI PHẦN BACKEND (C# ASP.NET CORE WEB API)	22
3.1. Cấu trúc Solution và phân tách các tầng kiến trúc	22
3.2. Khởi tạo Cơ sở dữ liệu và Migration dữ liệu mẫu (Seed Data)	23
3.3. Xây dựng các Controllers xử lý API dữ liệu (GET/POST/PUT)	24
3.4. Triển khai phân hệ bảo mật, mã hóa mật khẩu và phân quyền (Authentication & Authorization)	25
3.5. Tích hợp công cụ soạn thảo Rich Text (CKEditor) và cơ chế Upload ảnh vật lý	27
3.6. Cấu hình chính sách chia sẻ tài nguyên nguồn gốc chéo (CORS) cho ReactJS	28
3.7. Hoàn chỉnh phần quản trị Backend đầy đủ chức năng dành cho nhân viên của cửa hàng/công ty/doanh nghiệp sử dụng.	29
3.8.. Tài liệu hóa hệ thống API bằng Swagger UI	31
CHƯƠNG 4: TRIỂN KHAI PHẦN FRONTEND (REACTJS CLIENT SITE)	32
4.1. Khởi tạo cấu trúc dự án ReactJS và tích hợp React Router DOM	32
4.2. Cấu hình trục HTTP Client chung (axiosClient.js) và xử lý dữ liệu JSON	33
4.3. Xây dựng giao diện các tầng bóc tách cho Trang chủ (Home.jsx)	34
4.4. Triển khai Trang cửa hàng (Shop.jsx) tích hợp bộ lọc nâng cao (Bộ lọc danh mục, Bộ lọc khoảng giá) và Tìm kiếm thời gian thực	35
4.5. Triển khai Trang chi tiết sản phẩm (ProductDetail.jsx) và cơ chế hiển thị nội dung dạng HTML	36
4.6. Xây dựng luồng về khách hàng (đăng ký, đăng nhập, đơn hàng….) CHƯA CHỤP ẢNH	37
4.7. Xây dựng luồng xử lý Giỏ hàng (Cart.jsx) và Biểu mẫu thanh toán đặt đơn hàng (Checkout.jsx) CHƯA ẢNH	38
CHƯƠNG 5: KIỂM THỬ VÀ ĐÁNH GIÁ KẾ THÚC ĐỒ ÁN	39
5.1. Kiểm thử chức năng phân quyền bảo mật vùng Admin (Quyền Admin và Editor)	39
5.2. Kiểm thử luồng nghiệp vụ mua sắm và bắt lỗi logic tồn kho (StockQuantity)	42
5.3. Kiểm thử hiệu năng đồng bộ thời gian thực ngầm (Tab Console F12 và Swagger)	43
5.4. Đánh giá ưu điểm và nhược điểm của giải pháp thiết kế	45
CHƯƠNG 6: KẾT LUẬN VÀ HƯỚNG PHÁT TRIỂN NÂNG CẤP	46
6.1. Kết quả đạt được của đồ án đối với sinh viên	46
6.2. Hướng phát triển nâng cấp hệ thống trong tương lai (Tích hợp cổng thanh toán, AI gợi ý sản phẩm)	47




	








 DANH MỤC HÌNH ẢNH, SƠ ĐỒ
Hình 1.Khai báo lớp thực thể Customer (Khách hàng)	9
Hình 2.Khai báo lớp thực thể Order (Đơn hàng)	10
Hình 3.Khai báo lớp thực thể OrderDetail (Chi tiết đơn hàng)	11
Hình 4.Khai báo lớp thực thể Product (Sản phẩm)	12
Hình 5.Khai báo lớp thực thể CategoryProduct (Loại sản phẩm)	13
Hình 6.Khai báo lớp thực thể Post (Bài viết/Tin tức)	13
Hình 7.Khai báo lớp thực thể Category (Danh mục tin tức)	14
Hình 8.Khai báo lớp thực thể About (Phân khu giới thiệu)	14
Hình 9.Sơ đồ quan hệ thực thể (ERD) tự động sinh từ SQL Server Management Studio.	15
Hình 10.Database Schema	16
Hình 11.Cấu trúc các trường dữ liệu và kiểu dữ liệu (Data Type) của bảng Posts và Categories trong SQL Server.	18
Hình 12.Cấu trúc chi tiết các trường dữ liệu và kiểu dữ liệu của bảng Products và CategoryProducts, chú trọng tối ưu kiểu decimal cho tính toán giá thành	19
Hình 13.Cấu trúc dữ liệu của phân hệ Đơn hàng. Bảng OrderDetails lưu trữ UnitPrice độc lập để đảm bảo tính toàn vẹn dữ liệu lịch sử giao dịch	20
Hình 14.Cấu trúc bảng Users, phân lập hoàn toàn với khách hàng bên ngoài và tích hợp trường Role phục vụ phân quyền hệ thống	21
Hình 15.Giao diện tài liệu hóa Web API tự động bằng Swagger UI, thể hiện sự hoàn thiện của các endpoints kết nối giữa Backend và Frontend.	23
Hình 16.Cấu trúc Solution phân tách thành 2 tầng kiến trúc rõ rệt: CMS.Data (Tầng dữ liệu) và CMS.Backend (Tầng API & MVC)	24
Hình 17. Cấu hình chuỗi kết nối Database trong appsettings.json và thư mục Migrations lưu vết kịch bản khởi tạo CSDL	25
Hình 18.Triển khai mã nguồn ProductsController áp dụng Dependency Injection và Attribute [HttpGet] để xây dựng RESTful API trả về dữ liệu JSON.	26
Hình 19.Tích hợp thư viện BCrypt.Net để băm mật khẩu một chiều và triển khai cơ chế phân quyền Role-Based Authorization [Authorize(Roles = "Admin")].	28
Hình 20.Giao diện thêm mới Bài viết (Post) được tích hợp công cụ CKEditor và nút Upload ảnh đại diện trực tiếp lên Server.	29
Hình 21.Khai báo và kích hoạt chính sách CORS ('AllowReactApp') trong cấu hình vòng đời ứng dụng Program.cs để kết nối với ReactJS.	30
Hình 22.Dashboard quản lý	31
Hình 23.Giao diện bảng điều khiển quản trị cung cấp đầy đủ các tác vụ nghiệp vụ quản lý sản phẩm, đơn hàng và nội dung bài viết dành cho nhân viên vận hành doanh nghiệp.	32
Hình 24.Giao diện Swagger UI cho phép lập trình viên tra cứu cấu trúc dữ liệu JSON và thử nghiệm (Test) gọi API trực tiếp ngay trên trình duyệt	33
Hình 25. Cấu trúc bộ định tuyến React Router DOM bên trong App.js giúp điều phối các trang giao diện theo mô hình Single Page Application (SPA)	34
Hình 26.Khởi tạo trục kết nối mạng axiosClient kết hợp cơ chế Interceptor bóc tách cấu trúc dữ liệu JSON phản hồi từ Backend.	35
Hình 27.Kỹ thuật bóc tách và lắp ghép các Component độc lập (Header, HeroBanner, ProductGrid...) bên trong cấu trúc Trang chủ Home.jsx.	36
Hình 28.Giao diện trang Cửa hàng (Shop) tích hợp thanh tìm kiếm thời gian thực và bộ lọc đa điều kiện theo danh mục, khoảng giá.	37
Hình 29. Sử dụng thuộc tính dangerouslySetInnerHTML để biên dịch trực tiếp chuỗi HTML được sinh ra từ công cụ soạn thảo CKEditor	38
Hình 30.Lịch sử mua hàng	39
Hình 31.Đặt hàng thành công	40
Hình 32.Hệ thống tự động chặn và chuyển hướng về trang đăng nhập ThaoCMS.	41
Hình 33.Đăng nhập thành công với quyền Admin và truy cập trang quản lý thành viên	42
Hình 34.Giao diện quản trị của tài khoản vai trò Editor.	43
Hình 35.Cảnh báo lỗi vượt quá số lượng tồn kho ở giao diện chi tiết sản phẩm	44
Hình 36.Theo dõi các truy vấn API ngầm trả về định dạng dữ liệu JSON trên Tab Network (F12).	45
Hình 37.Giao diện thử nghiệm và mô tả tài liệu API Swagger	46
 
DANH MỤC BẢNG BIỂU
Bảng 1.Bảng khách hàng	9
Bảng 2.Order (Đơn hàng)	10
Bảng 3.OrderDetail (Chi tiết đơn hàng)	11
Bảng 4.Product (Sản phẩm)	11
Bảng 5.CategoryProduct (Loại sản phẩm)	12
Bảng 6.Post (Bài viết/Tin tức)	12
Bảng 7.Category (Danh mục tin tức)	13
Bảng 8.About (Phân khu giới thiệu)	13
 CHƯƠNG 1: TỔNG QUAN VỀ ĐỀ TÀI VÀ CƠ SỞ LÝ THUYẾT
1.1.	Lý do chọn đề tài (Bối cảnh chuyển đổi số và thương mại điện tử)
Cuộc cách mạng công nghiệp lần thứ tư (Cách mạng 4.0) đang diễn ra mạnh mẽ trên quy mô toàn cầu, thúc đẩy sự hội tụ của các công nghệ đột phá như Trí tuệ nhân tạo (AI), Điện toán đám mây (Cloud Computing), Dữ liệu lớn (Big Data) và Internet vạn vật (IoT). Trong xu thế đó, "Chuyển đổi số" (Digital Transformation) không còn là một lựa chọn mang tính xu hướng, mà đã trở thành yếu tố sống còn quyết định sự tồn tại và phát triển của mọi doanh nghiệp. Chuyển đổi số giúp tái cấu trúc quy trình vận hành, tối ưu hóa nguồn lực nhân sự, giảm thiểu chi phí quản lý và nâng cao năng lực cạnh tranh trên thị trường. Đặc biệt, đối với ngành dịch vụ ăn uống và bán lẻ (F&B - Food and Beverage), việc ứng dụng công nghệ số hóa vào quy trình quản lý thông tin, tương tác và chăm sóc khách hàng đang trở thành thước đo cho sự phát triển bền vững của doanh nghiệp.
1.2. Mục tiêu của đồ án
Mục tiêu tổng quát của đồ án là nghiên cứu, thiết kế và xây dựng hoàn chỉnh hệ thống ThaoCMS – một hệ sinh thái ứng dụng Web khép kín bao gồm: Hệ quản trị nội dung BackEnd (Headless CMS) phát triển bằng ASP.NET Core Web API / MVC và Kênh tương tác mua sắm FrontEnd (Single Page Application - SPA) phát triển bằng ReactJS. Hệ thống hướng tới việc hỗ trợ chuỗi cửa hàng kinh doanh đồ uống (áp dụng trực tiếp cho mô hình Highlands Coffee) tối ưu hóa quy trình truyền thông thương hiệu, quản trị nội dung số và tự động hóa quy trình tiếp nhận, xử lý đơn đặt hàng trực tuyến từ khách hàng.
1.3. Đối tượng và phạm vi nghiên cứu
Đề tài tập trung nghiên cứu các công nghệ phát triển Web Full-stack hiện đại bao gồm framework ASP.NET Core (Web API / MVC) ở phía máy chủ (BackEnd) kết hợp hệ quản trị cơ sở dữ liệu SQL Server, và thư viện ReactJS ở phía máy khách (FrontEnd).
Phạm vi thực tiễn của đồ án giới hạn trong việc xây dựng hệ thống quản lý nội dung và đặt hàng trực tuyến ThaoCMS (áp dụng thực nghiệm cho chuỗi Highlands Coffee) vận hành trên môi trường cục bộ (Localhost). Hệ thống tập trung giải quyết các tính năng cốt lõi bao gồm:
•	Về phía khách hàng: Tìm kiếm sản phẩm, quản lý giỏ hàng, đặt hàng trực tuyến, đăng ký/đăng nhập thành viên, quản lý hồ sơ cá nhân, xem lịch sử đơn hàng có kèm ảnh và nhận email tự động (xác nhận đơn hàng và mã OTP khôi phục mật khẩu).
•	Về phía quản trị viên: Quản lý vòng đời dữ liệu (CRUD) của sản phẩm, danh mục, bài viết, banner quảng cáo, thực đơn giới thiệu; kiểm soát số lượng thành viên; theo dõi chi tiết đơn hàng kèm ảnh sản phẩm và duyệt nhanh trạng thái đơn hàng trực tiếp bằng thanh tùy chọn Dropdown.
Đồ án không đi sâu vào việc tích hợp các cổng thanh toán điện tử trực tiếp, định vị shipper thời gian thực hay các giải pháp logistics vận chuyển phức tạp.

1.4. Công nghệ áp dụng trong hệ thống
1.4.1. Tổng quan về nền tảng .NET Core và C#
•	Nền tảng .NET Core: .NET Core (hiện nay là .NET 6/7/8) là một nền tảng phát triển phần mềm mã nguồn mở, đa nền tảng (Cross-platform) được duy trì bởi Microsoft và cộng đồng lập trình viên. Khác với phiên bản .NET Framework truyền thống vốn chỉ chạy trên hệ điều hành Windows, .NET Core cho phép ứng dụng khởi chạy mượt mà trên Windows, macOS và Linux. Nền tảng này được thiết kế theo hướng module hóa cực kỳ nhẹ, tối ưu hóa bộ nhớ và sở hữu hiệu năng xử lý request thuộc nhóm hàng đầu thế giới (thông qua máy chủ web Kestrel tích hợp). Điểm mạnh của .NET Core là hỗ trợ mạnh mẽ cơ chế Tiêm phụ thuộc (Dependency Injection - DI) mặc định, giúp xây dựng mã nguồn dễ bảo trì và kiểm thử.
•	Ngôn ngữ C#: C# là ngôn ngữ lập trình hướng đối tượng (OOP) mạnh mẽ, an toàn kiểu dữ liệu (Type-safe) được phát triển bởi Microsoft. C# kết hợp sức mạnh của C++ cùng tính dễ dùng của Java. Trong môi trường .NET Core, C# cung cấp cú pháp hiện đại, hỗ trợ lập trình bất đồng bộ (Asynchronous Programming) cực kỳ mạnh mẽ thông qua bộ từ khóa async / await giúp tối ưu hóa luồng xử lý và nâng cao hiệu năng chịu tải của hệ thống.
1.4.2. Thư viện ReactJS và kiến trúc ứng dụng một trang (SPA)
•	Thư viện ReactJS: ReactJS là một thư viện mã nguồn mở viết bằng JavaScript được phát triển bởi Facebook (Meta) chuyên dùng để xây dựng giao diện người dùng (UI) tương tác cao. ReactJS hoạt động dựa trên triết lý thiết kế thành phần (Component-based architecture), cho phép chia nhỏ giao diện thành các phần độc lập, dễ tái sử dụng và quản lý. Công nghệ cốt lõi giúp ReactJS vượt trội về tốc độ là Virtual DOM (DOM ảo). Khi trạng thái (State) của ứng dụng thay đổi, React sẽ tính toán sự khác biệt trên DOM ảo trước, sau đó chỉ cập nhật phần nhỏ thực sự thay đổi trên DOM thực của trình duyệt, giúp tránh hiện tượng tải lại toàn bộ trang (Hard-reload) và đem lại trải nghiệm mượt mà cho người dùng.
•	Kiến trúc ứng dụng một trang (Single Page Application - SPA): Khác với mô hình Multi Page truyền thống (mỗi lần bấm link là một lần tải lại trang từ server), SPA chỉ tải đúng một trang HTML duy nhất từ đầu. Mọi tương tác chuyển trang tiếp theo đều được xử lý cục bộ thông qua cơ chế Client-side Routing (sử dụng thư viện react-router-dom). Dữ liệu được nạp động ngầm bằng cách gọi các API bất đồng bộ (sử dụng Axios) giúp giao diện phản hồi tức thì như một ứng dụng di động cài trên máy.
1.4.3. Hệ quản trị cơ sở dữ liệu SQL Server và Entity Framework Core
•	Biến và có độ tin cậy cực cao đối với các ứng dụng doanh nghiệp. SQL Server cung cấp khả năng bảo mật dữ liệu tối ưu, quản lý giao dịch an toàn nhờ tuân thủ nghiêm ngặt các thuộc tính ACID (Atomicity, Consistency, Isolation, Durability), hỗ trợ tối ưu hóa truy vấn thông qua Indexing và đảm bảo tính toàn vẹn dữ liệu thông qua các ràng buộc khóa ngoại (Foreign Key) chặt chẽ.
•	Entity Framework Core (EF Core): EF Core là một trình ánh xạ đối tượng - quan hệ (ORM - Object-Relational Mapper) mã nguồn mở và nhẹ dành cho .NET Core. Công nghệ này đóng vai trò cầu nối giúp các lập trình viên C# thao tác với cơ sở dữ liệu SQL Server hoàn toàn dưới dạng các đối tượng hướng đối tượng (Object Oriented) mà không cần viết các câu lệnh SQL thuần túy. EF Core hỗ trợ mạnh mẽ cơ chế LINQ (Language Integrated Query) để viết các câu truy vấn dữ liệu trực tiếp trong mã nguồn C# một cách an toàn và nhanh chóng, đồng thời tự động hóa việc theo dõi các thay đổi trạng thái của đối tượng để thực hiện lưu trữ xuống DB.
1.4.4. Kiến trúc Web API (RESTful API) và giao thức truyền tải JSON
•	Kiến trúc Web API (RESTful API): REST (Representational State Transfer) là một kiểu kiến trúc phần mềm tiêu chuẩn để thiết kế các dịch vụ web. Một dịch vụ Web API chuẩn RESTful sử dụng trực tiếp các phương thức HTTP (HTTP Methods) để biểu thị các hành động xử lý tài nguyên cụ thể:
o	GET để đọc/truy vấn dữ liệu (ví dụ: lấy thực đơn thực phẩm).
o	POST để tạo mới dữ liệu (ví dụ: gửi đơn đặt hàng, đăng ký khách hàng).
o	PUT/PATCH để cập nhật dữ liệu.
o	DELETE để xóa dữ liệu. RESTful API giúp hệ thống BackEnd hoàn toàn tách biệt với FrontEnd, cho phép BackEnd chỉ đóng vai trò cung cấp tài nguyên dữ liệu thô, từ đó tăng khả năng phục vụ cho nhiều loại nền tảng Client khác nhau cùng lúc (Web, App di động, IoT).
•	Giao thức truyền tải JSON: JSON (JavaScript Object Notation) là một định dạng dữ liệu văn bản siêu nhẹ, dễ đọc và dễ viết bởi con người, đồng thời cũng dễ phân tích và tạo sinh bởi máy tính. Trong hệ thống ThaoCMS, JSON được chọn làm giao thức truyền tải dữ liệu chuẩn hóa duy nhất giữa máy khách ReactJS và máy chủ ASP.NET Core API nhờ tính tương thích tuyệt đối của nó với tất cả các ngôn ngữ lập trình hiện đại.
 CHƯƠNG 2: PHÂN TÍCH VÀ THIẾT KẾ HỆ THỐNG
2.1. Phân tích yêu cầu chức năng (Luồng nghiệp vụ mua hàng và quản trị)
Phân tích yêu cầu chức năng là bước then chốt nhằm xác định rõ các hành vi, quy trình xử lý dữ liệu và luồng nghiệp vụ mà hệ thống ThaoCMS cần đáp ứng. Hệ thống được chia làm hai phân hệ tương tác độc lập phục vụ cho hai đối tượng tác nhân (Actor) chính: Khách hàng (Customer) và Quản trị viên (Admin).
2.2. Sơ đồ thực thể mối quan hệ (ERD) cho hệ thống 8 thực thể
Hệ thống cơ sở dữ liệu của ThaoCMS được thiết kế chuẩn hóa để tối ưu hóa hiệu năng truy vấn dữ liệu và đảm bảo tính toàn vẹn thông tin. Dưới đây là mô tả chi tiết của 8 thực thể chính cấu thành nên lõi nghiệp vụ của hệ thống:
2.2.1. Danh mục các thực thể chính
•	Customer (Khách hàng): Lưu trữ thông tin định danh của người mua hàng bao gồm Mã khách hàng (PK), Họ tên, Email (độc nhất), Số điện thoại, Địa chỉ giao hàng mặc định và Mật khẩu đăng nhập. 

 

Bảng 1.Bảng khách hàng
•	Order (Đơn hàng): Lưu trữ thông tin tổng quát của giao dịch đặt hàng gồm Mã đơn hàng (PK), Mã khách hàng (FK), Ngày đặt hàng, Trạng thái đơn hàng, Địa chỉ giao hàng, Thời gian mong muốn giao nhận và Ghi chú thêm. 
 
Bảng 2.Order (Đơn hàng)


•	OrderDetail (Chi tiết đơn hàng): Thực thể liên kết đặc tả các sản phẩm nằm trong một đơn hàng gồm Mã chi tiết (PK), Mã đơn hàng (FK), Mã sản phẩm (FK), Số lượng mua và Đơn giá tại thời điểm chốt đơn.

 
Bảng 3.OrderDetail (Chi tiết đơn hàng)
•	Product (Sản phẩm): Lưu trữ danh mục đồ uống bao gồm Mã sản phẩm (PK), Tên sản phẩm, Giá bán, Mô tả sản phẩm, Đường dẫn hình ảnh đại diện và Số lượng tồn kho. 
 
Bảng 4.Product (Sản phẩm)
•	CategoryProduct (Loại sản phẩm): Quản lý việc phân loại nhóm sản phẩm đồ uống bao gồm Mã loại sản phẩm (PK), Tên loại sản phẩm và Mô tả.
 
Bảng 5.CategoryProduct (Loại sản phẩm)
•	Post (Bài viết/Tin tức): Lưu trữ các bài viết truyền thông hoặc tin tức nội bộ gồm Mã bài viết (PK), Tiêu đề bài viết, Nội dung chi tiết, Hình ảnh minh họa, Ngày tạo và Mã danh mục tin tức (FK).
  

Bảng 6.Post (Bài viết/Tin tức)
•	Category (Danh mục tin tức): Phân loại các nhóm bài viết truyền thông bao gồm Mã danh mục (PK), Tên danh mục tin tức và Mô tả chi tiết. 
 
Bảng 7.Category (Danh mục tin tức)
•	About (Bài giới thiệu / Phân khu giới thiệu): Cấu hình động cho nội dung trang câu chuyện thương hiệu gồm Mã phân khu (PK), Tên phân khu, Tiêu đề chính, Tiêu đề phụ, Nội dung văn bản giới thiệu và Đường dẫn ảnh minh họa.
 
Bảng 8.About (Phân khu giới thiệu)

 2.2.2. Sơ đồ quan hệ thực thể (ERD Diagram)
Mối quan hệ giữa các thực thể được đặc tả qua sơ đồ thực thể liên kết dưới đây:

 
Hình 9.Sơ đồ quan hệ thực thể (ERD) tự động sinh từ SQL Server Management Studio.
2.2.3. Quy tắc ràng buộc quan hệ
•	Quan hệ Customer - Order (1 - Nhiều): Một khách hàng có thể đặt nhiều đơn hàng khác nhau, nhưng một đơn hàng chỉ thuộc về một khách hàng duy nhất.
•	Quan hệ Order - OrderDetail (1 - Nhiều): Một đơn hàng chứa nhiều chi tiết sản phẩm mua khác nhau. Khi xóa một đơn hàng, hệ thống kích hoạt cơ chế xóa bắc cầu (Cascade Delete) để tự động xóa sạch các chi tiết đơn hàng tương ứng.
•	Quan hệ Product - OrderDetail (1 - Nhiều): Một sản phẩm có thể xuất hiện ở nhiều đơn hàng của nhiều khách hàng khác nhau.
•	Quan hệ CategoryProduct - Product (1 - Nhiều): Một loại sản phẩm (như Trà, Cà phê, Freeze) chứa nhiều sản phẩm khác nhau.
•	Quan hệ Category - Post (1 - Nhiều): Một danh mục tin tức (như Tin khuyến mãi, Tuyển dụng) chứa nhiều bài viết khác nhau.



2.3. Chi tiết thiết kế cơ sở dữ liệu (Database Schema)
 
Hình 10.Database Schema
Dựa trên sơ đồ quan hệ thực thể (ERD) đã phân tích, hệ thống Cơ sở dữ liệu vật lý (Physical Database) của ứng dụng ThaoCMS được khởi tạo trực tiếp trên hệ quản trị Microsoft SQL Server. Nhóm phát triển đã áp dụng quy trình Code-First thông qua công nghệ Entity Framework Core (EF Core). Phương pháp này cho phép thiết kế toàn bộ cấu trúc bảng thông qua các file Class bằng ngôn ngữ C#, sau đó tự động sử dụng công cụ Migrations để dịch ngược và sinh ra các bảng (Tables) tương ứng trong SQL Server.
Cơ sở dữ liệu của hệ thống được bóc tách thành 2 phân hệ (Modules) cốt lõi, hoạt động gắn kết với nhau thông qua hệ thống Khóa ngoại (Foreign Keys):
a. Phân hệ Quản trị nội dung và Giao diện (CMS Module) Phân hệ này đảm nhận vai trò cung cấp dữ liệu động cho bề mặt Website ReactJS, loại bỏ hoàn toàn việc hardcode văn bản. Phân hệ bao gồm:
•	Bảng Posts và Categories: Quản lý trung tâm tin tức và bài báo. Mỗi danh mục (Category) có thể chứa nhiều bài viết (Post). Trường nội dung của bài viết được thiết kế dạng nvarchar(max) để lưu trữ an toàn các mã HTML phức tạp sinh ra từ Rich Text Editor (CKEditor).
•	Bảng Banners, Menus, Abouts: Quản lý các cấu hình hiển thị, cho phép người quản trị thay đổi hình ảnh Slider trang chủ, thanh điều hướng (Navigation bar) và câu chuyện thương hiệu mà không cần can thiệp vào mã nguồn Frontend.
b. Phân hệ Thương mại Điện tử (E-Commerce Module) Đây là xương sống của đồ án, xử lý toàn bộ quy trình mua bán và lưu vết dữ liệu khách hàng một cách chặt chẽ:
•	Bảng Products và CategoriesProducts: Quản lý kho hàng. Bảng Products được thiết kế chặt chẽ với trường Price mang kiểu dữ liệu decimal nhằm tính toán dòng tiền không bị sai số, kết hợp với trường StockQuantity (kiểu int) đóng vai trò kiểm soát số lượng tồn kho theo thời gian thực.
•	Bảng Customers: Lưu trữ hồ sơ định danh của người mua hàng. Nhằm đảm bảo an toàn thông tin theo chuẩn OWASP, mật khẩu của người dùng không được lưu dưới dạng văn bản thô (Plain-text) mà được mã hóa một chiều thông qua thuật toán BCrypt trước khi ghi vào Database.
•	Bảng Orders và OrderDetails: Giải quyết bài toán giỏ hàng và thanh toán. Một khách hàng (Customer) có thể có nhiều Đơn hàng (Orders), và một Đơn hàng có thể chứa nhiều Chi tiết hóa đơn (OrderDetails).
c. Cơ chế Ràng buộc Dữ liệu (Constraints & Cascade Delete) Để đảm bảo tính toàn vẹn dữ liệu (Data Integrity) trong quá trình vận hành, hệ thống CSDL được thiết lập các ràng buộc nghiêm ngặt:
•	Các trường bắt buộc (như Tên sản phẩm, Email, Mã khách hàng) đều được giới hạn NOT NULL.
•	Cơ chế Xóa bắc cầu (Cascade Delete) được thiết lập tự động bởi EF Core: Trong trường hợp Quản trị viên xóa một Đơn hàng (Order), toàn bộ danh sách các sản phẩm nằm bên trong hóa đơn đó (OrderDetails) sẽ tự động bị xóa sạch khỏi cơ sở dữ liệu để ngăn chặn hiện tượng dữ liệu rác (Orphan Data).
2.3.1. Phân hệ nội dung tin tức (Category, Post)
Phân hệ nội dung tin tức được thiết kế với hai bảng dữ liệu chính là Categories (Danh mục) và Posts (Bài viết), gắn kết với nhau theo mối quan hệ Một - Nhiều (1:N). Nghĩa là một danh mục (ví dụ: Tin khuyến mãi) có thể chứa nhiều bài viết khác nhau, nhưng mỗi bài viết chỉ được phân loại vào một danh mục duy nhất.
a. Bảng Categories (Danh mục): Đóng vai trò là bảng cha, lưu trữ phân loại tin tức. Bảng sử dụng khóa chính (Primary Key) là trường Id tự động tăng. Các trường Name (Tên danh mục) và Description (Mô tả) được thiết lập kiểu dữ liệu nvarchar(max) giúp lưu trữ văn bản độ dài lớn và hỗ trợ tốt bảng mã Unicode tiếng Việt.
b. Bảng Posts (Bài viết): Đóng vai trò là bảng con. Ngoài các trường cơ bản như Title (Tiêu đề) và CreatedDate (Ngày tạo), bảng thiết lập cấu trúc đặc thù với trường Content dùng để lưu trữ toàn bộ nội dung mã HTML sinh ra từ bộ soạn thảo Rich Text Editor. Đặc biệt, bảng có chứa trường Khóa ngoại (Foreign Key) là CategoryId, liên kết trực tiếp tới bảng Categories. Khóa ngoại này được thiết lập cơ chế Cascade Delete, đảm bảo nếu một danh mục bị xóa, toàn bộ các bài báo thuộc danh mục đó cũng sẽ được dọn sạch để đảm bảo tính toàn vẹn dữ liệu.
 
Hình 11.Cấu trúc các trường dữ liệu và kiểu dữ liệu (Data Type) của bảng Posts và Categories trong SQL Server.
2.3.2. Phân hệ bán hàng E-Commerce (CategoryProduct, Product)
Phân hệ bán hàng là hạt nhân cốt lõi của tính năng E-Commerce trong hệ thống ThaoCMS. Cấu trúc lưu trữ sản phẩm được bóc tách thành hai bảng chính là CategoryProducts (Loại sản phẩm) và Products (Sản phẩm), được thiết kế chặt chẽ theo mối quan hệ Một - Nhiều (1:N).
a. Bảng CategoryProducts (Loại sản phẩm): Đóng vai trò phân cụm các mặt hàng kinh doanh (ví dụ: Cà phê, Trà, Bánh ngọt). Bảng lưu trữ tên loại sản phẩm (Name) và đường dẫn hình ảnh đại diện (ImageUrl) dưới định dạng chuỗi nvarchar(max) để linh hoạt tích hợp với các hệ thống lưu trữ ảnh bên ngoài.
b. Bảng Products (Sản phẩm): Được thiết kế đặc biệt chặt chẽ để phục vụ tính toán tài chính và nghiệp vụ kho hàng. Các cột lưu trữ giá trị tiền tệ như Price (Giá gốc) và SalePrice (Giá khuyến mãi) được áp dụng kiểu dữ liệu decimal(18,2) nhằm loại bỏ sai số thập phân trong quá trình tính toán tổng tiền thanh toán. Cột StockQuantity (Số lượng tồn kho) sử dụng kiểu int, cho phép hệ thống tự động trừ kho ngay lập tức khi phát sinh giao dịch đặt hàng thành công. Ngoài ra, khóa ngoại CategoryProductId được liên kết chặt chẽ với bảng CategoryProducts để phân loại sản phẩm.
 
Hình 12.Cấu trúc chi tiết các trường dữ liệu và kiểu dữ liệu của bảng Products và CategoryProducts, chú trọng tối ưu kiểu decimal cho tính toán giá thành
2.3.3. Phân hệ khách hàng và đơn hàng (Customer, Order, OrderDetail)
Phân hệ khách hàng và đơn hàng là cụm thực thể giải quyết bài toán giao dịch điện tử, gồm 3 bảng Customers, Orders và OrderDetails được liên kết vòng với nhau thông qua hệ thống Khóa ngoại (Foreign Keys).
a. Bảng Customers (Khách hàng): Bảng này lưu trữ toàn bộ thông tin định danh của người dùng. Điểm nhấn trong thiết kế bảo mật của hệ thống nằm ở trường Password (Mật khẩu). Cột này sử dụng kiểu nvarchar(max) để đáp ứng đủ độ dài chuỗi hash sinh ra từ thuật toán băm mật khẩu BCrypt, bảo vệ tuyệt đối dữ liệu người dùng khỏi các cuộc tấn công đánh cắp cơ sở dữ liệu.
b. Bảng Orders (Đơn hàng): Liên kết với bảng Customers theo quan hệ 1:N (Một khách hàng có nhiều đơn hàng). Bảng Orders tập trung lưu vết quá trình mua hàng với các trường dữ liệu quan trọng như OrderDate (thời điểm đặt hàng) và Status (trạng thái đơn - sử dụng kiểu int để phân loại: Chờ duyệt, Đang giao, Hoàn tất).

c. Bảng OrderDetails (Chi tiết đơn hàng): Đây là bảng trung gian liên kết (N:M) hóa giải sự phụ thuộc giữa Đơn hàng và Sản phẩm. Bảng được thiết kế với tư duy lưu giữ "ảnh chụp chớp nhoáng" (Snapshot) của giao dịch. Cụ thể, trường UnitPrice (Đơn giá) được tách riêng và thiết lập kiểu decimal ngay tại thời điểm chốt đơn. Nhờ vậy, dù trong tương lai giá gốc của sản phẩm (Products.Price) có bị thay đổi, lịch sử tính toán tổng tiền của hóa đơn cũ vẫn luôn chính xác tuyệt đối. Hệ thống cũng áp dụng cơ chế Cascade Delete từ bảng Orders xuống OrderDetails để tự động thu gom dữ liệu rác khi đơn hàng bị hủy bỏ.

 
Hình 13.Cấu trúc dữ liệu của phân hệ Đơn hàng. Bảng OrderDetails lưu trữ UnitPrice độc lập để đảm bảo tính toàn vẹn dữ liệu lịch sử giao dịch
2.3.4. Phân hệ tài khoản quản trị và phân quyền (User)
Phân hệ cuối cùng nhưng không kém phần quan trọng là quản lý danh tính nội bộ, được triển khai độc lập thông qua bảng Users (Tài khoản Quản trị).
Khác với bảng Customers phục vụ cho giao dịch bên ngoài, bảng Users được phân lập hoàn toàn nhằm ngăn chặn nguy cơ leo thang đặc quyền (Privilege Escalation). Bảng lưu trữ Username và FullName để nhận diện, trong đó trường PasswordHash tiếp tục được áp dụng chuẩn băm mật khẩu bảo mật cao để lưu trữ.
Đặc biệt, bảng Users được thiết kế thêm trường Role (Vai trò) kiểu nvarchar. Trường này là cơ sở dữ liệu nền tảng để hệ thống ASP.NET Core kích hoạt Middleware Role-Based Access Control (RBAC). Nhờ có trường Role, hệ thống có thể dễ dàng chặn các biên tập viên bình thường truy cập vào các module nhạy cảm (như bảng điều khiển thành viên hay doanh thu) vốn chỉ dành riêng cho quyền Admin.

 
Hình 14.Cấu trúc bảng Users, phân lập hoàn toàn với khách hàng bên ngoài và tích hợp trường Role phục vụ phân quyền hệ thống
2.4. Thiết kế danh mục Web API giữa Backend và Frontend
Để đáp ứng mô hình kiến trúc phân tán giữa Client (ReactJS) và Server (ASP.NET Core), đồ án đã thiết kế và xây dựng một hệ thống RESTful Web API hoàn chỉnh. Toàn bộ các luồng giao tiếp dữ liệu đều tuân thủ chặt chẽ các tiêu chuẩn HTTP Methods (GET, POST) và định dạng dữ liệu truyền tải là JSON.
Hệ thống Backend đã mở chính sách bảo mật CORS (Cross-Origin Resource Sharing) thông qua cấu hình AllowReactApp, cho phép các yêu cầu (requests) hợp lệ từ cổng http://localhost:3000 của Frontend đi qua tường lửa của Backend.
Dưới đây là bảng danh mục các Web API cốt lõi đã được xây dựng để phục vụ các chức năng chính của giao diện khách hàng:

Nhóm chức năng	HTTP Method	Endpoint (Đường dẫn API)	Mô tả chi tiết chức năng
Sản phẩm	GET	/api/Products	Lấy danh sách toàn bộ sản phẩm (hỗ trợ phân trang và lọc giá).
	GET	/api/Products/category/{id}	Lọc và trả về danh sách sản phẩm thuộc một danh mục cụ thể.
	GET	/api/Products/sale	Lấy danh sách các sản phẩm đang có chương trình giảm giá.
	GET	/api/Products/{id}	Lấy thông tin chi tiết (giá, ảnh, mô tả, tồn kho) của 1 sản phẩm.
Đơn hàng	POST	/api/Orders	Tiếp nhận gói dữ liệu JSON từ Giỏ hàng (Cart) xuống để lập hóa đơn.
Xác thực	POST	/api/Auth/CustomerRegister	Khởi tạo tài khoản khách hàng mới và băm mật khẩu.
	POST	/api/Auth/CustomerLogin	Kiểm tra thông tin đăng nhập và trả về đối tượng Customer nếu hợp lệ.
Tin tức	GET	/api/Posts	Lấy danh sách các bài viết truyền thông.
	GET	/api/Posts/latest	Trích xuất nhanh 3 bài viết mới nhất hiển thị ra trang chủ.
Cấu hình UI	GET	/api/Banners	Cung cấp danh sách hình ảnh để ReactJS chạy hiệu ứng Slider trang chủ.

Việc bóc tách rõ ràng các API này giúp Frontend chỉ tập trung vào việc xử lý giao diện người dùng (UI/UX), trong khi mọi nghiệp vụ tính toán nặng nề (như trừ số lượng tồn kho hay kiểm tra bảo mật) đều được gói gọn tại Backend.

 
Hình 15.Giao diện tài liệu hóa Web API tự động bằng Swagger UI, thể hiện sự hoàn thiện của các endpoints kết nối giữa Backend và Frontend.
 CHƯƠNG 3: TRIỂN KHAI PHẦN BACKEND (C# ASP.NET CORE WEB API)
3.1. Cấu trúc Solution và phân tách các tầng kiến trúc
Hệ thống Backend của ThaoCMS được xây dựng dựa trên nền tảng .NET Core (ngôn ngữ C#). Nhằm đáp ứng khả năng mở rộng (Scalability) và dễ dàng bảo trì trong tương lai, đồ án không viết tất cả mã nguồn vào một dự án duy nhất mà áp dụng nguyên lý Kiến trúc đa tầng (N-Tier Architecture).
Toàn bộ Solution được phân tách rạch ròi thành 2 dự án (Projects) đóng vai trò là 2 tầng kiến trúc khác nhau:
a. Tầng Truy cập Dữ liệu (Data Access Layer) - Project CMS.Data: Đây là tầng giao tiếp trực tiếp với cơ sở dữ liệu SQL Server. Tầng này được thiết kế độc lập, chứa toàn bộ các lớp thực thể (Entities) đại diện cho các bảng dữ liệu, và file cấu hình trung tâm ApplicationDbContext. Việc cô lập tầng Data giúp tách biệt hoàn toàn logic CSDL khỏi các logic xử lý nghiệp vụ hay giao diện, tuân thủ nguyên lý Separation of Concerns (SoC).
b. Tầng Nghiệp vụ và Giao diện (Business & Presentation Layer) - Project CMS.Backend: Tầng này kế thừa tầng CMS.Data (thông qua Project Reference). Project này đảm nhận 2 trọng trách song song (Mô hình lai - Hybrid):
•	Hệ thống Web API (Controllers/Api): Xây dựng các RESTful Endpoints để tiếp nhận và trả dữ liệu định dạng JSON cho ứng dụng Frontend ReactJS bên ngoài.
•	Giao diện Quản trị Admin (Views & Controllers/Mvc): Áp dụng mô hình MVC (Model-View-Controller) truyền thống kết hợp Razor Engine để sinh ra giao diện web tĩnh, cung cấp không gian thao tác an toàn (đã được bảo vệ bằng middleware [Authorize]) dành riêng cho quản trị viên hệ thống.

 
Hình 16.Cấu trúc Solution phân tách thành 2 tầng kiến trúc rõ rệt: CMS.Data (Tầng dữ liệu) và CMS.Backend (Tầng API & MVC)
3.2. Khởi tạo Cơ sở dữ liệu và Migration dữ liệu mẫu (Seed Data)
Quá trình khởi tạo cơ sở dữ liệu được thực hiện hoàn toàn tự động thông qua cơ chế Code-First của Entity Framework Core. Thay vì phải viết các câu lệnh SQL truyền thống một cách thủ công, hệ thống sử dụng file ApplicationDbContext làm cầu nối trung tâm để khai báo các DbSet<> đại diện cho các thực thể.
a. Thiết lập chuỗi kết nối (Connection String): Để Backend có thể "giao tiếp" được với hệ quản trị CSDL, chuỗi kết nối được khai báo bảo mật bên trong file cấu hình appsettings.json với từ khóa DefaultConnection. Chuỗi này trỏ trực tiếp đến máy chủ SQL Server Local và chỉ định rõ tên Database sẽ được khởi tạo là ThanhThaoCMS_DB.
b. Thực thi Migrations: Sau khi hoàn tất việc thiết kế các lớp thực thể (Entities) và cấu hình chuỗi kết nối, công cụ Package Manager Console (PMC) được sử dụng để tiến hành phiên dịch mã nguồn thông qua 2 câu lệnh cốt lõi:
Add-Migration InitialCreate: Quét toàn bộ mã nguồn và tạo ra bản nháp kịch bản (script) sinh bảng.
•	Update-Database: Chính thức thực thi kịch bản, ra lệnh cho SQL Server tự động tạo Database, xây dựng các bảng dữ liệu (Tables) và thiết lập các khóa ngoại (Foreign Keys) chính xác tuyệt đối theo thiết kế.
•	Ngay sau khi Database được khởi tạo thành công, một lượng dữ liệu mẫu (Seed Data / Dummy Data) ban đầu như danh sách người dùng quản trị, phân loại danh mục và các sản phẩm tiêu biểu được nạp vào hệ thống. Việc này giúp đảm bảo Website Frontend và các API có sẵn luồng dữ liệu thô để kiểm thử ngay lập tức mà không gặp hiện tượng trang trắng (Blank Page).

  
Hình 17. Cấu hình chuỗi kết nối Database trong appsettings.json và thư mục Migrations lưu vết kịch bản khởi tạo CSDL
3.3. Xây dựng các Controllers xử lý API dữ liệu (GET/POST/PUT)
Để Frontend ReactJS có thể giao tiếp và truy xuất dữ liệu từ SQL Server, hệ thống Backend được thiết kế một lớp trung gian chuyên biệt gọi là Web API Controllers. Khác với các Controller MVC truyền thống trả về giao diện HTML tĩnh, các Controller này được đánh dấu bằng Attribute [ApiController] và trả về ròng dữ liệu định dạng JSON.
Quá trình xử lý API được diễn ra theo nguyên lý tiêm phụ thuộc (Dependency Injection - DI). Thông qua hàm tạo (Constructor), đối tượng ApplicationDbContext được tiêm vào bộ nhớ của Controller, cho phép các hàm xử lý gọi lệnh LINQ truy vấn trực tiếp xuống Database.
Cấu trúc API được phân chia chặt chẽ theo các phương thức HTTP tiêu chuẩn (HTTP Methods):
•	GET Requests ([HttpGet]): Được sử dụng rộng rãi trong ProductsController, PostsController hay BannersController để trích xuất dữ liệu. Các hàm này được kết hợp với kỹ thuật phân trang (Pagination), lọc điều kiện .Where(), và sắp xếp .OrderByDescending() để tối ưu hóa khối lượng dữ liệu JSON gửi qua mạng, đảm bảo Website load nhanh chóng.
•	POST Requests ([HttpPost]): Nhận dữ liệu do người dùng nộp lên. Tiêu biểu nhất là OrdersController (xử lý đơn hàng) và AuthController (xác thực khách hàng). Đặc biệt tại hàm tạo Đơn hàng, dữ liệu Body được ánh xạ tự động vào các đối tượng DTO (Data Transfer Object). Quá trình này được bọc trong các khối try...catch và hệ thống Transaction (BeginTransactionAsync). Nhờ đó, nếu kho hàng không đủ số lượng hoặc có lỗi mạng, Backend sẽ lập tức kích hoạt cơ chế Rollback (hoàn tác dữ liệu) và trả về HTTP Status Code 400 BadRequest hoặc 500 Internal Server Error, tránh hiện tượng rác dữ liệu. 

 
Hình 18.Triển khai mã nguồn ProductsController áp dụng Dependency Injection và Attribute [HttpGet] để xây dựng RESTful API trả về dữ liệu JSON.
3.4. Triển khai phân hệ bảo mật, mã hóa mật khẩu và phân quyền (Authentication & Authorization)
Vấn đề an toàn thông tin (Security) là một trong những ưu tiên hàng đầu của hệ thống ThaoCMS. Để bảo vệ dữ liệu nội bộ và thông tin định danh của khách hàng, đồ án đã triển khai đồng bộ ba lớp bảo vệ: Mã hóa dữ liệu (Hashing), Xác thực danh tính (Authentication) và Phân quyền truy cập (Authorization).
a. Mã hóa mật khẩu bảo mật một chiều (Password Hashing): Hệ thống tuyệt đối không lưu trữ mật khẩu dưới dạng văn bản thô (Plain-text). Thay vào đó, thư viện bảo mật mã nguồn mở BCrypt.Net được tích hợp vào hệ thống. Trong quá trình khách hàng Đăng ký (Register) hoặc Quản trị viên cấp tài khoản mới, chuỗi mật khẩu sẽ được băm (Hash) kèm theo muối ngẫu nhiên (Salt) sinh ra bởi thuật toán BCrypt. Quá trình Đăng nhập (Login) cũng sử dụng hàm BCrypt.Verify() để so khớp dữ liệu, chặn đứng hoàn toàn nguy cơ rò rỉ mật khẩu ngay cả khi máy chủ cơ sở dữ liệu bị Hacker tấn công sao chép.
b. Xác thực danh tính (Authentication) qua Cookie: Ở phân hệ Quản trị Admin, hệ thống sử dụng cơ chế bảo mật Cookie Authentication cốt lõi của ASP.NET Core. Khi quản trị viên đăng nhập thành công, một gói dữ liệu bảo mật (Claims) chứa thông tin Username, FullName và Role sẽ được mã hóa và nhúng vào Cookie của trình duyệt. Cơ chế này tự động kiểm soát vòng đời phiên làm việc (Session) và giải phóng bộ nhớ an toàn thông qua hàm SignOutAsync khi người dùng nhấn Đăng xuất.
c. Phân quyền truy cập theo vai trò (Role-Based Authorization): Để kiểm soát chặt chẽ khu vực Admin, thuộc tính [Authorize] được gắn lên toàn bộ các Controller cấu thành giao diện quản trị. Người dùng chưa đăng nhập sẽ lập tức bị đá văng về trang Login. Nâng cao hơn, đồ án tích hợp mô hình phân quyền RBAC (Role-Based Access Control) thông qua thuộc tính [Authorize(Roles = "Admin")]. Cơ chế này được áp dụng nghiêm ngặt trên UserController (Quản lý thành viên), đảm bảo chỉ những tài khoản cấp cao nhất mới có quyền thêm, sửa, xóa các đặc quyền nội bộ.

 

 
Hình 19.Tích hợp thư viện BCrypt.Net để băm mật khẩu một chiều và triển khai cơ chế phân quyền Role-Based Authorization [Authorize(Roles = "Admin")].
3.5. Tích hợp công cụ soạn thảo Rich Text (CKEditor) và cơ chế Upload ảnh vật lý
Nhằm mang lại trải nghiệm tối ưu cho Quản trị viên (Admin) trong việc biên tập nội dung, phân hệ Quản trị đã được nâng cấp mạnh mẽ thông qua hai kỹ thuật: tích hợp trình soạn thảo Rich Text và cơ chế xử lý tệp tin vật lý (Physical File Upload).
a. Tích hợp Rich Text Editor (CKEditor): Thay vì sử dụng thẻ <textarea> truyền thống rất hạn chế trong việc định dạng văn bản, hệ thống đã nhúng mã nguồn mở CKEditor 5 vào các View tạo mới và chỉnh sửa bài viết (Create.cshtml và Edit.cshtml). Công cụ này cung cấp giao diện trực quan (WYSIWYG - What You See Is What You Get), cho phép Admin dễ dàng bôi đậm, in nghiêng, chèn bảng biểu hoặc căn lề. Dữ liệu đầu ra của CKEditor là một chuỗi mã HTML phức tạp, được lưu trữ an toàn vào trường Content của Database. Khi hiển thị ra Frontend, chuỗi này được phân giải bằng hàm Html.Raw() để phục hồi nguyên vẹn định dạng ban đầu.
b. Cơ chế Upload ảnh vật lý (IFormFile): Hệ thống không ép buộc quản trị viên phải đi copy các đường link ảnh (URL) từ bên ngoài một cách thủ công. Thay vào đó, Backend hỗ trợ giao thức tải file trực tiếp từ máy tính lên Server thông qua interface IFormFile của ASP.NET Core. Tại các Controller như PostController hay ProductController, khi tiếp nhận một luồng dữ liệu file (Stream), hệ thống sẽ tự động phát sinh một tên file mới (tránh trùng lặp) và ghi đè trực tiếp (Copy) vào thư mục tĩnh wwwroot/images của Server. Sau đó, đường dẫn tương đối của bức ảnh mới được lưu trữ vào CSDL để phục vụ cho Frontend truy xuất. 
 
Hình 20.Giao diện thêm mới Bài viết (Post) được tích hợp công cụ CKEditor và nút Upload ảnh đại diện trực tiếp lên Server.
3.6. Cấu hình chính sách chia sẻ tài nguyên nguồn gốc chéo (CORS) cho ReactJS
Trong kiến trúc phần mềm tách rời (Decoupled Architecture), Frontend ReactJS thường được chạy trên một cổng độc lập (Port 3000), trong khi Backend ASP.NET Core lắng nghe trên cổng mặc định (Port 7030). Theo cơ chế bảo mật tiêu chuẩn của các trình duyệt Web hiện đại (Same-Origin Policy), mọi yêu cầu truy xuất dữ liệu chéo cổng (Cross-Origin) mặc định sẽ bị chặn đứng để chống lại các cuộc tấn công CSRF (Cross-Site Request Forgery).
Để giải quyết rào cản này và cho phép ReactJS gọi được API, đồ án đã triển khai và kích hoạt chính sách CORS (Cross-Origin Resource Sharing) ngay tại file cấu hình trung tâm Program.cs.
Chính sách CORS được thiết lập với tên gọi AllowReactApp, cấp quyền truy cập công khai và hợp lệ dành riêng cho Domain khởi nguồn từ http://localhost:3000. Cấu hình này không chỉ mở khóa các phương thức HTTP cơ bản (AllowAnyMethod: GET, POST, PUT, DELETE) mà còn cho phép trình duyệt gửi kèm các dữ liệu Header nhạy cảm (AllowAnyHeader) và cấp quyền vận chuyển Cookie/Token xác thực (AllowCredentials) qua lại giữa hai cổng độc lập.
Sau khi khởi tạo tại giai đoạn Build Services, chính sách này được đưa vào Pipeline hệ thống thông qua Middleware app.UseCors("AllowReactApp") được đặt trước các Middleware xác thực, đảm bảo mọi luồng dữ liệu API giao tiếp với ReactJS đều thông suốt tuyệt đối. 
   
Hình 21.Khai báo và kích hoạt chính sách CORS ('AllowReactApp') trong cấu hình vòng đời ứng dụng Program.cs để kết nối với ReactJS.
3.7. Hoàn chỉnh phần quản trị Backend đầy đủ chức năng dành cho nhân viên của cửa hàng/công ty/doanh nghiệp sử dụng.
Vượt ra ngoài khuôn khổ của một máy chủ API xử lý dữ liệu ngầm, phân hệ Backend của dự án đã được phát triển thành một phần mềm Quản trị hệ thống (Admin Dashboard) toàn diện và trực quan. Giao diện này được xây dựng độc lập dựa trên nền tảng kiến trúc MVC (Model-View-Controller) của ASP.NET Core kết hợp sức mạnh của Razor Engine và bộ khung Bootstrap 5 hiện đại.
a. Bảng điều khiển trung tâm (Dashboard) chuyên nghiệp: Giao diện được thiết kế với cấu trúc hai cột kinh điển: Thanh điều hướng đa cấp (Sidebar) bên trái và Không gian thao tác trung tâm (Main Content) bên phải. Khu vực Sidebar được tích hợp cơ chế nhận diện tự động từ bộ lọc Identity: ngay lập tức trích xuất Claims (Họ tên, Vai trò) của nhân viên vừa đăng nhập thành công và hiển thị động lên khu vực cá nhân hóa.
 
Hình 22.Dashboard quản lý
b. Hoàn thiện nghiệp vụ lõi (Core Business Logic): Hệ thống cung cấp đầy đủ công cụ CRUD (Thêm, Xem, Sửa, Xóa) cho toàn bộ 8 thực thể lõi của Cơ sở dữ liệu. Nhân viên của doanh nghiệp được trao toàn quyền để thực hiện các thao tác vận hành hàng ngày:
•	Nhân viên kho/Bán hàng: Quản lý kho sản phẩm, theo dõi và duyệt các đơn đặt hàng mới đổ về từ hệ thống ReactJS.
•	Nhân viên Marketing/Truyền thông: Đăng tải bài viết tin tức mới bằng công cụ soạn thảo chuẩn, cập nhật thay đổi hình ảnh Banner quảng cáo trên trang chủ để kích cầu mua sắm.
•	Quản trị viên cấp cao (Admin): Cấp phát tài khoản phân quyền cho các nhân viên cấp dưới, quản lý danh mục và cấu trúc dữ liệu nền tảng.
Toàn bộ các thao tác thêm/sửa/xóa đều được gắn cơ chế xác thực bảo mật và các thông báo phản hồi (Alerts) thân thiện. Điều này chứng minh hệ thống Backend ThaoCMS hoàn toàn đáp ứng được quy chuẩn vận hành của một quy trình thương mại điện tử thực tế dành cho các doanh nghiệp vừa và nhỏ.

 
 
Hình 23.Giao diện bảng điều khiển quản trị cung cấp đầy đủ các tác vụ nghiệp vụ quản lý sản phẩm, đơn hàng và nội dung bài viết dành cho nhân viên vận hành doanh nghiệp.
3.8. Tài liệu hóa hệ thống API bằng Swagger UI
Trong các dự án phát triển phần mềm hiện đại, việc viết tài liệu hướng dẫn sử dụng API (API Documentation) thủ công thường tốn rất nhiều thời gian và dễ xảy ra sai lệch khi mã nguồn thay đổi. Để khắc phục triệt để vấn đề này, dự án ThaoCMS đã tích hợp thành công nền tảng Swagger UI (thông qua thư viện mã nguồn mở Swashbuckle.AspNetCore).
Bằng cách khai báo dịch vụ builder.Services.AddSwaggerGen() và cấu hình Middleware app.UseSwaggerUI() tại file Program.cs, hệ thống ASP.NET Core sẽ tự động quét (Scan) toàn bộ mã nguồn mỗi khi khởi động. Nó tự động thu thập thông tin từ các Attributes như [HttpGet], [HttpPost], [Route] và bóc tách các tham số truyền vào cũng như kiểu dữ liệu cấu trúc của các DTOs/Entities.
Kết quả sinh ra là một giao diện Web tương tác trực quan (Interactive Documentation). Tại đây, không chỉ các lập trình viên Frontend có thể tra cứu chính xác đường dẫn (URL) và cấu trúc dữ liệu JSON cần thiết để gọi API, mà bản thân người kiểm thử (Tester) cũng có thể trực tiếp nhập dữ liệu và nhấn nút "Try it out" để gửi yêu cầu thực tế xuống Server (Test API) mà không cần phải dùng đến các công cụ bên thứ ba như thư viện Postman. Điều này thể hiện tính chuyên nghiệp và khả năng sẵn sàng tích hợp rất cao của hệ thống Backend.

 
Hình 24.Giao diện Swagger UI cho phép lập trình viên tra cứu cấu trúc dữ liệu JSON và thử nghiệm (Test) gọi API trực tiếp ngay trên trình duyệt
 CHƯƠNG 4: TRIỂN KHAI PHẦN FRONTEND (REACTJS CLIENT SITE)
4.1. Khởi tạo cấu trúc dự án ReactJS và tích hợp React Router DOM
	Phân hệ Frontend dành cho khách hàng được xây dựng hoàn toàn độc lập với Backend, tuân thủ kiến trúc ứng dụng trang đơn (Single Page Application - SPA) dựa trên thư viện ReactJS. Thay vì tải lại (reload) toàn bộ trang web mỗi khi người dùng chuyển trang, ReactJS chỉ cập nhật lại một phần nhỏ giao diện (Components) trên màn hình, mang lại trải nghiệm mượt mà và tốc độ phản hồi cực nhanh tương đương các ứng dụng di động gốc (Native Apps).
a. Tổ chức cấu trúc thư mục (Folder Structure): Mã nguồn ReactJS (trong thư mục src) được tổ chức cực kỳ khoa học và theo chuẩn module hóa:
•	components/: Chứa các mảnh giao diện nhỏ có thể tái sử dụng nhiều lần (như thanh Header, Footer, thẻ hiển thị 1 sản phẩm ProductCard).
•	pages/: Chứa các màn hình giao diện lớn (như Home, Shop, Cart, Profile) được lắp ghép lại từ nhiều components.
•	services/: Nơi đóng gói các đoạn code dùng thư viện Axios để "gọi điện" (Fetch API) sang Backend lấy dữ liệu.
•	context/: Chứa CartContext sử dụng React Context API để quản lý trạng thái toàn cục của Giỏ hàng (Global State).
b. Tích hợp Điều hướng (React Router DOM): Để quản lý các đường dẫn (URLs) trên thanh địa chỉ của trình duyệt mà không làm tải lại trang, dự án đã tích hợp thư viện react-router-dom. Tại tệp tin cấu trúc gốc App.js, một bộ máy định tuyến (Router Engine) được thiết lập thông qua các thẻ <BrowserRouter> và <Routes>. Chức năng này làm nhiệm vụ "chỉ đường": ví dụ khi người dùng gõ đường dẫn /san-pham, hệ thống Router sẽ ngay lập tức "vẽ" ra Component Shop, hoặc khi vào /cart sẽ hiện ra Component Cart một cách tức thời.

 
Hình 25. Cấu trúc bộ định tuyến React Router DOM bên trong App.js giúp điều phối các trang giao diện theo mô hình Single Page Application (SPA)
4.2. Cấu hình trục HTTP Client chung (axiosClient.js) và xử lý dữ liệu JSON
Thay vì sử dụng hàm fetch() mặc định của trình duyệt với nhiều hạn chế và cú pháp dài dòng, dự án quyết định sử dụng thư viện Axios để quản lý toàn bộ các luồng giao tiếp mạng (HTTP Requests) giữa ReactJS và ASP.NET Core Backend.
Để tránh việc lặp lại mã nguồn (Don't Repeat Yourself - DRY), một trục HTTP Client duy nhất được khởi tạo tại file src/api/axiosClient.js.
Cấu hình BaseURL: Trục giao tiếp này được thiết lập hằng số baseURL trỏ thẳng tới cổng https://localhost:7030/api của Server và được thiết lập timeout là 10.000ms nhằm ngăn chặn tình trạng ứng dụng bị treo (hang) khi máy chủ mất kết nối.
Cơ chế đánh chặn (Interceptors): Điểm nhấn kỹ thuật mạnh mẽ nhất ở phần này là việc sử dụng axiosClient.interceptors.response. Thay vì các Components phải nhận về nguyên một cục dữ liệu HTTP phản hồi cồng kềnh (gồm Headers, Status Code, Config), Interceptor sẽ tự động đứng giữa "bóc tách" vỏ bọc JSON và chỉ trả về (Return) đúng phần lõi dữ liệu (response.data). Bất kỳ mã lỗi nào (như 404, 500) cũng bị Interceptor tóm lại và xử lý in lỗi log tập trung.
Nhờ có trục axiosClient này, các Service (như productService.js, orderService.js) chỉ việc gọi hàm .get() hoặc .post() kèm theo đuôi đường dẫn (ví dụ /Products) mà không cần bận tâm đến việc xử lý Headers hay giải mã JSON.

 
Hình 26.Khởi tạo trục kết nối mạng axiosClient kết hợp cơ chế Interceptor bóc tách cấu trúc dữ liệu JSON phản hồi từ Backend.
4.3. Xây dựng giao diện các tầng bóc tách cho Trang chủ (Home.jsx)
Trang chủ (Home.jsx) là màn hình phức tạp nhất của giao diện khách hàng vì nó phải hiển thị lượng thông tin khổng lồ từ nhiều nguồn dữ liệu khác nhau. Để tránh việc dồn hàng ngàn dòng code vào một file duy nhất gây khó khăn cho việc bảo trì, hệ thống đã áp dụng kỹ thuật Component Composition (Lắp ghép Component).
a. Bóc tách kiến trúc phân tầng: Trang chủ đóng vai trò như một bộ khung điều phối (Orchestrator). Toàn bộ bề mặt giao diện được bóc tách thành các mảnh Component nhỏ gọn và độc lập:
•	Header và Footer: Chịu trách nhiệm khung xương điều hướng toàn cục.
•	HeroBanner: Đảm nhận việc Fetch API lấy danh sách hình ảnh cấu hình từ Admin để chạy hiệu ứng Slider.
•	CategoryMenu: Hiển thị danh sách các phân loại đồ uống (Menu).
•	ProductGrid và LatestBlog: Trực tiếp gọi API lấy danh sách sản phẩm mới nhất và các bài báo truyền thông mới nhất.
b. Tối ưu hiệu suất bằng Intersection Observer: Nhằm khắc phục tình trạng giật lag khi tải nhiều hình ảnh cùng lúc, tệp Home.jsx được tích hợp một Hook useEffect kết nối với API IntersectionObserver của trình duyệt. Cơ chế này giúp các Component và hình ảnh chỉ được tải lên bộ nhớ và kích hoạt hiệu ứng hoạt hình (FadeInUp, FadeInLeft) khi người dùng thực sự cuộn chuột (Scroll) đến đúng vị trí đó trên màn hình (Lazy Loading). Điều này giúp cải thiện đáng kể điểm hiệu năng (Performance Score) của hệ thống.
  
Hình 27.Kỹ thuật bóc tách và lắp ghép các Component độc lập (Header, HeroBanner, ProductGrid...) bên trong cấu trúc Trang chủ Home.jsx.
 
4.4. Triển khai Trang cửa hàng (Shop.jsx) tích hợp bộ lọc nâng cao (Bộ lọc danh mục, Bộ lọc khoảng giá) và Tìm kiếm thời gian thực
Trang Cửa hàng (Shop.jsx) là khu vực tương tác nhiều nhất của khách hàng. Thay vì chỉ hiển thị một danh sách sản phẩm nhàm chán, đồ án đã triển khai một hệ thống lưới sản phẩm thông minh (Smart Grid) kết hợp với thanh công cụ lọc nâng cao (Sidebar Filter), mang lại trải nghiệm mua sắm nhanh chóng.
Về mặt kỹ thuật, trang Shop vận hành dựa trên cơ chế quản lý Trạng thái (State Management) thông qua các React Hooks như useState và useEffect.
a. Tìm kiếm thời gian thực (Real-time Search): Một biến trạng thái searchQuery được liên kết (Two-way binding) với ô nhập liệu. Mỗi khi người dùng gõ một phím, sự kiện onChange sẽ lập tức cập nhật State. Nhờ cơ chế Virtual DOM của React, hàm lọc .filter(product.name.toLowerCase().includes(...)) sẽ được kích hoạt ngay lập tức trên bộ nhớ đệm Frontend, giúp kết quả tìm kiếm hiện ra tức thời mà không cần phải gửi Request về Backend chờ đợi.
b. Bộ lọc kết hợp (Danh mục & Khoảng giá): Hệ thống áp dụng thuật toán lọc mảng đa điều kiện. Khi người dùng click chọn một Danh mục (ví dụ: Trà) hoặc nhập khoảng giá (ví dụ: Từ 30.000đ đến 50.000đ), các State tương ứng như selectedCategory và priceRange sẽ thay đổi. Một biến 파i sinh (Derived State) sẽ gom toàn bộ các mảng dữ liệu gốc và chạy qua nhiều lớp .filter() liên tiếp. Nếu một sản phẩm thỏa mãn đồng thời cả điều kiện về tên, danh mục và nằm trong khoảng giá cho phép, nó mới được truyền xuống Component con (ProductCard) để hiển thị ra màn hình.

 
Hình 28.Giao diện trang Cửa hàng (Shop) tích hợp thanh tìm kiếm thời gian thực và bộ lọc đa điều kiện theo danh mục, khoảng giá.
4.5. Triển khai Trang chi tiết sản phẩm (ProductDetail.jsx) và cơ chế hiển thị nội dung dạng HTML
Trang Chi tiết (ProductDetail.jsx và BlogDetail.jsx) có nhiệm vụ đón nhận tham số định tuyến động (Dynamic Route Parameter) từ thanh URL thông qua Hook useParams(). Dựa vào ID bắt được, Component sẽ gửi yêu cầu truy vấn đơn lẻ (Single Fetch) lên API để lấy toàn bộ thông tin chi tiết của thực thể đó.
Cơ chế bẻ khóa bảo mật hiển thị HTML (XSS Protection Bypass): Một thách thức kỹ thuật phát sinh khi hiển thị phần nội dung chi tiết (Description/Content). Do các nội dung này được biên tập viên nhập vào từ công cụ CKEditor bên phần mềm Admin, nên dữ liệu lưu trữ dưới Database không phải là văn bản thuần túy (Plain Text) mà là một chuỗi mã HTML phức tạp (chứa các thẻ <strong>, <em>, <img>...).
Theo mặc định, ReactJS được thiết kế với cơ chế bảo mật cực kỳ nghiêm ngặt: nó tự động thoát (Escape) tất cả các chuỗi HTML để phòng chống tấn công chèn mã độc (XSS - Cross Site Scripting). Nếu chỉ in biến ra màn hình bằng cặp ngoặc nhọn {product.description}, người dùng sẽ nhìn thấy toàn bộ các thẻ HTML thô thay vì văn bản đã được định dạng.
Để giải quyết vấn đề này, đồ án đã triển khai thuộc tính đặc biệt dangerouslySetInnerHTML={{ __html: post.content }}. Thuộc tính này hoạt động tương tự như hàm innerHTML của JavaScript gốc, ép buộc Virtual DOM của React phải biên dịch và render nguyên bản các thẻ HTML, giúp giữ nguyên vẹn cấu trúc in đậm, in nghiêng và hình ảnh mà biên tập viên đã thiết kế.

 
Hình 29. Sử dụng thuộc tính dangerouslySetInnerHTML để biên dịch trực tiếp chuỗi HTML được sinh ra từ công cụ soạn thảo CKEditor
4.6. Xây dựng luồng về khách hàng (đăng ký, đăng nhập, đơn hàng….)  
Khác với phân hệ Quản trị (Admin) sử dụng cơ chế bảo mật Cookie truyền thống của ASP.NET Core, phân hệ Frontend dành cho Khách hàng sử dụng cơ chế lưu trữ phiên (Session Storage) linh hoạt hơn ngay trên trình duyệt thông qua localStorage.
a. Quy trình Xác thực (Authentication Flow): Tại trang Đăng nhập (Login.jsx), khi khách hàng gửi đúng thông tin Email và Mật khẩu, luồng dữ liệu sẽ được authService chuyển qua API Backend để mã hóa và đối chiếu với CSDL. Nếu hợp lệ, Backend sẽ trả về một đối tượng JSON chứa thông tin người dùng. Frontend lập tức bắt lấy dữ liệu này và nén lại thành chuỗi (Stringify) để lưu vĩnh viễn vào bộ nhớ cục bộ localStorage.setItem('customer', data). Nhờ vậy, khách hàng dù có tắt trình duyệt mở lại vẫn không bị mất phiên đăng nhập.
b. Cá nhân hóa trải nghiệm và Quản lý đơn hàng: Thông tin customer từ Local Storage được tái sử dụng xuyên suốt toàn bộ ứng dụng:
•	Tại Header: Tự động ẩn đi nút "Đăng nhập/Đăng ký" và hiển thị lời chào "Xin chào, [Tên khách hàng]", kèm theo Menu thả xuống truy cập trang Cá nhân.
•	Tại trang Thanh toán (Checkout): Tự động điền sẵn (Auto-fill) thông tin Họ tên, Số điện thoại và Email của khách hàng, giúp việc đặt hàng diễn ra nhanh chóng chỉ với 1 click.
•	Tại trang Hồ sơ (Profile.jsx): Hệ thống trích xuất mã customerId đang đăng nhập để gửi yêu cầu truy vấn ngược lại Backend, qua đó vẽ ra toàn bộ Bảng lịch sử các đơn hàng (Mã đơn, Ngày đặt, Tổng tiền, Trạng thái) mà khách hàng đã từng giao dịch.
 
Hình 30.Lịch sử mua hàng
4.7. Xây dựng luồng xử lý Giỏ hàng (Cart.jsx) và Biểu mẫu thanh toán đặt đơn hàng (Checkout.jsx) 
Quy trình Đặt hàng là xương sống của mọi hệ thống Thương mại điện tử. Tại phân hệ Frontend, luồng nghiệp vụ này được xử lý mượt mà qua hai chốt chặn chính: Giỏ hàng (Cart.jsx) và Thanh toán (Checkout.jsx), kết hợp với bộ quản lý trạng thái toàn cục CartContext.
a. Quản lý trạng thái Giỏ hàng (CartContext & LocalStorage): Nhằm giúp khách hàng có thể thêm sản phẩm vào giỏ từ bất kỳ trang nào (Trang chủ, Cửa hàng, Chi tiết), hệ thống đã khởi tạo một Không gian trạng thái toàn cục bằng React Context API (CartContext.jsx). Khi một sản phẩm được thêm vào, State giỏ hàng sẽ cập nhật và tự động đồng bộ hóa xuống bộ nhớ localStorage. Cơ chế này giúp giỏ hàng tồn tại bền vững ngay cả khi khách hàng lỡ tay tắt trình duyệt. Tại trang Cart.jsx, khách hàng có thể tăng/giảm số lượng hoặc xóa sản phẩm, hệ thống sẽ tính toán lại tổng tiền (Total Price) ngay lập tức theo thời gian thực (Real-time).
b. Xử lý biểu mẫu Thanh toán (Checkout) và tạo Đơn hàng: Khi bước sang trang Checkout.jsx, hệ thống yêu cầu khách hàng cung cấp thông tin giao hàng. Tại đây, luồng xác thực (Authentication) thể hiện sự ưu việt: nếu khách hàng đã đăng nhập, thông tin như Họ tên, Email, Số điện thoại sẽ tự động được điền sẵn (Auto-fill) vào các Form tương ứng. Sau khi xác nhận, toàn bộ dữ liệu gồm Thông tin giao hàng và Mảng danh sách các sản phẩm trong giỏ (Order Details) sẽ được đóng gói thành một đối tượng JSON (Payload). Thông qua axiosClient, Payload này được bắn sang Backend. Backend sẽ ghi nhận đơn hàng vào SQL Server, phản hồi kết quả và hệ thống ReactJS sẽ lập tức chuyển hướng người dùng sang màn hình "Đặt hàng thành công", đồng thời xóa sạch giỏ hàng hiện tại.
 
Hình 31.Đặt hàng thành công

 CHƯƠNG 5: KIỂM THỬ VÀ ĐÁNH GIÁ KẾ THÚC ĐỒ ÁN
5.1. Kiểm thử chức năng phân quyền bảo mật vùng Admin (Quyền Admin và Editor)
Mục tiêu của kiểm thử chức năng phân quyền là nhằm xác minh cơ chế xác thực người dùng (Authentication) sử dụng Cookie và cơ chế phân quyền dựa trên vai trò (Role-based Authorization) giữa hai nhóm tài khoản Admin và Editor hoạt động chính xác, bảo mật trên hệ thống quản lý Thao Coffee (ThaoCMS).
a.Kịch bản 1: Chặn truy cập trái phép khi chưa đăng nhập
•	Nội dung kiểm thử: Kiểm tra tính năng bảo mật bằng cách mở một trình duyệt ở chế độ ẩn danh (chưa đăng nhập) và nhập trực tiếp đường dẫn của trang quản trị thành viên hoặc bài viết (ví dụ: http://localhost:.../User hoặc http://localhost:.../Post).
•	Kết quả kỳ vọng: Hệ thống phát hiện chưa có Cookie xác thực .AspNetCore.Cookies, chặn truy cập và tự động chuyển hướng người dùng về trang đăng nhập của hệ thống (/Account/Login).
•	Kết quả thực tế: Hệ thống hoạt động đúng thiết kế, tự động chuyển hướng về trang đăng nhập kèm tham số đường dẫn gốc trên thanh địa chỉ.
 
 
Hình 32.Hệ thống tự động chặn và chuyển hướng về trang đăng nhập ThaoCMS.

b. Kịch bản 2: Đăng nhập và phân quyền đối với tài khoản Admin
•	Nội dung kiểm thử: Đăng nhập vào hệ thống bằng tài khoản có vai trò là Admin.
•	Kết quả kỳ vọng:
•	Đăng nhập thành công và chuyển hướng về bảng điều khiển (Dashboard).
•	Chân thanh điều hướng bên trái (Sidebar) hiển thị đúng tên của Admin và badge vai trò Admin.
•	Tài khoản Admin truy cập được đầy đủ tất cả các danh mục chức năng, đặc biệt là mục "Quản lý Thành viên" (/User).
•	Kết quả thực tế: Đăng nhập thành công, tài khoản Admin thực hiện được toàn bộ các tính năng CRUD trên danh sách thành viên hệ thống.
 
Hình 33.Đăng nhập thành công với quyền Admin và truy cập trang quản lý thành viên
c. Kịch bản 3: Đăng nhập và phân quyền đối với tài khoản Editor
•	Nội dung kiểm thử: Đăng nhập vào hệ thống bằng tài khoản có vai trò là Editor (Biên tập viên).
•	Kết quả kỳ vọng:
•	Đăng nhập thành công và chuyển hướng về bảng điều khiển.
•	Chân thanh điều hướng bên trái (Sidebar) hiển thị đúng tên của Editor và badge vai trò Editor.
•	Tài khoản Editor truy cập bình thường vào các trang nội dung như: "Quản lý Tin tức" (/Post), "Quản lý Sản phẩm" (/Product).
•	Kết quả thực tế: Đăng nhập thành công, Editor có quyền viết bài mới và quản lý các sản phẩm của quán cà phê.
 
Hình 34.Giao diện quản trị của tài khoản vai trò Editor.
5.2. Kiểm thử luồng nghiệp vụ mua sắm và bắt lỗi logic tồn kho (StockQuantity)
a. Quy trình luồng nghiệp vụ mua sắm (Shopping Flow)
Luồng nghiệp vụ mua sắm trên hệ thống Thao Coffee được thực hiện khép kín qua các bước:
•	Khách hàng xem danh sách sản phẩm tại trang cửa hàng (Shop.jsx) và lựa chọn sản phẩm ưa thích để xem chi tiết.
•	Tại trang chi tiết sản phẩm (ProductDetail.jsx), khách hàng chọn kích thước (Size S hoặc M - hệ thống tự động tính thêm phụ phí cho Size M hoặc lấy giá từ thuộc tính PriceSizeM), nhập số lượng cần mua và bấm "Thêm vào giỏ hàng".
•	Thông tin sản phẩm được cập nhật vào Giỏ hàng sử dụng CartContext để quản lý trạng thái toàn cục phía Client.
•	Khách hàng tiến hành bấm "Đặt hàng" để chuyển đến trang Thanh toán (Checkout.jsx). Tại đây, khách hàng chọn địa chỉ giao hàng (Quận/Phường tại TP.HCM). Hệ thống sẽ tự động gán chi nhánh Highlands Coffee gần nhất phục vụ dựa trên Quận nhận hàng.
•	Khách hàng nhấn xác nhận đặt hàng, Frontend gửi yêu cầu POST /api/Orders chứa thông tin khách hàng và danh sách các mặt hàng đã chọn về Backend.
b. Cơ chế bắt lỗi logic tồn kho (StockQuantity Validation)
Để đảm bảo tính nhất quán của dữ liệu kho, hệ thống áp dụng cơ chế xác thực hai tầng (Double-check validation):
•	Tầng 1 - Xác thực phía Frontend (Client-side): Tại trang chi tiết sản phẩm (ProductDetail.jsx), hệ thống kiểm tra số lượng khách hàng yêu cầu nhập (quantity) với số lượng tồn kho thực tế (product.stockQuantity) lấy từ API. Nếu số lượng nhập vào vượt quá tồn kho, ReactJS sẽ hiển thị thông báo cảnh báo và chặn không cho thêm vào giỏ hàng.

 
Hình 35.Cảnh báo lỗi vượt quá số lượng tồn kho ở giao diện chi tiết sản phẩm
•	Tầng 2 - Xác thực phía Backend (Server-side & Database): Để phòng ngừa trường hợp Client cố tình gửi Request sai lệch bypass qua giao diện, tại tệp tin OrdersController.cs thuộc Backend, trước khi tiến hành lưu đơn hàng và trừ tồn kho, hệ thống thực hiện kiểm tra lại:
csharp
if (product.StockQuantity < item.Quantity)
{
    return BadRequest(new { message = $"Sản phẩm '{product.Name}' không đủ số lượng trong kho." });
}
Nếu phát hiện kho không đủ, API lập tức trả về mã lỗi 400 Bad Request cùng thông điệp lỗi chi tiết. Đồng thời, nhờ sử dụng Database Transaction (BeginTransactionAsync), toàn bộ các thao tác ghi nhận đơn hàng trước đó sẽ được Rollback (Hoàn tác) hoàn toàn để tránh rác dữ liệu.
5.3. Kiểm thử hiệu năng đồng bộ thời gian thực ngầm (Tab Console F12 và Swagger)
Để kiểm thử hiệu năng truyền tải dữ liệu giữa ứng dụng Frontend (ReactJS) và Backend (ASP.NET Core Web API), nhóm phát triển sử dụng công cụ DevTools trên trình duyệt và giao diện Swagger UI để giám sát các luồng yêu cầu ngầm.
a. Kiểm thử thông qua Tab Console & Network (F12)
•	Mô tả: Khi người dùng tương tác trên giao diện ReactJS (tải sản phẩm, đặt hàng), các API được gọi ngầm dưới nền thông qua thư viện AxiosClient.
•	Nội dung kiểm tra:
•	Giám sát thời gian phản hồi (Response Time) của các API (phải đảm bảo dưới 200ms đối với các tác vụ truy vấn thông thường).
•	Kiểm tra định dạng dữ liệu trả về dạng JSON gọn nhẹ, tối ưu băng thông đường truyền.
•	Xác minh các mã trạng thái HTTP (HTTP Status Code) trả về đúng chuẩn RESTful (200 OK cho truy vấn thành công, 201 Created khi tạo mới, 400 cho lỗi dữ liệu).

 
Hình 36.Theo dõi các truy vấn API ngầm trả về định dạng dữ liệu JSON trên Tab Network (F12).
b. Kiểm thử độc lập qua giao diện Swagger UI
•	Mô tả: Swagger UI được tích hợp trực tiếp vào dự án CMS.Backend (đường dẫn /swagger) đóng vai trò làm tài liệu kỹ thuật động và môi trường thử nghiệm API.
•	Nội dung kiểm tra: Thực hiện chạy thử nghiệm trực tiếp (Try it out) các Endpoint như GET /api/Products hoặc POST /api/Orders độc lập mà không cần thông qua giao diện người dùng ReactJS để kiểm tra tính ổn định của API. 
Hình 37.Giao diện thử nghiệm và mô tả tài liệu API Swagger
5.4. Đánh giá ưu điểm và nhược điểm của giải pháp thiết kế
Dựa trên quá trình xây dựng và vận hành thử nghiệm hệ thống ThaoCMS, giải pháp thiết kế kiến trúc lai (Hybrid) kết hợp giữa ASP.NET Core MVC (vùng quản trị nội bộ) và mô hình tách rời Web API + ReactJS SPA (vùng khách hàng) mang lại các đánh giá khách quan sau:
a. Ưu điểm
Trải nghiệm người dùng (UX) tối ưu: Việc áp dụng ReactJS cho trang bán hàng phía Client tạo ra ứng dụng đơn trang (SPA) mượt mà, chuyển trang không tải lại (No-reload), phản hồi cực kỳ nhanh nhờ dữ liệu trao đổi qua API có dung lượng rất nhẹ (định dạng JSON).
Độ tin cậy và toàn vẹn dữ liệu cao: Phía Backend C# sử dụng Entity Framework Core kết hợp chặt chẽ với cơ chế Database Transaction giúp xử lý các nghiệp vụ phức tạp một cách an toàn. Đảm bảo nếu một bước nhỏ trong quá trình đặt hàng bị lỗi (ví dụ: một sản phẩm bị hết hàng đột ngột), toàn bộ tiến trình sẽ được hoàn tác an toàn, tránh sai lệch kho.
Phân tách trách nhiệm phát triển (Decoupling): Đội ngũ phát triển Backend chỉ cần tập trung vào nghiệp vụ dữ liệu và API bảo mật. Đội ngũ Frontend chỉ cần tập trung vào thiết kế giao diện và tối ưu hóa trải nghiệm khách hàng, dễ dàng tái sử dụng API này để phát triển ứng dụng di động (Mobile App) trong tương lai.
Hệ thống phân quyền quản trị chặt chẽ: Tận dụng tối đa sức mạnh của ASP.NET Core Identity với cơ chế xác thực Cookie và thuộc tính [Authorize(Roles = "Admin")] giúp phân biệt rõ ràng và an toàn tuyệt đối các chức năng nhạy cảm giữa nhóm quyền Admin và Editor.
b. Nhược điểm
Phức tạp trong cấu hình chia sẻ tài nguyên (CORS): Do Frontend và Backend chạy độc lập trên hai cổng (Port) khác nhau, hệ thống bắt buộc phải cấu hình chính sách CORS để trình duyệt cho phép giao tiếp chéo. Điều này làm tăng nguy cơ bị tấn công nếu cấu hình quá lỏng lẻo (AllowAll).
Hạn chế về tính năng thời gian thực (Real-time sync): Do hệ thống hiện tại hoạt động theo cơ chế kéo dữ liệu (Pulling) truyền thống qua các yêu cầu HTTP thông thường, chưa tích hợp các thư viện truyền tải hai chiều như SignalR hay WebSocket. Vì vậy, sự thay đổi số lượng tồn kho tại Admin sẽ không được cập nhật ngay lập tức cho khách hàng đang xem trên giao diện trừ khi họ tải lại trang.
Hạn chế mở rộng bảo mật Token: Cơ chế xác thực Cookie hoạt động rất tốt trên trình duyệt Web nhưng sẽ gặp khó khăn khi tích hợp với các ứng dụng di động (Mobile App) hoặc bên thứ ba. Để phát triển lâu dài, hệ thống cần được nâng cấp sang cơ chế xác thực JWT Token (JSON Web Token).
 CHƯƠNG 6: KẾT LUẬN VÀ HƯỚNG PHÁT TRIỂN NÂNG CẤP
6.1. Kết quả đạt được của đồ án đối với sinh viên
Trải qua quá trình nghiên cứu, thiết kế và hoàn thiện hệ thống quản lý nội dung và bán hàng Thao Coffee (ThaoCMS), đồ án đã mang lại cho bản thân sinh viên nhiều kết quả thực tiễn quan trọng, cụ thể trên các phương diện:
 a. Về kiến thức chuyên môn
•	Làm chủ công nghệ Fullstack: Sinh viên đã nắm vững và áp dụng thành công mô hình phát triển phần mềm hiện đại: xây dựng Backend bằng ASP.NET Core (C#) kết hợp với Frontend là ReactJS (JavaScript).
•	Thiết kế và quản trị cơ sở dữ liệu: Hiểu sâu về thiết kế cơ sở dữ liệu quan hệ chuẩn hóa trên SQL Server, làm chủ kỹ thuật Entity Framework Core (Code First) để tương tác với cơ sở dữ liệu thông qua các đối tượng Entity và thực hiện di chuyển cấu trúc dữ liệu (Migrations) một cách an toàn.
•	Kiến trúc hệ thống và bảo mật: Nắm rõ cơ chế phân tách giữa Web truyền thống (MVC) và Web API (RESTful API), hiểu cách thức cấu hình CORS, cơ chế xác thực người dùng dựa trên Cookie (CookieAuthentication), và phân quyền dựa trên vai trò của tài khoản quản trị (Admin và Editor).
b. Về kỹ năng thực hành và giải quyết vấn đề
•	Giải quyết thành công bài toán xử lý nghiệp vụ thực tế như: tính toán logic giá bán sản phẩm theo kích thước (Size S, Size M), tự động phân bổ chi nhánh xử lý đơn hàng gần nhất dựa trên địa lý quận huyện của khách hàng, cấu hình trình soạn thảo văn bản phong phú CKEditor và giải quyết bài toán tải lên tệp tin hình ảnh vật lý lên máy chủ.
•	Biết cách sử dụng các công cụ gỡ lỗi, kiểm tra hiệu năng hệ thống ngầm thông qua công cụ Chrome DevTools (Tab Console, Network) và giao diện tài liệu động Swagger UI để đảm bảo tính ổn định của luồng dữ liệu.
c. Về kỹ năng mềm và phương pháp làm việc
•	Rèn luyện được tư duy hệ thống và cách tiếp cận bài bản từ khâu phân tích yêu cầu, thiết kế cơ sở dữ liệu, xây dựng giao diện đến kiểm thử và tối ưu hóa hệ thống.
•	Hình thành thói quen quản lý mã nguồn chuyên nghiệp thông qua Git, giúp quản lý các phiên bản code theo từng phân đoạn phát triển (từ Buổi 1 đến Buổi 7) một cách khoa học.
6.2. Hướng phát triển nâng cấp hệ thống trong tương lai (Tích hợp cổng thanh toán, AI gợi ý sản phẩm)
Mặc dù hệ thống Thao Coffee đã đáp ứng đầy đủ các yêu cầu cơ bản của một trang quản trị nội dung và bán hàng trực tuyến, tuy nhiên để đáp ứng các tiêu chuẩn thương mại điện tử thực tế và mang lại trải nghiệm đột phá cho người dùng, hệ thống định hướng nâng cấp các tính năng sau trong tương lai:
a. Tích hợp cổng thanh toán trực tuyến
Mục tiêu: Thay thế hình thức thanh toán thủ công khi nhận hàng (COD) bằng quy trình thanh toán tự động, nâng cao tính chuyên nghiệp và hạn chế rủi ro hủy đơn.
Giải pháp: Tích hợp trực tiếp các cổng thanh toán trung gian phổ biến tại Việt Nam như VNPAY, Momo, hoặc ZaloPay thông qua tài liệu API của nhà cung cấp. Khi khách hàng bấm đặt hàng, hệ thống sẽ sinh mã thanh toán QR-Code động hoặc chuyển hướng sang trang thanh toán an toàn, tự động cập nhật trạng thái đơn hàng thành "Đã thanh toán" trên hệ thống quản trị ngay khi giao dịch thành công.
b. Tích hợp hệ thống AI gợi ý sản phẩm (AI Recommendation System)
Mục tiêu: Cá nhân hóa trải nghiệm mua sắm của từng khách hàng, tăng tỷ lệ chuyển đổi đơn hàng và nâng cao doanh thu cho cửa hàng.
Giải pháp: Xây dựng một module học máy (Machine Learning) cơ bản chạy ngầm dựa trên lịch sử mua sắm, hành vi tìm kiếm và thói quen duyệt web của khách hàng. Hệ thống AI sẽ tự động phân tích và đưa ra danh sách đề xuất như: "Sản phẩm thường được mua cùng", "Gợi ý dành riêng cho bạn" ngay tại trang chủ hoặc trang chi tiết sản phẩm.
c.Chuyển đổi cơ chế bảo mật sang JWT và xây dựng Mobile App
Mục tiêu: Mở rộng kênh bán hàng của Thao Coffee từ nền tảng Website sang ứng dụng di động chạy trên hệ điều hành iOS và Android.
Giải pháp: Nâng cấp hệ thống xác thực Backend từ Cookie sang sử dụng mã thông báo không trạng thái JWT (JSON Web Token) để đảm bảo tính bảo mật và khả năng tương thích đa nền tảng. Từ đó xây dựng ứng dụng di động bằng các framework lai như React Native hoặc Flutter, tái sử dụng chung nguồn tài nguyên Web API hiện tại.
d.Tối ưu hóa thời gian thực (Real-time) bằng SignalR
Mục tiêu: Đồng bộ dữ liệu kho hàng, trạng thái đơn hàng và các thông báo tức thời giữa khách hàng và quản trị viên mà không cần tải lại trang.
Giải pháp: Sử dụng thư viện SignalR trên ASP.NET Core để thiết lập kết nối liên tục hai chiều giữa Client và Server. Khi Admin bấm xác nhận đơn hàng hoặc cập nhật số lượng tồn kho của một món nước, giao diện của khách hàng và nhà bếp sẽ lập tức thay đổi trạng thái theo thời gian thực.
 TÀI LIỆU THAM KHẢO
PHỤ LỤC (Đường link GitHub, Tài khoản/Mật khẩu demo, Hướng dẫn cài đặt nhanh)
a. Thông tin mã nguồn và Tài khoản thử nghiệm (Demo)
•	Đường dẫn mã nguồn dự án trên GitHub: https://github.com/ungthithanhthao611-ui/ThaoCMS_Slution
•	Danh sách tài khoản demo kiểm thử hệ thống:
o	Tài khoản Quản trị tối cao (Admin):
	Tên đăng nhập: admin
	Mật khẩu: 123456
o	Tài khoản Biên tập viên (Editor):
	Tên đăng nhập: editor (hoặc tài khoản Editor được cấu hình trong DB)
	Mật khẩu: 123456
o	Tài khoản Khách hàng mua sắm (Customer):
	Email: an.nguyen@gmail.com
	Mật khẩu: password123
2. Hướng dẫn cài đặt nhanh hệ thống (Quick Installation Guide)
a. Yêu cầu môi trường tối thiểu (Prerequisites)
•	Hệ điều hành: Windows 10/11 64-bit.
•	Công cụ lập trình: Visual Studio 2022 (hỗ trợ .NET SDK mới nhất).
•	Môi trường Frontend: NodeJS phiên bản v18.0 trở lên.
•	Hệ quản trị cơ sở dữ liệu: Microsoft SQL Server (LocalDB hoặc Express).
b. Các bước triển khai Backend (CMS.Backend & CMS.Data)
1.	Tải mã nguồn: Thực hiện clone dự án từ link GitHub bên trên hoặc giải nén thư mục dự án ThaoCMS_Solution.
2.	Mở giải pháp: Khởi động Visual Studio 2022 và mở tệp tin giải pháp ThaoCMS_Solution.sln.
3.	Cấu hình kết nối Database:
•	Mở tệp tin appsettings.json trong dự án CMS.Backend.
•	Cập nhật lại chuỗi kết nối DefaultConnection cho phù hợp với máy chủ SQL Server của bạn (ví dụ: sử dụng LocalDB hoặc SQL Express).
4.	Tạo cơ sở dữ liệu:
•	Vào menu Tools -> NuGet Package Manager -> Package Manager Console.
•	Đặt mục Default Project là CMS.Data.
•	Chạy lệnh: Update-Database để hệ thống tự động khởi tạo các bảng và nạp dữ liệu mẫu (Seed Data).
5.	Khởi động Backend:
•	Đặt dự án CMS.Backend làm dự án khởi chạy (Startup Project).
•	Nhấn nút Run (hoặc nhấn tổ hợp phím Ctrl + F5) để chạy dự án. Hệ thống sẽ mở cổng API cùng giao diện Swagger tại địa chỉ mặc định (ví dụ: https://localhost:7001/swagger).
c. Các bước triển khai Frontend (cms.frontend)
1.	Di chuyển thư mục: Sử dụng Command Prompt hoặc Terminal trong Visual Studio Code truy cập vào thư mục cms.frontend.
2.	Cài đặt thư viện: Chạy lệnh cài đặt các gói phụ thuộc (packages) của dự án ReactJS:
bash
npm install
3.	Cấu hình đường dẫn API:
•	Tạo hoặc mở file cấu hình môi trường .env tại thư mục gốc của Frontend.
•	Đảm bảo cấu hình biến môi trường trỏ đúng về cổng của API Backend:
env
REACT_APP_API_URL=https://localhost:7001
4.	Khởi chạy giao diện khách hàng: Thực hiện chạy lệnh dưới đây để khởi động môi trường dev:
bash
npm run dev  # hoặc npm start tùy cấu hình dự án
•	Mở trình duyệt và truy cập địa chỉ hiển thị trên Terminal (mặc định là http://localhost:3000 hoặc http://localhost:5173) để trải nghiệm mua sắm đồ uống tại Thao Coffee.


