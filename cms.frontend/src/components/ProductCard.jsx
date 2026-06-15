import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { IMAGE_BASE } from '../api/axiosClient';

const ProductCard = ({ item }) => {
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

    // Tính % giảm giá
    const discountPercent = hasSale
        ? Math.round(((item.price - item.salePrice) / item.price) * 100)
        : 0;

    const formatVND = (val) =>
        new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);

    return (
        <div
            className="hc-card text-center"
            style={{
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                background: '#fff',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                width: '100%'
            }}
            onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = '0 12px 28px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.08)';
            }}
        >
            {/* Ảnh sản phẩm */}
            <Link to={`/product/${item.id}`}>
                <div style={{
                    backgroundColor: '#fafafa',
                    height: '200px',
                    position: 'relative',
                    overflow: 'hidden',
                    padding: '12px',
                    borderBottom: '1px solid #f0f0f0'
                }}>
                    {/* Badge NEW */}
                    {isNew && !hasSale && (
                        <span style={{
                            position: 'absolute', top: '10px', left: '10px',
                            backgroundColor: '#28a745', color: '#fff',
                            fontSize: '0.7rem', fontWeight: '800',
                            padding: '4px 8px', borderRadius: '6px',
                            zIndex: 10, letterSpacing: '0.5px',
                            boxShadow: '0 2px 6px rgba(40,167,69,0.4)'
                        }}>
                            NEW
                        </span>
                    )}

                    {/* Badge % giảm giá — hình tròn nổi bật */}
                    {hasSale && (
                        <span style={{
                            position: 'absolute', top: '8px', right: '8px',
                            background: 'linear-gradient(135deg, #ff3b30, #c0392b)',
                            color: '#fff',
                            width: '48px', height: '48px',
                            borderRadius: '50%',
                            display: 'flex', flexDirection: 'column',
                            alignItems: 'center', justifyContent: 'center',
                            zIndex: 10,
                            boxShadow: '0 3px 10px rgba(192,57,43,0.5)',
                            fontWeight: '900',
                            lineHeight: 1.1,
                            border: '2px solid rgba(255,255,255,0.3)'
                        }}>
                            <span style={{ fontSize: '0.75rem' }}>-{discountPercent}</span>
                            <span style={{ fontSize: '0.65rem' }}>%</span>
                        </span>
                    )}

                    {imageUrl ? (
                        <img
                            src={imageUrl}
                            alt={item.name}
                            style={{
                                width: '100%', height: '100%',
                                objectFit: 'contain',
                                transition: 'transform 0.4s ease'
                            }}
                            onMouseEnter={e => e.target.style.transform = 'scale(1.08)'}
                            onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                            onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; }}
                        />
                    ) : (
                        <i className="fa fa-coffee" style={{ fontSize: '5rem', color: '#ccc', lineHeight: '200px' }}></i>
                    )}
                </div>
            </Link>

            {/* Nội dung card */}
            <div style={{ padding: '14px 14px 16px', display: 'flex', flexDirection: 'column', gap: '10px', flexGrow: 1 }}>
                {/* Phần tên và giá sản phẩm được bọc chung để co giãn đều */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flexGrow: 1, justifyContent: 'space-between', marginBottom: '6px' }}>
                    {/* Tên sản phẩm */}
                    <Link to={`/product/${item.id}`} style={{ textDecoration: 'none' }}>
                        <h6 style={{
                            fontWeight: '700', color: '#222',
                            fontSize: '0.92rem', margin: 0,
                            minHeight: '38px',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            lineHeight: '1.4'
                        }}>
                            {item.name}
                        </h6>
                    </Link>

                    {/* Giá tiền */}
                    {hasSale ? (
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                            <span style={{
                                fontSize: '1.15rem', fontWeight: '900', color: '#c0392b',
                                letterSpacing: '-0.3px'
                            }}>
                                {formatVND(item.salePrice)}
                            </span>
                            <span style={{
                                fontSize: '0.8rem', color: '#aaa',
                                textDecoration: 'line-through'
                            }}>
                                {formatVND(item.price)}
                            </span>
                        </div>
                    ) : (
                        <p style={{ fontSize: '1.1rem', fontWeight: '800', color: '#b22830', margin: 0 }}>
                            {formatVND(item.price)}
                        </p>
                    )}
                </div>

                {/* Nút thêm vào giỏ */}
                <button
                    className="hc-btn-primary w-100"
                    onClick={handleAddToCart}
                    style={{
                        backgroundColor: added ? '#28a745' : '#b22830',
                        background: added
                            ? 'linear-gradient(135deg, #28a745, #20963a)'
                            : 'linear-gradient(135deg, #c0392b, #962d22)',
                        transition: 'all 0.3s ease',
                        borderRadius: '10px',
                        padding: '10px',
                        fontWeight: '700',
                        letterSpacing: '0.5px',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#fff',
                        fontSize: '0.88rem',
                        boxShadow: added
                            ? '0 4px 12px rgba(40,167,69,0.4)'
                            : '0 4px 12px rgba(192,57,43,0.35)',
                        marginTop: 'auto'
                    }}
                >
                    {added ? (
                        <><i className="fa fa-check" style={{ marginRight: '6px' }}></i>Đã thêm {quantity}!</>
                    ) : (
                        <><i className="fa fa-shopping-cart" style={{ marginRight: '6px' }}></i>Thêm vào giỏ</>
                    )}
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
