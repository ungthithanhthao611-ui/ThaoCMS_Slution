Phụ Lục hướng dẫn xây dựng FrontEnd site bán hàng 
GV: Nguyễn Cao Thái.

Trang chủ của một website bán hàng (E-commerce) đóng vai trò như một "mặt tiền" hay "tủ kính trưng bày" của cửa hàng. Mục tiêu tối cao của trang chủ là thu hút ánh nhìn của khách hàng, giúp họ định hình ngay cửa hàng bán gì, có chương trình ưu đãi nào hot, và điều hướng họ đến các trang xem sản phẩm một cách nhanh nhất.
Đối với một website bán hàng đơn giản chuẩn mã nguồn mở (như đồ án ReactJS kết hợp ASP.NET Core), giao diện trang chủ thường được bóc tách và phân chia thành các thành phần (Component) cốt lõi sắp xếp từ trên xuống dưới như sau:
 
<Header /> (Mục 1): Thanh điều hướng, logo, thanh tìm kiếm và biểu tượng giỏ hàng cố định.
<HeroBanner /> (Mục 2): Khối banner lớn, hình ảnh đại diện và nút CTA kêu gọi hành động.
<CategoryMenu /> (Mục 3): Thanh menu ngang hiển thị danh mục sản phẩm kéo từ API.
<ProductGrid /> (Mục 4): Lưới hiển thị danh sách các thẻ sản phẩm quần áo thời trang.
<LatestBlog /> (Mục 5): Khối hiển thị các bài viết tin tức xu hướng phối đồ.
<Footer /> (Mục 6): Chân trang quản trị thông tin liên hệ và chính sách cửa hàng.

 	<Header /> (Mục 1): Thanh điều hướng, logo, thanh tìm kiếm và biểu tượng giỏ hàng cố định.
<HeroBanner /> (Mục 2): Khối banner lớn, hình ảnh đại diện và nút CTA kêu gọi hành động.
<CategoryMenu /> (Mục 3): Thanh menu ngang hiển thị danh mục sản phẩm kéo từ API.
<ProductGrid /> (Mục 4): Lưới hiển thị danh sách các thẻ sản phẩm quần áo thời trang.










<LatestBlog /> (Mục 5): Khối hiển thị các bài viết tin tức xu hướng phối đồ.


<Footer /> (Mục 6): Chân trang quản trị thông tin liên hệ và chính sách cửa hàng.


Tại sao ứng dụng React lại cần React Router DOM?
Mặc định, các ứng dụng React thường là SPA (Single Page Application - Ứng dụng đơn trang). Điều này có nghĩa là toàn bộ website chỉ chạy trên duy nhất một file HTML (index.html).
●	Nếu không có thư viện định tuyến: Khi người dùng nhấn vào thanh menu để sang trang "Giới thiệu" hay "Cửa hàng", trình duyệt sẽ không tải lại một file HTML mới từ server. Thay vào đó, bạn phải tự dùng các trạng thái (state) phức tạp để ẩn component này và hiện component khác. Lúc này, thanh địa chỉ URL của trình duyệt sẽ giữ nguyên không đổi (ví dụ: luôn là localhost:3000), khiến người dùng không thể copy link gửi cho bạn bè hoặc bấm nút "Back" (Quay lại) trên trình duyệt.
●	Khi có React Router DOM: Thư viện này đồng bộ hóa giao diện hiển thị trên màn hình với thanh địa chỉ URL của trình duyệt. Khi URL thay đổi, React Router DOM sẽ tự động quét và "bốc" đúng Component tương ứng ra hiển thị mà không hề làm tải lại trang (No Reload), giữ nguyên tốc độ mượt mà đặc trưng của SPA nhưng vẫn mang lại trải nghiệm như một website đa trang truyền thống.
Phải cài đặt bằng lệnh cho project ReactJS
	npm install react-router-dom
 
Bám sát mô hình Component-Driven Architecture (Đóng gói theo tính năng), toàn bộ cây thư mục cấu trúc FrontEnd ReactJS chuẩn hóa, tinh gọn và phản ánh chính xác nhất phạm vi đồ án của sinh viên như sau:
ĐỀ XUẤT CÂY THƯ MỤC FRONTEND REACTJS (ĐÃ HIỆU CHỈNH CHUẨN HOÁ)

src/
│
├── api/
│   └── axiosClient.js       # Trục HTTP Client tập trung (Cấu hình URL Backend)
│
├── assets/                  		# Tài nguyên tĩnh dùng chung
│   ├── images/              	# Logo thiết kế, các Banner mặc định từ Canva
│   └── css/                		# Các file tùy biến định dạng CSS (nếu có)
│
├── components/             	 # Các Component TOÀN CỤC (Dùng chung cho nhiều trang)
│   ├── Header.jsx          	 # Thanh điều hướng (Có bong bóng số lượng giỏ hàng sống)
│   ├── Footer.jsx          	 # Chân trang website
│   ├── PostCard.jsx           	# Tấm thẻ bài viết
│   └── ProductCard.jsx     	 # Tấm thẻ sản phẩm (Dùng chung cho cả Home và Shop)
│
├── pages/                  		# NƠI CHÚA CÁC TRANG CHÍNH (GIAO DIỆN)
│   ├── home/                	# 0. PHÂN KHU TRANG CHỦ - HOME
│   │   ├── index.jsx        	# Component Cha chia giao diện
│   │   ├── HeroBanner.jsx  	# phần tự thực hành dành cho SV
│   │   ├── CategoryMenu.jsx   	# hiện danh mục các loại sản phẩm
│   │   ├── ProductGrid.jsx  	# Lưới bọc và chạy map() gọi thẻ ProductCard
│   │   └── LatestBlog.jsx 	# Lưới bọc và chạy map() gọi thẻ PostCard
│   │
│   ├── shop/                		# 1. PHÂN KHU TRANG CỬA HÀNG
│   │   ├── index.jsx        	# Component Cha điều phối (Shop.jsx cũ)
│   │   ├── ShopSidebar.jsx  	# Bộ lọc danh mục và khoảng giá dọc bên trái
│   │   ├── ShopHeader.jsx  	 # Thanh tìm kiếm nhanh và bộ đếm sản phẩm phía trên
│   │   ├── ProductList.jsx  	# Lưới bọc và chạy map() gọi thẻ ProductCard
│   │   └── LoadingOrEmpty.jsx # Xử lý UX/UI trạng thái tải mạng hoặc trống kết quả
│   │
│   ├── product-detail/      # 2. PHÂN KHU CHI TIẾT SẢN PHẨM (ĐÃ TINH GIẢN)
│   │   ├── index.jsx        # Component Cha nhận ID từ URL (ProductDetail.jsx cũ)
│   │   └── ProductInfo.jsx  # Khối hiển thị thông tin: Tên, Giá, Mô tả và nút "Mua" (Không có Size/Slider)
│   │
│   ├── blog/                # 3. PHÂN KHU TIN TỨC / BÀI VIẾT (MỚI BỔ SUNG)
│   │   ├── index.jsx        # Trang danh sách bài viết (Hiển thị toàn bộ các bài Post)
│   │   ├── BlogSidebar.jsx  # Cột bên phải hiển thị danh mục bài viết (Category) để click lọc
│   │   └── BlogDetail.jsx   # Trang chi tiết bài viết (Nhận ID hiển thị nội dung HTML raw từ CKEditor)
│   │
│   ├── cart/                # 4. PHÂN KHU GIỎ HÀNG
│   │   ├── index.jsx        # Trang quản lý mảng giỏ hàng (Cart.jsx cũ)
│   │   └── CartTable.jsx    # Bảng danh sách sản phẩm đã chọn, nút tăng/giảm số lượng
│   │
│   └── checkout/            # 5. PHÂN KHU THANH TOÁN
│       └── index.jsx        # Form điền dữ liệu Customer và bấm nút POST Đơn hàng
│
├── services/                # TẦNG DỊCH VỤ ("Người đi chợ" chuyên gọi API ngầm)
│   ├── productService.js     # Hàm lấy toàn bộ sản phẩm, lọc theo danh mục, lọc giá, tìm kiếm
│   ├── blogService.js       # Hàm lấy danh sách bài viết (cho <LatestBlog />), lấy danh mục tin, xem chi tiết Post
│   └── orderService.js      # Hàm POST dữ liệu tạo Đơn hàng và các dòng Chi tiết đơn hàng xuống Backend C#
│
├── App.js                   # Cấu hình định tuyến chính (React Router DOM kết nối các trang)
├── index.js                 # File khởi tạo gốc của ứng dụng ReactJS
└── .env                     # Lưu trữ biến môi trường (REACT_APP_API_URL=https://localhost:7001)


File src/App.jsx bây giờ sẽ trở nên cực kỳ tinh gọn.
Nhiệm vụ duy nhất của App.jsx lúc này là làm "Trạm trung chuyển định tuyến" (Routing) để dẫn đường cho người dùng đến đúng trang (page) họ muốn mà không làm nhân đôi Header/Footer.
Dưới đây là mã nguồn src/App.jsx chuẩn hóa và tinh gọn nhất:

MÃ NGUỒN CHUẨN: src/App.jsx

import React from 'react';
// Import các thành phần lõi của thư viện điều hướng đường dẫn
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// 1. IMPORT CÁC COMPONENT TOÀN CỤC (LAYOUT CHUNG)
import Header from './components/Header';
import Footer from './components/Footer';

// 2. IMPORT CÁC TRANG CHỨC NĂNG (GIAO DIỆN CHÍNH)
import Home from './pages/home/index';
import Shop from './pages/shop/index';                  // Tự động nạp file pages/shop/index.jsx
import ProductDetail from './pages/product-detail'; // Tự động nạp file pages/product-detail/index.jsx
import Blog from './pages/blog/index';                  // Tự động nạp file pages/blog/index.jsx
import BlogDetail from './pages/blog-detail/index';  // Nạp trang chi tiết bài viết cụ thể
import Cart from './pages/cart/index';                  // Tự động nạp file pages/cart/index.jsx
import Checkout from './pages/checkout/index';          // Tự động nạp file pages/checkout/index.jsx

function App() {
    return (
        // Khởi tạo bộ định tuyến bao bọc toàn bộ ứng dụng Web
        <Router>
            <div className="d-flex flex-column min-vh-100 bg-light">


                {/* KHU VỰC NỘI DUNG ĐỘNG (Thay đổi ruột tùy theo URL trên thanh địa chỉ) */}
                <main className="flex-grow-1">
                    <Routes>
                        {/* Cấu hình Trang chủ - Khớp hoàn toàn với địa chỉ "/home" */}
                        <Route path="/" element={<Home />} />

                        {/* Cấu hình Trang Cửa hàng - Địa chỉ "/shop" */}
                        <Route path="/shop" element={<Shop />} />

                        {/* Cấu hình Trang Chi tiết sản phẩm - Sử dụng tham số động ":id" */}
                        {/* Ví dụ khi vào link: /product/5 -> useParams() sẽ lấy được id = 5 */}
                        <Route path="/product/:id" element={<ProductDetail />} />

                        {/* Cấu hình Trang Danh sách tin tức - Địa chỉ "/blog" */}
                        <Route path="/blog" element={<Blog />} />

                        {/* Cấu hình Trang Chi tiết bài viết - Địa chỉ "/blog/:id" */}
                        <Route path="/blog/:id" element={<BlogDetail />} />

                        {/* Cấu hình Trang Giỏ hàng cá nhân - Địa chỉ "/cart" */}
                        <Route path="/cart" element={<Cart />} />

                        {/* Cấu hình Trang Điền thông tin thanh toán - Địa chỉ "/checkout" */}
                        <Route path="/checkout" element={<Checkout />} />

                        {/* XỬ LÝ KỊCH BẢN TRANG LỖI 404 (Khi sinh viên gõ sai URL) */}
                        <Route path="*" element={
                            <div className="container text-center py-5 my-5">
                                <img
                                    src="https://cdn-icons-png.flaticon.com/512/580/580185.png"
                                    alt="404"
                                    className="mb-4"
                                    style={{ width: '100px', opacity: 0.6 }}
                                />
                                <h2 className="fw-bold text-secondary">404 - KHÔNG TÌM THẤY TRANG</h2>
                                <p className="text-muted">Đường dẫn bạn truy cập không tồn tại trên hệ thống ThaiCMS.</p>
                                <a href="/" className="btn btn-dark btn-sm mt-2">Quay lại Trang Chủ</a>
                            </div>
                        } />
                    </Routes>
                </main>

            </div>
        </Router>
    );
}

export default App;
💡 2 LƯU Ý QUAN TRỌNG:
1.	Bản chất của việc giấu Header/Footer tại đây: Vì đưa thẳng <Header /> (Tầng 1) và <Footer /> (Tầng 6) vào bên trong file Home.jsx (và sau này là Shop.jsx, Cart.jsx...), nên file App.jsx tuyệt đối không được gọi lại hai linh kiện này nữa. Nếu viết vào đây, trang web sẽ bị lỗi hiển thị thừa 2 thanh menu và 2 chân trang.
2.	Cú pháp đường dẫn động :id ở trang chi tiết:
3.	Lưu ý dòng <Route path="/product/:id" ... />. Dấu hai chấm :id là cú pháp bắt buộc của React Router DOM để định nghĩa một tham số động. Nhờ nó, khi sinh viên bấm vào thẻ <ProductCard /> có ID là 101 hay 102, hệ thống sẽ dẫn tới đúng trang chi tiết của sản phẩm đó để gọi API.

 
Chuẩn bị:
1)	file api/axiosClient.js hoàn chỉnh
2)	tạo folder components, 
a)	tạo tiếp file Header.jsx
import React from 'react';
function Header() 
{ 
return <div> Đây là phần đầu trên các trang web </div>; 
}

b)	tạo tiếp file Footer.jsx
import React from 'react';
function Header() 
{ 
return <div> Đây là phần cuối trên các trang web </div>; 
}
3)	các folder con trong folder pages:
a)	blog
b)	blog-detail
c)	cart
d)	checkout
e)	home
f)	product-detail
g)	shop
4)	các file index.js trong 7 folder trên
có nội dung cơ bản:
import React from 'react';
function Blog() 
{ 
return <div>Trang xxxxxxxxxxx (Đang phát triển...)</div>; 
}
export default Blog;
5)	folder services để chứa các file dịch vụ gọi ngầm các web api
	 


1. Thanh điều hướng trên cùng (Header / Navigation Bar)
Đây là thành phần cố định ở trên cùng của mọi trang web, giúp người dùng định vị và tìm kiếm.
●	Logo cửa hàng: Đặt ở góc trái, khi nhấp vào luôn luôn dẫn người dùng quay trở lại trang chủ.
●	Thanh tìm kiếm (Search Bar): Ô nhập liệu đơn giản để khách hàng gõ nhanh tên trang phục hoặc mã sản phẩm cần tìm.
●	Menu điều hướng: Các đường link dẫn sang các phân hệ chính như: Trang chủ, Cửa hàng (Shop), Tin tức (Blog), Giới thiệu, Liên hệ.
●	Khối tài khoản & Giỏ hàng (Cart Icon): Biểu tượng giỏ hàng nhỏ (thường có số lượng sản phẩm đi kèm như 🛒 0) và nút Đăng nhập/Đăng ký dành cho thành viên mua hàng.
2. Khu vực Banner chính (Hero Section / Slider)
Nằm ngay dưới Header, đây là khu vực chiếm diện tích lớn và bắt mắt nhất khi vừa mở trang web.
●	Hình ảnh/Slider động: Hiển thị các hình ảnh chất lượng cao về bộ sưu tập mới (ví dụ: Xu hướng Thời trang Công sở hè 2026 hoặc Bộ sưu tập Đầm dạ hội mùa lễ hội).
●	Tiêu đề & Nút kêu gọi hành động (Call to Action - CTA): Một dòng chữ ngắn gọn quảng bá chương trình giảm giá (Ví dụ: "Ưu đãi lên đến 50%") đi kèm một nút bấm nổi bật như "Mua ngay" hoặc "Khám phá bộ sưu tập" để điều hướng thẳng người dùng sang trang danh sách sản phẩm.
3. Khối danh mục sản phẩm
Thanh menu ngang hiển thị danh mục sản phẩm kéo từ API.
4. Lưới sản phẩm (Product Grid / Showcase)
Đây là "trái tim" của trang chủ bán hàng, nơi trưng bày trực tiếp các sản phẩm cụ thể. Thông thường, một website đơn giản sẽ chia làm 2 tab hoặc 2 hàng: Sản phẩm mới về (New Arrivals) hoặc Sản phẩm bán chạy (Best Sellers). Dữ liệu ở đây sẽ được gọi real-time từ API lên và đổ vào các thẻ sản phẩm (Product Card), mỗi thẻ bao gồm:
●	Ảnh đại diện sản phẩm: Hình ảnh trang phục phom dáng chuẩn.
●	Tên sản phẩm: Ví dụ "Áo Sơ mi Lụa Cổ Đức Premium".
●	Giá tiền: Được định dạng chuẩn (ví dụ: 450.000 ₫).
●	Nút tương tác nhanh: Biểu tượng trái tim (Yêu thích) hoặc nút "Thêm vào giỏ".
5. Khối bài viết tin tức & xu hướng (Latest Blog / News)
Thành phần CMS (quản trị nội dung) giúp website tăng tính tương tác và hỗ trợ SEO tốt hơn.
●	Hiển thị từ 3 đến 4 bài viết mới nhất dưới dạng thẻ bài viết (Post Card).
●	Mỗi ô chứa ảnh thu nhỏ (Thumbnail), tiêu đề bài viết (Ví dụ: "Top 5 mẫu đầm dạ hội đuôi cá tôn dáng nhất năm 2026"), ngày đăng, và một đoạn mô tả ngắn trích dẫn để kích thích người đọc bấm vào xem chi tiết.
6. Chân trang (Footer)
Thành phần cố định ở dưới cùng của website, chứa các thông tin pháp lý và kết nối phụ.
●	Thông tin liên hệ: Địa chỉ cửa hàng, số điện thoại hotline, email hỗ trợ.
●	Liên kết nhanh: Chính sách bảo mật, chính sách đổi trả, hướng dẫn chọn size quần áo.
●	Mạng xã hội: Các biểu tượng kết nối đến Fanpage Facebook, Instagram, TikTok của cửa hàng.
💡 Gợi ý tư duy bóc tách mã nguồn (ReactJS):
Khi hướng dẫn triển khai giao diện này sang ReactJS, hãy nhắc các em không viết một file Home.jsx dài hàng nghìn dòng code, mà phải tư duy theo kiểu Module hóa:
●	Chia nhỏ Header thành <Header />, chân trang thành <Footer />.
●	Ô sản phẩm lặp đi lặp lại thành một Component riêng là <ProductCard item={product} />.
●	Khi đó, trang chủ Home.jsx sẽ cực kỳ ngắn gọn, chỉ là nơi lắp ghép các mảnh đồ chơi lại với nhau:
●	JavaScript
return (
  <div>
    <Header />
    <HeroBanner />
    <CategoryMenu />
    <ProductGrid />
    <LatestBlog />
    <Footer />
  </div>
);
Giải thích:
<Header /> (Mục 1): Thanh điều hướng, logo, thanh tìm kiếm và biểu tượng giỏ hàng cố định.
<HeroBanner /> (Mục 2): Khối banner lớn, hình ảnh đại diện và nút CTA kêu gọi hành động.
<CategoryMenu /> (Mục 3): Thanh menu ngang hiển thị danh mục sản phẩm kéo từ API.
<ProductGrid /> (Mục 4): Lưới hiển thị danh sách các thẻ sản phẩm quần áo thời trang.
<LatestBlog /> (Mục 5): Khối hiển thị các bài viết tin tức xu hướng phối đồ.
<Footer /> (Mục 6): Chân trang quản trị thông tin liên hệ và chính sách cửa hàng.


 
Mã nguồn gợi ý chi tiết cho file src/pages/home/index.jsx
Dựa trên cấu trúc bóc tách giao diện dạng Module hóa (Component-based) đã thống nhất ở bước trước, file Home.jsx của chúng ta sẽ đóng vai trò là "khung xương tổng" để lắp ghép các thành phần lại với nhau.
Đồng thời, để chuẩn bị dữ liệu cho FrontEnd, trang chủ sẽ trực tiếp sử dụng thư viện axios (hoặc axiosClient đã cấu hình ở Buổi 7) để gọi API lấy danh sách bài viết tin tức xu hướng (GET /api/Posts) real-time từ Backend ASP.NET Core và truyền xuống cho component con.
Dưới đây là mã nguồn gợi ý chi tiết cho file src/pages/home/index.jsx, được viết bằng Functional Component kèm theo các Hooks (useState, useEffect) và có ghi chú giải thích tường tận để dễ đọc hiểu:
MÃ NGUỒN GỢI Ý: src/Pages/home/index.jsx
import React from 'react';


// IMPORT ĐỦ 6 TẦNG THEO ĐÚNG THỨ TỰ HƯỚNG DẪN
import Header from '../../components/Header';
import HeroBanner from './HeroBanner';
import CategoryMenu from './CategoryMenu';
import ProductGrid from './ProductGrid';
import LatestBlog from './LatestBlog';
import Footer from '../../components/Footer';


function Home() {
    return (
        <div className="homepage-container">
            {/* TẦNG 1: Thanh tiện ích, logo, ô tìm kiếm và giỏ hàng nhanh */}
            <Header />


            {/* TẦNG 2: Banner quảng cáo lớn, hình khối trang trí và nút kêu gọi mua hàng */}
            <HeroBanner />


            {/* TẦNG 3: Menu ngang hiển thị danh mục sản phẩm (Gọi API /api/CategoriesProducts) */}
            <CategoryMenu />


            {/* TẦNG 4: Lưới hiển thị danh sách sản phẩm thời trang (Gọi API /api/Products) */}
            <ProductGrid />


            {/* TẦNG 5: Khối hiển thị các bài viết tin tức xu hướng mặc đẹp (Gọi API /api/Posts) */}
            <LatestBlog />


            {/* TẦNG 6: Chân trang quản trị thông tin liên hệ, hotline và chính sách cửa hàng */}
            <Footer />
        </div>
    );
}


export default Home;


💡 ĐIỂM CHUYÊN MÔN CẦN LƯU Ý KHI VIẾT FILE NÀY:
Cái hay của kiến trúc Component-Based trong ReactJS thông qua file Home.jsx này:
1.	Tính tường minh cao (Clean Code): Nhìn vào file home/index.jsx, bất kỳ ai cũng có thể hình dung ra ngay bố cục giao diện của trang chủ từ trên xuống dưới mà không cần phải đọc hàng ngàn dòng mã HTML/CSS lồng nhau.
2.	Dễ dàng bảo trì & Chia nhỏ công việc nhóm: Nếu giao diện Lưới sản phẩm bị lỗi, biết ngay mình chỉ cần vào đúng file ProductGrid.jsx để sửa, hoàn toàn không làm ảnh hưởng hay vỡ giao diện của phần <Header /> hay <LatestBlog />. Khi làm bài tập nhóm, mỗi lập trình viên có thể nhận trách nhiệm viết trọn vẹn 1 đến 2 component độc lập rồi ghép chung vào file Home.jsx này rất mượt mà.
3.	Đúng chuẩn Single Page Application (SPA): Giữ trang tổng tinh gọn giúp luồng quản lý State và Effect ở các buổi học nâng cao (như khi làm phân trang, lọc sản phẩm theo danh mục ở Buổi 8, Buổi 9) trở nên rõ ràng, không bị chồng chéo dữ liệu.
Bản script này rất tường minh và chuẩn hóa kiến trúc SPA kết nối API, tự tin triển khai tiếp các cấu trúc trang shop/index.jsx hay cart/index.jsx tương tự

 
<Header /> (Mục 1): Thanh điều hướng, logo, thanh tìm kiếm và biểu tượng giỏ hàng cố định.
Dưới đây là mã nguồn gợi ý chi tiết cho tầng 1 – <Header />. Để đồng bộ hoàn hảo với kiến trúc này, chúng ta sẽ tách biệt phần Menu danh mục ra một phần độc lập là <CategoryMenu /> (nằm ở tầng 3). Do đó, file Header.jsx này sẽ tập trung tối đa vào các chức năng cốt lõi: Hiển thị thanh tiện ích Topbar, Logo thương hiệu, Thanh tìm kiếm sản phẩm và Biểu tượng Giỏ hàng nhanh.
 
Mã nguồn được viết theo dạng Functional Component, tích hợp các class tiện ích của Bootstrap 4 và bổ sung ghi chú sư phạm đầy đủ để dễ dàng theo dõi:
MÃ NGUỒN GỢI Ý: src/components/Header.jsx
import React from 'react';
// Import thành phần Link để chuyển trang mượt mà không bị tải lại trang (Hard-Reload)
import { Link, useLocation } from 'react-router-dom';

function Header() {
    // Dùng hook useLocation của react-router-dom để bắt đường dẫn URL hiện tại
    const location = useLocation();

    // Hàm xử lý giả lập khi bấm Tìm kiếm nhanh
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        alert("Chức năng tìm kiếm nhanh trên Header sẽ kết nối API Search ở các buổi sau!");
    };

    // Hàm hỗ trợ kiểm tra trang hiện tại để gán hiệu ứng làm sáng (Active) menu chuẩn v4
    const isActive = (path) => {
        // Nếu trùng khớp URL, trả về class 'active font-weight-bold text-primary', ngược lại trả về 'text-dark'
        return location.pathname === path ? 'active font-weight-bold text-primary' : 'text-dark';
    };

    return (
        <header className="main-header-wrapper bg-white shadow-sm sticky-top">

            {/* ──────────────────────────────────────────────────────── */}
            {/* TẦNG TIỆN ÍCH 1: THANH TOP BAR (Cú pháp chuẩn Bootstrap 4) */}
            {/* ──────────────────────────────────────────────────────── */}
            <div className="top-bar bg-dark py-2 text-white" style={{ fontSize: '13px' }}>
                <div className="container d-flex justify-content-between align-items-center">
                    {/* Bên trái: Hotline & Email (Sử dụng mr-3 chuẩn v4) */}
                    <div className="top-bar-left">
                        <span className="mr-3">
                            <i className="fas fa-phone-alt mr-1"></i> Hotline: 090x.xxx.xxx
                        </span>
                        <span>
                            <i className="fas fa-envelope mr-1"></i> Email: support@thaicms.retail
                        </span>
                    </div>
                    {/* Bên phải: Nút Đăng nhập / Đăng ký nhanh (Sử dụng mr-3 chuẩn v4) */}
                    <div className="top-bar-right">
                        <Link to="/login" className="text-white mr-3 text-decoration-none transition-link">
                            <i className="fas fa-user mr-1"></i> Đăng nhập
                        </Link>
                        <Link to="/register" className="text-white text-decoration-none transition-link">
                            <i className="fas fa-user-plus mr-1"></i> Đăng ký
                        </Link>
                    </div>
                </div>
            </div>

            {/* ──────────────────────────────────────────────────────── */}
            {/* TẦNG TIỆN ÍCH 2: KHU VỰC CHÍNH (Logo, Search Bar & Giỏ hàng) */}
            {/* ──────────────────────────────────────────────────────── */}
            <div className="main-header py-3 border-bottom">
                <div className="container">
                    <div className="row align-items-center">

                        {/* 1. Cột Logo Thương Hiệu */}
                        <div className="col-md-3 col-6">
                            <Link to="/" className="text-decoration-none">
                                <h3 className="font-weight-bold m-0" style={{ color: '#005088', letterSpacing: '1px' }}>
                                    ThaiCMS<span style={{ color: '#11CAA0' }}>.Fashion</span>
                                </h3>
                            </Link>
                        </div>

                        {/* 2. Cột Ô Tìm Kiếm Sản Phẩm (Sử dụng border-right-0 chuẩn v4) */}
                        <div className="col-md-6 d-none d-md-block">
                            <form className="input-group" onSubmit={handleSearchSubmit}>
                                <input
                                    type="text"
                                    className="form-control border-right-0"
                                    placeholder="Tìm kiếm mẫu đầm dạ hội, sơ mi công sở..."
                                    style={{ borderRadius: '20px 0 0 20px', fontSize: '14px' }}
                                />
                                <div className="input-group-append">
                                    <button
                                        className="btn btn-primary border-left-0 px-4"
                                        type="submit"
                                        style={{
                                            borderRadius: '0 20px 20px 0',
                                            backgroundColor: '#005088',
                                            borderColor: '#005088'
                                        }}
                                    >
                                        <i className="fas fa-search"></i>
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* 3. Cột Giỏ Hàng Nhanh (Sử dụng text-right chuẩn v4) */}
                        <div className="col-md-3 col-6 text-right">
                            <Link to="/cart" className="btn position-relative p-2" style={{ color: '#005088', fontSize: '22px' }}>
                                <i className="fas fa-shopping-bag"></i>
                                {/* Vòng tròn badge đỏ số lượng giỏ hàng sống */}
                                <span
                                    className="badge badge-pill position-absolute"
                                    style={{
                                        top: '0',
                                        right: '0',
                                        backgroundColor: '#11CAA0',
                                        color: '#fff',
                                        fontSize: '11px',
                                        padding: '4px 6px'
                                    }}
                                >
                                    0
                                </span>
                            </Link>
                        </div>

                    </div>
                </div>
            </div>

            {/* ──────────────────────────────────────────────────────── */}
            {/* TẦNG TIỆN ÍCH 3: THANH MENU ĐIỀU HƯỚNG CHÍNH (BOOTSTRAP 4.6.2) */}
            {/* ──────────────────────────────────────────────────────── */}
            <div className="main-navigation bg-white py-2">
                <div className="container">
                    <nav className="navbar navbar-expand p-0">
                        {/* Ứng dụng hệ lớp nav của Bootstrap 4 để quản lý danh sách menu dọc/ngang */}
                        <ul className="navbar-nav w-100">

                            {/* Menu 1: Trang Chủ (Sử dụng mr-4 để thay thế thuộc tính gap-2 của v5) */}
                            <li className="nav-item mr-4">
                                <Link to="/" className={`nav-link p-0 text-decoration-none ${isActive('/')}`} style={{ transition: 'all 0.2s' }}>
                                    Trang Chủ
                                </Link>
                            </li>

                            {/* Menu 2: Cửa Hàng */}
                            <li className="nav-item mr-4">
                                <Link to="/shop" className={`nav-link p-0 text-decoration-none ${isActive('/shop')}`} style={{ transition: 'all 0.2s' }}>
                                    Cửa Hàng
                                </Link>
                            </li>

                            {/* Menu 3: Tin Tức / Blog */}
                            <li className="nav-item mr-4">
                                <Link to="/blog" className={`nav-link p-0 text-decoration-none ${isActive('/blog')}`} style={{ transition: 'all 0.2s' }}>
                                    Tin Tức / Blog
                                </Link>
                            </li>

                            {/* Menu 4: Về Chúng Tôi */}
                            <li className="nav-item">
                                <Link to="/about" className={`nav-link p-0 text-decoration-none ${isActive('/about')}`} style={{ transition: 'all 0.2s' }}>
                                    Về Chúng Tôi
                                </Link>
                            </li>

                        </ul>
                    </nav>
                </div>
            </div>

        </header>
    );
}
export default Header;

 
💡 ĐIỂM NHẤN CÓ THỂ LƯU Ý KHI GHÉP MÃ:
1.	Chuẩn hóa kiến trúc 6 tầng: theo sơ đồ khối Home.jsx của hệ thống, toàn bộ phần menu điều hướng và API danh mục (GET /api/CategoriesProducts) đã được tách hẳn sang phần <CategoryMenu /> ở tầng số 3. Việc giữ file <Header /> tinh gọn như thế này giúp các em dễ quản lý mã nguồn và không bị rối khi triển khai giỏ hàng ở Buổi 8.
2.	Sử dụng thuộc tính sticky-top: Lớp CSS sticky-top của Bootstrap giúp toàn bộ thanh Header ghim chặt ở mép trên cùng của màn hình khi cuộn chuột. Điều này đảm bảo ô tìm kiếm và giỏ hàng luôn hiển thị trước mắt người dùng để tối ưu hóa trải nghiệm mua sắm (UX).
3.	Xử lý sự kiện Form (onSubmit): sử dụng hàm e.preventDefault() để chặn hành vi tải lại trang mặc định của thẻ <form>, một tư duy bắt buộc khi làm việc với các ứng dụng Single Page Application (SPA) như ReactJS.



 
<HeroBanner /> (Mục 2): Khối banner lớn, hình ảnh đại diện và nút CTA kêu gọi hành động.
Phần dành riêng làm thêm kiểu Slider gì đó.
 
Mã nguồn file src/pages/home/HeroBanner.jsx đã được tối giản hóa tối đa, chỉ hiển thị đúng dòng chữ yêu cầu theo dạng một khung Placeholder gọn gàng để sinh viên nhìn vào là biết phần việc mình cần tự thực hành 
MÃ NGUỒN GỢI Ý: src/pages/home/HeroBanner.jsx
import React from 'react';
function HeroBanner() {
    return (
        <section
            className="hero-banner-clean bg-light my-4 d-flex align-items-center justify-content-center"
            style={{
                minHeight: '200px',
                border: '2px dashed #11CAA0',
                borderRadius: '8px'
            }}
        >
            <div className="text-center p-3">
                <h4 className="font-weight-bold text-secondary mb-0">
                    Dành tự thực hành
                </h4>
            </div>
        </section>
    );
}
export default HeroBanner; 
<CategoryMenu /> (Mục 3): Thanh menu ngang hiển thị danh mục sản phẩm kéo từ API.
 Dưới đây là mã nguồn gợi ý chi tiết cho file thành phần component  tầng 3 – <CategoryMenu />. file thành phần component  này chịu trách nhiệm gọi API lấy danh sách phân loại sản phẩm (GET /api/CategoriesProducts) để tạo ra một thanh menu ngang chạy động hoàn toàn. Khi người dùng bấm vào từng danh mục (như Thời trang Công sở, Đầm Dạ hội), chúng ta sẽ chuẩn bị sẵn một hàm xử lý sự kiện để sau này truyền mã ID sang lọc lại dữ liệu cho tầng 4 (<ProductGrid />).
Mã nguồn sử dụng React Hooks (useState, useEffect), kết hợp các class List-group/Nav của Bootstrap 4 và có ghi chú đầy đủ:
Trước tiên ta phải tạo trước file /src/services/categoryProductService.js làm nhiệm vụ lấy danh sách danh mục các sản phẩm từ web api đã chuẩn bị trước đó. Đây chính là nguồn dữ liệu cho component CategoryMenu.jsx
	Source code: /src/services/categoryProductService.js
import axiosClient from '../api/axiosClient';

const categoryProductService = {
    /**
     * Hàm lấy toàn bộ danh mục SẢN PHẨM từ Backend
     * Endpoint này kết nối tới CategoryProductController trong ASP.NET Core
     */
    getAllCategoryProducts: () => {
        // Đường dẫn định tuyến khớp chính xác với cấu trúc định tuyến [Route("api/[controller]")] của Backend
        const url = '/categoriesproducts';
        return axiosClient.get(url);
    }
};

export default categoryProductService;


MÃ NGUỒN GỢI Ý: src/components/CategoryMenu.jsx
import React, { useState, useEffect } from 'react';
// Import dịch vụ gọi API danh mục sản phẩm đã thiết lập ở Buổi 7
import categoryProductService from '../../services/categoryProductService';


function CategoryMenu() {
    // 1. Khai báo State để lưu mảng danh mục sản phẩm từ SQL Server đổ về
    const [categories, setCategories] = useState([]);

    // 2. Khai báo State để theo dõi danh mục nào đang được người dùng bấm chọn (Mặc định là chọn tất cả - null)
    const [activeCategoryId, setActiveCategoryId] = useState(null);

    // 3. Khai báo State quản lý trạng thái Loading dữ liệu mạng
    const [loading, setLoading] = useState(true);


    // 4. Gọi API ngay khi file thành phần component  Tầng 3 được nạp lên trang chủ
    useEffect(() => {
        const fetchMenuCategories = async () => {
            try {
                setLoading(true);
                // Gọi API thực tế: GET https://localhost:xxxx/api/CategoriesProducts
                const data = await categoryProductService.getAllCategoryProducts();

                setCategories(data);
            } catch (error) {
                console.error("Lỗi khi kéo danh mục sản phẩm từ Backend:", error);
            } finally {
                setLoading(false);
            }
        };


        fetchMenuCategories();
    }, []);


    // 5. Hàm xử lý khi khách hàng click chọn một danh mục thời trang cụ thể
    const handleCategoryClick = (id) => {
        setActiveCategoryId(id);
        // Điểm mở rộng đồ án: Đây là nơi sinh viên sẽ viết logic truyền Id này sang
        // để ép file thành phần component  <ProductGrid /> (Tầng 4) tải lại sản phẩm theo bộ lọc.
        console.log(`Sinh viên sẽ xử lý lọc sản phẩm cho danh mục có ID: ${id}`);
    };


    // Kịch bản giao diện tạm thời trong lúc hệ thống đang tải dữ liệu mạng
    if (loading) {
        return (
            <div className="container my-3 text-center">
                <div className="spinner-border spinner-border-sm text-info" role="status"></div>
                <span className="ml-2 text-muted" style={{ fontSize: '14px' }}>Đang nạp menu phân loại...</span>
            </div>
        );
    }


    return (
        <section id="category-menu-section" className="category-menu-wrapper my-4">
            <div className="container">
                <div className="card shadow-sm border-0" style={{ borderRadius: '15px', overflow: 'hidden' }}>
                    <div className="card-body p-2 bg-white">

                        {/* Sử dụng cấu trúc Flexbox Nav của Bootstrap để dàn ngang menu */}
                        <ul className="nav nav-pills nav-fill flex-column flex-sm-row">

                            {/* Nút mặc định: Xem tất cả sản phẩm */}
                            <li className="nav-item m-1">
                                <button
                                    className={`nav-link w-100 font-weight-bold border-0 text-uppercase py-3 ${activeCategoryId === null ? 'active' : 'text-secondary bg-transparent'}`}
                                    style={{
                                        borderRadius: '10px',
                                        fontSize: '14px',
                                        backgroundColor: activeCategoryId === null ? '#005088' : 'transparent',
                                        transition: '0.3s'
                                    }}
                                    onClick={() => handleCategoryClick(null)}
                                >
                                    <i className="fas fa-th-large mr-2"></i> Tất cả sản phẩm
                                </button>
                            </li>


                            {/* VÒNG LẶP ĐỘNG: Duyệt mảng categories từ API Backend sinh ra các nút menu */}
                            {categories.map((cat) => (
                                <li className="nav-item m-1" key={cat.id}>
                                    <button
                                        className={`nav-link w-100 font-weight-bold border-0 text-uppercase py-3 ${activeCategoryId === cat.id ? 'active' : 'text-secondary bg-transparent'}`}
                                        style={{
                                            borderRadius: '10px',
                                            fontSize: '14px',
                                            backgroundColor: activeCategoryId === cat.id ? '#11CAA0' : 'transparent',
                                            color: activeCategoryId === cat.id ? '#fff' : '#6c757d',
                                            transition: '0.3s'
                                        }}
                                        onClick={() => handleCategoryClick(cat.id)}
                                    >
                                        {/* Hiển thị tên danh mục thật từ SQL Server (camelCase 'name') */}
                                        {cat.name}
                                    </button>
                                </li>
                            ))}


                        </ul>


                    </div>
                </div>
            </div>
        </section>
    );
}


export default CategoryMenu;

 
Lưu Ý:
1.	Quy tắc camelCase cốt lõi: Nhắc nhở sinh viên một lần nữa, mặc dù thuộc tính trong C# viết hoa là cat.Id và cat.Name, nhưng khi chuyển giao sang môi trường ReactJS thông qua API JSON, các biến bắt buộc phải viết thường chữ đầu thành cat.id và cat.name.
2.	Chuẩn bị cho Buổi 8 (Nâng cao trạng thái): Bản chất của menu này là khi bấm nút sẽ lọc sản phẩm ở <ProductGrid /> phía dưới."Để hai tầng 3 và 4 nói chuyện được với nhau, các em sẽ cần học cách đưa state activeCategoryId này lên quản lý tập trung ở file trang tổng home/index.jsx tại các buổi sau." Cách gợi mở này giúp các em có sự chuẩn bị trước về mặt tư duy logic.

 


<ProductGrid /> (Mục 4): Lưới hiển thị danh sách các thẻ sản phẩm quần áo thời trang.
 

Việc bóc tách riêng một thẻ sản phẩm ra thành file thành phần component  <ProductCard /> độc lập rồi chèn vào lưới <ProductGrid /> là một bước đi cực kỳ chuẩn xác trong tư duy lập trình ReactJS (Component-Based Architecture).
Cách làm này giúp code sạch hơn, dễ bảo trì và quan trọng nhất là file thành phần component  <ProductCard /> này có thể tái sử dụng ở rất nhiều nơi khác trong đồ án sau này (như trang danh sách sản phẩm liên quan, trang sản phẩm yêu thích, hoặc slide sản phẩm mới).

Dưới đây là mã nguồn hướng dẫn chi tiết 2 bước bóc tách và truyền dữ liệu (Props) để thực hành:

BƯỚC 1: Tạo file thành phần component con src/components/ProductCard.jsx
 

File thành phần component  này đóng vai trò là một "khuôn mẫu" chung. Nó sẽ nhận dữ liệu của từng sản phẩm thông qua một biến truyền vào gọi là props (cụ thể ở đây đặt tên là item).


import React from 'react';

const IMAGE_BASE_URL = "https://localhost:7111"; // đường dẫn bên Backend
// file thành phần component  nhận vào đối tượng 'item' từ file thành phần component  cha truyền xuống
function ProductCard({ item }) {
    
    // Hàm bổ trợ: Định dạng số thô thành chuỗi tiền tệ VNĐ (450.000 ₫)
    const formatCurrency = (value) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(value);
    };

    return (
        <div className="card h-100 shadow-sm border-0 product-card-hover" style={{ borderRadius: '12px', overflow: 'hidden', transition: '0.3s' }}>
            
            {/* Khối 1: Hình ảnh trang phục + Nhãn tồn kho */}
            <div className="position-relative overflow-hidden" style={{ height: '320px', backgroundColor: '#f8fafc' }}>
                <img 
                    src={IMAGE_BASE_URL + item.imageUrl}
                    className="card-img-top w-100 h-100" 
                    alt={item.name}
                    style={{ objectFit: 'cover', transition: 'transform 0.5s' }}
                    onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                    onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                />
                
                {/* Thuật toán: Nếu tồn kho thấp (<= 5) thì đóng dấu cảnh báo */}
                {item.stockQuantity <= 5 && (
                    <span className="badge badge-danger position-absolute px-2 py-1" style={{ top: '15px', left: '15px', borderRadius: '4px', fontSize: '11px' }}>
                        Bán chạy / Còn {item.stockQuantity} chiếc
                    </span>
                )}
            </div>

            {/* Khối 2: Nội dung thông tin chi tiết trang phục */}
            <div className="card-body d-flex flex-column p-3">
                {/* Tên sản phẩm */}
                <h6 className="card-title font-weight-bold text-dark text-truncate mb-1" title={item.name} style={{ fontSize: '16px' }}>
                    {item.name}
                </h6>
                
                {/* Giá tiền sản phẩm */}
                <p className="card-text font-weight-bold text-danger mb-3" style={{ fontSize: '17px' }}>
                    {formatCurrency(item.price)}
                </p>

                {/* Cụm nút bấm tương tác đẩy sát đáy thẻ (mt-auto) */}
                <div className="mt-auto pt-2 border-top d-flex justify-content-between">
                    <a 
                        href={`/product/${item.id}`} 
                        className="btn btn-sm btn-outline-primary font-weight-bold px-3" 
                        style={{ borderRadius: '20px', flexGrow: 1, textAlign: 'center' }}
                    >
                        <i className="fas fa-eye mr-1"></i> Chi tiết
                    </a>
                    <button 
                        className="btn btn-sm text-white font-weight-bold px-3 ml-2" 
                        style={{ borderRadius: '20px', backgroundColor: '#11CAA0', borderColor: '#11CAA0', flexGrow: 1 }}
                        onClick={() => alert(`Đã thêm mẫu [${item.name}] vào giỏ hàng!`)}
                    >
                        <i className="fas fa-cart-plus mr-1"></i> Mua ngay
                    </button>
                </div>
            </div>

        </div>
    );
}

export default ProductCard;

BƯỚC 2: Tạo file thành phần component cha  src/pages/home/ProductGrid.jsx

 

Tại file này, chúng ta tiến hành import ProductCard vào, sau đó dùng vòng lặp .map() để lôi từng sản phẩm ra và truyền vào file thành phần component  con thông qua thuộc tính item={product}.

Trước tiên ta phải tạo trước file /src/services/productService.js làm nhiệm vụ lấy danh sách các sản phẩm từ web api đã chuẩn bị trước đó. Đây chính là nguồn dữ liệu cho component ProductGrid.jsx
	Source code productService.js
// Import cấu hình axiosClient dùng chung từ thư mục api
import axiosClient from '../api/axiosClient';

const productService = {
    /**
     * 1. Lấy danh sách toàn bộ sản phẩm thời trang (hoặc theo bộ lọc)
     * API Endpoint: GET https://localhost:xxxx/api/Products
     */
    getAllProducts: async () => {
        try {
            // Thực hiện gọi API GET để lấy danh sách sản phẩm
            const response = await axiosClient.get('/Products');

            // Trả về mảng dữ liệu sản phẩm
            return response.data || response;
        } catch (error) {
            console.error("Lỗi API getAllProducts:", error);
            throw error; // Đẩy lỗi ra ngoài để component ProductGrid bắt được và xử lý giao diện
        }
    },

    /**
     * 2. Lấy thông tin chi tiết của một sản phẩm theo ID
     * API Endpoint: GET https://localhost:xxxx/api/Products/{id}
     */
    getProductById: async (id) => {
        try {
            const response = await axiosClient.get(`/Products/${id}`);
            return response.data || response;
        } catch (error) {
            console.error(`Lỗi API getProductById với ID ${id}:`, error);
            throw error;
        }
    }
};

// CRITICAL: Xuất mặc định đối tượng này để file ProductGrid.jsx import vào không bị lỗi 'default was not found'
export default productService;

Source code ProductGrid.jsx
import React, { useState, useEffect } from 'react';
import productService from '../../services/productService';
// IMPORT file thành phần component  CON VÀO ĐỂ SỬ DỤNG
import ProductCard from '../../components/ProductCard';


function ProductGrid() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchAllProducts = async () => {
            try {
                setLoading(true);
                const data = await productService.getAllProducts();
                setProducts(data);
            } catch (error) {
                console.error("Lỗi hệ thống khi tải danh sách sản phẩm:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchAllProducts();
    }, []);


    if (loading) {
        return (
            <div className="container my-5 text-center">
                <div className="spinner-border text-primary" role="status"></div>
                <p className="mt-2 text-muted">Đang tải danh sách trang phục mới nhất...</p>
            </div>
        );
    }


    return (
        <section className="product-grid-wrapper py-4">
            <div className="container">

                <div className="section-heading mb-4 d-flex justify-content-between align-items-center border-bottom pb-2">
                    <h4 className="font-weight-bold text-uppercase m-0" style={{ color: '#005088' }}>
                        <i className="fas fa-sparkles mr-2 text-warning"></i> Sản phẩm nổi bật
                    </h4>
                    <span className="text-muted" style={{ fontSize: '14px' }}>
                        Hiển thị ({products.length}) sản phẩm
                    </span>
                </div>


                {/* KHUNG LƯỚI GRID SYSTEM */}
                <div className="row">
                    {products.map((product) => (
                        <div className="col-xl-3 col-lg-4 col-sm-6 col-12 mb-4" key={product.id}>
                            {/* CHÈN ĐÚNG file thành phần component  CON TẠI ĐÂY VÀ TRUYỀN DỮ LIỆU ĐI */}
                            <ProductCard item={product} />
                        </div>
                    ))}
                </div>


            </div>
        </section>
    );
}


export default ProductGrid;

💡 Giải thích:

1.	Khái niệm "Props" (Truyền dữ liệu xuôi): nhấn mạnh kịch bản: ProductGrid giữ mảng dữ liệu lớn lấy từ API, khi lặp qua từng phần tử product, nó ném cục dữ liệu đó cho ProductCard qua cú pháp <ProductCard item={product} />. file thành phần component con chỉ việc hứng lấy bằng từ khóa { item } ở hàm nhận và render ra.
2.	Quản lý thuộc tính key: Khi bóc tách, thuộc tính key={product.id} phải được đặt ở thẻ bọc ngoài cùng nằm bên trong vòng lặp .map() (tức là đặt ở thẻ <div className="col-xl-3..."> trong file cha), chứ không phải đặt bên trong file con ProductCard.jsx. Đây là lỗi kinh điển khiến bị cảnh báo vàng ở Console F12.

 
<LatestBlog /> (Mục 5): Khối hiển thị các bài viết tin tức xu hướng phối đồ.
 

Việc bóc tách riêng một bài viết thành  component <PostCard /> độc lập rồi nhúng vào lưới <LatestBlog /> là RẤT NÊN LÀM và hoàn toàn nhất quán với tư duy bóc tách <ProductCard /> ở tầng 4 mà ta vừa thực hiện.
Mặc dù trang chủ hiện tại chỉ hiển thị đúng 3 bài viết mới nhất, nhưng khi đồ án phát triển lên các buổi sau, sẽ phải làm thêm Trang danh sách tin tức (/blog) và phân hệ Bài viết liên quan ở trang chi tiết tin tức. Nếu bóc tách ngay từ bây giờ, sẽ tái sử dụng được chiếc "khuôn mẫu" này ở khắp mọi nơi mà không phải copy-paste lại đoạn code HTML/CSS dài dòng.

Dưới đây là hướng dẫn 2 bước bóc tách kèm mã nguồn chuẩn chỉnh để thực hành:

BƯỚC 1: TẠO  component CON TRONG FILE src/components/PostCard.jsx
 
Component này đóng vai trò hiển thị cấu trúc một tấm thẻ tin tức, nhận dữ liệu của từng bài viết thông qua prop post từ  component cha truyền xuống.
JavaScript
import React from 'react';

const IMAGE_BASE_URL = "https://localhost:7111"; // đường dẫn bên Backend
//  component con nhận dữ liệu 'post' từ  component cha truyền xuống
function PostCard({ post }) {
    return (
        <div className="card h-100 shadow-sm border-0 blog-card-hover" style={{ borderRadius: '12px', overflow: 'hidden', transition: '0.3s' }}>

            {/* 1. Hình ảnh đại diện của bài viết (Thumbnail) */}
            <div className="blog-image-wrapper" style={{ height: '220px', overflow: 'hidden' }}>
                <img
                    //src={post.imageUrl || 'https://via.placeholder.com/400x250'}
                    src={IMAGE_BASE_URL + post.imageUrl}
                    className="w-100 h-100"
                    alt={post.title}
                    style={{ objectFit: 'cover', transition: '0.5s' }}
                    onMouseOver={(e) => e.target.style.transform = 'scale(1.08)'}
                    onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                />
            </div>


            {/* 2. Nội dung tóm tắt bài viết */}
            <div className="card-body p-4 d-flex flex-column">
                {/* Ngày đăng bài viết */}
                <small className="text-uppercase font-weight-bold text-muted mb-2 d-block" style={{ fontSize: '12px', color: '#11CAA0' }}>
                    <i className="far fa-calendar-alt mr-1"></i>
                    {post.createdDate ? new Date(post.createdDate).toLocaleDateString('vi-VN') : 'Mới cập nhật'}
                </small>


                {/* Tiêu đề bài viết - Giới hạn tối đa 2 dòng để không bị lệch phom */}
                <h5 className="card-title font-weight-bold mb-2" style={{ color: '#005088', fontSize: '18px', lineHeight: '1.4', minHeight: '50px' }}>
                    <a href={`/blog/${post.id}`} className="text-decoration-none text-dark-hover" style={{ color: '#005088' }}>
                        {post.title}
                    </a>
                </h5>


                {/* Đoạn mô tả ngắn (Cắt chuỗi an toàn bảo vệ layout) */}
                <p className="card-text text-secondary text-justify mb-4" style={{ fontSize: '14px', lineHeight: '1.6' }}>
                    {post.summary ? `${post.summary.substring(0, 100)}...` : 'Khám phá bí quyết lựa chọn trang phục phù hợp với vóc dáng để luôn tự tin tỏa sáng...'}
                </p>


                {/* Nút liên kết xem chi tiết đẩy xuống sát đáy Card */}
                <div className="mt-auto pt-2 border-top">
                    <a
                        href={`/blog/${post.id}`}
                        className="font-weight-bold text-decoration-none d-inline-flex align-items-center"
                        style={{ color: '#11CAA0', fontSize: '14px', transition: '0.3s' }}
                        onMouseOver={(e) => e.target.style.color = '#005088'}
                        onMouseOut={(e) => e.target.style.color = '#11CAA0'}
                    >
                        Đọc bài viết <i className="fas fa-long-arrow-alt-right ml-2"></i>
                    </a>
                </div>
            </div>


        </div>
    );
}


export default PostCard;

BƯỚC 2: Tạo component cha  src/components/LatestBlog.jsx

 Tại 

Trước tiên ta phải tạo trước file /src/services/postService.js làm nhiệm vụ lấy danh sách các sản phẩm từ web api đã chuẩn bị trước đó. Đây chính là nguồn dữ liệu cho component latestBlog.jsx

Source code postService.js
// Import cấu hình axiosClient dùng chung đã được cấu hình BaseURL ở thư mục api
import axiosClient from '../api/axiosClient';

const postService = {
    /**
     * 1. Lấy danh sách toàn bộ bài viết tin tức từ Backend
     * API Endpoint: GET https://localhost:xxxx/api/Posts (hoặc /api/Blogs tùy cấu hình Backend)
     */
    getAllPosts: async () => {
        try {
            // Thực hiện gọi API GET qua axiosClient
            const response = await axiosClient.get('/Posts');

            // Trả về dữ liệu mảng bài viết (thường nằm trong response.data hoặc trực tiếp response tùy cấu hình client)
            return response.data || response;
        } catch (error) {
            console.error("Lỗi API getAllBlogs:", error);
            throw error; // Đẩy lỗi ra ngoài để Component nhận biết và xử lý UI (như tắt loading, hiện thông báo lỗi)
        }
    },

    /**
     * 2. Lấy thông tin chi tiết của một bài viết theo ID
     * API Endpoint: GET https://localhost:xxxx/api/Posts/{id}
     */
    getPostById: async (id) => {
        try {
            const response = await axiosClient.get(`/Posts/${id}`);
            return response.data || response;
        } catch (error) {
            console.error(`Lỗi API getBlogById với ID ${id}:`, error);
            throw error;
        }
    }
};

// BẮT BUỘC: Xuất mặc định để file LatestBlog.jsx có thể import trực tiếp không bị lỗi
export default postService;

Source code latestBlog.jsx

import React, { useState, useEffect } from 'react';
import blogService from '../../services/postService';
// IMPORT  component CON VÀO ĐỂ SỬ DỤNG
import PostCard from '../../components/PostCard';


function LatestBlog() { // chỉ lấy 3 tin
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchLatestPosts = async () => {
            try {
                setLoading(true);
                const data = await blogService.getAllPosts();
                const topThreePosts = data.sort((a, b) => b.id - a.id).slice(0, 3);
                setPosts(topThreePosts);
            } catch (error) {
                console.error("Lỗi hệ thống khi tải tin tức thời trang:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchLatestPosts();
    }, []);


    if (loading) {
        return (
            <div className="container my-4 text-center">
                <div className="spinner-border spinner-border-sm text-secondary" role="status"></div>
                <span className="ml-2 text-muted" style={{ fontSize: '14px' }}>Đang nạp tin tức xu hướng...</span>
            </div>
        );
    }


    return (
        <section className="latest-blog-section py-5" style={{ backgroundColor: '#fdfbf7' }}>
            <div className="container">

                <div className="section-heading mb-4 text-center">
                    <h3 className="font-weight-bold text-uppercase" style={{ color: '#005088' }}>
                        Xu Hướng Thời Trang
                    </h3>
                    <p className="text-muted lead" style={{ fontSize: '15px' }}>
                        Cập nhật những mẹo phối đồ và tin tức phong cách mới nhất cùng ThaiCMS
                    </p>
                    <div className="mx-auto" style={{ width: '60px', height: '3px', backgroundColor: '#11CAA0' }}></div>
                </div>


                {/* KHUNG LƯỚI ĐỒNG BỘ  component CON */}
                <div className="row mt-5">
                    {posts.map((item) => (
                        <div className="col-lg-4 col-md-6 col-12 mb-4" key={item.id}>
                            {/* CHÈN COMPONENT CON VÀ TRUYỀN DỮ LIỆU QUA PROP post */}
                            <PostCard post={item} />
                        </div>
                    ))}
                </div>


            </div>
        </section>
    );
}


export default LatestBlog;

🎯 TÓM LẠI GIÁ TRỊ KHI CHO BÓC TÁCH PHẦN NÀY:

1.	Sinh viên thành thục cơ chế Props: Việc lặp lại thao tác bóc tách (ở Tầng 4 làm với sản phẩm, Tầng 5 làm với bài viết) giúp các em khắc sâu kiến thức về cách truyền nhận dữ liệu (props) trong React.
2.	Hình thành tư duy viết code sạch (Clean Code): Tập cho các em thói quen một file .jsx chỉ nên quản lý từ 50 - 100 dòng code. Việc chia nhỏ giúp quản lý dự án vô cùng nhẹ nhàng, khi cần sửa giao diện tấm thẻ chỉ cần mở đúng file PostCard.jsx là xong.

 
<Footer /> (Mục 6): Chân trang quản trị thông tin liên hệ và chính sách cửa hàng.
 
<Footer /> (Mục 6) bây giờ sẽ chia bố cục thành 3 cột bằng nhau (col-md-4), tập trung đúng vào các nội dung tĩnh cơ bản: Giới thiệu, Link chính sách và Thông tin liên hệ.
Dưới đây là mã nguồn đã tinh gọn tối đa để thực hành:
MÃ NGUỒN TỐI GIẢN: src/components/Footer.jsx
JavaScript
import React from 'react';

function Footer() {
    return (
        <footer className="main-footer-wrapper bg-dark text-light pt-5 mt-5">
            {/* PHẦN 1: KHU VỰC THÔNG TIN CHÍNH (3 CỘT LƯỚI ĐƠN GIẢN) */}
            <div className="container pb-4">
                <div className="row">
                    
                    {/* Cột 1: Giới thiệu ngắn gọn về thương hiệu */}
                    <div className="col-md-4 mb-4 mb-md-0">
                        <h4 className="font-weight-bold mb-3" style={{ color: '#11CAA0', letterSpacing: '1px' }}>
                            ThaiCMS<span className="text-white">.Fashion</span>
                        </h4>
                        <p className="text-muted text-justify" style={{ fontSize: '14px', lineHeight: '1.6' }}>
                            Hệ thống thời trang cao cấp dẫn đầu xu hướng. Chúng tôi cam kết mang đến những sản phẩm premium chất lượng cao, định hình phong cách thời thượng cho bạn.
                        </p>
                    </div>

                    {/* Cột 2: Các đường liên kết tĩnh hệ thống Chính sách */}
                    <div className="col-md-4 mb-4 mb-md-0 pl-md-5">
                        <h5 className="font-weight-bold mb-3 text-uppercase border-left pl-2" style={{ borderLeftColor: '#11CAA0', borderLeftWidth: '3px' }}>
                            Chính Sách
                        </h5>
                        <ul className="list-unstyled" style={{ fontSize: '14px' }}>
                            <li className="mb-2">
                                <a href="/policy/delivery" className="text-muted text-decoration-none" onMouseOver={(e) => e.target.style.color = '#11CAA0'} onMouseOut={(e) => e.target.style.color = '#6c757d'}>
                                    <i className="fas fa-chevron-right mr-2" style={{ fontSize: '10px' }}></i>Chính sách giao hàng
                                </a>
                            </li>
                            <li className="mb-2">
                                <a href="/policy/exchange" className="text-muted text-decoration-none" onMouseOver={(e) => e.target.style.color = '#11CAA0'} onMouseOut={(e) => e.target.style.color = '#6c757d'}>
                                    <i className="fas fa-chevron-right mr-2" style={{ fontSize: '10px' }}></i>Chính sách đổi trả 1-1
                                </a>
                            </li>
                            <li className="mb-2">
                                <a href="/policy/privacy" className="text-muted text-decoration-none" onMouseOver={(e) => e.target.style.color = '#11CAA0'} onMouseOut={(e) => e.target.style.color = '#6c757d'}>
                                    <i className="fas fa-chevron-right mr-2" style={{ fontSize: '10px' }}></i>Bảo mật thông tin
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Cột 3: Thông tin liên hệ cửa hàng */}
                    <div className="col-md-4">
                        <h5 className="font-weight-bold mb-3 text-uppercase border-left pl-2" style={{ borderLeftColor: '#11CAA0', borderLeftWidth: '3px' }}>
                            Liên Hệ
                        </h5>
                        <ul className="list-unstyled text-muted" style={{ fontSize: '14px', lineHeight: '1.8' }}>
                            <li className="mb-2 d-flex align-items-start">
                                <i className="fas fa-map-marker-alt mr-2 mt-1 text-info"></i>
                                <span>Khu công nghệ cao, Võ Chí Công, Quận 9, Hồ Chí Minh</span>
                            </li>
                            <li className="mb-2">
                                <i className="fas fa-phone-alt mr-2 text-info"></i> Hotline: 090x.xxx.xxx
                            </li>
                            <li className="mb-2">
                                <i className="fas fa-envelope mr-2 text-info"></i> support@thaicms.retail
                            </li>
                        </ul>
                    </div>

                </div>
            </div>

            {/* PHẦN 2: THANH BẢN QUYỀN (COPYRIGHT BAR) */}
            <div className="copyright-bar py-3 mt-4" style={{ backgroundColor: '#1a1a1a', borderTop: '1px solid #2d2d2d' }}>
                <div className="container text-center">
                    <p className="m-0 text-muted" style={{ fontSize: '13px' }}>
                        &copy; {new Date().getFullYear()} <strong style={{ color: '#11CAA0' }}>ThaiCMS Retail</strong>. All Rights Reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;


Chạy kiểm chứng kết quả trang chủ có hiển thị đầy đủ như mong muốn chưa? Các liên kết trên trang đã hoạt đọng đủ chưa? Có lỗi hay không?

Sau khi sinh viên đã lắp ghép hoàn chỉnh trang chủ src/pages/home/index.jsx với cấu trúc 5 tầng logic tĩnh/động mượt mà, bước tiếp theo các em cần tiến hành "Phân rã kiến trúc và hiện thực hóa" 6 trang còn lại theo đúng lộ trình cuốn chiếu.

1. PHÂN HỆ CMS TIN TỨC: TRANG BLOG VÀ BLOG DETAIL
Sinh viên nên làm phân hệ này ngay sau trang chủ vì đây là luồng dữ liệu "Đọc" (Read API) cơ bản, cấu trúc gần giống với Tầng 5 (LatestBlog) ở trang chủ nên các em sẽ dễ tiếp cận nhất.
Trang Danh sách Tin tức (src/pages/blog/index.jsx)
●	Mô tả: Hiển thị toàn bộ các cẩm nang, tin tức xu hướng mặc đẹp được lấy từ bảng Posts trong database.
●	Các thành phần cần tạo:
○	Lưới bài viết (Cột trái - 75%): Dùng hàm .map() để lặp qua mảng dữ liệu trả về từ API và gọi ra các thẻ <BlogCard /> toàn cục.
○	<BlogSidebar /> (Cột phải - 25%): Gọi API từ bảng Categories (Danh mục tin tức). Khi khách hàng click vào một danh mục, hệ thống sẽ lọc và chỉ hiển thị các bài viết thuộc chủ đề đó.
●	Yêu cầu thực hành: Viết các hàm gọi dữ liệu tập trung trong file src/services/blogService.js (getAllPosts, getPostsByCategory).
Trang Chi tiết Bài viết (src/pages/blog/BlogDetail.jsx)
●	Mô tả: Đích đến cuối cùng khi người dùng bấm vào nút "Đọc bài viết" từ bất kỳ tấm thẻ BlogCard nào.
●	Logic xử lý cốt lõi:
○	Dùng Hook useParams() để bóc tách mã ID bài viết trên thanh URL (Ví dụ: /blog/5 ➔ lấy được id = 5).
○	Gọi hàm blogService.getPostById(id) để nạp dữ liệu độc bản của bài viết đó.
○	Ứng dụng kỹ thuật bắt buộc: Sử dụng thuộc tính dangerouslySetInnerHTML={{ __html: post.content }} để trình duyệt biên dịch toàn bộ định dạng chữ đậm, nghiêng, và hình ảnh chèn giữa bài viết bằng công cụ CKEditor ở Backend trả về.
2. PHÂN HỆ CỬA HÀNG: TRANG SHOP VÀ PRODUCT DETAIL
Đây là khu vực lõi của đồ án, xử lý nhiều State đan xen và đòi hỏi tính toán logic chặt chẽ.
Trang Cửa Hàng (src/pages/shop/index.jsx)
●	Mô tả: Không gian mua sắm chính, bố cục chia 2 cột dọc (col-md-3 và col-md-9 của Bootstrap 4.6.2).
●	Các thành phần con bên trong:
○	<ShopSidebar /> (Cột trái): Chứa danh mục sản phẩm dọc và 2 ô nhập khoảng giá (Min Price - Max Price). Khi giá trị thay đổi, tự động kích hoạt hàm lọc lại dữ liệu.
○	<ShopHeader /> (Đỉnh cột phải): Ô tìm kiếm nhanh thời gian thực và dòng chữ động thông báo số lượng: "Tìm thấy X sản phẩm".
○	<ProductList /> (Ruột cột phải): Lưới chạy vòng lặp map() hiển thị các thẻ <ProductCard /> dùng chung.
○	<LoadingOrEmpty />: Component kiểm soát UX. Hiện vòng xoay loading khi đang đợi mạng, hoặc hiện ảnh thông báo trống nếu bộ lọc khoảng giá không tìm thấy sản phẩm nào phù hợp.
Trang Chi tiết Sản phẩm (src/pages/product-detail/index.jsx)
●	Mô tả: Hiển thị thông tin toàn diện của một mặt hàng cụ thể để khách quyết định mua.
●	Thành phần: 1 Ảnh đại diện lớn cố định (không làm slide ảnh), Tên, Mô tả, Giá bán, trường số lượng hàng hiện có trong kho (StockQuantity), và nút bấm hành động "Thêm vào giỏ hàng".
●	Logic xử lý cốt lõi: Sinh viên phải viết hàm kiểm tra: Nếu số lượng khách chọn mua lớn hơn con số StockQuantity thực tế trong database ➔ Kích hoạt lệnh chặn lại và cảnh báo "Số lượng trong kho không đủ!", không cho phép đưa vào giỏ hàng để tránh lỗi bán vượt kho.
3. PHÂN HỆ TÀI KHOẢN KHÁCH HÀNG: REGISTER VÀ LOGIN
Phân hệ này thiết lập "hệ thống chìa khóa" bảo mật thông tin và định danh thực thể Customer trước khi cho phép vào luồng mua hàng nâng cao.
Trang Đăng ký Tài khoản (src/pages/auth/Register.jsx)
●	Mô tả: Giao diện Form cho phép người mua tạo tài khoản mới để lưu vào bảng Customers.
●	Thành phần & Xử lý: * Thiết kế các ô nhập liệu: Họ tên, Email, Số điện thoại, Địa chỉ và Mật khẩu.
○	Logic validation (Bắt lỗi): Kiểm tra xem các ô có bị bỏ trống không, định dạng Email có đúng không, mật khẩu có đủ độ dài an toàn không trước khi gửi lệnh POST xuống Backend.
Trang Đăng nhập (src/pages/auth/Login.jsx)
●	Mô tả: Xác thực quyền truy cập của người mua hàng.
●	Logic xử lý cốt lõi:
○	Gửi Email và Mật khẩu xuống API Backend xác thực.
○	Nếu Backend báo thành công và trả về thông tin dữ liệu sạch, sinh viên phải lưu ngay thông tin Customer vào bộ nhớ trình duyệt bằng lệnh: localStorage.setItem('customer', JSON.stringify(data)).
○	Sau đó dùng Maps('/') đưa người dùng quay lại trang chủ dưới trạng thái đã đăng nhập.
4. PHÂN HỆ ĐƠN HÀNG VÀ THANH TOÁN: CART VÀ CHECKOUT
Phân hệ cuối cùng, yêu cầu sinh viên ứng dụng kỹ thuật Context API (hoặc State toàn cục tại App.js) để quản lý mảng giỏ hàng xuyên suốt toàn bộ website.
Trang Giỏ Hàng (src/pages/cart/index.jsx)
●	Mô tả: Bảng quản lý chi tiết danh sách các món đồ khách hàng đã bấm chọn mua.
●	Thành phần & Tương tác:
○	<CartTable />: Bảng hiển thị thông tin sản phẩm, đơn giá, và thành tiền của từng dòng.
○	Logic tương tác: Cho phép khách bấm nút + hoặc - để thay đổi số lượng món đồ, hệ thống phải tự động nhân dòng tính lại số tiền ngay trên màn hình. Cho phép bấm nút Thùng rác để xóa món đồ khỏi mảng giỏ hàng.
○	Định dạng tiền tệ: Tất cả các con số giá thô từ database phải được chạy qua hàm Intl.NumberFormat để hiển thị định dạng chuẩn Việt Nam (Ví dụ: 500.000 đ).
Trang Thanh Toán (src/pages/checkout/index.jsx)
●	Mô tả: Trang chốt đơn hàng cuối cùng, lưu dữ liệu trực tiếp vào hệ thống SQL Server.
●	Luồng xử lý cốt lõi:
○	Luồng bảo mật: Khi khách bấm nút thanh toán, hệ thống phải check localStorage. Nếu chưa có thông tin customer đăng nhập ➔ Cưỡng chế đá người dùng về trang /login.
○	Tự động điền (Auto-fill): Nếu đã đăng nhập, tự động lấy SĐT và Địa chỉ từ tài khoản Customer đổ vào Form, khách chỉ cần điền địa chỉ giao hàng cụ thể nếu muốn thay đổi.
○	POST Đơn hàng: Khi bấm "Xác nhận đặt hàng", đóng gói toàn bộ thông tin gồm CustomerId, TotalAmount và mảng sản phẩm OrderDetails gửi lệnh POST ngầm về Backend C#. Backend tiếp nhận sẽ ghi nhận đơn hàng, đồng thời tự động trừ bớt số lượng tồn kho StockQuantity của sản phẩm đó trong SQL Server. FrontEnd nhận kết quả thành công sẽ dọn sạch giỏ hàng về số 0.
