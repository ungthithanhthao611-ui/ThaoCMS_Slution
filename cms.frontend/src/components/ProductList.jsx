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
            <div className="product-grid">
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
                <div className="d-flex justify-content-center mt-5 mb-4">
                    <nav aria-label="Page navigation">
                        <ul className="pagination" style={{ gap: '5px' }}>
                            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                <button className="page-link" onClick={() => handlePageChange(currentPage - 1)} style={{ borderRadius: '5px', color: '#b22830' }}>
                                    &laquo; Trước
                                </button>
                            </li>
                            
                            {[...Array(totalPages)].map((_, index) => (
                                <li key={index + 1} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                    <button 
                                        className="page-link" 
                                        onClick={() => handlePageChange(index + 1)}
                                        style={currentPage === index + 1 ? { backgroundColor: '#b22830', borderColor: '#b22830', borderRadius: '5px' } : { borderRadius: '5px', color: '#b22830' }}
                                    >
                                        {index + 1}
                                    </button>
                                </li>
                            ))}

                            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                <button className="page-link" onClick={() => handlePageChange(currentPage + 1)} style={{ borderRadius: '5px', color: '#b22830' }}>
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
