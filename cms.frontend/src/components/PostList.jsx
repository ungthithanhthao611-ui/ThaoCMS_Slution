import React, { useState, useEffect } from 'react';
import blogService from '../services/blogService';

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);
                const data = await blogService.getAllPosts();
                setPosts(data);
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

    return (
        <div className="row">
            {posts.length === 0 ? (
                <div className="col-12"><p className="text-muted text-center">Chưa có bài viết tin tức nào.</p></div>
            ) : (
                posts.map((post) => (
                    <div className="col-md-4 mb-4" key={post.id}>
                        <div className="hc-news-card card h-100">
                            <div className="hc-news-img d-flex justify-content-center align-items-center" style={{backgroundColor: '#ebebeb', overflow: 'hidden'}}>
                                {post.imageUrl ? (
                                    <img src={post.imageUrl.startsWith('http') ? post.imageUrl : `https://localhost:7030${post.imageUrl.startsWith('/') ? '' : '/'}${post.imageUrl}`} alt={post.title} style={{width: '100%', height: '100%', objectFit: 'cover'}} onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; }} />
                                ) : (
                                    <i className="fa fa-picture-o text-white" style={{fontSize: '3rem', color: '#ccc'}}></i>
                                )}
                            </div>
                            <div className="card-body px-0 py-2">
                                <div className="hc-news-date">
                                    <i className="fa-regular fa-calendar mr-2"></i>
                                    {new Date(post.createdDate).toLocaleDateString('vi-VN')}
                                </div>
                                <h5 className="mt-2 mb-2">
                                    <a href={`/post/${post.id}`} className="hc-news-title">
                                        {post.title}
                                    </a>
                                </h5>
                                <p className="text-muted small line-clamp-3 mb-0">
                                    {post.shortDescription || 'Cùng hệ thống của chúng tôi khám phá những câu chuyện đầy cảm hứng. Click để đọc thêm chi tiết về chủ đề này...'}
                                </p>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default PostList;
