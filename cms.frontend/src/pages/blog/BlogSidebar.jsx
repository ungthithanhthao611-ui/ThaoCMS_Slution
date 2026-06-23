import React, { useState, useEffect } from 'react';
import blogService from '../../services/postService';

function BlogSidebar({ activeCategory, onFilterChange }) {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategoriesData = async () => {
            try {
                setLoading(true);
                const response = await blogService.getAllCategories();
                setCategories(response.data || response);
            } catch (error) {
                console.error("Thất bại khi lấy danh mục bài viết động:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCategoriesData();
    }, []);

    return (
        <div className="card p-3 shadow-sm border-0" style={{ borderRadius: '12px', backgroundColor: '#fff', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
            <h6 className="font-weight-bold text-uppercase mb-3" style={{ color: '#005088', letterSpacing: '1px', fontSize: '15px', display: 'flex', alignItems: 'center', borderBottom: '2px solid #f0f0f0', paddingBottom: '10px' }}>
                <i className="fa fa-folder-open" style={{ marginRight: '8px', color: '#005088' }}></i> Chủ đề Blog
            </h6>

            <div className="list-group list-group-flush" style={{ border: 'none' }}>
                {/* Nút xem tất cả */}
                <button
                    className="list-group-item list-group-item-action border-0 px-3 d-flex align-items-center"
                    onClick={() => onFilterChange({ categoryId: null })}
                    style={{
                        borderRadius: '8px',
                        transition: 'all 0.2s',
                        background: activeCategory === null ? '#e6f2ff' : 'transparent',
                        color: activeCategory === null ? '#005088' : '#555',
                        fontWeight: activeCategory === null ? 'bold' : 'normal',
                        border: 'none',
                        textAlign: 'left',
                        cursor: 'pointer',
                        padding: '12px 15px',
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '4px'
                    }}
                >
                    <i className="fa fa-chevron-right" style={{ fontSize: '10px', color: activeCategory === null ? '#005088' : '#bbb', marginRight: '10px', transform: activeCategory === null ? 'scale(1.2)' : 'none' }}></i>
                    Tất cả bản tin
                </button>

                {loading ? (
                    <div className="text-center py-3">
                        <div className="spinner-border spinner-border-sm text-primary" role="status"></div>
                    </div>
                ) : (
                    categories.map(cat => {
                        const isActive = activeCategory === cat.id;
                        return (
                            <button
                                key={cat.id}
                                className="list-group-item list-group-item-action border-0 px-3 d-flex align-items-center"
                                onClick={() => onFilterChange({ categoryId: cat.id })}
                                style={{
                                    borderRadius: '8px',
                                    transition: 'all 0.2s',
                                    background: isActive ? '#e6f2ff' : 'transparent',
                                    color: isActive ? '#005088' : '#555',
                                    fontWeight: isActive ? 'bold' : 'normal',
                                    border: 'none',
                                    textAlign: 'left',
                                    cursor: 'pointer',
                                    padding: '12px 15px',
                                    width: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    marginBottom: '4px'
                                }}
                            >
                                <i className="fa fa-chevron-right" style={{ fontSize: '10px', color: isActive ? '#005088' : '#bbb', marginRight: '10px', transform: isActive ? 'scale(1.2)' : 'none' }}></i>
                                {cat.name}
                            </button>
                        );
                    })
                )}
            </div>
        </div>
    );
}

export default BlogSidebar;
