import React, { useState, useEffect } from 'react';
import blogService from '../../services/blogService';
import PostCard from '../../components/PostCard';

const LatestBlog = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadLatestPosts = async () => {
            try {
                const data = await blogService.getAllPosts();
                // Lấy 3 bài viết mới nhất
                const latest = data.slice(0, 3);
                setPosts(latest);
            } catch (error) {
                console.error("Lỗi tải bài viết tin tức mới nhất:", error);
            } finally {
                setLoading(false);
            }
        };
        loadLatestPosts();
    }, []);

    if (loading) return <div className="text-center my-4">Đang tải tin tức mới nhất...</div>;
    if (posts.length === 0) return null;

    return (
        <div className="boxhome" style={{ backgroundColor: '#f9f9f9', padding: '60px 0' }}>
            <div className="wrapper">
                <h2 style={{ 
                    color: '#b22830', 
                    fontWeight: '800', 
                    textTransform: 'uppercase', 
                    marginBottom: '40px', 
                    fontSize: '24px', 
                    borderBottom: '2px solid #b22830', 
                    paddingBottom: '10px',
                    textAlign: 'center'
                }}>
                    📰 Tin tức & Xu hướng mới nhất
                </h2>
                <div className="row">
                    {posts.map((post, index) => (
                        <PostCard post={post} index={index} key={post.id} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LatestBlog;
