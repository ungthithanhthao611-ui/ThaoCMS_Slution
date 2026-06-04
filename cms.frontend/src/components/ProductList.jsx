import React, { useState, useEffect } from 'react';
import productService from '../services/productService';
import ProductCard from './ProductCard';

const ProductList = ({ categoryId, layout, limit }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                let data;
                if (categoryId) {
                    data = await productService.getProductsByCategory(categoryId);
                } else {
                    data = await productService.getAllProducts();
                }
                setProducts(data);
            } catch (error) {
                console.error("Lỗi khi tải danh sách sản phẩm:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [categoryId]);

    if (loading) {
        return <div className="text-center my-4">Đang tải thực đơn...</div>;
    }

    if (products.length === 0) {
        return <div className="col-12"><p className="text-muted text-center">Chưa có sản phẩm nào trong hệ thống.</p></div>;
    }

    if (layout === 'sidebar') {
        return (
            <div className="product-sidebar-list">
                {products.map((item) => (
                    <div className="itemMenu" key={item.id} style={{marginBottom: '20px', display: 'flex', alignItems: 'center'}}>
                        <div className="img" style={{width: '80px', flexShrink: 0, marginRight: '15px'}}>
                            <a href={`/product/${item.id}`}>
                                <img src={item.imageUrl} alt={item.name} className="img-fluid" style={{borderRadius: '8px'}} />
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
                                {item.price.toLocaleString()} VNĐ
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    let displayedProducts = products;
    if (limit && limit > 0) {
        displayedProducts = products.slice(0, limit);
    }

    return (
        <div className="row justify-content-center">
            {displayedProducts.map((item) => (
                <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={item.id}>
                    <ProductCard item={item} />
                </div>
            ))}
        </div>
    );
};

export default ProductList;
