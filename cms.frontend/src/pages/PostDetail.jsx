import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axiosClient, { IMAGE_BASE } from '../api/axiosClient';

const PostDetail = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const data = await axiosClient.get(`/Posts/${id}`);
                setPost(data);
            } catch (error) {
                console.error("Lỗi tải chi tiết bài viết:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [id]);

    if (loading) return <div className="text-center mt-5" style={{ minHeight: '50vh' }}><h3>Đang tải...</h3></div>;
    if (!post) return <div className="text-center mt-5" style={{ minHeight: '50vh' }}><h3>Bài viết không tồn tại</h3></div>;

    const imageUrl = post.imageUrl
        ? (post.imageUrl.startsWith('http')
            ? post.imageUrl
            : `${IMAGE_BASE}${post.imageUrl.startsWith('/') ? '' : '/'}${post.imageUrl}`)
        : null;

    return (
        <div style={{ backgroundColor: '#fff', minHeight: '80vh', padding: '40px 0' }}>
            <div className="wrapper" style={{ maxWidth: '900px', margin: '0 auto' }}>
                {/* Tiêu đề */}
                <h1 style={{ fontWeight: '800', color: '#b22830', fontSize: '2.5rem', marginBottom: '15px' }}>
                    {post.title}
                </h1>

                {/* Ngày tạo */}
                <p style={{ color: '#888', fontSize: '0.95rem', marginBottom: '30px' }}>
                    <i className="fa fa-calendar" style={{ marginRight: '8px' }}></i>
                    {new Date(post.createdDate).toLocaleDateString('vi-VN')}
                </p>

                {/* Ảnh bài viết */}
                {imageUrl && (
                    <div style={{ marginBottom: '40px', textAlign: 'center' }}>
                        <img src={imageUrl} alt={post.title} style={{ maxWidth: '100%', height: 'auto', objectFit: 'contain', maxHeight: '600px', borderRadius: '12px' }} />
                    </div>
                )}

                {/* Nội dung bài viết */}
                <div 
                    className="post-content"
                    style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#333' }}
                    dangerouslySetInnerHTML={{ __html: post.content || '<p>Đang cập nhật nội dung...</p>' }}
                />

                {/* Nút quay lại */}
                <div style={{ marginTop: '50px', textAlign: 'center' }}>
                    <Link to="/tin-tuc" style={{
                        display: 'inline-block', padding: '12px 30px', backgroundColor: '#f1f1f1',
                        color: '#333', textDecoration: 'none', borderRadius: '8px', fontWeight: 'bold',
                        transition: 'all 0.3s'
                    }}>
                        <i className="fa fa-arrow-left" style={{ marginRight: '8px' }}></i> Trở về trang tin tức
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PostDetail;
