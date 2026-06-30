import React, { useState, useEffect, useRef } from 'react';
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

    const latestRef = useRef(null);
    const saleRef = useRef(null);
    const [latestVisible, setLatestVisible] = useState(false);
    const [saleVisible, setSaleVisible] = useState(false);

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

    useEffect(() => {
        if (loading) return;

        const observerOptions = {
            threshold: 0.1, // Kích hoạt khi thấy 10% phần tử
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.target === latestRef.current && entry.isIntersecting) {
                    setLatestVisible(true);
                }
                if (entry.target === saleRef.current && entry.isIntersecting) {
                    setSaleVisible(true);
                }
            });
        }, observerOptions);

        if (latestRef.current) observer.observe(latestRef.current);
        if (saleRef.current) observer.observe(saleRef.current);

        return () => {
            if (latestRef.current) observer.unobserve(latestRef.current);
            if (saleRef.current) observer.unobserve(saleRef.current);
        };
    }, [loading]);

    if (loading) return (
        <div style={{ textAlign: 'center', padding: '60px 0', color: '#aaa' }}>
            <i className="fa fa-spinner fa-spin" style={{ fontSize: '2rem' }}></i>
        </div>
    );

    return (
        <div className="boxhome" style={{ backgroundColor: '#f8f8f8', padding: '60px 0', overflow: 'hidden' }}>
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
                    animation-delay: 0.3s; /* Chạy sau khi tiêu đề đã trượt xong */
                }
            `}</style>
            <div className="wrapper">

                {/* ===== THỰC ĐƠN MỚI NHẤT ===== */}
                <div ref={latestRef} style={{ marginBottom: '60px' }}>
                    <div className={`scroll-title ${latestVisible ? 'active' : ''}`}>
                        <SectionTitle icon="NEW" title="Thực đơn mới nhất" color="#28a745" />
                    </div>
                    <div className={`scroll-grid ${latestVisible ? 'active' : ''}`} style={{
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
                <div ref={saleRef}>
                    <div className={`scroll-title ${saleVisible ? 'active' : ''}`}>
                        <SectionTitle icon="SALE" title="Sản phẩm Sale" color="#b22830" />
                    </div>
                    <div className={`scroll-grid ${saleVisible ? 'active' : ''}`} style={{
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
