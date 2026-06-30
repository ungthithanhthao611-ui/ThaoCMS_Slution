import React, { useState, useEffect } from 'react';
import blogService from '../../services/postService';
import BlogSidebar from './BlogSidebar';
import BlogList from './BlogList';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

function Blog() {
    // State 1: Mảng lưu danh sách bài viết thời trang đổ ra ô lưới
    const [posts, setPosts] = useState([]);
    // State 2: Quản lý trạng thái chờ xoay mạng (UX)
    const [loading, setLoading] = useState(true);

    // State 3: Quản lý ID danh mục bài viết đang chọn (Mặc định bằng null - lấy tất cả)
    const [filters, setFilters] = useState({
        categoryId: null,   // Mặc định null là lấy tất cả danh mục
        keyword: ''         // Từ khóa tìm kiếm rỗng
    });

    // useEffect theo dõi biến filter tự động kích hoạt gọi lại API mỗi khi chọn lại 1 category 
    useEffect(() => {
        const fetchBlogData = async () => {
            try {
                setLoading(true);
                // Gọi dịch vụ lấy danh sách bài viết kèm tham số lọc gửi xuống SQL Server
                const response = await blogService.getAllPosts(filters);
                setPosts(response.data || response); // Cập nhật mảng bài viết mới
            } catch (error) {
                console.error("Lỗi nạp dữ liệu phân hệ Blog:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBlogData();
    }, [filters]); // Theo dõi sát sao biến filters

    // Hàm CallBack truyền xuống cho các con kích hoạt khi người dùng thao tác
    const handleFilterUpdate = (newFields) => {
        setFilters(prev => ({
            ...prev,
            ...newFields // Gộp đè các trường lọc mới vào trạng thái cũ
        }));
    };

    return (
        <>
            <Header />

            <div style={{ backgroundColor: '#f8f8f8', minHeight: '80vh', padding: '40px 0' }}>
                <div className="wrapper">
                    {/* Khối tiêu đề trang */}
                    <div className="text-center my-4 py-3 bg-white rounded shadow-sm">
                        <h3 className="font-weight-bold text-uppercase m-0" style={{ color: '#005088', letterSpacing: '1px' }}>
                            Tạp Chí Thời Trang ThaoCMS
                        </h3>
                        <p className="text-muted small m-0 font-italic mt-1">Cập nhật cẩm nang phối đồ và xu hướng mặc đẹp mới nhất từ các nhà thiết kế</p>
                    </div>

                    {/* BỐ CỤC CHIA 2 CỘT DỌC CHUẨN BOOTSTRAP 4 */}
                    <div className="row mt-4">
                        {/* CỘT TRÁI (3/12): Chứa Component con BlogSidebar */}
                        <aside className="col-md-3 mb-4">
                            <BlogSidebar
                                activeCategory={filters.categoryId}
                                onFilterChange={handleFilterUpdate}
                            />
                        </aside>

                        {/* CỘT PHẢI (9/12): Chứa lưới ô các bài viết hiển thị */}
                        <main className="col-md-9">
                            {loading ? (
                                /* Hiệu ứng chờ mạng UX */
                                <div className="text-center py-5">
                                    <div className="spinner-border text-primary" role="status"></div>
                                    <p className="mt-2 text-muted small font-italic">Đang nạp cẩm nang thời trang...</p>
                                </div>
                            ) : posts.length === 0 ? (
                                /* Kịch bản danh mục trống chưa có bài viết */
                                <div className="text-center py-5 bg-white border rounded">
                                    <i className="fas fa-folder-open fa-2x text-muted mb-2"></i>
                                    <p className="text-muted m-0 font-italic small">Chủ đề này hiện chưa có bài viết nào được xuất bản.</p>
                                </div>
                            ) : (
                                /* ✅ ĐÚNG CHUẨN: Gọi đúng linh kiện BlogList và truyền mảng posts vào */
                                <BlogList posts={posts} />
                            )}
                        </main>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}

export default Blog;
