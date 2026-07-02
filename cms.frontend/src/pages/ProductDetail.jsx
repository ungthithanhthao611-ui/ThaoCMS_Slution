import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import axiosClient, { IMAGE_BASE } from '../api/axiosClient';
import reviewService from '../services/reviewService';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [added, setAdded] = useState(false);

    // Trạng thái Đánh giá & Sản phẩm liên quan & Chọn Size
    const [reviews, setReviews] = useState([]);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [selectedSize, setSelectedSize] = useState('S');

    useEffect(() => {
        const fetchProductAndReviews = async () => {
            try {
                const data = await axiosClient.get(`/Products/${id}`);
                setProduct(data);

                // Tải đánh giá
                const revs = await reviewService.getReviewsByProduct(id);
                setReviews(revs || []);

                // Tải sản phẩm liên quan
                if (data.categoryProductId) {
                    const related = await axiosClient.get(`/Products/category/${data.categoryProductId}`);
                    if (Array.isArray(related)) {
                        // Lọc bỏ sản phẩm hiện tại, lấy tối đa 4 sản phẩm
                        const filtered = related.filter(p => p.id !== data.id).slice(0, 4);
                        setRelatedProducts(filtered);
                    }
                }
            } catch (error) {
                console.error("Lỗi tải chi tiết sản phẩm hoặc đánh giá:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProductAndReviews();
    }, [id]);

    const handleAddToCart = () => {
        const q = parseInt(quantity);
        if (isNaN(q) || q < 1) {
            if (window.Swal) {
                window.Swal.fire({
                    icon: 'warning',
                    title: 'Lỗi số lượng',
                    text: 'Vui lòng nhập số lượng hợp lệ!',
                    confirmButtonColor: '#b22830'
                });
            } else {
                alert("Vui lòng nhập số lượng hợp lệ!");
            }
            return;
        }
        if (q > product.stockQuantity) {
            if (window.Swal) {
                window.Swal.fire({
                    icon: 'error',
                    title: 'Không đủ hàng',
                    text: `Không thể thêm vào giỏ hàng vì vượt quá số lượng trong kho (Còn lại ${product.stockQuantity} sản phẩm)!`,
                    confirmButtonColor: '#b22830'
                });
            } else {
                alert(`Không thể thêm vào giỏ hàng vì vượt quá số lượng trong kho (Còn lại ${product.stockQuantity} sản phẩm)!`);
            }
            return;
        }
        addToCart(product, q, selectedSize);
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
            <div style={{ background: 'linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)', minHeight: '80vh', padding: '50px 0' }}>
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
                        background: 'white', borderRadius: '30px',
                        overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.06)',
                        display: 'flex', flexWrap: 'wrap', transition: 'all 0.3s ease'
                    }}>
                        {/* Ảnh sản phẩm */}
                        <div style={{
                            flex: '1 1 420px', background: 'linear-gradient(to bottom right, #fcfcfc, #f1f1f1)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            position: 'relative', minHeight: '400px', padding: '20px'
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
                                    style={{ 
                                        width: '100%', height: '100%', objectFit: 'contain', maxHeight: '500px',
                                        transition: 'transform 0.4s ease, filter 0.4s', cursor: 'pointer'
                                    }}
                                    onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.08)'; e.currentTarget.style.filter = 'drop-shadow(0 15px 25px rgba(0,0,0,0.15))'; }}
                                    onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.filter = 'none'; }}
                                />
                            ) : (
                                <i className="fa fa-coffee" style={{ fontSize: '10rem', color: '#ddd' }}></i>
                            )}
                        </div>

                        {/* Chi tiết sản phẩm */}
                        <div style={{ flex: '1 1 400px', padding: '50px 45px', display: 'flex', flexDirection: 'column', gap: '22px' }}>
                            <h1 style={{ 
                                fontWeight: '900', fontSize: '2.5rem', margin: 0, lineHeight: 1.2,
                                background: 'linear-gradient(45deg, #1a1a1a, #555)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
                            }}>
                                {product.name}
                            </h1>

                            {/* Giá */}
                            {hasSale ? (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap', background: '#fff', padding: '15px 20px', borderRadius: '15px', border: '1px solid #f0f0f0', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
                                    <span style={{ fontSize: '2.4rem', fontWeight: '900', color: '#b22830' }}>
                                        {formatVND(selectedSize === 'M'
                                            ? (product.priceSizeM && product.priceSizeM > 0
                                                ? Math.round(product.priceSizeM * (product.salePrice / product.price))
                                                : product.salePrice + 10000)
                                            : product.salePrice)}
                                    </span>
                                    <span style={{ fontSize: '1.2rem', color: '#aaa', textDecoration: 'line-through', fontWeight: '600' }}>
                                        {formatVND(selectedSize === 'M'
                                            ? (product.priceSizeM && product.priceSizeM > 0
                                                ? product.priceSizeM
                                                : product.price + 10000)
                                            : product.price)}
                                    </span>
                                    <span style={{
                                        background: 'linear-gradient(135deg, #ffc4be, #ff9e99)', color: '#b22830',
                                        fontWeight: '800', fontSize: '0.85rem',
                                        padding: '6px 12px', borderRadius: '20px',
                                        boxShadow: '0 2px 8px rgba(178,40,48,0.2)'
                                    }}>
                                        Tiết kiệm {formatVND(selectedSize === 'M'
                                            ? (product.priceSizeM && product.priceSizeM > 0
                                                ? product.priceSizeM - Math.round(product.priceSizeM * (product.salePrice / product.price))
                                                : product.price - product.salePrice)
                                            : product.price - product.salePrice)}
                                    </span>
                                </div>
                            ) : (
                                <div style={{ fontSize: '2.4rem', fontWeight: '900', color: '#b22830', textShadow: '0 2px 4px rgba(178,40,48,0.1)' }}>
                                    {formatVND(selectedSize === 'M'
                                        ? (product.priceSizeM && product.priceSizeM > 0
                                            ? product.priceSizeM
                                            : product.price + 10000)
                                        : product.price)}
                                </div>
                            )}

                            {/* Mô tả */}
                            {product.description && (
                                <div 
                                    style={{
                                        color: '#555', lineHeight: '1.8', fontSize: '1.05rem',
                                        backgroundColor: '#fdfdfd', padding: '20px 24px',
                                        borderRadius: '16px', borderLeft: '5px solid #b22830',
                                        boxShadow: 'inset 0 0 10px rgba(0,0,0,0.02)'
                                    }}
                                    dangerouslySetInnerHTML={{ __html: product.description }}
                                />
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

                            {/* Bộ chọn Size */}
                            {product.priceSizeM && product.priceSizeM > 0 && (
                                <div style={{ margin: '15px 0' }}>
                                    <label style={{ display: 'block', fontWeight: '800', fontSize: '0.9rem', color: '#333', marginBottom: '12px', letterSpacing: '0.5px' }}>
                                        CHỌN SIZE ĐỒ UỐNG:
                                    </label>
                                    <div style={{ display: 'flex', gap: '12px' }}>
                                        {[
                                            { code: 'S', label: 'Size Nhỏ (S)', priceInfo: 'Giá chuẩn' },
                                            { code: 'M', label: 'Size Vừa (M)', priceInfo: `+${new Intl.NumberFormat('vi-VN').format(product.priceSizeM - product.price)} ₫` }
                                        ].map(sizeOpt => {
                                            const isSelected = selectedSize === sizeOpt.code;
                                            return (
                                                <button
                                                    key={sizeOpt.code}
                                                    onClick={() => setSelectedSize(sizeOpt.code)}
                                                    style={{
                                                        flex: '1',
                                                        padding: '12px 10px',
                                                        borderRadius: '14px',
                                                        border: isSelected ? '2px solid #b22830' : '1.5px solid #edf2f7',
                                                        backgroundColor: isSelected ? '#fff5f5' : '#fafbfc',
                                                        color: isSelected ? '#b22830' : '#4a5568',
                                                        fontWeight: '800',
                                                        fontSize: '0.9rem',
                                                        cursor: 'pointer',
                                                        transition: 'all 0.2s ease',
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        alignItems: 'center',
                                                        gap: '4px',
                                                        boxShadow: isSelected ? '0 6px 15px rgba(178,40,48,0.12)' : 'none',
                                                        outline: 'none'
                                                    }}
                                                    onMouseEnter={e => {
                                                        if (!isSelected) {
                                                            e.currentTarget.style.borderColor = '#b22830';
                                                            e.currentTarget.style.backgroundColor = '#fff';
                                                        }
                                                    }}
                                                    onMouseLeave={e => {
                                                        if (!isSelected) {
                                                            e.currentTarget.style.borderColor = '#edf2f7';
                                                            e.currentTarget.style.backgroundColor = '#fafbfc';
                                                        }
                                                    }}
                                                >
                                                    <span>{sizeOpt.label}</span>
                                                    <span style={{ fontSize: '0.72rem', fontWeight: '600', color: isSelected ? '#b22830' : '#a0aec0' }}>
                                                        {sizeOpt.priceInfo}
                                                    </span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            <hr style={{ margin: '15px 0', borderColor: '#f0f0f0' }} />

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
                                                if (window.Swal) {
                                                    window.Swal.fire({
                                                        icon: 'warning',
                                                        title: 'Không đủ số lượng',
                                                        text: `Số lượng trong kho không đủ! Chỉ còn lại ${product.stockQuantity} sản phẩm.`,
                                                        confirmButtonColor: '#b22830'
                                                    });
                                                } else {
                                                    alert(`Số lượng trong kho không đủ! Chỉ còn lại ${product.stockQuantity} sản phẩm.`);
                                                }
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
                                                if (window.Swal) {
                                                    window.Swal.fire({
                                                        icon: 'warning',
                                                        title: 'Không đủ số lượng',
                                                        text: `Số lượng trong kho không đủ! Chỉ còn lại ${product.stockQuantity} sản phẩm.`,
                                                        confirmButtonColor: '#b22830'
                                                    });
                                                } else {
                                                    alert(`Số lượng trong kho không đủ! Chỉ còn lại ${product.stockQuantity} sản phẩm.`);
                                                }
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
                                        flex: 1, minWidth: '200px', height: '54px',
                                        background: product.stockQuantity === 0
                                            ? '#ccc'
                                            : added
                                                ? 'linear-gradient(135deg, #28a745, #20963a)'
                                                : 'linear-gradient(135deg, #b22830, #ff4b4b)',
                                        color: 'white', border: 'none',
                                        padding: '0 24px', borderRadius: '14px',
                                        cursor: product.stockQuantity === 0 ? 'not-allowed' : 'pointer',
                                        fontSize: '1.1rem', fontWeight: '900',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                                        boxShadow: added ? '0 8px 20px rgba(40,167,69,0.3)' : '0 8px 25px rgba(178,40,48,0.4)',
                                        transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                                    }}
                                    onMouseEnter={e => { if (product.stockQuantity > 0) e.currentTarget.style.transform = 'translateY(-3px)'; }}
                                    onMouseLeave={e => { if (product.stockQuantity > 0) e.currentTarget.style.transform = 'translateY(0)'; }}
                                >
                                    {added
                                        ? <><i className="fa fa-check" style={{ marginRight: '8px' }}></i>Đã thêm vào giỏ!</>
                                        : <><i className="fa fa-shopping-cart" style={{ marginRight: '8px' }}></i>Thêm vào giỏ</>
                                    }
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* SẢN PHẨM LIÊN QUAN */}
                    {relatedProducts.length > 0 && (
                        <div style={{ marginTop: '50px', marginBottom: '40px' }}>
                            <h3 style={{
                                fontWeight: '900',
                                fontSize: '2rem',
                                color: '#1a1a1a',
                                marginBottom: '30px',
                                position: 'relative',
                                display: 'inline-block',
                                paddingBottom: '10px'
                            }}>
                                Sản Phẩm Liên Quan
                                <span style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    width: '80px',
                                    height: '4px',
                                    background: 'linear-gradient(90deg, #b22830, #ff4b4b)',
                                    borderRadius: '2px'
                                }}></span>
                            </h3>
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                                gap: '30px',
                                marginTop: '10px'
                            }}>
                                {relatedProducts.map(item => (
                                    <div key={item.id}>
                                        <ProductCard item={item} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* KHU VỰC ĐÁNH GIÁ SẢN PHẨM */}
                    <div style={{ marginTop: '40px', background: 'white', borderRadius: '20px', padding: '40px', boxShadow: '0 8px 30px rgba(0,0,0,0.08)' }}>
                        <h3 style={{ fontWeight: '800', borderBottom: '2px solid #f0f0f0', paddingBottom: '15px', marginBottom: '20px' }}>Đánh giá sản phẩm</h3>

                        <div>
                            {reviews.length === 0 ? (
                                <p style={{ color: '#888', fontStyle: 'italic' }}>Chưa có đánh giá nào cho sản phẩm này.</p>
                            ) : (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                    {reviews.map(rev => (
                                        <div key={rev.id} style={{ borderBottom: '1px solid #eee', paddingBottom: '20px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                                                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#ccc', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                                                    {rev.customerName.charAt(0)}
                                                </div>
                                                <div>
                                                    <div style={{ fontWeight: 'bold' }}>{rev.customerName}</div>
                                                    <div style={{ color: '#ffc107', fontSize: '14px' }}>
                                                        {[1, 2, 3, 4, 5].map(star => (
                                                            <i key={star} className={`fa ${star <= rev.rating ? 'fa-star' : 'fa-star-o'}`}></i>
                                                        ))}
                                                        <span style={{ color: '#999', fontSize: '12px', marginLeft: '10px' }}>{new Date(rev.createdDate).toLocaleDateString('vi-VN')}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            {rev.comment && <p style={{ margin: '10px 0', color: '#444' }}>{rev.comment}</p>}
                                            {rev.imageUrl && (
                                                <img 
                                                    src={rev.imageUrl.startsWith('http') ? rev.imageUrl : `${IMAGE_BASE}${rev.imageUrl.startsWith('/') ? '' : '/'}${rev.imageUrl}`} 
                                                    alt="Review" 
                                                    style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '8px', marginTop: '10px' }}
                                                />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ProductDetail;
