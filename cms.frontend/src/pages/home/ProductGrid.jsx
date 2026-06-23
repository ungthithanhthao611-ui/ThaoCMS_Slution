import React, { useState, useEffect } from 'react';
import ProductCard from '../../components/ProductCard';
import productService from '../../services/productService';

const SectionTitle = ({ icon, title, color = '#b22830' }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
        <span style={{
            background: color, color: '#fff',
            fontWeight: '900', fontSize: '0.72rem',
            padding: '5px 9px', borderRadius: '6px',
            letterSpacing: '0.5px', whiteSpace: 'nowrap'
        }}>{icon}</span>
        <h2 style={{
            color, fontWeight: '900', textTransform: 'uppercase',
            fontSize: '22px', margin: 0, letterSpacing: '1px'
        }}>{title}</h2>
        <div style={{ flex: 1, height: '2px', background: `linear-gradient(to right, ${color}, transparent)` }} />
    </div>
);

const ProductGrid = () => {
    const [latestProducts, setLatestProducts] = useState([]);
    const [saleProducts, setSaleProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const [latest, sale] = await Promise.all([
                    productService.getLatestProducts(),
                    productService.getSaleProducts()
                ]);
                setLatestProducts(latest);
                setSaleProducts(sale);
            } catch (error) {
                console.error("Lỗi tải sản phẩm trên trang chủ:", error);
            } finally {
                setLoading(false);
            }
        };
        loadProducts();
    }, []);

    if (loading) return (
        <div style={{ textAlign: 'center', padding: '60px 0', color: '#aaa' }}>
            <i className="fa fa-spinner fa-spin" style={{ fontSize: '2rem' }}></i>
        </div>
    );

    return (
        <div className="boxhome" style={{ backgroundColor: '#f8f8f8', padding: '60px 0' }}>
            <div className="wrapper">

                {/* ===== THỰC ĐƠN MỚI NHẤT ===== */}
                <div style={{ marginBottom: '60px' }}>
                    <SectionTitle icon="NEW" title="Thực đơn mới nhất" color="#28a745" />
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                        gap: '20px'
                    }}>
                        {latestProducts.map(item => (
                            <ProductCard key={item.id} item={item} />
                        ))}
                        {latestProducts.length === 0 && (
                            <p style={{ color: '#aaa', gridColumn: '1/-1', textAlign: 'center' }}>Chưa có sản phẩm</p>
                        )}
                    </div>
                </div>

                {/* ===== SẢN PHẨM SALE ===== */}
                <div>
                    <SectionTitle icon="SALE" title="Sản phẩm Sale" color="#b22830" />
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                        gap: '20px'
                    }}>
                        {saleProducts.map(item => (
                            <ProductCard key={item.id} item={item} />
                        ))}
                        {saleProducts.length === 0 && (
                            <p style={{ color: '#aaa', gridColumn: '1/-1', textAlign: 'center' }}>Chưa có sản phẩm sale</p>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ProductGrid;
