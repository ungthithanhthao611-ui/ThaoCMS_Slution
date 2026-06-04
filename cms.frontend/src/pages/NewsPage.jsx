import React from 'react';
import PostList from '../components/PostList';

const NewsPage = () => {
    return (
        <div style={{ backgroundColor: '#f8f8f8', minHeight: '80vh', padding: '40px 0' }}>
            <div className="wrapper">
                <h2 style={{ fontFamily: 'Inter, Arial, sans-serif', color: '#b22830', fontWeight: '800', textTransform: 'uppercase', marginBottom: '30px', fontSize: '26px', textAlign: 'center' }}>
                    📰 Tin tức & Khuyến mãi
                </h2>
                
                <div style={{ background: 'white', borderRadius: '16px', padding: '30px', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
                    <PostList />
                </div>
            </div>
        </div>
    );
};

export default NewsPage;
