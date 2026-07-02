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
                <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '30px', marginBottom: '10px' }}>
                    <nav aria-label="Page navigation">
                        <ul className="pagination" style={{ display: 'flex', gap: '8px', listStyle: 'none', padding: 0, margin: 0, alignItems: 'center' }}>
                            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                <button 
                                    onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)} 
                                    style={currentPage === 1 ? {
                                        border: 'none', background: '#f5f5f5', color: '#ccc', padding: '6px 14px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: '700', cursor: 'not-allowed'
                                    } : {
                                        border: 'none', background: '#faf6f2', color: '#53382c', padding: '6px 14px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s'
                                    }}
                                >
                                    &laquo; Trước
                                </button>
                            </li>
                            
                            {[...Array(totalPages)].map((_, index) => {
                                const pageNum = index + 1;
                                const isActive = currentPage === pageNum;
                                return (
                                    <li key={pageNum} className={`page-item ${isActive ? 'active' : ''}`}>
                                        <button 
                                            onClick={() => handlePageChange(pageNum)}
                                            style={isActive ? {
                                                border: 'none', background: '#b22830', color: '#fff', padding: '6px 12px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: '800', cursor: 'pointer', minWidth: '32px', boxShadow: '0 4px 10px rgba(178,40,48,0.2)'
                                            } : {
                                                border: 'none', background: '#faf6f2', color: '#53382c', padding: '6px 12px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: '700', cursor: 'pointer', minWidth: '32px', transition: 'all 0.2s'
                                            }}
                                        >
                                            {pageNum}
                                        </button>
                                    </li>
                                );
                            })}

                            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                <button 
                                    onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)} 
                                    style={currentPage === totalPages ? {
                                        border: 'none', background: '#f5f5f5', color: '#ccc', padding: '6px 14px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: '700', cursor: 'not-allowed'
                                    } : {
                                        border: 'none', background: '#faf6f2', color: '#53382c', padding: '6px 14px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s'
                                    }}
                                >
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
