import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import orderService from '../services/orderService';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { IMAGE_BASE } from '../api/axiosClient';

const STATUS_MAP = {
    0: { label: 'Chờ xử lý', color: '#d97706', bg: '#fef3c7', icon: 'fa fa-clock-o' },
    1: { label: 'Đang giao', color: '#2563eb', bg: '#dbeafe', icon: 'fa fa-motorcycle' },
    2: { label: 'Hoàn thành', color: '#16a34a', bg: '#dcfce7', icon: 'fa fa-check-circle' },
    3: { label: 'Đã hủy', color: '#dc2626', bg: '#fee2e2', icon: 'fa fa-times-circle' },
};

const Profile = () => {
    const [customer, setCustomer] = useState(null);
    const [orders, setOrders] = useState([]);
    const [loadingOrders, setLoadingOrders] = useState(true);
    const [activeTab, setActiveTab] = useState('info');
    const [expandedOrder, setExpandedOrder] = useState(null);
    const navigate = useNavigate();

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
    }, [navigate]);

    const handleLogout = () => {
        if (window.confirm('Bạn có chắc chắn muốn đăng xuất tài khoản?')) {
            localStorage.removeItem('customer');
            navigate('/');
            window.location.reload();
        }
    };

    if (!customer) return null;

    return (
        <>
            <Header />
            <div style={{ minHeight: '85vh', backgroundColor: '#f4f6f9', padding: '50px 0', fontFamily: '"Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}>
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
                            <div style={{
                                background: 'white', borderRadius: '24px', padding: '30px',
                                boxShadow: '0 10px 30px rgba(0,0,0,0.04)', border: '1px solid #edf2f7',
                                textAlign: 'center', position: 'relative', overflow: 'hidden'
                            }}>
                                {/* Background bóng bẩy */}
                                <div style={{
                                    position: 'absolute', top: 0, left: 0, right: 0, height: '90px',
                                    background: 'linear-gradient(135deg, #b22830, #8c1e24)'
                                }}></div>

                                {/* Avatar */}
                                <div style={{
                                    width: '90px', height: '90px', borderRadius: '50%',
                                    backgroundColor: '#fff', border: '4px solid #fff',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '38px', fontWeight: '800', color: '#b22830',
                                    margin: '35px auto 15px', position: 'relative', zIndex: 2,
                                    boxShadow: '0 5px 15px rgba(178, 40, 48, 0.2)'
                                }}>
                                    {customer.fullName?.charAt(0).toUpperCase()}
                                </div>

                                <h3 style={{ margin: '10px 0 5px', color: '#1a202c', fontWeight: '800', fontSize: '1.4rem' }}>{customer.fullName}</h3>
                                <p style={{ margin: 0, color: '#718096', fontSize: '0.85rem', fontWeight: '500' }}>{customer.email}</p>
                                <span style={{
                                    display: 'inline-block', marginTop: '15px', padding: '6px 14px',
                                    background: '#f1f5f9', color: '#475569', borderRadius: '20px',
                                    fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px'
                                }}>
                                    Khách hàng
                                </span>
                            </div>

                            {/* Card Menu Điều Hướng Tab */}
                            <div style={{
                                background: 'white', borderRadius: '24px', padding: '15px',
                                boxShadow: '0 10px 30px rgba(0,0,0,0.04)', border: '1px solid #edf2f7'
                            }}>
                                <button 
                                    onClick={() => setActiveTab('info')}
                                    style={{
                                        width: '100%', padding: '14px 20px', borderRadius: '16px', border: 'none',
                                        background: activeTab === 'info' ? '#fff5f5' : 'transparent',
                                        color: activeTab === 'info' ? '#b22830' : '#4a5568',
                                        fontWeight: '700', fontSize: '0.95rem', cursor: 'pointer',
                                        textAlign: 'left', display: 'flex', alignItems: 'center', gap: '12px',
                                        transition: 'all 0.25s'
                                    }}
                                >
                                    <i className="fa fa-user" style={{ fontSize: '18px', width: '20px', color: activeTab === 'info' ? '#b22830' : '#a0aec0' }}></i>
                                    Thông tin cá nhân
                                </button>

                                <button 
                                    onClick={() => setActiveTab('orders')}
                                    style={{
                                        width: '100%', padding: '14px 20px', borderRadius: '16px', border: 'none',
                                        background: activeTab === 'orders' ? '#fff5f5' : 'transparent',
                                        color: activeTab === 'orders' ? '#b22830' : '#4a5568',
                                        fontWeight: '700', fontSize: '0.95rem', cursor: 'pointer',
                                        textAlign: 'left', display: 'flex', alignItems: 'center', gap: '12px',
                                        transition: 'all 0.25s', marginTop: '8px'
                                    }}
                                >
                                    <i className="fa fa-shopping-bag" style={{ fontSize: '18px', width: '20px', color: activeTab === 'orders' ? '#b22830' : '#a0aec0' }}></i>
                                    Lịch sử mua hàng
                                    {orders.length > 0 && (
                                        <span style={{
                                            marginLeft: 'auto', background: '#b22830', color: 'white',
                                            borderRadius: '50%', width: '22px', height: '22px', display: 'flex',
                                            alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 'bold'
                                        }}>
                                            {orders.length}
                                        </span>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* CỘT PHẢI: Nội dung chi tiết Tab */}
                        <div style={{ flex: '2', minWidth: '320px' }}>
                            <div style={{
                                background: 'white', borderRadius: '24px', padding: '35px',
                                boxShadow: '0 10px 30px rgba(0,0,0,0.04)', border: '1px solid #edf2f7',
                                minHeight: '400px', boxSizing: 'border-box'
                            }}>
                                
                                {/* TAB 1: THÔNG TIN CHI TIẾT */}
                                {activeTab === 'info' && (
                                    <div>
                                        <h4 style={{ color: '#1a202c', fontWeight: '800', marginBottom: '25px', fontSize: '1.4rem', borderBottom: '2px solid #f7fafc', paddingBottom: '15px' }}>
                                            Thông tin cá nhân
                                        </h4>
                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
                                            {[
                                                { label: 'Họ và tên', value: customer.fullName, icon: 'fa fa-user-circle-o', color: '#b22830' },
                                                { label: 'Địa chỉ Email', value: customer.email, icon: 'fa fa-envelope-o', color: '#3182ce' },
                                                { label: 'Số điện thoại', value: customer.phone || 'Chưa cập nhật', icon: 'fa fa-phone', color: '#38a169' },
                                                { label: 'Địa chỉ nhận hàng', value: customer.address || 'Chưa cập nhật', icon: 'fa fa-map-marker', color: '#dd6b20', fullWidth: true },
                                            ].map((field, idx) => (
                                                <div key={idx} style={{
                                                    gridColumn: field.fullWidth ? '1 / -1' : 'span 1',
                                                    padding: '20px', borderRadius: '16px', background: '#f8fafc',
                                                    border: '1px solid #edf2f7', display: 'flex', alignItems: 'flex-start', gap: '16px'
                                                }}>
                                                    <div style={{
                                                        width: '44px', height: '44px', borderRadius: '12px',
                                                        backgroundColor: '#fff', display: 'flex', alignItems: 'center',
                                                        justifyContent: 'center', fontSize: '20px', color: field.color,
                                                        boxShadow: '0 4px 10px rgba(0,0,0,0.02)', border: '1px solid #edf2f7'
                                                    }}>
                                                        <i className={field.icon}></i>
                                                    </div>
                                                    <div>
                                                        <span style={{ fontSize: '0.78rem', color: '#a0aec0', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                                            {field.label}
                                                        </span>
                                                        <div style={{ fontWeight: '700', color: '#2d3748', marginTop: '4px', fontSize: '1rem', lineHeight: '1.4' }}>
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
                                        <h4 style={{ color: '#1a202c', fontWeight: '800', marginBottom: '25px', fontSize: '1.4rem', borderBottom: '2px solid #f7fafc', paddingBottom: '15px' }}>
                                            Lịch sử mua hàng
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
                                                        <div key={order.id} style={{
                                                            border: '1px solid #edf2f7', borderRadius: '18px',
                                                            overflow: 'hidden', transition: 'all 0.3s',
                                                            boxShadow: isExpanded ? '0 10px 25px rgba(0,0,0,0.03)' : 'none'
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

                                                                    <i className={`fa ${isExpanded ? 'fa-chevron-up' : 'fa-chevron-down'}`} style={{ color: '#cbd5e0', fontSize: '14px' }}></i>
                                                                </div>
                                                            </div>

                                                            {/* Chi tiết đơn hàng khi click mở rộng */}
                                                            {isExpanded && (
                                                                <div style={{ padding: '24px', borderTop: '1px solid #edf2f7', background: '#fafbfc' }}>
                                                                    <h5 style={{ margin: '0 0 15px', color: '#4a5568', fontWeight: '800', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                                                        Chi tiết sản phẩm đặt mua
                                                                    </h5>

                                                                    {/* Danh sách món */}
                                                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
                                                                        {order.items && order.items.map((item, idx) => (
                                                                            <div key={idx} style={{
                                                                                display: 'flex', justifyContent: 'space-between',
                                                                                alignItems: 'center', padding: '12px 16px',
                                                                                background: 'white', borderRadius: '12px',
                                                                                border: '1px solid #f1f5f9', gap: '15px'
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
                                                                                        <div style={{ color: '#718096', fontSize: '0.8rem', marginTop: '2px', fontWeight: '500' }}>
                                                                                            Đơn giá: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.unitPrice)} | Số lượng: {item.quantity}
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <span style={{ fontWeight: '800', color: '#b22830', fontSize: '0.95rem' }}>
                                                                                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.unitPrice * item.quantity)}
                                                                                </span>
                                                                            </div>
                                                                        ))}
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Profile;
