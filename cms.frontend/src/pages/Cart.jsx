import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();
    const navigate = useNavigate();

    if (cartItems.length === 0) {
        return (
            <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', textAlign: 'center' }}>
                <div style={{ fontSize: '80px', marginBottom: '20px', lineHeight: 1 }}>🛒</div>
                <h2 style={{ color: '#b22830', fontWeight: '800', marginBottom: '10px', marginTop: '10px' }}>Giỏ hàng trống</h2>
                <p style={{ color: '#888', marginBottom: '30px' }}>Hãy thêm đồ uống yêu thích của bạn nhé!</p>
                <Link to="/shop" style={{
                    backgroundColor: '#b22830', color: 'white', padding: '14px 40px',
                    borderRadius: '8px', textDecoration: 'none', fontWeight: '700',
                    fontSize: '1rem', letterSpacing: '1px'
                }}>
                    KHÁM PHÁ THỰC ĐƠN
                </Link>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '70vh', backgroundColor: '#f8f8f8', padding: '40px 0' }}>
            <div className="wrapper">
                <h2 style={{ color: '#b22830', fontWeight: '800', textTransform: 'uppercase', marginBottom: '30px', fontSize: '28px' }}>
                    🛒 Giỏ Hàng Của Bạn
                </h2>

                <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
                    {/* Danh sách sản phẩm */}
                    <div style={{ flex: '1', minWidth: '320px' }}>
                        {cartItems.map(item => {
                            const imageUrl = item.imageUrl
                                ? (item.imageUrl.startsWith('http') ? item.imageUrl : `https://localhost:7030${item.imageUrl.startsWith('/') ? '' : '/'}${item.imageUrl}`)
                                : null;
                            return (
                                <div key={item.id} style={{
                                    background: 'white', borderRadius: '12px', padding: '16px',
                                    marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '16px',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
                                }}>
                                    {/* Ảnh */}
                                    <div style={{ width: '80px', height: '80px', borderRadius: '10px', overflow: 'hidden', flexShrink: 0, background: '#f5f5f5' }}>
                                        {imageUrl
                                            ? <img src={imageUrl} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => e.target.style.display = 'none'} />
                                            : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><i className="fa fa-coffee" style={{ color: '#ccc', fontSize: '28px' }}></i></div>
                                        }
                                    </div>

                                    {/* Thông tin */}
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontWeight: '700', fontSize: '1rem', marginBottom: '4px' }}>{item.name}</div>
                                        <div style={{ color: '#b22830', fontWeight: '800', fontSize: '1rem' }}>
                                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}
                                        </div>
                                    </div>

                                    {/* Tăng/giảm số lượng */}
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} style={{
                                            width: '32px', height: '32px', borderRadius: '50%', border: '2px solid #b22830',
                                            background: 'white', color: '#b22830', fontWeight: '800', fontSize: '18px',
                                            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
                                        }}>−</button>
                                        <span style={{ fontWeight: '700', fontSize: '1.1rem', minWidth: '24px', textAlign: 'center' }}>{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={{
                                            width: '32px', height: '32px', borderRadius: '50%', border: '2px solid #b22830',
                                            background: '#b22830', color: 'white', fontWeight: '800', fontSize: '18px',
                                            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
                                        }}>+</button>
                                    </div>

                                    {/* Tổng giá dòng */}
                                    <div style={{ fontWeight: '800', color: '#333', minWidth: '90px', textAlign: 'right' }}>
                                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price * item.quantity)}
                                    </div>

                                    {/* Xóa */}
                                    <button onClick={() => removeFromCart(item.id)} style={{
                                        background: 'none', border: 'none', color: '#ccc', cursor: 'pointer',
                                        fontSize: '20px', padding: '4px', transition: 'color 0.2s'
                                    }} onMouseEnter={e => e.target.style.color = '#e74c3c'} onMouseLeave={e => e.target.style.color = '#ccc'}>
                                        ✕
                                    </button>
                                </div>
                            );
                        })}

                        <button onClick={clearCart} style={{
                            background: 'none', border: '1px solid #ccc', color: '#999',
                            padding: '8px 20px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem'
                        }}>
                            🗑️ Xóa tất cả
                        </button>
                    </div>

                    {/* Tổng kết đơn hàng */}
                    <div style={{ width: '320px', flexShrink: 0 }}>
                        <div style={{ background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', position: 'sticky', top: '100px' }}>
                            <h4 style={{ fontWeight: '800', marginBottom: '20px', color: '#333' }}>Tóm tắt đơn hàng</h4>

                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', color: '#666' }}>
                                <span>Tạm tính ({cartItems.reduce((s, i) => s + i.quantity, 0)} món)</span>
                                <span>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPrice)}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', color: '#666' }}>
                                <span>Phí giao hàng</span>
                                <span style={{ color: '#28a745', fontWeight: '700' }}>Miễn phí</span>
                            </div>

                            <hr style={{ margin: '16px 0' }} />

                            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '800', fontSize: '1.2rem', marginBottom: '24px' }}>
                                <span>Tổng cộng</span>
                                <span style={{ color: '#b22830' }}>
                                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPrice)}
                                </span>
                            </div>

                            <button onClick={() => navigate('/checkout')} style={{
                                width: '100%', backgroundColor: '#b22830', color: 'white',
                                padding: '16px', borderRadius: '10px', border: 'none',
                                fontWeight: '800', fontSize: '1rem', cursor: 'pointer',
                                letterSpacing: '1px', textTransform: 'uppercase',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={e => { e.target.style.backgroundColor = '#8c1e24'; e.target.style.transform = 'translateY(-2px)'; }}
                            onMouseLeave={e => { e.target.style.backgroundColor = '#b22830'; e.target.style.transform = 'translateY(0)'; }}>
                                Đặt hàng ngay →
                            </button>

                            <Link to="/shop" style={{
                                display: 'block', textAlign: 'center', marginTop: '12px',
                                color: '#888', fontSize: '0.85rem', textDecoration: 'none'
                            }}>
                                ← Tiếp tục chọn đồ uống
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
