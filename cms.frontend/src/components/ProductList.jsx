import React, { useState, useEffect } from 'react';
import productService from '../services/productService';
import categoryProductService from '../services/categoryProductService';
import ProductCard from './ProductCard';
import { IMAGE_BASE } from '../api/axiosClient';

const ProductList = ({ categoryId, layout, limit, minPrice, maxPrice, search, filterType }) => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        categoryProductService.getAllCategoryProducts()
            .then(setCategories)
            .catch(console.error);
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                let data;
                if (categoryId) {
                    data = await productService.getProductsByCategory(categoryId);
                } else {
                    data = await productService.getAllProducts({ minPrice, maxPrice, search });
                }
                setProducts(data);
                setCurrentPage(1); // Reset page on filter/search change
            } catch (error) {
                console.error("Lỗi khi tải danh sách sản phẩm:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [categoryId, minPrice, maxPrice, search]);

    if (loading) {
        return <div className="text-center my-4">Đang tải thực đơn...</div>;
    }

    if (products.length === 0) {
        return (
            <div className="col-12 text-center py-5" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', width: '100%' }}>
                <div style={{ fontSize: '70px', color: '#ccc' }}>
                    <i className="fa fa-search-minus" aria-hidden="true"></i>
                </div>
                <h3 style={{ color: '#555', fontWeight: 'bold' }}>Không tìm thấy sản phẩm nào...</h3>
                <p className="text-muted" style={{ maxWidth: '400px', margin: '0 auto' }}>
                    Vui lòng thử lại với từ khóa khác hoặc điều chỉnh lại bộ lọc giá của bạn.
                </p>
            </div>
        );
    }

    if (layout === 'sidebar') {
        return (
            <div className="product-sidebar-list">
                {products.map((item) => {
                    const imageUrl = item.imageUrl
                        ? (item.imageUrl.startsWith('http')
                            ? item.imageUrl
                            : `${IMAGE_BASE}${item.imageUrl.startsWith('/') ? '' : '/'}${item.imageUrl}`)
                        : null;
                    const hasSale = item.salePrice && item.salePrice > 0 && item.salePrice < item.price;
                    const discountPercent = hasSale
                        ? Math.round(((item.price - item.salePrice) / item.price) * 100)
                        : 0;

                    return (
                        <div className="itemMenu" key={item.id} style={{marginBottom: '20px', display: 'flex', alignItems: 'center'}}>
                            <div className="img" style={{width: '80px', flexShrink: 0, marginRight: '15px', position: 'relative'}}>
                                <a href={`/product/${item.id}`}>
                                    <img src={imageUrl} alt={item.name} className="img-fluid" style={{borderRadius: '8px'}} />
                                    {hasSale && (
                                        <span style={{
                                            position: 'absolute', top: '-5px', right: '-5px',
                                            backgroundColor: '#b22830', color: '#fff',
                                            fontSize: '0.62rem', fontWeight: '900',
                                            padding: '2px 5px', borderRadius: '4px',
                                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                        }}>
                                            -{discountPercent}%
                                        </span>
                                    )}
                                </a>
                            </div>
                            <div className="caption">
                                <div className="tend">
                                    <h3 style={{fontSize: '18px', margin: '0 0 5px 0'}}>
                                        <a href={`/product/${item.id}`} style={{color: '#53382c', textDecoration: 'none', fontWeight: 'bold'}}>
                                            {item.name}
                                        </a>
                                    </h3>
                                </div>
                                <div className="des text-muted" style={{fontSize: '13px', display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', overflow: 'hidden'}}>
                                    {hasSale ? (
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            <span style={{ color: '#c0392b', fontWeight: 'bold' }}>{item.salePrice.toLocaleString()} VNĐ</span>
                                            <span style={{ textDecoration: 'line-through', fontSize: '11px', color: '#bbb' }}>{item.price.toLocaleString()} VNĐ</span>
                                        </div>
                                    ) : (
                                        <span>{item.price.toLocaleString()} VNĐ</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }

    let displayedProducts = products;

    if (filterType === 'sale') {
        displayedProducts = displayedProducts.filter(item => item.salePrice && item.salePrice < item.price);
    } else if (filterType === 'new') {
        // Assume already sorted by newest from API
        displayedProducts = displayedProducts.slice(0, 12);
    }
    
    // Pagination logic
    const itemsPerPage = limit || 8; // Default 8 items per page for frontend

    const totalPages = Math.ceil(displayedProducts.length / itemsPerPage);

    // Apply pagination if limit is not provided (meaning it's not the abbreviated homepage view)
    if (!limit) {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        displayedProducts = displayedProducts.slice(startIndex, endIndex);
    } else {
        displayedProducts = displayedProducts.slice(0, limit);
    }

    const handlePageChange = (page) => {
        setCurrentPage(page);
        // Scroll to top of product list
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div>
            <div className="product-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '24px' }}>
                {displayedProducts.map((item) => {
                    const cat = categories.find(c => c.id === item.categoryProductId);
                    return (
                        <div className="product-grid-item" key={item.id}>
                            <ProductCard item={item} categoryName={cat?.name} categoryImageUrl={cat?.imageUrl} />
                        </div>
                    );
                })}
            </div>

            {/* Pagination Controls */}
            {!limit && totalPages > 1 && (
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

export default ProductList;
