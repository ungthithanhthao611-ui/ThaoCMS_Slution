import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import orderService from '../services/orderService';
import reviewService from '../services/reviewService';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { IMAGE_BASE, API_BASE } from '../api/axiosClient';
import { useCart } from '../context/CartContext';

const STATUS_MAP = {
    0: { label: 'Chờ xử lý', color: '#d97706', bg: '#fef3c7', icon: 'fa fa-clock-o' },
    1: { label: 'Đang giao', color: '#2563eb', bg: '#dbeafe', icon: 'fa fa-motorcycle' },
    2: { label: 'Hoàn thành', color: '#16a34a', bg: '#dcfce7', icon: 'fa fa-check-circle' },
    3: { label: 'Đã hủy', color: '#dc2626', bg: '#fee2e2', icon: 'fa fa-times-circle' },
};

const Profile = () => {
    const { addToCart, clearCart } = useCart();
    const [customer, setCustomer] = useState(null);
    const [orders, setOrders] = useState([]);
    const [loadingOrders, setLoadingOrders] = useState(true);
    const [myReviews, setMyReviews] = useState([]);
    const [loadingReviews, setLoadingReviews] = useState(true);
    const [activeTab, setActiveTab] = useState('info');
    const [expandedOrder, setExpandedOrder] = useState(null);
    const navigate = useNavigate();

    // Modal Review State
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const [reviewProduct, setReviewProduct] = useState(null);
    const [reviewForm, setReviewForm] = useState({ rating: 5, comment: '', imageFile: null });
    const [reviewLoading, setReviewLoading] = useState(false);
    const [reviewError, setReviewError] = useState('');

    // Toast Notification State
    const [toastMessage, setToastMessage] = useState('');
    const showToast = (msg) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(''), 3000);
    };

    const openReviewModal = (product) => {
        setReviewProduct(product);
        setReviewForm({ rating: 5, comment: '', imageFile: null });
        setReviewError('');
        setIsReviewModalOpen(true);
    };

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        setReviewLoading(true);
        setReviewError('');
        try {
            const formData = new FormData();
            formData.append('productId', reviewProduct.productId);
            formData.append('customerId', customer.id);
            formData.append('rating', reviewForm.rating);
            if (reviewForm.comment) formData.append('comment', reviewForm.comment);
            if (reviewForm.imageFile) formData.append('uploadImage', reviewForm.imageFile);

            await reviewService.addReview(formData);

            // Cập nhật lại danh sách đánh giá
            const newReviews = await reviewService.getReviewsByCustomer(customer.id);
            setMyReviews(newReviews || []);
            setIsReviewModalOpen(false);
            showToast('Cảm ơn bạn đã đánh giá sản phẩm!');
        } catch (err) {
            setReviewError(typeof err.response?.data === 'string' ? err.response.data : 'Có lỗi xảy ra, vui lòng thử lại.');
        } finally {
            setReviewLoading(false);
        }
    };

    useEffect(() => {
        const stored = localStorage.getItem('customer');
        if (!stored) {
            navigate('/login');
            return;
        }
        const cust = JSON.parse(stored);
        setCustomer(cust);

        // Tải lịch sử đơn hàng
        const loadOrders = async () => {
            try {
                const data = await orderService.getOrdersByCustomer(cust.id);
                setOrders(Array.isArray(data) ? data : []);
            } catch {
                setOrders([]);
            } finally {
                setLoadingOrders(false);
            }
        };
        loadOrders();

        const loadReviews = async () => {
            try {
                const data = await reviewService.getReviewsByCustomer(cust.id);
                setMyReviews(data || []);
            } catch {
                setMyReviews([]);
            } finally {
                setLoadingReviews(false);
            }
        };
        loadReviews();
    }, [navigate]);

    const handleLogout = () => {
        if (window.confirm('Bạn có chắc chắn muốn đăng xuất tài khoản?')) {
            localStorage.removeItem('customer');
            navigate('/');
            window.location.reload();
        }
    };

    const handleReorderRemaining = async (order) => {
        try {
            await fetch(`${API_BASE}/api/Orders/Acknowledge/${order.id}`, { method: 'PUT' });
        } catch (e) {
            console.error("Lỗi xác nhận đơn cũ:", e);
        }
        clearCart();
        if (order.items && order.items.length > 0) {
            order.items.forEach(item => {
                const product = {
                    id: item.productId,
                    name: item.productName,
                    imageUrl: item.productImageUrl,
                    price: item.unitPrice,
                };
                addToCart(product, item.quantity, item.size || 'S');
            });
        }
        navigate('/cart');
    };

    const handleAcknowledgeOrder = async (orderId) => {
        try {
            const response = await fetch(`${API_BASE}/api/Orders/Acknowledge/${orderId}`, {
                method: 'PUT'
            });
            if (response.ok) {
                showToast('Đã xác nhận tiếp tục nhận các món còn lại!');
                const data = await orderService.getOrdersByCustomer(customer.id);
                setOrders(Array.isArray(data) ? data : []);
            } else {
                showToast('Không thể xác nhận lúc này.');
            }
        } catch (err) {
            console.error("Lỗi xác nhận đơn:", err);
            showToast('Lỗi kết nối máy chủ.');
        }
    };

    // Inline state cho Custom Modal
    const [customAlert, setCustomAlert] = useState({ isOpen: false, message: '', type: 'success' });
    const [customConfirm, setCustomConfirm] = useState({ isOpen: false, message: '', onConfirm: null });

    const handleCancelOrder = (orderId) => {
        setCustomConfirm({
            isOpen: true,
            message: 'Bạn có chắc chắn muốn hủy toàn bộ đơn hàng này không?',
            onConfirm: async () => {
                setCustomConfirm({ isOpen: false, message: '', onConfirm: null });
                try {
                    const response = await fetch(`${API_BASE}/api/Orders/Cancel/${orderId}`, {
                        method: 'PUT'
                    });
                    if (response.ok) {
                        setCustomAlert({ isOpen: true, message: 'Đã hủy đơn hàng thành công!', type: 'success' });
                    } else {
                        setCustomAlert({ isOpen: true, message: 'Không thể hủy đơn hàng. Vui lòng thử lại sau.', type: 'error' });
                    }
                } catch (err) {
                    console.error("Lỗi khi hủy đơn:", err);
                    setCustomAlert({ isOpen: true, message: 'Đã xảy ra lỗi, vui lòng thử lại.', type: 'error' });
                }
            }
        });
    };

    if (!customer) return null;

    return (
        <>
            <Header />
            <style>{`
                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeUp {
                    animation: fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
                .glass-card {
                    background: #ffffff;
                    border-radius: 24px;
                    border: 1px solid rgba(255,255,255,0.4);
                    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.03);
                }
                .premium-gradient {
                    background: linear-gradient(135deg, #b22830 0%, #7a1b21 100%);
                    color: white;
                }
                .hover-lift {
                    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                }
                .hover-lift:hover {
                    transform: translateY(-6px);
                    box-shadow: 0 20px 40px rgba(0,0,0,0.08) !important;
                    border-color: transparent !important;
                }
                .menu-btn {
                    transition: all 0.3s ease;
                }
                .menu-btn:hover {
                    transform: translateX(8px);
                    background: #fff5f5 !important;
                    color: #b22830 !important;
                }
                .menu-btn:hover i {
                    color: #b22830 !important;
                    transform: scale(1.1);
                }
                .order-card {
                    transition: all 0.3s ease;
                }
                .order-card:hover {
                    border-color: #b22830 !important;
                    box-shadow: 0 10px 25px rgba(178, 40, 48, 0.08) !important;
                }
            `}</style>

            {/* Custom Alert Modal */}
            {customAlert.isOpen && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000 }}>
                    <div style={{ background: '#fff', padding: '30px', borderRadius: '16px', minWidth: '350px', maxWidth: '90%', textAlign: 'center', boxShadow: '0 20px 40px rgba(0,0,0,0.2)', animation: 'fadeUp 0.3s ease' }}>
                        <div style={{ width: '80px', height: '80px', background: customAlert.type === 'success' ? '#c6f6d5' : '#fed7d7', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto' }}>
                            <i className={`fa ${customAlert.type === 'success' ? 'fa-check' : 'fa-times'}`} style={{ fontSize: '40px', color: customAlert.type === 'success' ? '#38a169' : '#e53e3e' }}></i>
                        </div>
                        <h3 style={{ margin: '0 0 15px 0', color: '#2d3748', fontSize: '1.4rem', fontWeight: 'bold' }}>{customAlert.type === 'success' ? 'Thành công' : 'Lỗi'}</h3>
                        <p style={{ color: '#4a5568', marginBottom: '25px', fontSize: '1.05rem' }}>{customAlert.message}</p>
                        <button onClick={() => { setCustomAlert({ ...customAlert, isOpen: false }); if (customAlert.type === 'success') window.location.reload(); }} style={{ padding: '12px 40px', background: customAlert.type === 'success' ? '#38a169' : '#e53e3e', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem', transition: 'opacity 0.2s' }} onMouseEnter={e => e.target.style.opacity = '0.9'} onMouseLeave={e => e.target.style.opacity = '1'}>OK</button>
                    </div>
                </div>
            )}

            {/* Custom Confirm Modal */}
            {customConfirm.isOpen && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000 }}>
                    <div style={{ background: '#fff', padding: '30px', borderRadius: '16px', minWidth: '350px', maxWidth: '90%', textAlign: 'center', boxShadow: '0 20px 40px rgba(0,0,0,0.2)', animation: 'fadeUp 0.3s ease' }}>
                        <div style={{ width: '80px', height: '80px', background: '#feebc8', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto' }}>
                            <i className="fa fa-exclamation" style={{ fontSize: '40px', color: '#dd6b20' }}></i>
                        </div>
                        <h3 style={{ margin: '0 0 15px 0', color: '#2d3748', fontSize: '1.4rem', fontWeight: 'bold' }}>Xác nhận</h3>
                        <p style={{ color: '#4a5568', marginBottom: '25px', fontSize: '1.05rem' }}>{customConfirm.message}</p>
                        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
                            <button onClick={() => setCustomConfirm({ ...customConfirm, isOpen: false })} style={{ flex: 1, padding: '12px 0', background: '#e2e8f0', color: '#4a5568', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem' }}>Hủy thao tác</button>
                            <button onClick={customConfirm.onConfirm} style={{ flex: 1, padding: '12px 0', background: '#b22830', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem' }}>Đồng ý hủy</button>
                        </div>
                    </div>
                </div>
            )}

            <div style={{ minHeight: '85vh', backgroundColor: '#f4f7f6', padding: '50px 0', fontFamily: '"Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}>
                <div className="wrapper" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', boxSizing: 'border-box' }}>

                    {/* Đường dẫn điều hướng nhanh */}
                    <div style={{ marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Link to="/" style={{
                            display: 'inline-flex', alignItems: 'center', padding: '10px 18px', backgroundColor: '#fff',
                            color: '#333', textDecoration: 'none', borderRadius: '30px', fontWeight: '700',
                            fontSize: '0.85rem', transition: 'all 0.3s', border: '1px solid #e2e8f0',
                            boxShadow: '0 2px 10px rgba(0,0,0,0.02)'
                        }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateX(-5px)';
                                e.currentTarget.style.borderColor = '#b22830';
                                e.currentTarget.style.color = '#b22830';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateX(0)';
                                e.currentTarget.style.borderColor = '#e2e8f0';
                                e.currentTarget.style.color = '#333';
                            }}
                        >
                            <i className="fa fa-arrow-left" style={{ marginRight: '8px' }}></i> Quay về Trang Chủ
                        </Link>

                        <button
                            onClick={handleLogout}
                            style={{
                                display: 'inline-flex', alignItems: 'center', padding: '10px 18px', backgroundColor: '#fee2e2',
                                color: '#dc2626', border: 'none', borderRadius: '30px', fontWeight: '700',
                                fontSize: '0.85rem', cursor: 'pointer', transition: 'all 0.3s'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#fca5a5';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = '#fee2e2';
                            }}
                        >
                            <i className="fa fa-sign-out" style={{ marginRight: '8px' }}></i> Đăng xuất
                        </button>
                    </div>

                    {/* Bố cục Grid 2 cột */}
                    <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap', alignItems: 'flex-start' }}>

                        {/* CỘT TRÁI: Avatar & Tabs chọn nhanh */}
                        <div style={{ flex: '1', minWidth: '300px', maxWidth: '360px', display: 'flex', flexDirection: 'column', gap: '20px' }}>

                            {/* Card Thông tin Cơ bản */}
                            <div className="premium-gradient animate-fadeUp" style={{
                                borderRadius: '24px', padding: '40px 20px',
                                boxShadow: '0 15px 35px rgba(178, 40, 48, 0.2)', border: 'none',
                                textAlign: 'center', position: 'relative', overflow: 'hidden'
                            }}>
                                {/* Decorative circle */}
                                <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '150px', height: '150px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%' }}></div>
                                <div style={{ position: 'absolute', bottom: '-30px', left: '-30px', width: '100px', height: '100px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%' }}></div>

                                {/* Avatar */}
                                <div style={{
                                    width: '100px', height: '100px', borderRadius: '50%',
                                    backgroundColor: '#fff', border: '4px solid rgba(255,255,255,0.2)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '42px', fontWeight: '800', color: '#b22830',
                                    margin: '0 auto 20px', position: 'relative', zIndex: 2,
                                    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)'
                                }}>
                                    {customer.fullName?.charAt(0).toUpperCase()}
                                </div>

                                <h3 style={{ margin: '0 0 5px', color: '#ffffff', fontWeight: '800', fontSize: '1.5rem', textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>{customer.fullName}</h3>
                                <p style={{ margin: 0, color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem', fontWeight: '500' }}>{customer.email}</p>

                            </div>

                            {/* Card Menu Điều Hướng Tab */}
                            <div className="glass-card animate-fadeUp" style={{ padding: '20px', animationDelay: '0.1s' }}>
                                <button
                                    className="menu-btn"
                                    onClick={() => setActiveTab('info')}
                                    style={{
                                        width: '100%', padding: '16px 20px', borderRadius: '16px', border: 'none',
                                        background: activeTab === 'info' ? '#fff5f5' : 'transparent',
                                        color: activeTab === 'info' ? '#b22830' : '#4a5568',
                                        fontWeight: '700', fontSize: '0.95rem', cursor: 'pointer',
                                        textAlign: 'left', display: 'flex', alignItems: 'center', gap: '15px'
                                    }}
                                >
                                    <i className="fa fa-user" style={{ fontSize: '20px', width: '24px', textAlign: 'center', color: activeTab === 'info' ? '#b22830' : '#a0aec0', transition: 'all 0.3s' }}></i>
                                    Thông tin cá nhân
                                </button>

                                {/* Nút Thông báo (Mới) */}
                                {(() => {
                                    const affectedCount = orders.filter(o => o.notes && o.notes.includes('[HỆ THỐNG]') && o.status !== 3).length;
                                    return (
                                        <button
                                            className="menu-btn"
                                            onClick={() => setActiveTab('notifications')}
                                            style={{
                                                width: '100%', padding: '16px 20px', borderRadius: '16px', border: 'none',
                                                background: activeTab === 'notifications' ? '#fff5f5' : 'transparent',
                                                color: activeTab === 'notifications' ? '#b22830' : '#4a5568',
                                                fontWeight: '700', fontSize: '0.95rem', cursor: 'pointer',
                                                textAlign: 'left', display: 'flex', alignItems: 'center', gap: '15px',
                                                marginTop: '10px'
                                            }}
                                        >
                                            <i className="fa fa-bell" style={{ fontSize: '20px', width: '24px', textAlign: 'center', color: activeTab === 'notifications' ? '#b22830' : '#a0aec0', transition: 'all 0.3s' }}></i>
                                            Thông báo
                                            {affectedCount > 0 && (
                                                <span style={{
                                                    marginLeft: 'auto', background: 'linear-gradient(135deg, #e53e3e, #c53030)', color: 'white',
                                                    borderRadius: '50%', width: '24px', height: '24px', display: 'flex',
                                                    alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 'bold',
                                                    boxShadow: '0 2px 5px rgba(229, 62, 62, 0.4)', animation: 'pulse 2s infinite'
                                                }}>
                                                    {affectedCount}
                                                </span>
                                            )}
                                        </button>
                                    );
                                })()}

                                <button
                                    className="menu-btn"
                                    onClick={() => setActiveTab('orders')}
                                    style={{
                                        width: '100%', padding: '16px 20px', borderRadius: '16px', border: 'none',
                                        background: activeTab === 'orders' ? '#fff5f5' : 'transparent',
                                        color: activeTab === 'orders' ? '#b22830' : '#4a5568',
                                        fontWeight: '700', fontSize: '0.95rem', cursor: 'pointer',
                                        textAlign: 'left', display: 'flex', alignItems: 'center', gap: '15px',
                                        marginTop: '10px'
                                    }}
                                >
                                    <i className="fa fa-shopping-bag" style={{ fontSize: '20px', width: '24px', textAlign: 'center', color: activeTab === 'orders' ? '#b22830' : '#a0aec0', transition: 'all 0.3s' }}></i>
                                    Lịch sử mua hàng
                                    {orders.length > 0 && (
                                        <span style={{
                                            marginLeft: 'auto', background: 'linear-gradient(135deg, #b22830, #e53e3e)', color: 'white',
                                            borderRadius: '50%', width: '24px', height: '24px', display: 'flex',
                                            alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 'bold',
                                            boxShadow: '0 2px 5px rgba(178, 40, 48, 0.4)'
                                        }}>
                                            {orders.length}
                                        </span>
                                    )}
                                </button>

                                <button
                                    className="menu-btn"
                                    onClick={() => setActiveTab('reviews')}
                                    style={{
                                        width: '100%', padding: '16px 20px', borderRadius: '16px', border: 'none',
                                        background: activeTab === 'reviews' ? '#fff5f5' : 'transparent',
                                        color: activeTab === 'reviews' ? '#b22830' : '#4a5568',
                                        fontWeight: '700', fontSize: '0.95rem', cursor: 'pointer',
                                        textAlign: 'left', display: 'flex', alignItems: 'center', gap: '15px',
                                        marginTop: '10px'
                                    }}
                                >
                                    <i className="fa fa-star" style={{ fontSize: '20px', width: '24px', textAlign: 'center', color: activeTab === 'reviews' ? '#b22830' : '#a0aec0', transition: 'all 0.3s' }}></i>
                                    Đánh giá của tôi
                                </button>
                            </div>
                        </div>

                        {/* CỘT PHẢI: Nội dung Tab */}
                        <div className="glass-card animate-fadeUp" style={{ flex: '2', minWidth: '320px', padding: '40px', animationDelay: '0.2s', position: 'relative' }}>

                            {/* TAB 0: THÔNG BÁO (MỚI) */}
                            {activeTab === 'notifications' && (
                                <div>
                                    <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#2d3748', margin: '0 0 30px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        Hộp thư thông báo
                                        <div style={{ height: '4px', width: '40px', background: '#b22830', borderRadius: '2px', alignSelf: 'flex-end', marginBottom: '8px' }}></div>
                                    </h2>

                                    {(() => {
                                        const affectedOrders = orders.filter(o => o.notes && o.notes.includes('[HỆ THỐNG]') && o.status !== 3);
                                        if (affectedOrders.length === 0) {
                                            return (
                                                <div style={{ textAlign: 'center', padding: '60px 20px', color: '#a0aec0' }}>
                                                    <i className="fa fa-bell-slash-o" style={{ fontSize: '64px', marginBottom: '15px', color: '#cbd5e0' }}></i>
                                                    <p style={{ margin: 0, fontWeight: '600', fontSize: '1rem' }}>Bạn không có thông báo nào mới.</p>
                                                </div>
                                            );
                                        }

                                        return affectedOrders.map(affectedOrder => (
                                            <div key={`warning-${affectedOrder.id}`} style={{ marginBottom: '20px', padding: '20px', background: '#fff5f5', border: '2px solid #feb2b2', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '15px', boxShadow: '0 10px 25px rgba(229, 62, 62, 0.15)', animation: 'fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1)' }}>
                                                <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                                                    <div style={{ background: '#fed7d7', padding: '12px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                                        <i className="fa fa-exclamation-triangle" style={{ color: '#e53e3e', fontSize: '24px' }}></i>
                                                    </div>
                                                    <div style={{ flex: 1 }}>
                                                        <strong style={{ color: '#c53030', display: 'block', marginBottom: '6px', fontSize: '1.1rem' }}>Sự cố cho Đơn hàng #{affectedOrder.id}</strong>
                                                        <span style={{ color: '#c53030', fontSize: '0.95rem', lineHeight: '1.5', display: 'block', marginBottom: '8px' }}>
                                                            Rất tiếc, hệ thống ghi nhận sự cố sau đối với đơn hàng của bạn:
                                                        </span>
                                                        <ul style={{ margin: '0 0 10px 0', paddingLeft: '20px', color: '#c53030', fontSize: '0.95rem', fontWeight: 'bold' }}>
                                                            {affectedOrder.notes.split('\n').filter(line => line.includes('[HỆ THỐNG]')).map((note, index) => (
                                                                <li key={index}>{note.replace('[HỆ THỐNG]', '').trim()}</li>
                                                            ))}
                                                        </ul>
                                                        <span style={{ color: '#c53030', fontSize: '0.95rem', lineHeight: '1.5', display: 'block' }}>
                                                            Các món còn lại trong đơn hàng vẫn sẽ được giao bình thường. Chúng tôi thành thật xin lỗi vì sự bất tiện này!
                                                        </span>
                                                    </div>
                                                </div>
                                                <div style={{ borderTop: '1px solid #fed7d7', paddingTop: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                                                    <span style={{ fontSize: '0.9rem', color: '#742a2a', fontWeight: '600' }}>Bạn có muốn tiếp tục nhận các món còn lại trong đơn hàng này không?</span>
                                                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                                                        <button
                                                             onClick={() => handleReorderRemaining(affectedOrder)}
                                                             style={{ 
                                                                 border: 'none',
                                                                 padding: '8px 20px', 
                                                                 background: 'linear-gradient(135deg, #28a745, #1e7e34)', 
                                                                 color: 'white', 
                                                                 borderRadius: '8px', 
                                                                 fontSize: '0.9rem', 
                                                                 fontWeight: 'bold', 
                                                                 cursor: 'pointer', 
                                                                 boxShadow: '0 4px 10px rgba(40,167,69,0.2)', 
                                                                 transition: 'all 0.2s',
                                                                 display: 'inline-flex',
                                                                 alignItems: 'center',
                                                                 justifyContent: 'center'
                                                             }}
                                                         >
                                                             Tiếp tục mua / Đổi món
                                                         </button>
                                                         <button
                                                             onClick={() => handleAcknowledgeOrder(affectedOrder.id)}
                                                             style={{ 
                                                                 border: 'none',
                                                                 padding: '8px 20px', 
                                                                 background: 'linear-gradient(135deg, #3182ce, #2b6cb0)', 
                                                                 color: 'white', 
                                                                 borderRadius: '8px', 
                                                                 fontSize: '0.9rem', 
                                                                 fontWeight: 'bold', 
                                                                 cursor: 'pointer', 
                                                                 boxShadow: '0 4px 10px rgba(49,130,206,0.2)', 
                                                                 transition: 'all 0.2s',
                                                                 display: 'inline-flex',
                                                                 alignItems: 'center',
                                                                 justifyContent: 'center'
                                                             }}
                                                         >
                                                             Đồng ý nhận món còn lại
                                                         </button>
                                                        <button
                                                            onClick={() => { setActiveTab('orders'); setExpandedOrder(affectedOrder.id); }}
                                                            style={{ padding: '8px 20px', background: 'white', color: '#b22830', border: '1px solid #b22830', borderRadius: '8px', fontSize: '0.9rem', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.2s' }}>
                                                            Xem chi tiết đơn
                                                        </button>
                                                        <button
                                                            onClick={() => handleCancelOrder(affectedOrder.id)}
                                                            style={{ padding: '8px 20px', background: '#e53e3e', color: 'white', border: 'none', borderRadius: '8px', fontSize: '0.9rem', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 10px rgba(229, 62, 62, 0.3)', transition: 'all 0.2s' }}>
                                                            Hủy toàn bộ đơn hàng
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ));
                                    })()}
                                </div>
                            )}

                            {/* TAB 1: THÔNG TIN CHI TIẾT */}
                            {activeTab === 'info' && (
                                <div>
                                    <h4 style={{ color: '#1a202c', fontWeight: '800', marginBottom: '30px', fontSize: '1.6rem', position: 'relative', paddingBottom: '15px' }}>
                                        Thông tin cá nhân
                                        <div style={{ position: 'absolute', bottom: 0, left: 0, width: '60px', height: '4px', background: 'linear-gradient(90deg, #b22830, #fda085)', borderRadius: '2px' }}></div>
                                    </h4>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '25px' }}>
                                        {[
                                            { label: 'Họ và tên', value: customer.fullName, icon: 'fa fa-user-circle-o', color: '#b22830', bg: '#fff5f5' },
                                            { label: 'Địa chỉ Email', value: customer.email, icon: 'fa fa-envelope-o', color: '#3182ce', bg: '#ebf8ff' },
                                            { label: 'Số điện thoại', value: customer.phone || 'Chưa cập nhật', icon: 'fa fa-phone', color: '#38a169', bg: '#f0fff4' },
                                            { label: 'Địa chỉ nhận hàng', value: customer.address || 'Chưa cập nhật', icon: 'fa fa-map-marker', color: '#dd6b20', bg: '#fffff0', fullWidth: true },
                                        ].map((field, idx) => (
                                            <div key={idx} className="hover-lift" style={{
                                                gridColumn: field.fullWidth ? '1 / -1' : 'span 1',
                                                padding: '25px', borderRadius: '20px', background: '#ffffff',
                                                border: '1px solid #edf2f7', display: 'flex', alignItems: 'center', gap: '20px',
                                                boxShadow: '0 4px 15px rgba(0,0,0,0.02)'
                                            }}>
                                                <div style={{
                                                    width: '56px', height: '56px', borderRadius: '16px',
                                                    backgroundColor: field.bg, display: 'flex', alignItems: 'center',
                                                    justifyContent: 'center', fontSize: '24px', color: field.color,
                                                    flexShrink: 0
                                                }}>
                                                    <i className={field.icon}></i>
                                                </div>
                                                <div>
                                                    <span style={{ fontSize: '0.8rem', color: '#a0aec0', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                                        {field.label}
                                                    </span>
                                                    <div style={{ fontWeight: '800', color: '#2d3748', marginTop: '6px', fontSize: '1.1rem', lineHeight: '1.4' }}>
                                                        {field.value}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* TAB 2: LỊCH SỬ ĐƠN HÀNG */}
                            {activeTab === 'orders' && (
                                <div>
                                    <h4 style={{ color: '#1a202c', fontWeight: '800', marginBottom: '30px', fontSize: '1.6rem', position: 'relative', paddingBottom: '15px' }}>
                                        Lịch sử mua hàng
                                        <div style={{ position: 'absolute', bottom: 0, left: 0, width: '60px', height: '4px', background: 'linear-gradient(90deg, #b22830, #fda085)', borderRadius: '2px' }}></div>
                                    </h4>

                                    {loadingOrders ? (
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 0', color: '#a0aec0' }}>
                                            <i className="fa fa-spinner fa-spin" style={{ fontSize: '32px', color: '#b22830', marginBottom: '15px' }}></i>
                                            <span style={{ fontWeight: '600' }}>Đang tải danh sách đơn hàng...</span>
                                        </div>
                                    ) : orders.length === 0 ? (
                                        <div style={{ textAlign: 'center', padding: '60px 20px', color: '#a0aec0' }}>
                                            <i className="fa fa-folder-open-o" style={{ fontSize: '64px', marginBottom: '15px', color: '#cbd5e0' }}></i>
                                            <p style={{ margin: 0, fontWeight: '600', fontSize: '1rem' }}>Bạn chưa đặt đơn hàng nào trên hệ thống.</p>
                                            <Link to="/san-pham" style={{ display: 'inline-block', marginTop: '20px', padding: '12px 24px', backgroundColor: '#b22830', color: 'white', borderRadius: '30px', fontWeight: 'bold', textDecoration: 'none', fontSize: '0.9rem' }}>
                                                Mua sắm ngay
                                            </Link>
                                        </div>
                                    ) : (
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                            {orders.map(order => {
                                                const status = STATUS_MAP[order.status] || STATUS_MAP[0];
                                                const isExpanded = expandedOrder === order.id;
                                                return (
                                                    <div key={order.id} className={isExpanded ? "" : "order-card"} style={{
                                                        border: '1px solid #edf2f7', borderRadius: '20px',
                                                        overflow: 'hidden', background: '#fff',
                                                        boxShadow: isExpanded ? '0 15px 35px rgba(0,0,0,0.06)' : '0 4px 12px rgba(0,0,0,0.02)'
                                                    }}>
                                                        {/* Header Đơn hàng */}
                                                        <div
                                                            onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                                                            style={{
                                                                padding: '20px', display: 'flex', alignItems: 'center',
                                                                justifyContent: 'space-between', cursor: 'pointer',
                                                                background: isExpanded ? '#fff5f5' : 'white',
                                                                transition: 'all 0.2s', flexWrap: 'wrap', gap: '15px'
                                                            }}
                                                        >
                                                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                                                <div style={{
                                                                    width: '44px', height: '44px', borderRadius: '12px',
                                                                    backgroundColor: '#f8fafc', display: 'flex', alignItems: 'center',
                                                                    justifyContent: 'center', fontSize: '18px', color: '#4a5568',
                                                                    border: '1px solid #edf2f7'
                                                                }}>
                                                                    #
                                                                </div>
                                                                <div>
                                                                    <div style={{ fontWeight: '800', color: '#2d3748', fontSize: '1.05rem' }}>
                                                                        Đơn hàng #{order.id}
                                                                    </div>
                                                                    <div style={{ fontSize: '0.8rem', color: '#a0aec0', marginTop: '4px', fontWeight: '600' }}>
                                                                        <i className="fa fa-calendar mr-1"></i> {new Date(order.orderDate).toLocaleString('vi-VN')}
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
                                                                {/* Trạng thái đơn hàng */}
                                                                <span style={{
                                                                    padding: '6px 14px', borderRadius: '30px',
                                                                    fontSize: '0.78rem', fontWeight: '800',
                                                                    background: status.bg, color: status.color,
                                                                    display: 'inline-flex', alignItems: 'center', gap: '6px'
                                                                }}>
                                                                    <i className={status.icon}></i> {status.label}
                                                                </span>

                                                                {/* Tổng tiền */}
                                                                <div style={{ fontWeight: '800', color: '#b22830', fontSize: '1.1rem' }}>
                                                                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.totalAmount)}
                                                                </div>

                                                                <div style={{ padding: '4px 12px', background: '#f8fafc', borderRadius: '8px', fontSize: '0.85rem', color: '#4a5568', fontWeight: '600' }}>
                                                                    Tổng thanh toán
                                                                </div>

                                                                <i className={`fa ${isExpanded ? 'fa-chevron-up' : 'fa-chevron-down'}`} style={{ color: '#cbd5e0', fontSize: '14px' }}></i>
                                                            </div>
                                                        </div>

                                                        {/* THÔNG BÁO TỪ HỆ THỐNG NẾU BỊ HỦY MÓN */}
                                                        {isExpanded && order.notes && order.notes.includes('[HỆ THỐNG]') && order.status !== 3 && (
                                                            <div style={{ padding: '0 24px 24px 24px' }}>
                                                                <div style={{ padding: '15px', background: '#fff5f5', border: '1px solid #feb2b2', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                                                    <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                                                                        <i className="fa fa-exclamation-triangle" style={{ color: '#e53e3e', fontSize: '18px', marginTop: '2px' }}></i>
                                                                        <div>
                                                                            <strong style={{ color: '#c53030', display: 'block', marginBottom: '4px' }}>Thông báo quan trọng từ hệ thống:</strong>
                                                                            <span style={{ color: '#c53030', fontSize: '0.9rem', lineHeight: '1.4', display: 'block', marginBottom: '6px' }}>
                                                                                Rất tiếc, hệ thống ghi nhận sự cố sau đối với đơn hàng của bạn:
                                                                            </span>
                                                                            <ul style={{ margin: '0 0 8px 0', paddingLeft: '20px', color: '#c53030', fontSize: '0.9rem', fontWeight: 'bold' }}>
                                                                                {order.notes.split('\n').filter(line => line.includes('[HỆ THỐNG]')).map((note, index) => (
                                                                                    <li key={index}>{note.replace('[HỆ THỐNG]', '').trim()}</li>
                                                                                ))}
                                                                            </ul>
                                                                            <span style={{ color: '#c53030', fontSize: '0.9rem', lineHeight: '1.4', display: 'block' }}>
                                                                                Các món còn lại vẫn được giao bình thường. Xin lỗi bạn vì sự bất tiện này!
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                    <div style={{ borderTop: '1px solid #fed7d7', paddingTop: '10px', marginTop: '5px', textAlign: 'right' }}>
                                                                        <span style={{ fontSize: '0.85rem', color: '#742a2a', marginRight: '15px' }}>Bạn không muốn nhận đơn này nữa?</span>
                                                                        <button
                                                                            onClick={(e) => { e.stopPropagation(); handleCancelOrder(order.id); }}
                                                                            style={{ padding: '6px 16px', background: '#e53e3e', color: 'white', border: 'none', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 2px 4px rgba(229, 62, 62, 0.2)' }}>
                                                                            Hủy toàn bộ đơn hàng
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}

                                                        {/* Chi tiết đơn hàng khi click mở rộng */}
                                                        {isExpanded && (
                                                            <div style={{ padding: '24px', borderTop: '1px solid #edf2f7', background: '#fafbfc' }}>
                                                                <h5 style={{ margin: '0 0 15px', color: '#4a5568', fontWeight: '800', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                                                    Chi tiết sản phẩm đặt mua
                                                                </h5>

                                                                {/* Danh sách món */}
                                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
                                                                    {order.items && order.items.map((item, idx) => {
                                                                        const hasReviewed = myReviews.some(r => r.productId === item.productId);
                                                                        return (
                                                                            <div key={idx} style={{
                                                                                display: 'flex', justifyContent: 'space-between',
                                                                                alignItems: 'center', padding: '12px 16px',
                                                                                background: 'white', borderRadius: '12px',
                                                                                border: '1px solid #f1f5f9', gap: '15px', flexWrap: 'wrap'
                                                                            }}>
                                                                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                                                    {item.productImageUrl && (
                                                                                        <img
                                                                                            src={item.productImageUrl.startsWith('http') ? item.productImageUrl : `${IMAGE_BASE}${item.productImageUrl.startsWith('/') ? '' : '/'}${item.productImageUrl}`}
                                                                                            alt={item.productName}
                                                                                            style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #edf2f7' }}
                                                                                        />
                                                                                    )}
                                                                                    <div>
                                                                                        <div style={{ color: '#2d3748', fontWeight: '700', fontSize: '0.92rem' }}>
                                                                                            {item.productName}
                                                                                        </div>
                                                                                        <div style={{ color: '#718096', fontSize: '0.8rem', marginTop: '2px', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                                                                                            {item.size && (
                                                                                                <span style={{ background: '#e2e8f0', padding: '1px 6px', borderRadius: '4px', fontWeight: 'bold', fontSize: '0.75rem', color: '#4a5568' }}>
                                                                                                    Size {item.size}
                                                                                                </span>
                                                                                            )}
                                                                                            <span>Đơn giá: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.unitPrice)} | Số lượng: {item.quantity}</span>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                                                                    <span style={{ fontWeight: '800', color: '#b22830', fontSize: '0.95rem' }}>
                                                                                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.unitPrice * item.quantity)}
                                                                                    </span>
                                                                                    {order.status === 2 && (
                                                                                        hasReviewed ? (
                                                                                            <span style={{ fontSize: '0.8rem', color: '#16a34a', fontWeight: 'bold' }}><i className="fa fa-check-circle"></i> Đã đánh giá</span>
                                                                                        ) : (
                                                                                            <button
                                                                                                onClick={(e) => { e.stopPropagation(); openReviewModal(item); }}
                                                                                                style={{
                                                                                                    padding: '6px 14px', background: '#fff', color: '#b22830',
                                                                                                    border: '1px solid #b22830', borderRadius: '20px', fontSize: '0.8rem', cursor: 'pointer', fontWeight: '700', transition: 'all 0.2s'
                                                                                                }}
                                                                                                onMouseEnter={e => { e.target.style.background = '#b22830'; e.target.style.color = '#fff'; }}
                                                                                                onMouseLeave={e => { e.target.style.background = '#fff'; e.target.style.color = '#b22830'; }}
                                                                                            >
                                                                                                Đánh giá
                                                                                            </button>
                                                                                        )
                                                                                    )}
                                                                                </div>
                                                                            </div>
                                                                        );
                                                                    })}
                                                                </div>

                                                                {/* Địa chỉ giao & ghi chú */}
                                                                <div style={{
                                                                    padding: '16px', background: '#f8fafc', borderRadius: '14px',
                                                                    border: '1px solid #edf2f7', display: 'flex', flexDirection: 'column', gap: '8px'
                                                                }}>
                                                                    {order.deliveryAddress && (
                                                                        <div style={{ fontSize: '0.85rem', color: '#4a5568', lineHeight: '1.4' }}>
                                                                            <i className="fa fa-map-marker" style={{ width: '18px', color: '#b22830', fontSize: '15px' }}></i> <strong>Địa chỉ giao hàng:</strong> {order.deliveryAddress}
                                                                        </div>
                                                                    )}
                                                                    {order.notes && (
                                                                        <div style={{ fontSize: '0.85rem', color: '#4a5568', lineHeight: '1.4' }}>
                                                                            <i className="fa fa-pencil" style={{ width: '18px', color: '#4a5568' }}></i> <strong>Ghi chú đơn hàng:</strong> {order.notes}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* TAB 3: ĐÁNH GIÁ CỦA TÔI */}
                            {activeTab === 'reviews' && (
                                <div>
                                    <h4 style={{ color: '#1a202c', fontWeight: '800', marginBottom: '30px', fontSize: '1.6rem', position: 'relative', paddingBottom: '15px' }}>
                                        Đánh giá của tôi
                                        <div style={{ position: 'absolute', bottom: 0, left: 0, width: '60px', height: '4px', background: 'linear-gradient(90deg, #b22830, #fda085)', borderRadius: '2px' }}></div>
                                    </h4>

                                    {loadingReviews ? (
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 0', color: '#a0aec0' }}>
                                            <i className="fa fa-spinner fa-spin" style={{ fontSize: '32px', color: '#b22830', marginBottom: '15px' }}></i>
                                            <span style={{ fontWeight: '600' }}>Đang tải đánh giá...</span>
                                        </div>
                                    ) : myReviews.length === 0 ? (
                                        <div style={{ textAlign: 'center', padding: '60px 20px', color: '#a0aec0' }}>
                                            <i className="fa fa-star-o" style={{ fontSize: '64px', marginBottom: '15px', color: '#cbd5e0' }}></i>
                                            <p style={{ margin: 0, fontWeight: '600', fontSize: '1rem' }}>Bạn chưa viết đánh giá nào.</p>
                                        </div>
                                    ) : (
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                            {myReviews.map(rev => (
                                                <div key={rev.id} style={{ border: '1px solid #edf2f7', borderRadius: '18px', padding: '20px', background: 'white', display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                                                    <div style={{ width: '80px', height: '80px', borderRadius: '12px', overflow: 'hidden', border: '1px solid #edf2f7', flexShrink: 0 }}>
                                                        {rev.productImageUrl ? (
                                                            <img src={rev.productImageUrl.startsWith('http') ? rev.productImageUrl : `${IMAGE_BASE}${rev.productImageUrl.startsWith('/') ? '' : '/'}${rev.productImageUrl}`} alt="Product" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                        ) : (
                                                            <div style={{ width: '100%', height: '100%', background: '#eee' }}></div>
                                                        )}
                                                    </div>
                                                    <div style={{ flex: 1 }}>
                                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                                            <Link to={`/product/${rev.productId}`} style={{ fontWeight: 'bold', color: '#2d3748', textDecoration: 'none', fontSize: '1.1rem' }}>{rev.productName}</Link>
                                                            <span style={{ fontSize: '0.8rem', color: '#a0aec0' }}>{new Date(rev.createdDate).toLocaleDateString('vi-VN')}</span>
                                                        </div>
                                                        <div style={{ color: '#ffc107', fontSize: '14px', marginTop: '5px', marginBottom: '10px' }}>
                                                            {[1, 2, 3, 4, 5].map(star => (
                                                                <i key={star} className={`fa ${star <= rev.rating ? 'fa-star' : 'fa-star-o'}`}></i>
                                                            ))}
                                                        </div>
                                                        {rev.comment && <p style={{ margin: 0, color: '#4a5568', fontSize: '0.95rem' }}>"{rev.comment}"</p>}
                                                        {rev.imageUrl && (
                                                            <div style={{ marginTop: '15px' }}>
                                                                <img src={rev.imageUrl.startsWith('http') ? rev.imageUrl : `${IMAGE_BASE}${rev.imageUrl.startsWith('/') ? '' : '/'}${rev.imageUrl}`} alt="Review img" style={{ height: '80px', borderRadius: '8px', border: '1px solid #eee' }} />
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* MODAL ĐÁNH GIÁ SẢN PHẨM */}
            {isReviewModalOpen && reviewProduct && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999
                }}>
                    <div style={{
                        background: 'white', width: '90%', maxWidth: '500px', borderRadius: '20px', padding: '30px',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.2)', position: 'relative'
                    }}>
                        <button
                            onClick={() => setIsReviewModalOpen(false)}
                            style={{ position: 'absolute', top: '15px', right: '20px', background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#a0aec0' }}
                        >&times;</button>

                        <h3 style={{ margin: '0 0 20px', color: '#1a202c', textAlign: 'center', fontSize: '1.4rem' }}>Đánh giá sản phẩm</h3>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '15px', background: '#f8fafc', borderRadius: '12px', marginBottom: '20px' }}>
                            <img src={reviewProduct.productImageUrl ? (reviewProduct.productImageUrl.startsWith('http') ? reviewProduct.productImageUrl : `${IMAGE_BASE}${reviewProduct.productImageUrl.startsWith('/') ? '' : '/'}${reviewProduct.productImageUrl}`) : ''} alt="" style={{ width: '60px', height: '60px', borderRadius: '8px', objectFit: 'cover' }} />
                            <div style={{ fontWeight: 'bold', color: '#2d3748' }}>{reviewProduct.productName}</div>
                        </div>

                        <form onSubmit={handleReviewSubmit}>
                            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                                <div style={{ fontSize: '0.9rem', color: '#4a5568', marginBottom: '10px', fontWeight: 'bold' }}>Chất lượng sản phẩm</div>
                                <div style={{ fontSize: '32px', color: '#ffc107', cursor: 'pointer' }}>
                                    {[1, 2, 3, 4, 5].map(star => (
                                        <i key={star}
                                            className={`fa ${star <= reviewForm.rating ? 'fa-star' : 'fa-star-o'}`}
                                            onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                                            style={{ margin: '0 5px', transition: 'transform 0.2s' }}
                                            onMouseEnter={(e) => e.target.style.transform = 'scale(1.2)'}
                                            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                                        ></i>
                                    ))}
                                </div>
                            </div>

                            <div style={{ marginBottom: '20px' }}>
                                <textarea
                                    placeholder="Chia sẻ nhận xét của bạn về sản phẩm này nhé..."
                                    value={reviewForm.comment}
                                    onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                                    style={{ width: '100%', padding: '15px', borderRadius: '12px', border: '1px solid #edf2f7', outline: 'none', resize: 'vertical', minHeight: '100px', boxSizing: 'border-box' }}
                                ></textarea>
                            </div>

                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', fontSize: '0.9rem', color: '#4a5568', marginBottom: '8px', fontWeight: 'bold' }}><i className="fa fa-camera"></i> Đính kèm ảnh (Tùy chọn)</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setReviewForm({ ...reviewForm, imageFile: e.target.files[0] })}
                                    style={{ display: 'block', width: '100%', fontSize: '0.9rem', color: '#718096' }}
                                />
                            </div>

                            {reviewError && <div style={{ color: '#dc2626', fontSize: '0.85rem', marginBottom: '15px', textAlign: 'center' }}>{reviewError}</div>}

                            <button
                                type="submit"
                                disabled={reviewLoading}
                                style={{ width: '100%', padding: '14px', borderRadius: '12px', background: '#b22830', color: 'white', border: 'none', fontSize: '1rem', fontWeight: 'bold', cursor: reviewLoading ? 'not-allowed' : 'pointer' }}
                            >
                                {reviewLoading ? 'Đang gửi...' : 'Gửi Đánh Giá'}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* TOAST NOTIFICATION */}
            {toastMessage && (
                <>
                    <style>{`
                        @keyframes fadeInUp {
                            from { opacity: 0; transform: translate(-50%, 20px); }
                            to { opacity: 1; transform: translate(-50%, 0); }
                        }
                    `}</style>
                    <div style={{
                        position: 'fixed', bottom: '40px', left: '50%', transform: 'translateX(-50%)',
                        backgroundColor: '#16a34a', color: 'white', padding: '14px 28px',
                        borderRadius: '30px', boxShadow: '0 10px 25px rgba(22, 163, 74, 0.4)',
                        zIndex: 10000, fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px',
                        animation: 'fadeInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards'
                    }}>
                        <i className="fa fa-check-circle" style={{ fontSize: '1.2rem' }}></i>
                        {toastMessage}
                    </div>
                </>
            )}

            <Footer />
        </>
    );
};

export default Profile;
