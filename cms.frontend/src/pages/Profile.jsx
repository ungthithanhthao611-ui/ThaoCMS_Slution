import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import orderService from '../services/orderService';

const STATUS_MAP = {
    0: { label: 'Chờ xử lý', color: '#f39c12', bg: '#fef9e7', icon: '⏳' },
    1: { label: 'Đang giao', color: '#2980b9', bg: '#ebf5fb', icon: '🚴' },
    2: { label: 'Hoàn thành', color: '#27ae60', bg: '#eafaf1', icon: '✅' },
    3: { label: 'Đã hủy', color: '#e74c3c', bg: '#fdedec', icon: '❌' },
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

    if (!customer) return null;

    const tabStyle = (tab) => ({
        padding: '12px 24px', fontWeight: '700', cursor: 'pointer', border: 'none',
        borderBottom: `3px solid ${activeTab === tab ? '#b22830' : 'transparent'}`,
        color: activeTab === tab ? '#b22830' : '#666', background: 'transparent', fontSize: '0.95rem',
        transition: 'all 0.2s'
    });

    return (
        <div style={{ minHeight: '70vh', backgroundColor: '#f8f8f8', padding: '40px 0' }}>
            <div className="wrapper">
                {/* Header Profile */}
                <div style={{
                    background: 'linear-gradient(135deg, #b22830, #8c1e24)',
                    borderRadius: '20px', padding: '32px', marginBottom: '24px',
                    display: 'flex', alignItems: 'center', gap: '24px', color: 'white'
                }}>
                    <div style={{
                        width: '80px', height: '80px', borderRadius: '50%',
                        background: 'rgba(255,255,255,0.2)', display: 'flex',
                        alignItems: 'center', justifyContent: 'center', fontSize: '40px',
                        border: '3px solid rgba(255,255,255,0.4)'
                    }}>
                        {customer.fullName?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <h2 style={{ margin: 0, fontWeight: '800', fontSize: '1.6rem' }}>{customer.fullName}</h2>
                        <p style={{ margin: '4px 0 0', opacity: 0.8, fontSize: '0.9rem' }}>{customer.email}</p>
                        {customer.phone && <p style={{ margin: '2px 0 0', opacity: 0.7, fontSize: '0.85rem' }}>📱 {customer.phone}</p>}
                    </div>
                </div>

                {/* Tabs */}
                <div style={{ background: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
                    <div style={{ borderBottom: '1px solid #f0f0f0', display: 'flex' }}>
                        <button style={tabStyle('info')} onClick={() => setActiveTab('info')}>👤 Thông tin</button>
                        <button style={tabStyle('orders')} onClick={() => setActiveTab('orders')}>
                            📦 Lịch sử đơn hàng {orders.length > 0 && <span style={{ background: '#b22830', color: 'white', borderRadius: '12px', padding: '2px 8px', fontSize: '0.75rem', marginLeft: '6px' }}>{orders.length}</span>}
                        </button>
                    </div>

                    <div style={{ padding: '24px' }}>
                        {/* Tab Thông tin */}
                        {activeTab === 'info' && (
                            <div style={{ maxWidth: '500px' }}>
                                <h5 style={{ fontWeight: '700', color: '#333', marginBottom: '20px' }}>Thông tin tài khoản</h5>
                                {[
                                    { label: 'Họ và tên', value: customer.fullName, icon: '👤' },
                                    { label: 'Email', value: customer.email, icon: '✉️' },
                                    { label: 'Số điện thoại', value: customer.phone || 'Chưa cập nhật', icon: '📱' },
                                    { label: 'Địa chỉ', value: customer.address || 'Chưa cập nhật', icon: '📍' },
                                ].map((field, idx) => (
                                    <div key={idx} style={{
                                        display: 'flex', alignItems: 'flex-start', gap: '12px',
                                        padding: '14px', borderRadius: '10px', marginBottom: '8px',
                                        background: '#f8f8f8'
                                    }}>
                                        <span style={{ fontSize: '20px' }}>{field.icon}</span>
                                        <div>
                                            <div style={{ fontSize: '0.75rem', color: '#888', marginBottom: '2px' }}>{field.label}</div>
                                            <div style={{ fontWeight: '600', color: '#333' }}>{field.value}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Tab Lịch sử đơn hàng */}
                        {activeTab === 'orders' && (
                            <div>
                                {loadingOrders ? (
                                    <div style={{ textAlign: 'center', padding: '40px', color: '#888' }}>Đang tải lịch sử...</div>
                                ) : orders.length === 0 ? (
                                    <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                                        <div style={{ fontSize: '60px', marginBottom: '16px' }}>📭</div>
                                        <p style={{ color: '#888', fontSize: '1rem' }}>Bạn chưa có đơn hàng nào</p>
                                    </div>
                                ) : (
                                    orders.map(order => {
                                        const status = STATUS_MAP[order.status] || STATUS_MAP[0];
                                        const isExpanded = expandedOrder === order.id;
                                        return (
                                            <div key={order.id} style={{
                                                border: `1px solid #f0f0f0`, borderRadius: '12px',
                                                marginBottom: '12px', overflow: 'hidden'
                                            }}>
                                                {/* Header đơn hàng */}
                                                <div
                                                    onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                                                    style={{
                                                        padding: '16px', display: 'flex', alignItems: 'center',
                                                        gap: '12px', cursor: 'pointer', background: isExpanded ? '#fafafa' : 'white'
                                                    }}
                                                >
                                                    <div style={{ flex: 1 }}>
                                                        <div style={{ fontWeight: '700', color: '#333' }}>
                                                            Đơn #{order.id}
                                                            <span style={{
                                                                marginLeft: '10px', padding: '3px 10px', borderRadius: '20px',
                                                                fontSize: '0.75rem', fontWeight: '700',
                                                                background: status.bg, color: status.color
                                                            }}>
                                                                {status.icon} {status.label}
                                                            </span>
                                                        </div>
                                                        <div style={{ fontSize: '0.82rem', color: '#888', marginTop: '4px' }}>
                                                            {new Date(order.orderDate).toLocaleString('vi-VN')}
                                                        </div>
                                                    </div>
                                                    <div style={{ fontWeight: '800', color: '#b22830', fontSize: '1rem' }}>
                                                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.totalAmount)}
                                                    </div>
                                                    <span style={{ color: '#ccc', fontSize: '18px' }}>{isExpanded ? '▲' : '▼'}</span>
                                                </div>

                                                {/* Chi tiết đơn hàng (mở rộng) */}
                                                {isExpanded && (
                                                    <div style={{ padding: '0 16px 16px', borderTop: '1px solid #f0f0f0', background: '#fafafa' }}>
                                                        {order.items && order.items.map((item, idx) => (
                                                            <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', fontSize: '0.9rem', borderBottom: idx < order.items.length - 1 ? '1px solid #eee' : 'none' }}>
                                                                <span style={{ color: '#555' }}>{item.productName} × {item.quantity}</span>
                                                                <span style={{ fontWeight: '700' }}>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.unitPrice * item.quantity)}</span>
                                                            </div>
                                                        ))}
                                                        {order.deliveryAddress && (
                                                            <div style={{ marginTop: '10px', fontSize: '0.82rem', color: '#888' }}>
                                                                📍 {order.deliveryAddress}
                                                            </div>
                                                        )}
                                                        {order.notes && (
                                                            <div style={{ fontSize: '0.82rem', color: '#888', marginTop: '4px' }}>
                                                                📝 {order.notes}
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
