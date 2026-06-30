import React, { useState, useEffect, useRef } from 'react';
import blogService from '../../services/blogService';
import PostCard from '../../components/PostCard';

const LatestBlog = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const loadLatestPosts = async () => {
            try {
                const data = await blogService.getLatestPosts();
                setPosts(data);
            } catch (error) {
                console.error("Lỗi tải bài viết tin tức mới nhất:", error);
            } finally {
                setLoading(false);
            }
        };
        loadLatestPosts();
    }, []);

    useEffect(() => {
        if (loading || posts.length === 0) return;

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
            }
        }, { threshold: 0.1 });

        if (sectionRef.current) observer.observe(sectionRef.current);

        return () => {
            if (sectionRef.current) observer.unobserve(sectionRef.current);
        };
    }, [loading, posts.length]);

    if (loading) return <div className="text-center my-4">Đang tải tin tức mới nhất...</div>;
    if (posts.length === 0) return null;

    return (
        <div ref={sectionRef} className="boxhome" style={{ backgroundColor: '#f9f9f9', padding: '60px 0', overflow: 'hidden' }}>
            <style>{`
                @keyframes slideInTitle {
                    from {
                        opacity: 0;
                        transform: translateX(-100px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                @keyframes slideInGrid {
                    from {
                        opacity: 0;
                        transform: translateY(60px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .scroll-title {
                    opacity: 0;
                }
                .scroll-title.active {
                    animation: slideInTitle 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }

                .scroll-grid {
                    opacity: 0;
                }
                .scroll-grid.active {
                    animation: slideInGrid 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                    animation-delay: 0.3s;
                }
            `}</style>
            <div className="wrapper">
                <div className={`scroll-title ${isVisible ? 'active' : ''}`}>
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
                </div>
                <div className={`row scroll-grid ${isVisible ? 'active' : ''}`}>
                    {posts.map((post, index) => (
                        <PostCard post={post} index={index} key={post.id} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LatestBlog;
