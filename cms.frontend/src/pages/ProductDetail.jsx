import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import axiosClient, { IMAGE_BASE } from '../api/axiosClient';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [added, setAdded] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await axiosClient.get(`/Products/${id}`);
                setProduct(data);
            } catch (error) {
                console.error("Lỗi tải chi tiết sản phẩm:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        const q = parseInt(quantity);
        if (isNaN(q) || q < 1) {
            alert("Vui lòng nhập số lượng hợp lệ!");
            return;
        }
        if (q > product.stockQuantity) {
            alert(`Không thể thêm vào giỏ hàng vì vượt quá số lượng trong kho (Còn lại ${product.stockQuantity} sản phẩm)!`);
            return;
        }
        addToCart(product, q);
        setAdded(true);
        setTimeout(() => {
            setAdded(false);
            setQuantity(1);
        }, 1500);
    };

    const formatVND = (val) =>
        new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);

    if (loading) return (
        <>
            <Header />
            <div style={{ textAlign: 'center', padding: '100px 0', color: '#aaa', minHeight: '60vh' }}>
                <i className="fa fa-spinner fa-spin" style={{ fontSize: '2.5rem' }}></i>
                <p style={{ marginTop: '16px' }}>Đang tải sản phẩm...</p>
            </div>
            <Footer />
        </>
    );

    if (!product) return (
        <>
            <Header />
            <div style={{ textAlign: 'center', padding: '100px 0', minHeight: '60vh' }}>
                <h3>Sản phẩm không tồn tại</h3>
                <button onClick={() => navigate(-1)} style={{ marginTop: '16px', padding: '10px 24px', background: '#b22830', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
                    ← Quay lại
                </button>
            </div>
            <Footer />
        </>
    );

    const imageUrl = product.imageUrl
        ? (product.imageUrl.startsWith('http')
            ? product.imageUrl
            : `${IMAGE_BASE}${product.imageUrl.startsWith('/') ? '' : '/'}${product.imageUrl}`)
        : null;

    const hasSale = product.salePrice && product.salePrice > 0 && product.salePrice < product.price;
    const discountPercent = hasSale
        ? Math.round(((product.price - product.salePrice) / product.price) * 100)
        : 0;

    return (
        <>
            <Header />
            <div style={{ backgroundColor: '#f5f5f5', minHeight: '80vh', padding: '40px 0' }}>
                <div className="wrapper">
                    {/* Breadcrumb */}
                    <div style={{ marginBottom: '20px', fontSize: '0.9rem', color: '#888' }}>
                        <span onClick={() => navigate('/')} style={{ cursor: 'pointer', color: '#b22830' }}>Trang chủ</span>
                        <span style={{ margin: '0 8px' }}>›</span>
                        <span onClick={() => navigate('/san-pham')} style={{ cursor: 'pointer', color: '#b22830' }}>Sản phẩm</span>
                        <span style={{ margin: '0 8px' }}>›</span>
                        <span style={{ color: '#333' }}>{product.name}</span>
                    </div>

                    <div style={{
                        background: 'white', borderRadius: '20px',
                        overflow: 'hidden', boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
                        display: 'flex', flexWrap: 'wrap'
                    }}>
                        {/* Ảnh sản phẩm */}
                        <div style={{
                            flex: '1 1 420px', backgroundColor: '#fafafa',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            position: 'relative', minHeight: '400px'
                        }}>
                            {/* Badge % giảm góc trên trái ảnh */}
                            {hasSale && (
                                <div style={{
                                    position: 'absolute', top: '20px', left: '20px',
                                    background: 'linear-gradient(135deg, #ff3b30, #c0392b)',
                                    color: '#fff', width: '64px', height: '64px',
                                    borderRadius: '50%',
                                    display: 'flex', flexDirection: 'column',
                                    alignItems: 'center', justifyContent: 'center',
                                    boxShadow: '0 4px 14px rgba(192,57,43,0.55)',
                                    fontWeight: '900', zIndex: 5,
                                    border: '3px solid rgba(255,255,255,0.35)'
                                }}>
                                    <span style={{ fontSize: '1rem', lineHeight: 1 }}>-{discountPercent}</span>
                                    <span style={{ fontSize: '0.72rem' }}>%</span>
                                </div>
                            )}
                            {imageUrl ? (
                                <img
                                    src={imageUrl}
                                    alt={product.name}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', maxHeight: '500px' }}
                                />
                            ) : (
                                <i className="fa fa-coffee" style={{ fontSize: '10rem', color: '#ddd' }}></i>
                            )}
                        </div>

                        {/* Chi tiết sản phẩm */}
                        <div style={{ flex: '1 1 400px', padding: '44px 40px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
                            <h1 style={{ fontWeight: '900', color: '#1a1a1a', fontSize: '2rem', margin: 0, lineHeight: 1.3 }}>
                                {product.name}
                            </h1>

                            {/* Giá */}
                            {hasSale ? (
                                <div style={{ display: 'flex', alignItems: 'baseline', gap: '14px', flexWrap: 'wrap' }}>
                                    <span style={{ fontSize: '2rem', fontWeight: '900', color: '#c0392b' }}>
                                        {formatVND(product.salePrice)}
                                    </span>
                                    <span style={{ fontSize: '1.1rem', color: '#aaa', textDecoration: 'line-through' }}>
                                        {formatVND(product.price)}
                                    </span>
                                    <span style={{
                                        background: '#fff0ef', color: '#c0392b',
                                        fontWeight: '800', fontSize: '0.85rem',
                                        padding: '4px 10px', borderRadius: '20px',
                                        border: '1.5px solid #ffc4be'
                                    }}>
                                        Tiết kiệm {formatVND(product.price - product.salePrice)}
                                    </span>
                                </div>
                            ) : (
                                <div style={{ fontSize: '2rem', fontWeight: '900', color: '#b22830' }}>
                                    {formatVND(product.price)}
                                </div>
                            )}

                            {/* Mô tả */}
                            {product.description && (
                                <div style={{
                                    color: '#555', lineHeight: '1.7', fontSize: '0.98rem',
                                    backgroundColor: '#fafafa', padding: '16px 18px',
                                    borderRadius: '10px', borderLeft: '4px solid #b22830'
                                }}>
                                    {product.description}
                                </div>
                            )}

                            {/* Kho */}
                            <div style={{
                                display: 'inline-flex', alignItems: 'center', gap: '8px',
                                fontSize: '0.9rem',
                                color: product.stockQuantity > 0 ? '#28a745' : '#dc3545',
                                fontWeight: '700'
                            }}>
                                <i className={`fa fa-${product.stockQuantity > 0 ? 'check-circle' : 'times-circle'}`}></i>
                                {product.stockQuantity > 0 ? `Còn ${product.stockQuantity} sản phẩm` : 'Hết hàng'}
                            </div>

                            <hr style={{ margin: '4px 0', borderColor: '#f0f0f0' }} />

                            {/* Số lượng + nút thêm giỏ */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                                {/* Bộ chọn số lượng */}
                                <div style={{
                                    display: 'flex', alignItems: 'center', gap: '0',
                                    border: '1.5px solid #e0e0e0', borderRadius: '10px', overflow: 'hidden'
                                }}>
                                    <button
                                        onClick={() => setQuantity(q => Math.max(1, Number(q || 1) - 1))}
                                        style={{
                                            width: '42px', height: '46px',
                                            border: 'none', background: '#f8f8f8',
                                            color: '#555', fontWeight: 'bold',
                                            cursor: 'pointer', fontSize: '1.3rem',
                                            transition: 'background 0.2s'
                                        }}
                                        onMouseEnter={e => e.currentTarget.style.background = '#fee'}
                                        onMouseLeave={e => e.currentTarget.style.background = '#f8f8f8'}
                                    >−</button>
                                    <input
                                        type="number"
                                        value={quantity}
                                        onChange={e => {
                                            const val = parseInt(e.target.value);
                                            if (isNaN(val) || e.target.value === '') {
                                                setQuantity('');
                                            } else if (val < 1) {
                                                setQuantity(1);
                                            } else if (val > product.stockQuantity) {
                                                alert(`Số lượng trong kho không đủ! Chỉ còn lại ${product.stockQuantity} sản phẩm.`);
                                                setQuantity(product.stockQuantity);
                                            } else {
                                                setQuantity(val);
                                            }
                                        }}
                                        onBlur={() => {
                                            if (quantity === '') {
                                                setQuantity(1);
                                            }
                                        }}
                                        style={{
                                            width: '54px', height: '46px',
                                            border: 'none', borderLeft: '1.5px solid #e0e0e0', borderRight: '1.5px solid #e0e0e0',
                                            textAlign: 'center', fontWeight: '800', fontSize: '1.1rem', color: '#333',
                                            outline: 'none', margin: 0, padding: 0
                                        }}
                                    />
                                    <button
                                        onClick={() => {
                                            if (Number(quantity || 0) >= product.stockQuantity) {
                                                alert(`Số lượng trong kho không đủ! Chỉ còn lại ${product.stockQuantity} sản phẩm.`);
                                            } else {
                                                setQuantity(q => Number(q || 0) + 1);
                                            }
                                        }}
                                        style={{
                                            width: '42px', height: '46px',
                                            border: 'none', background: '#f8f8f8',
                                            color: '#555', fontWeight: 'bold',
                                            cursor: 'pointer', fontSize: '1.3rem',
                                            transition: 'background 0.2s'
                                        }}
                                        onMouseEnter={e => e.currentTarget.style.background = '#fee'}
                                        onMouseLeave={e => e.currentTarget.style.background = '#f8f8f8'}
                                    >+</button>
                                </div>

                                {/* Nút thêm vào giỏ */}
                                <button
                                    onClick={handleAddToCart}
                                    disabled={product.stockQuantity === 0}
                                    style={{
                                        flex: 1, minWidth: '180px',
                                        background: product.stockQuantity === 0
                                            ? '#ccc'
                                            : added
                                                ? 'linear-gradient(135deg, #28a745, #20963a)'
                                                : 'linear-gradient(135deg, #c0392b, #962d22)',
                                        color: 'white', border: 'none',
                                        padding: '14px 24px', borderRadius: '10px',
                                        fontWeight: '800', fontSize: '1rem',
                                        textTransform: 'uppercase', letterSpacing: '1px',
                                        cursor: product.stockQuantity === 0 ? 'not-allowed' : 'pointer',
                                        transition: 'all 0.3s',
                                        boxShadow: product.stockQuantity === 0 ? 'none' : '0 6px 18px rgba(192,57,43,0.35)'
                                    }}
                                >
                                    {added
                                        ? <><i className="fa fa-check" style={{ marginRight: '8px' }}></i>Đã thêm vào giỏ!</>
                                        : <><i className="fa fa-shopping-cart" style={{ marginRight: '8px' }}></i>Thêm vào giỏ</>
                                    }
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ProductDetail;
