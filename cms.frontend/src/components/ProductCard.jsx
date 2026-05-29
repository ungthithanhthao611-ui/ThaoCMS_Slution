import React from 'react';

const ProductCard = ({ item }) => {
    return (
        <div className="hc-card text-center">
            <div className="hc-card-img-container" style={{backgroundColor: '#ebebeb', height: '250px'}}>
                {item.imageUrl ? (
                    <img src={item.imageUrl.startsWith('http') ? item.imageUrl : `https://localhost:7030${item.imageUrl.startsWith('/') ? '' : '/'}${item.imageUrl}`} alt={item.name} style={{width: '100%', height: '100%', objectFit: 'cover'}} onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; }} />
                ) : (
                    <i className="fa fa-coffee" style={{fontSize: '5rem', color: '#ccc'}}></i>
                )}
            </div>
            <div className="card-body p-3 d-flex flex-column justify-content-between">
                <h6 className="font-weight-bold text-dark mb-2" style={{fontSize: '1rem'}}>{item.name}</h6>
                <p className="hc-price mb-3">
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}
                </p>
                <button className="hc-btn-primary w-100">
                    <i className="fa-solid fa-cart-shopping mr-1"></i> Đặt Mua
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
