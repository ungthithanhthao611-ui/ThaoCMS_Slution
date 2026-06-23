import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import blogService from '../services/blogService';
import { IMAGE_BASE } from '../api/axiosClient';

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6; // Hiển thị 6 bài viết mỗi trang

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);
                const data = await blogService.getAllPosts();
                setPosts(data);
                setCurrentPage(1);
            } catch (error) {
                console.error("Lỗi khi tải danh sách bài viết:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (loading) {
        return <div className="text-center my-4">Đang tải tin tức...</div>;
    }

    if (posts.length === 0) {
        return (
            <div className="col-12"><p className="text-muted text-center">Chưa có bài viết tin tức nào.</p></div>
        );
    }

    // Phân trang
    const totalPages = Math.ceil(posts.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const displayedPosts = posts.slice(startIndex, itemsPerPage ? startIndex + itemsPerPage : posts.length);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="row">
            {displayedPosts.map((post, index) => (
                <div className="col-md-4 mb-4 animated fadeInUp" key={post.id} style={{ animationDelay: `${index * 0.15}s` }}>
                    <div className="hc-news-card card h-100" style={{ borderRadius: '12px', overflow: 'hidden', border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', transition: 'transform 0.3s' }} onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                        <div className="hc-news-img d-flex justify-content-center align-items-center" style={{backgroundColor: '#ebebeb', overflow: 'hidden', height: '200px'}}>
                            {post.imageUrl ? (
                                <Link to={`/post/${post.id}`} style={{ width: '100%', height: '100%' }}>
                                    <img src={post.imageUrl.startsWith('http') ? post.imageUrl : `${IMAGE_BASE}${post.imageUrl.startsWith('/') ? '' : '/'}${post.imageUrl}`} 
                                        alt={post.title} 
                                        style={{width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease'}} 
                                        onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'} 
                                        onMouseOut={(e) => e.target.style.transform = 'scale(1)'} 
                                        onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; }} />
                                </Link>
                            ) : (
                                <i className="fa fa-picture-o text-white" style={{fontSize: '3rem', color: '#ccc'}}></i>
                            )}
                        </div>
                        <div className="card-body px-3 py-3">
                            <div className="hc-news-date">
                                <i className="fa-regular fa-calendar mr-2"></i>
                                {new Date(post.createdDate).toLocaleDateString('vi-VN')}
                            </div>
                            <h5 className="mt-2 mb-2">
                                <Link to={`/post/${post.id}`} className="hc-news-title">
                                    {post.title}
                                </Link>
                            </h5>
                            <p className="text-muted small line-clamp-3 mb-0">
                                {post.shortDescription || 'Cùng hệ thống của chúng tôi khám phá những câu chuyện đầy cảm hứng. Click để đọc thêm chi tiết về chủ đề này...'}
                            </p>
                        </div>
                    </div>
                </div>
            ))}

            {/* Điều khiển phân trang */}
            {totalPages > 1 && (
                <div className="d-flex justify-content-center mt-4 mb-4 col-12">
                    <nav aria-label="Page navigation">
                        <ul className="pagination" style={{ gap: '5px' }}>
                            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                <button className="page-link" onClick={() => handlePageChange(currentPage - 1)} style={{ borderRadius: '5px', color: '#b22830' }}>
                                    &laquo; Trước
                                </button>
                            </li>
                            
                            {[...Array(totalPages)].map((_, index) => (
                                <li key={index + 1} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                    <button 
                                        className="page-link" 
                                        onClick={() => handlePageChange(index + 1)}
                                        style={currentPage === index + 1 ? { backgroundColor: '#b22830', borderColor: '#b22830', borderRadius: '5px' } : { borderRadius: '5px', color: '#b22830' }}
                                    >
                                        {index + 1}
                                    </button>
                                </li>
                            ))}

                            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                <button className="page-link" onClick={() => handlePageChange(currentPage + 1)} style={{ borderRadius: '5px', color: '#b22830' }}>
                                    Sau &raquo;
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            )}
        </div>
    );
};

export default PostList;
