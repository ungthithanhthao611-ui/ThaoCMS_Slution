import React, { useState, useEffect } from 'react';
import productService from '../services/productService';
import ProductCard from './ProductCard';

const ProductList = ({ categoryId }) => {
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

    return (
        <div className="row">
            {products.length === 0 ? (
                <div className="col-12"><p className="text-muted text-center">Chưa có sản phẩm nào trong hệ thống.</p></div>
            ) : (
                products.map((item) => (
                    <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={item.id}>
                        <ProductCard item={item} />
                    </div>
                ))
            )}
        </div>
    );
};

export default ProductList;
