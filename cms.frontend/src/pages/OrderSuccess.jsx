import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const OrderSuccess = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div style={{
            minHeight: '70vh', display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', padding: '40px 20px',
            textAlign: 'center', background: '#f8f8f8'
        }}>
            {/* Icon thành công */}
            <div style={{
                width: '100px', height: '100px', borderRadius: '50%',
                background: 'linear-gradient(135deg, #28a745, #20c997)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '50px', marginBottom: '24px',
                boxShadow: '0 10px 40px rgba(40, 167, 69, 0.3)',
                animation: 'pageEnter 0.5s ease'
            }}>
                ✅
            </div>

            <h2 style={{ color: '#28a745', fontWeight: '800', marginBottom: '12px', fontSize: '2rem' }}>
                Đặt hàng thành công!
            </h2>
            <p style={{ color: '#666', fontSize: '1rem', maxWidth: '400px', marginBottom: '32px', lineHeight: '1.6' }}>
                Cảm ơn bạn đã đặt hàng tại Highlands Coffee! Đơn hàng của bạn đang được xử lý và sẽ sớm được giao đến.
            </p>

            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
                <Link to="/profile" style={{
                    backgroundColor: '#b22830', color: 'white', padding: '14px 32px',
                    borderRadius: '8px', textDecoration: 'none', fontWeight: '700',
                    fontSize: '0.95rem', letterSpacing: '0.5px'
                }}>
                    📦 Xem đơn hàng của tôi
                </Link>
                <Link to="/shop" style={{
                    backgroundColor: 'white', color: '#b22830', padding: '14px 32px',
                    borderRadius: '8px', textDecoration: 'none', fontWeight: '700',
                    fontSize: '0.95rem', border: '2px solid #b22830'
                }}>
                    ☕ Tiếp tục mua sắm
                </Link>
            </div>
        </div>
    );
};

export default OrderSuccess;
