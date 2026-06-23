import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import blogService from '../../services/postService';
import { IMAGE_BASE as IMAGE_BASE_URL } from '../../api/axiosClient';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

function BlogDetail() {
    // 1. Lấy biến ID động từ URL (Ví dụ: /blog/5 -> lấy được giá trị là 5)
    const { id } = useParams();

    // 2. Khai báo các State quản lý trạng thái dữ liệu và hiệu ứng giao diện
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [relatedPosts, setRelatedPosts] = useState([]);

    // 3. useEffect theo dõi biến [id]. Cứ khi nào ID thay đổi -> Gọi API lấy bài viết mới
    useEffect(() => {
        const fetchPostDetailData = async () => {
            try {
                setLoading(true); // Bật trạng thái chờ mạng

                // Kích hoạt hàm lấy chi tiết bài viết từ blogService
                const data = await blogService.getPostById(id);
                setPost(data.data || data); // Nạp đối tượng bài viết độc bản vào state
            } catch (error) {
                console.error("Lỗi lấy chi tiết bài viết từ database:", error);
            } finally {
                setLoading(false); // Tắt trạng thái chờ mạng
            }
        };
        fetchPostDetailData();
    }, [id]); // Luôn lắng nghe biến ID để tự động cập nhật bài viết tương ứng

    // useEffect tải danh sách các bài viết liên quan
    useEffect(() => {
        if (post && post.categoryId) {
            const fetchRelated = async () => {
                try {
                    const data = await blogService.getAllPosts({ categoryId: post.categoryId });
                    const list = data.data || data;
                    // Lọc bỏ bài viết hiện tại
                    const filtered = list.filter(p => p.id !== post.id);
                    setRelatedPosts(filtered.slice(0, 5)); // Lấy tối đa 5 bài
                } catch (error) {
                    console.error("Lỗi lấy bài viết liên quan:", error);
                }
            };
            fetchRelated();
        }
    }, [post]);

    // 4. XỬ LÝ CÁC TRẠNG THÁI BIÊN (UX GUARD)
    // Kịch bản A: Đang loading dữ liệu qua mạng
    if (loading) {
        return (
            <div className="container py-5 text-center" style={{ minHeight: '60vh' }}>
                <div className="spinner-border text-primary" role="status"></div>
                <p className="text-muted mt-2 font-italic small">ThaiCMS đang mở thư viện cẩm nang thời trang, vui lòng chờ...</p>
            </div>
        );
    }

    // Kịch bản B: Phòng vệ nếu gõ bừa ID không có thực trên thanh URL
    if (!post) {
        return (
            <div className="container py-5 text-center" style={{ minHeight: '60vh' }}>
                <h5 className="text-danger font-weight-bold">⛔ BÀI VIẾT KHÔNG TỒN TẠI TRÊN HỆ THỐNG</h5>
                <Link to="/tin-tuc" className="btn btn-primary btn-sm mt-3">Quay lại danh sách Blog</Link>
            </div>
        );
    }

    return (
        <div className="blog-detail-page bg-light py-4" style={{ minHeight: '80vh' }}>
            <Header />

            <div className="container mt-3">
                {/* Thanh dẫn hướng Breadcrumb nhỏ giúp nâng tầm trải nghiệm người dùng (UX) */}
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb bg-transparent p-0 small">
                        <li className="breadcrumb-item"><Link to="/">Trang Chủ</Link></li>
                        <li className="breadcrumb-item"><Link to="/tin-tuc">Tin tức</Link></li>
                        <li className="breadcrumb-item active text-truncate" aria-current="page" style={{ maxWidth: '300px' }}>
                            {post.title}
                        </li>
                    </ol>
                </nav>

                <div className="row mt-4">
                    {/* CỘT TRÁI (8/12): Nội dung chi tiết bài viết */}
                    <div className="col-lg-8 col-md-12 mb-4">
                        <article className="bg-white p-4 p-md-5 rounded shadow-sm" style={{ borderTop: '4px solid #005088' }}>

                            {/* 4.1. TIÊU ĐỀ LỚN CỦA BÀI VIẾT */}
                            <h1 className="font-weight-bold text-dark mb-3" style={{ fontSize: '30px', lineHeight: '1.4' }}>
                                {post.title}
                            </h1>

                            {/* 4.2. THANH THÔNG TIN PHỤ (METADATA ROW) */}
                            <div className="d-flex align-items-center flex-wrap text-muted small pb-3 mb-4 border-bottom" style={{ gap: '15px' }}>
                                <span>
                                    <i className="fa fa-calendar mr-1"></i>
                                    {post.createdDate ? new Date(post.createdDate).toLocaleDateString('vi-VN') : "Mới cập nhật"}
                                </span>
                                <span>
                                    <i className="fa fa-user mr-1"></i>
                                    Tác giả: Biên tập viên ThaiCMS
                                </span>
                                <span>
                                    <i className="fa fa-eye mr-1"></i>
                                    Lượt xem: 525 lượt
                                </span>
                            </div>

                            {/* 4.3. ĐOẠN TÓM TẮT SAPO IN NGHIÊNG (NẾU CÓ) */}
                            {post.summary && (
                                <div className="p-3 bg-light border-left border-primary mb-4 font-italic text-secondary" style={{ borderWidth: '4px !important', borderRadius: '0 8px 8px 0', fontSize: '15.5px' }}>
                                    {post.summary}
                                </div>
                            )}

                            {/* HIỂN THỊ HÌNH ẢNH NỔI BẬT NẾU CÓ */}
                            {post.imageUrl && (
                                <div className="text-center mb-4">
                                    <img 
                                        src={post.imageUrl.startsWith('http') ? post.imageUrl : `${IMAGE_BASE_URL}${post.imageUrl.startsWith('/') ? '' : '/'}${post.imageUrl}`} 
                                        alt={post.title} 
                                        style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }} 
                                    />
                                </div>
                            )}

                            {/* 4.4. LOGIC CỐT LÕI: RENDERING NỘI DUNG HTML TỪ CKEDITOR */}
                            <div
                                className="blog-main-render-content text-justify text-secondary"
                                style={{ fontSize: '16.5px', lineHeight: '1.8', letterSpacing: '0.1px' }}
                                dangerouslySetInnerHTML={{ __html: post.content || '<p>Đang cập nhật nội dung...</p>' }}
                            />

                            {/* 4.5. CHÂN BÀI VIẾT VÀ LINK QUAY LẠI */}
                            <div className="border-top mt-5 pt-4 d-flex justify-content-between align-items-center">
                                <Link to="/tin-tuc" className="btn btn-light btn-sm font-weight-bold text-secondary border">
                                    <i className="fa fa-chevron-left mr-1"></i> Quay lại mục Tin tức
                                </Link>
                                <span className="small font-weight-bold text-muted font-italic">Mã bản tin: #{post.id}</span>
                            </div>

                        </article>
                    </div>

                    {/* CỘT PHẢI (4/12): Tin tức liên quan */}
                    <div className="col-lg-4 col-md-12">
                        <div className="bg-white p-4 rounded shadow-sm" style={{ borderTop: '4px solid #b22830', position: 'sticky', top: '20px' }}>
                            <h5 className="font-weight-bold text-uppercase mb-3" style={{ color: '#b22830', fontSize: '15px', borderBottom: '2px solid #f0f0f0', paddingBottom: '10px' }}>
                                <i className="fa fa-list-ul mr-2"></i> Tin liên quan
                            </h5>
                            {relatedPosts.length === 0 ? (
                                <p className="text-muted small font-italic m-0">Không có bài viết liên quan nào.</p>
                            ) : (
                                <div className="list-group list-group-flush">
                                    {relatedPosts.map(rp => {
                                        const rpImg = rp.imageUrl 
                                            ? (rp.imageUrl.startsWith('http') ? rp.imageUrl : `${IMAGE_BASE_URL}${rp.imageUrl.startsWith('/') ? '' : '/'}${rp.imageUrl}`)
                                            : null;
                                        return (
                                            <Link 
                                                key={rp.id} 
                                                to={`/post/${rp.id}`} 
                                                className="list-group-item list-group-item-action border-0 px-0 d-flex align-items-start"
                                                style={{ padding: '12px 0', borderBottom: '1px solid #f0f0f0', background: 'none' }}
                                            >
                                                {rpImg && (
                                                    <img 
                                                        src={rpImg} 
                                                        alt={rp.title} 
                                                        style={{ width: '80px', height: '55px', objectFit: 'cover', borderRadius: '6px', marginRight: '10px' }} 
                                                    />
                                                )}
                                                <div style={{ flex: 1, minWidth: 0 }}>
                                                    <h6 className="font-weight-bold text-dark text-truncate" style={{ fontSize: '13px', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                        {rp.title}
                                                    </h6>
                                                    <span className="text-muted small" style={{ fontSize: '11px' }}>
                                                        <i className="fa fa-calendar mr-1"></i>
                                                        {new Date(rp.createdDate).toLocaleDateString('vi-VN')}
                                                    </span>
                                                </div>
                                            </Link>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default BlogDetail;
