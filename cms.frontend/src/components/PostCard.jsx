import React from 'react';
import { Link } from 'react-router-dom';
import { IMAGE_BASE } from '../api/axiosClient';

const PostCard = ({ post, index = 0 }) => {
    return (
        <div className="col-md-4 mb-4 animated fadeInUp" style={{ animationDelay: `${index * 0.15}s` }}>
            <div className="hc-news-card card h-100" 
                 style={{ 
                     borderRadius: '12px', 
                     overflow: 'hidden', 
                     border: 'none', 
                     boxShadow: '0 4px 15px rgba(0,0,0,0.05)', 
                     transition: 'transform 0.3s' 
                 }} 
                 onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} 
                 onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                <div className="hc-news-img d-flex justify-content-center align-items-center" 
                     style={{ backgroundColor: '#ebebeb', overflow: 'hidden', height: '200px' }}>
                    {post.imageUrl ? (
                        <Link to={`/post/${post.id}`} style={{ width: '100%', height: '100%' }}>
                            <img src={post.imageUrl.startsWith('http') ? post.imageUrl : `${IMAGE_BASE}${post.imageUrl.startsWith('/') ? '' : '/'}${post.imageUrl}`} 
                                 alt={post.title} 
                                 style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} 
                                 onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'} 
                                 onMouseOut={(e) => e.target.style.transform = 'scale(1)'} 
                                 onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; }} />
                        </Link>
                    ) : (
                        <i className="fa fa-picture-o text-white" style={{ fontSize: '3rem', color: '#ccc' }}></i>
                    )}
                </div>
                <div className="card-body px-3 py-3">
                    <div className="hc-news-date text-muted" style={{ fontSize: '0.85rem' }}>
                        <i className="fa-regular fa-calendar mr-2"></i>
                        {new Date(post.createdDate).toLocaleDateString('vi-VN')}
                    </div>
                    <h5 className="mt-2 mb-2">
                        <Link to={`/post/${post.id}`} className="hc-news-title text-decoration-none" style={{ color: '#333', fontWeight: 'bold' }}>
                            {post.title}
                        </Link>
                    </h5>
                    <p className="text-muted small line-clamp-3 mb-0" style={{ fontSize: '0.9rem', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {post.shortDescription || 'Cùng hệ thống của chúng tôi khám phá những câu chuyện đầy cảm hứng. Click để đọc thêm chi tiết về chủ đề này...'}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PostCard;
