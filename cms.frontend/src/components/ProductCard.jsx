import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductCard = ({ item }) => {
    const { addToCart } = useCart();
    const [added, setAdded] = useState(false);
    const [quantity, setQuantity] = useState(1); // State số lượng mặc định là 1

    const handleAddToCart = () => {
        addToCart(item, quantity); // Truyền số lượng vào
        setAdded(true);
        // Sau 1.5s đổi lại về bình thường và reset số lượng
        setTimeout(() => {
            setAdded(false);
            setQuantity(1);
        }, 1500);
    };

    const imageUrl = item.imageUrl
        ? (item.imageUrl.startsWith('http')
            ? item.imageUrl
            : `https://localhost:7030${item.imageUrl.startsWith('/') ? '' : '/'}${item.imageUrl}`)
        : null;

    return (
        <div className="hc-card text-center" style={{ borderRadius: '12px', overflow: 'hidden' }}>
            {/* Ảnh sản phẩm */}
            <Link to={`/product/${item.id}`}>
                <div className="hc-card-img-container" style={{ backgroundColor: '#ffffff', height: '220px', position: 'relative', overflow: 'hidden', padding: '15px' }}>
                    {imageUrl ? (
                        <img
                            src={imageUrl}
                            alt={item.name}
                            style={{ width: '100%', height: '100%', objectFit: 'contain', transition: 'transform 0.4s ease' }}
                            onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; }}
                        />
                    ) : (
                        <i className="fa fa-coffee" style={{ fontSize: '5rem', color: '#ccc', lineHeight: '220px' }}></i>
                    )}
                </div>
            </Link>

            {/* Nội dung */}
            <div className="card-body p-3 d-flex flex-column justify-content-between" style={{ gap: '8px' }}>
                <Link to={`/product/${item.id}`} style={{ textDecoration: 'none' }}>
                    <h6 style={{ fontWeight: '700', color: '#333', fontSize: '0.95rem', marginBottom: '4px', minHeight: '40px' }}>
                        {item.name}
                    </h6>
                </Link>
                <p className="hc-price" style={{ fontSize: '1.1rem', fontWeight: '800', margin: '0' }}>
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}
                </p>
                {/* Phần chọn số lượng và nút thêm vào giỏ */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {/* Bộ chọn số lượng */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
                        <button
                            onClick={() => setQuantity(q => Math.max(1, q - 1))}
                            style={{
                                width: '28px', height: '28px', borderRadius: '50%',
                                border: '1px solid #ccc', background: 'white', color: '#555',
                                fontWeight: 'bold', cursor: 'pointer', display: 'flex',
                                alignItems: 'center', justifyContent: 'center'
                            }}
                        >−</button>
                        <span style={{ fontWeight: 'bold', fontSize: '1.1rem', minWidth: '24px', textAlign: 'center' }}>
                            {quantity}
                        </span>
                        <button
                            onClick={() => setQuantity(q => q + 1)}
                            style={{
                                width: '28px', height: '28px', borderRadius: '50%',
                                border: '1px solid #ccc', background: 'white', color: '#555',
                                fontWeight: 'bold', cursor: 'pointer', display: 'flex',
                                alignItems: 'center', justifyContent: 'center'
                            }}
                        >+</button>
                    </div>

                    {/* Nút thêm vào giỏ */}
                    <button
                        className="hc-btn-primary w-100"
                        onClick={handleAddToCart}
                        style={{
                            backgroundColor: added ? '#28a745' : undefined,
                            transition: 'all 0.3s ease',
                            borderRadius: '8px',
                            padding: '10px',
                            fontWeight: '700',
                            letterSpacing: '0.5px',
                            border: 'none',
                            cursor: 'pointer'
                        }}
                    >
                        {added ? (
                            <><i className="fa fa-check" style={{ marginRight: '6px' }}></i> Đã thêm {quantity}!</>
                        ) : (
                            <><i className="fa fa-shopping-cart" style={{ marginRight: '6px' }}></i> Thêm vào giỏ</>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
