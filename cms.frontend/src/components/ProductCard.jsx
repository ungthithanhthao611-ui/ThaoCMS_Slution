import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { IMAGE_BASE } from '../api/axiosClient';
import { getCategoryImage } from '../services/categoryProductService';

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

    // Tính % giảm giá
    const discountPercent = hasSale
        ? Math.round(((item.price - item.salePrice) / item.price) * 100)
        : 0;

    const formatVND = (val) =>
        new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);

    // Xử lý ảnh danh mục (nếu có từ admin thì dùng, nếu không thì dùng fallback)
    const catImageUrl = categoryImageUrl 
        ? (categoryImageUrl.startsWith('http') ? categoryImageUrl : `${IMAGE_BASE}${categoryImageUrl.startsWith('/') ? '' : '/'}${categoryImageUrl}`)
        : getCategoryImage(categoryName || '');

    return (
        <div
            className="hc-card text-center"
            style={{
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 5px 20px rgba(0,0,0,0.05)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                background: '#fff',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                border: '1px solid #f0e6e0'
            }}
            onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 15px 30px rgba(178,40,48,0.1)';
            }}
            onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 5px 20px rgba(0,0,0,0.05)';
            }}
        >
            {/* Ảnh sản phẩm */}
            <Link to={`/product/${item.id}`} style={{ position: 'relative' }}>
                <div style={{
                    backgroundColor: '#fff',
                    height: '250px',
                    position: 'relative',
                    overflow: 'hidden',
                    padding: '0',
                }}>
                    {/* Badge NEW */}
                    {isNew && !hasSale && (
                        <span style={{
                            position: 'absolute', top: '15px', right: '15px',
                            backgroundColor: '#ffcc00', color: '#b22830',
                            fontSize: '0.7rem', fontWeight: '900',
                            padding: '5px 10px', borderRadius: '10px',
                            zIndex: 10, letterSpacing: '0.5px'
                        }}>
                            MỚI
                        </span>
                    )}

                    {/* Badge % giảm giá — hình tròn nổi bật */}
                    {hasSale && (
                        <span style={{
                            position: 'absolute', top: '12px', right: '12px',
                            background: '#b22830', color: '#fff',
                            width: '45px', height: '45px',
                            borderRadius: '50%',
                            display: 'flex', flexDirection: 'column',
                            alignItems: 'center', justifyContent: 'center',
                            zIndex: 10, fontWeight: '900', lineHeight: 1.1
                        }}>
                            <span style={{ fontSize: '0.8rem' }}>-{discountPercent}%</span>
                        </span>
                    )}

                    {imageUrl ? (
                        <img
                            src={imageUrl}
                            alt={item.name}
                            style={{
                                width: '100%', height: '100%',
                                objectFit: 'cover',
                                transition: 'transform 0.4s ease'
                            }}
                            onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
                            onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                            onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; }}
                        />
                    ) : (
                        <i className="fa fa-coffee" style={{ fontSize: '5rem', color: '#ccc', lineHeight: '200px' }}></i>
                    )}
                </div>
            </Link>

            {/* Nội dung card */}
            <div style={{ padding: '0 20px 20px 20px', display: 'flex', flexDirection: 'column', gap: '15px', flexGrow: 1 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flexGrow: 1, justifyContent: 'space-between' }}>
                    {/* Tên sản phẩm */}
                    <Link to={`/product/${item.id}`} style={{ textDecoration: 'none' }}>
                        <h6 style={{
                            fontWeight: '900', color: '#b22830',
                            fontSize: '1rem', margin: 0,
                            minHeight: '44px', display: '-webkit-box',
                            WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
                            overflow: 'hidden', lineHeight: '1.4',
                            textTransform: 'uppercase'
                        }}>
                            {item.name}
                        </h6>
                    </Link>

                    {/* Giá tiền */}
                    {hasSale ? (
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                            <span style={{ fontSize: '1.2rem', fontWeight: '900', color: '#333' }}>
                                {formatVND(item.salePrice)}
                            </span>
                            <span style={{ fontSize: '0.85rem', color: '#999', textDecoration: 'line-through' }}>
                                {formatVND(item.price)}
                            </span>
                        </div>
                    ) : (
                        <p style={{ fontSize: '1.2rem', fontWeight: '900', color: '#333', margin: 0 }}>
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
                        color: '#fff', border: 'none',
                        transition: 'all 0.3s ease', borderRadius: '15px',
                        padding: '12px', fontWeight: '800', cursor: 'pointer',
                        fontSize: '0.9rem', textTransform: 'uppercase'
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
