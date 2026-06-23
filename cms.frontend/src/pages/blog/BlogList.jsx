import React from 'react';
import PostCard from '../../components/PostCard';

function BlogList({ posts }) {
    return (
        <div className="blog-list-grid">
            <div className="row">
                {posts.map((item, index) => (
                    <PostCard 
                        post={item} 
                        index={index} 
                        key={item.id} 
                        className="col-md-6 col-sm-6 mb-4" 
                    />
                ))}
            </div>
        </div>
    );
}

export default BlogList;
