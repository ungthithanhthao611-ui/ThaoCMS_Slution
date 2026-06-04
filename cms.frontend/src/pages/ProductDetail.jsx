import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import axiosClient from '../api/axiosClient';

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

    if (loading) return <div className="text-center mt-5"><h3>Đang tải...</h3></div>;
    if (!product) return <div className="text-center mt-5"><h3>Sản phẩm không tồn tại</h3></div>;

    const handleAddToCart = () => {
        addToCart(product, quantity);
        setAdded(true);
        setTimeout(() => {
            setAdded(false);
            setQuantity(1);
        }, 1500);
    };

    const imageUrl = product.imageUrl
        ? (product.imageUrl.startsWith('http')
            ? product.imageUrl
            : `https://localhost:7030${product.imageUrl.startsWith('/') ? '' : '/'}${product.imageUrl}`)
        : null;

    return (
        <div style={{ backgroundColor: '#f8f8f8', minHeight: '80vh', padding: '40px 0' }}>
            <div className="wrapper">
                <div style={{ background: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', display: 'flex', flexWrap: 'wrap' }}>
                    {/* Ảnh sản phẩm */}
                    <div style={{ flex: '1 1 400px', backgroundColor: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {imageUrl ? (
                            <img src={imageUrl} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover', maxHeight: '500px' }} />
                        ) : (
                            <i className="fa fa-coffee" style={{ fontSize: '10rem', color: '#ccc' }}></i>
                        )}
                    </div>

                    {/* Chi tiết sản phẩm */}
                    <div style={{ flex: '1 1 400px', padding: '40px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <h1 style={{ fontWeight: '800', color: '#333', fontSize: '2rem', margin: 0 }}>
                            {product.name}
                        </h1>
                        
                        <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#b22830' }}>
                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
                        </div>

                        <div style={{ color: '#555', lineHeight: '1.6', fontSize: '1rem', backgroundColor: '#f9f9f9', padding: '16px', borderRadius: '8px' }}>
                            {product.description || 'Chưa có mô tả cho sản phẩm này.'}
                        </div>

                        <div style={{ fontSize: '0.9rem', color: product.stockQuantity > 0 ? '#28a745' : '#dc3545', fontWeight: 'bold' }}>
                            Kho: {product.stockQuantity > 0 ? `Còn ${product.stockQuantity} sản phẩm` : 'Hết hàng'}
                        </div>

                        <hr style={{ margin: '10px 0', borderColor: '#eee' }} />

                        {/* Thêm vào giỏ hàng */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginTop: 'auto' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                <button
                                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                    style={{
                                        width: '40px', height: '40px', borderRadius: '50%',
                                        border: '1px solid #ccc', background: 'white', color: '#555',
                                        fontWeight: 'bold', cursor: 'pointer', fontSize: '1.2rem'
                                    }}
                                >−</button>
                                <span style={{ fontWeight: 'bold', fontSize: '1.2rem', minWidth: '30px', textAlign: 'center' }}>
                                    {quantity}
                                </span>
                                <button
                                    onClick={() => setQuantity(q => q + 1)}
                                    style={{
                                        width: '40px', height: '40px', borderRadius: '50%',
                                        border: '1px solid #ccc', background: 'white', color: '#555',
                                        fontWeight: 'bold', cursor: 'pointer', fontSize: '1.2rem'
                                    }}
                                >+</button>
                            </div>

                            <button
                                onClick={handleAddToCart}
                                disabled={product.stockQuantity === 0}
                                style={{
                                    flex: 1,
                                    backgroundColor: product.stockQuantity === 0 ? '#ccc' : (added ? '#28a745' : '#b22830'),
                                    color: 'white', border: 'none', padding: '14px', borderRadius: '8px',
                                    fontWeight: '800', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '1px',
                                    cursor: product.stockQuantity === 0 ? 'not-allowed' : 'pointer',
                                    transition: 'all 0.3s'
                                }}
                            >
                                {added ? '✅ Đã thêm' : '🛒 Thêm vào giỏ'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
