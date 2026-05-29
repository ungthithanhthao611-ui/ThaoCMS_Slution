import React from 'react';

const Cart = () => {
    return (
        <div className="wrapper mt-5 pt-5 text-center" style={{minHeight: '50vh'}}>
            <h2 style={{color: '#b22830', textTransform: 'uppercase', fontWeight: 'bold', fontSize: '30px'}}>Giỏ Hàng Của Bạn</h2>
            <p className="mt-4 text-muted">Giỏ hàng hiện đang trống.</p>
            <a href="/shop" className="hc-btn-primary d-inline-block mt-3 text-decoration-none">Tiếp tục mua sắm</a>
        </div>
    );
};

export default Cart;
