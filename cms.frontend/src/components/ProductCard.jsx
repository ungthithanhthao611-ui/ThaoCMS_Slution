import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { IMAGE_BASE } from '../api/axiosClient';
import { getCategoryImage } from '../services/categoryProductService';

// Hàm loại bỏ thẻ HTML để trích xuất text thuần
const stripHtml = (html) => {
    if (!html) return '';
    return html.replace(/<[^>]*>?/gm, '');
};

const ProductCard = ({ item, categoryName, categoryImageUrl }) => {
    const { addToCart } = useCart();
    const [added, setAdded] = useState(false);
    const [quantity, setQuantity] = useState(1);

    const handleAddToCart = () => {
        addToCart(item, quantity);
        setAdded(true);
        setTimeout(() => {
            setAdded(false);
            setQuantity(1);
        }, 1500);
    };

    const imageUrl = item.imageUrl
        ? (item.imageUrl.startsWith('http')
            ? item.imageUrl
            : `${IMAGE_BASE}${item.imageUrl.startsWith('/') ? '' : '/'}${item.imageUrl}`)
        : null;

    const isNew = item.isNew !== undefined ? item.isNew : (item.id % 3 === 0);
    const hasSale = item.salePrice && item.salePrice > 0 && item.salePrice < item.price;

    const discountPercent = hasSale
        ? Math.round(((item.price - item.salePrice) / item.price) * 100)
        : 0;

    const formatVND = (val) =>
        new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);

    const catImageUrl = categoryImageUrl 
        ? (categoryImageUrl.startsWith('http') ? categoryImageUrl : `${IMAGE_BASE}${categoryImageUrl.startsWith('/') ? '' : '/'}${categoryImageUrl}`)
        : getCategoryImage(categoryName || '');

    // Trích xuất mô tả ngắn
    const rawDescription = stripHtml(item.description);
    const shortDesc = rawDescription
        ? (rawDescription.length > 70 ? rawDescription.substring(0, 70) + '...' : rawDescription)
        : 'Thưởng thức hương vị thơm ngon tuyệt hảo được pha chế từ nguyên liệu sạch tại Highlands.';

    return (
        <div
            className="hc-card-horizontal"
            style={{
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 6px 18px rgba(83, 56, 44, 0.05)',
                transition: 'all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1)',
                background: '#ffffff',
                width: '100%',
                border: '1px solid rgba(83, 56, 44, 0.06)',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                padding: '18px',
                gap: '20px',
                boxSizing: 'border-box'
            }}
            onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 25px rgba(83, 56, 44, 0.12)';
                e.currentTarget.style.borderColor = 'rgba(178, 40, 48, 0.25)';
            }}
            onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 6px 18px rgba(83, 56, 44, 0.05)';
                e.currentTarget.style.borderColor = 'rgba(83, 56, 44, 0.06)';
            }}
        >
            {/* Ảnh bên trái */}
            <Link to={`/product/${item.id}`} style={{ position: 'relative', display: 'block', flexShrink: 0 }}>
                <div style={{
                    backgroundColor: '#faf6f2',
                    width: '140px',
                    height: '140px',
                    position: 'relative',
                    overflow: 'hidden',
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: 'inset 0 0 10px rgba(83, 56, 44, 0.03)'
                }}>
                    {/* Badge NEW */}
                    {isNew && !hasSale && (
                        <span style={{
                            position: 'absolute', top: '8px', left: '8px',
                            background: 'linear-gradient(135deg, #28a745, #1e7e34)', color: '#fff',
                            fontSize: '0.6rem', fontWeight: '800',
                            padding: '3px 8px', borderRadius: '12px',
                            zIndex: 10, letterSpacing: '0.5px'
                        }}>
                            MỚI
                        </span>
                    )}

                    {/* Badge Sale */}
                    {hasSale && (
                        <span style={{
                            position: 'absolute', top: '8px', right: '8px',
                            background: '#b22830', color: '#fff',
                            fontSize: '0.6rem', fontWeight: '900',
                            padding: '3px 8px', borderRadius: '12px',
                            zIndex: 10
                        }}>
                            -{discountPercent}%
                        </span>
                    )}

                    {imageUrl ? (
                        <img
                            src={imageUrl}
                            alt={item.name}
                            style={{
                                width: '100%', height: '100%',
                                objectFit: 'cover',
                                transition: 'transform 0.4s ease-out'
                            }}
                            onMouseEnter={e => e.target.style.transform = 'scale(1.08)'}
                            onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                            onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; }}
                        />
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', color: '#c0a080' }}>
                            <i className="fa fa-coffee" style={{ fontSize: '2.5rem' }}></i>
                            <span style={{ fontSize: '0.65rem', fontWeight: 'bold', opacity: 0.7 }}>Thao Coffee</span>
                        </div>
                    )}
                </div>
            </Link>

            {/* Chi tiết bên phải */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: 1, minHeight: '140px', textAlign: 'left', gap: '8px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {/* Hàng nhãn danh mục & Sao đánh giá */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '5px' }}>
                        {categoryName && (
                            <span style={{ fontSize: '0.7rem', fontWeight: '700', color: '#a0aec0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                {categoryName}
                            </span>
                        )}
                        
                        {/* Rating Stars Mockup */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '2px', fontSize: '0.75rem', color: '#f5b041' }}>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <span style={{ color: '#718096', marginLeft: '3px', fontWeight: 'bold' }}>5.0</span>
                        </div>
                    </div>
                    
                    {/* Tên sản phẩm */}
                    <Link to={`/product/${item.id}`} style={{ textDecoration: 'none', display: 'block' }}>
                        <h6 style={{
                            fontWeight: '800', color: '#53382c',
                            fontSize: '1.05rem', margin: 0,
                            display: '-webkit-box',
                            WebkitLineClamp: 1, WebkitBoxOrient: 'vertical',
                            overflow: 'hidden', lineHeight: '1.3',
                            transition: 'color 0.2s',
                            textTransform: 'capitalize'
                        }}
                        onMouseEnter={e => e.currentTarget.style.color = '#b22830'}
                        onMouseLeave={e => e.currentTarget.style.color = '#53382c'}
                        >
                            {item.name.toLowerCase()}
                        </h6>
                    </Link>

                    {/* Mô tả ngắn của sản phẩm */}
                    <p style={{
                        fontSize: '0.82rem',
                        color: '#718096',
                        margin: '2px 0 0 0',
                        lineHeight: '1.4',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        minHeight: '36px'
                    }}>
                        {shortDesc}
                    </p>
                </div>

                {/* Phần giá & nút thêm giỏ chung hàng */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', gap: '10px' }}>
                    {/* Giá tiền */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
                        {hasSale ? (
                            <>
                                <span style={{ fontSize: '1.2rem', fontWeight: '900', color: '#b22830' }}>
                                    {formatVND(item.salePrice)}
                                </span>
                                <span style={{ fontSize: '0.8rem', color: '#a0aec0', textDecoration: 'line-through', fontWeight: '500' }}>
                                    {formatVND(item.price)}
                                </span>
                            </>
                        ) : (
                            <span style={{ fontSize: '1.2rem', fontWeight: '900', color: '#b22830' }}>
                                {formatVND(item.price)}
                            </span>
                        )}
                    </div>

                    {/* Nút thêm vào giỏ */}
                    <button
                        className="hc-btn-primary"
                        onClick={handleAddToCart}
                        style={{
                            background: added 
                                ? 'linear-gradient(135deg, #28a745, #218838)' 
                                : 'linear-gradient(135deg, #b22830, #961e24)',
                            color: '#fff', border: 'none',
                            transition: 'all 0.3s ease', 
                            borderRadius: '12px',
                            padding: '10px 18px', 
                            fontWeight: '800', 
                            cursor: 'pointer',
                            fontSize: '0.8rem', 
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            boxShadow: added ? '0 4px 10px rgba(40,167,69,0.15)' : '0 4px 10px rgba(178,40,48,0.12)'
                        }}
                        onMouseEnter={e => {
                            if (!added) e.currentTarget.style.filter = 'brightness(1.15)';
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.filter = 'none';
                        }}
                    >
                        {added ? (
                            <><i className="fa fa-check"></i>Đã thêm</>
                        ) : (
                            <><i className="fa fa-shopping-cart"></i>Mua</>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
