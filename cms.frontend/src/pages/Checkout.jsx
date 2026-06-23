import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import orderService from '../services/orderService';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Danh sách chi nhánh Highlands HCM (hard-code)
const HCM_BRANCHES = [
    { id: 1, district: 'Quận 1', name: 'Highlands Coffee Nguyễn Huệ', address: '65 Nguyễn Huệ, P. Bến Nghé' },
    { id: 2, district: 'Quận 1', name: 'Highlands Coffee Đồng Khởi', address: '42 Đồng Khởi, P. Bến Nghé' },
    { id: 3, district: 'Quận 3', name: 'Highlands Coffee Võ Văn Tần', address: '36 Võ Văn Tần, P. 6' },
    { id: 4, district: 'Quận 3', name: 'Highlands Coffee CMT8', address: '164 Cách Mạng Tháng 8, P. 10' },
    { id: 5, district: 'Quận 5', name: 'Highlands Coffee Trần Hưng Đạo', address: '258 Trần Hưng Đạo, P. 11' },
    { id: 6, district: 'Quận 7', name: 'Highlands Coffee Phú Mỹ Hưng', address: 'TTTM SC VivoCity, 1058 Nguyễn Văn Linh' },
    { id: 7, district: 'Quận 10', name: 'Highlands Coffee Sư Vạn Hạnh', address: '371 Sư Vạn Hạnh, P. 12' },
    { id: 8, district: 'Bình Thạnh', name: 'Highlands Coffee Vincom Đồng Khởi', address: '72 Lê Thánh Tôn, P. Bến Nghé' },
    { id: 9, district: 'Tân Bình', name: 'Highlands Coffee Trường Chinh', address: '197 Trường Chinh, P. 12' },
    { id: 10, district: 'Gò Vấp', name: 'Highlands Coffee Nguyễn Kiệm', address: '262 Nguyễn Kiệm, P. 3' },
];

const DISTRICTS = [...new Set(HCM_BRANCHES.map(b => b.district))];

// Tạo các khung giờ giao hàng (30 phút/slot) từ 07:00 đến 22:00
const generateTimeSlots = (date) => {
    const slots = [];
    const start = new Date(date);
    const now = new Date();
    start.setHours(7, 0, 0, 0);
    const end = new Date(date);
    end.setHours(22, 0, 0, 0);

    while (start <= end) {
        const slotTime = new Date(start);
        // Với hôm nay, chỉ hiện slot từ bây giờ + 30 phút trở đi
        if (slotTime.toDateString() !== now.toDateString() || slotTime > new Date(now.getTime() + 30 * 60000)) {
            slots.push(new Date(slotTime));
        }
        start.setMinutes(start.getMinutes() + 30);
    }
    return slots;
};

// Lấy 3 ngày tiếp theo (hôm nay + 2 ngày)
const getAvailableDates = () => {
    const dates = [];
    for (let i = 0; i < 3; i++) {
        const d = new Date();
        d.setDate(d.getDate() + i);
        dates.push(d);
    }
    return dates;
};

const formatDate = (date) => {
    const days = ['CN', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
    return `${days[date.getDay()]}, ${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}`;
};

const Checkout = () => {
    const { cartItems, totalPrice, clearCart } = useCart();
    const navigate = useNavigate();

    // Kiểm tra giờ mở cửa (07:00 - 22:00) để cho phép "Giao ngay"
    const now = new Date();
    const currentHour = now.getHours();
    const isOpenNow = currentHour >= 7 && currentHour < 22;

    // State form
    const [deliveryType, setDeliveryType] = useState(isOpenNow ? 'now' : 'scheduled');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedBranchId, setSelectedBranchId] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [selectedDate, setSelectedDate] = useState(getAvailableDates()[0]);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
    const [notes, setNotes] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const availableDates = getAvailableDates();
    const timeSlots = useMemo(() => generateTimeSlots(selectedDate), [selectedDate]);

    const filteredBranches = HCM_BRANCHES.filter(b => b.district === selectedDistrict);
    const selectedBranch = HCM_BRANCHES.find(b => b.id === Number(selectedBranchId));

    // Tính toán địa chỉ giao hàng cuối
    const fullDeliveryAddress = selectedBranch && streetAddress
        ? `${streetAddress}, ${selectedBranch.district}, TP.HCM (Chi nhánh gần nhất: ${selectedBranch.name})`
        : '';

    const isFormValid = () => {
        if (!selectedDistrict || !selectedBranchId || !streetAddress.trim()) return false;
        if (deliveryType === 'scheduled' && !selectedTimeSlot) return false;
        return true;
    };

    const handlePlaceOrder = async () => {
        const customer = JSON.parse(localStorage.getItem('customer') || 'null');
        if (!customer) {
            navigate('/login');
            return;
        }
        if (!isFormValid()) {
            setError('Vui lòng điền đầy đủ thông tin địa chỉ và thời gian giao hàng.');
            return;
        }
        setError('');
        setLoading(true);

        try {
            const orderData = {
                customerId: customer.id,
                notes: notes || `Giao hàng ${deliveryType === 'now' ? 'ngay' : 'theo lịch'}`,
                deliveryAddress: fullDeliveryAddress,
                deliveryTime: deliveryType === 'scheduled' ? selectedTimeSlot.toISOString() : null,
                items: cartItems.map(item => ({ productId: item.id, quantity: item.quantity }))
            };

            await orderService.createOrder(orderData);
            setIsSuccess(true);
            clearCart();
            navigate('/order-success');
        } catch (err) {
            setError('Đặt hàng thất bại. Vui lòng thử lại.');
        } finally {
            setLoading(false);
        }
    };

    // Tự động điền địa chỉ từ localStorage
    useEffect(() => {
        const stored = localStorage.getItem('customer');
        if (stored) {
            const customer = JSON.parse(stored);
            if (customer.address) {
                setStreetAddress(customer.address);
            }
        }
    }, []);

    useEffect(() => {
        if (cartItems.length === 0 && !isSuccess) {
            navigate('/cart');
        }
    }, [cartItems.length, navigate, isSuccess]);

    if (cartItems.length === 0 && !isSuccess) {
        return null;
    }

    return (
        <>
            <Header />
            <div style={{ minHeight: '80vh', backgroundColor: '#f8f8f8', padding: '40px 0' }}>
                <div className="wrapper">
                    {/* Nút quay lại giỏ hàng */}
                    <div style={{ marginBottom: '20px' }}>
                        <Link to="/cart" style={{
                            display: 'inline-block', padding: '10px 20px', backgroundColor: '#fff',
                            color: '#333', textDecoration: 'none', borderRadius: '8px', fontWeight: 'bold',
                            fontSize: '0.9rem', transition: 'all 0.3s', border: '1px solid #ddd',
                            boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
                        }}>
                            <i className="fa fa-arrow-left" style={{ marginRight: '8px' }}></i> Quay về Giỏ Hàng
                        </Link>
                    </div>
                <h2 style={{ color: '#b22830', fontWeight: '800', textTransform: 'uppercase', marginBottom: '30px', fontSize: '26px' }}>
                    🚀 Xác nhận đặt hàng
                </h2>

                <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
                    {/* CỘT TRÁI: Form thông tin */}
                    <div style={{ flex: 1, minWidth: '320px' }}>

                        {/* === BƯỚC 1: CHỌN THỜI GIAN === */}
                        <div style={{ background: 'white', borderRadius: '16px', padding: '24px', marginBottom: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
                            <h5 style={{ fontWeight: '800', marginBottom: '16px', color: '#333' }}>
                                🕐 Thời gian nhận hàng
                            </h5>

                            <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
                                {/* Giao ngay */}
                                <div
                                    onClick={() => isOpenNow && setDeliveryType('now')}
                                    style={{
                                        flex: 1, padding: '14px', borderRadius: '10px', cursor: isOpenNow ? 'pointer' : 'not-allowed',
                                        border: `2px solid ${deliveryType === 'now' ? '#b22830' : '#e0e0e0'}`,
                                        background: deliveryType === 'now' ? '#fff5f5' : 'white',
                                        opacity: isOpenNow ? 1 : 0.5, transition: 'all 0.2s'
                                    }}
                                >
                                    <div style={{ fontWeight: '700', color: deliveryType === 'now' ? '#b22830' : '#333' }}>
                                        ⚡ Giao ngay
                                    </div>
                                    <div style={{ fontSize: '0.8rem', color: '#888', marginTop: '4px' }}>
                                        {isOpenNow ? '25 – 40 phút' : 'Ngoài giờ hoạt động'}
                                    </div>
                                </div>

                                {/* Đặt trước */}
                                <div
                                    onClick={() => setDeliveryType('scheduled')}
                                    style={{
                                        flex: 1, padding: '14px', borderRadius: '10px', cursor: 'pointer',
                                        border: `2px solid ${deliveryType === 'scheduled' ? '#b22830' : '#e0e0e0'}`,
                                        background: deliveryType === 'scheduled' ? '#fff5f5' : 'white',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    <div style={{ fontWeight: '700', color: deliveryType === 'scheduled' ? '#b22830' : '#333' }}>
                                        📅 Đặt trước
                                    </div>
                                    <div style={{ fontSize: '0.8rem', color: '#888', marginTop: '4px' }}>Chọn ngày & giờ</div>
                                </div>
                            </div>

                            {/* Chọn ngày và giờ khi đặt trước */}
                            {deliveryType === 'scheduled' && (
                                <>
                                    {/* Chọn ngày */}
                                    <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
                                        {availableDates.map((date, idx) => (
                                            <button key={idx} onClick={() => { setSelectedDate(date); setSelectedTimeSlot(null); }} style={{
                                                padding: '8px 16px', borderRadius: '8px', border: `2px solid ${selectedDate.toDateString() === date.toDateString() ? '#b22830' : '#e0e0e0'}`,
                                                background: selectedDate.toDateString() === date.toDateString() ? '#b22830' : 'white',
                                                color: selectedDate.toDateString() === date.toDateString() ? 'white' : '#333',
                                                fontWeight: '700', cursor: 'pointer', fontSize: '0.85rem'
                                            }}>
                                                {idx === 0 ? 'Hôm nay' : idx === 1 ? 'Ngày mai' : formatDate(date)}
                                            </button>
                                        ))}
                                    </div>

                                    {/* Chọn giờ */}
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                        {timeSlots.map((slot, idx) => (
                                            <button key={idx} onClick={() => setSelectedTimeSlot(slot)} style={{
                                                padding: '7px 12px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '600',
                                                border: `2px solid ${selectedTimeSlot?.getTime() === slot.getTime() ? '#b22830' : '#e0e0e0'}`,
                                                background: selectedTimeSlot?.getTime() === slot.getTime() ? '#b22830' : 'white',
                                                color: selectedTimeSlot?.getTime() === slot.getTime() ? 'white' : '#555',
                                                cursor: 'pointer'
                                            }}>
                                                {slot.getHours().toString().padStart(2, '0')}:{slot.getMinutes().toString().padStart(2, '0')}
                                            </button>
                                        ))}
                                    </div>
                                    {timeSlots.length === 0 && <p style={{ color: '#e74c3c', fontSize: '0.85rem' }}>Hôm nay đã hết khung giờ giao hàng. Vui lòng chọn ngày khác.</p>}
                                </>
                            )}
                        </div>

                        {/* === BƯỚC 2: ĐỊA CHỈ GIAO HÀNG === */}
                        <div style={{ background: 'white', borderRadius: '16px', padding: '24px', marginBottom: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
                            <h5 style={{ fontWeight: '800', marginBottom: '16px', color: '#333' }}>
                                📍 Địa chỉ giao hàng — TP. Hồ Chí Minh
                            </h5>

                            {/* Chọn quận */}
                            <div style={{ marginBottom: '12px' }}>
                                <label style={{ fontWeight: '600', fontSize: '0.9rem', marginBottom: '6px', display: 'block', color: '#555' }}>Chọn Quận / Huyện</label>
                                <select value={selectedDistrict} onChange={e => { setSelectedDistrict(e.target.value); setSelectedBranchId(''); }} style={{
                                    width: '100%', padding: '12px', borderRadius: '8px', border: '2px solid #e0e0e0',
                                    fontSize: '0.95rem', outline: 'none', cursor: 'pointer'
                                }}>
                                    <option value="">-- Chọn quận --</option>
                                    {DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
                                </select>
                            </div>

                            {/* Chọn chi nhánh gần nhất */}
                            {selectedDistrict && (
                                <div style={{ marginBottom: '12px' }}>
                                    <label style={{ fontWeight: '600', fontSize: '0.9rem', marginBottom: '6px', display: 'block', color: '#555' }}>
                                        Chi nhánh Highlands gần nhất
                                    </label>
                                    <select value={selectedBranchId} onChange={e => setSelectedBranchId(e.target.value)} style={{
                                        width: '100%', padding: '12px', borderRadius: '8px', border: '2px solid #e0e0e0',
                                        fontSize: '0.95rem', outline: 'none', cursor: 'pointer'
                                    }}>
                                        <option value="">-- Chọn chi nhánh --</option>
                                        {filteredBranches.map(b => <option key={b.id} value={b.id}>{b.name} — {b.address}</option>)}
                                    </select>
                                </div>
                            )}

                            {/* Số nhà / đường */}
                            {selectedBranchId && (
                                <div style={{ marginBottom: '12px' }}>
                                    <label style={{ fontWeight: '600', fontSize: '0.9rem', marginBottom: '6px', display: 'block', color: '#555' }}>
                                        Số nhà, tên đường của bạn
                                    </label>
                                    <input
                                        type="text"
                                        value={streetAddress}
                                        onChange={e => setStreetAddress(e.target.value)}
                                        placeholder="VD: 12 Nguyễn Trãi, Phường 2"
                                        style={{
                                            width: '100%', padding: '12px', borderRadius: '8px',
                                            border: '2px solid #e0e0e0', fontSize: '0.95rem', outline: 'none',
                                            boxSizing: 'border-box'
                                        }}
                                    />
                                </div>
                            )}

                            {/* Hiển thị địa chỉ đầy đủ */}
                            {fullDeliveryAddress && (
                                <div style={{ background: '#fff5f5', border: '1px solid #ffcccc', borderRadius: '8px', padding: '12px', fontSize: '0.85rem', color: '#b22830' }}>
                                    📦 Giao đến: <strong>{fullDeliveryAddress}</strong>
                                </div>
                            )}
                        </div>

                        {/* === BƯỚC 3: GHI CHÚ === */}
                        <div style={{ background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
                            <h5 style={{ fontWeight: '800', marginBottom: '12px', color: '#333' }}>📝 Ghi chú (không bắt buộc)</h5>
                            <textarea
                                value={notes}
                                onChange={e => setNotes(e.target.value)}
                                placeholder="VD: Không đường, ít đá, để lạnh... gọi điện trước khi giao"
                                rows={3}
                                style={{
                                    width: '100%', padding: '12px', borderRadius: '8px',
                                    border: '2px solid #e0e0e0', fontSize: '0.9rem', outline: 'none',
                                    resize: 'vertical', boxSizing: 'border-box'
                                }}
                            />
                        </div>
                    </div>

                    {/* CỘT PHẢI: Tổng kết & xác nhận */}
                    <div style={{ width: '320px', flexShrink: 0 }}>
                        <div style={{ background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', position: 'sticky', top: '100px' }}>
                            <h5 style={{ fontWeight: '800', marginBottom: '16px', color: '#333' }}>📋 Đơn hàng của bạn</h5>

                            {cartItems.map(item => (
                                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '0.9rem' }}>
                                    <span style={{ color: '#555' }}>{item.name} × {item.quantity}</span>
                                    <span style={{ fontWeight: '700' }}>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price * item.quantity)}</span>
                                </div>
                            ))}

                            <hr style={{ margin: '16px 0' }} />

                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', color: '#666', fontSize: '0.9rem' }}>
                                <span>Phí giao hàng</span>
                                <span style={{ color: '#28a745', fontWeight: '700' }}>Miễn phí</span>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '800', fontSize: '1.2rem', marginBottom: '8px' }}>
                                <span>Tổng tiền</span>
                                <span style={{ color: '#b22830' }}>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPrice)}</span>
                            </div>

                            {/* Phương thức thanh toán */}
                            <div style={{ background: '#f9f9f9', borderRadius: '8px', padding: '12px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <span style={{ fontSize: '24px' }}>💵</span>
                                <div>
                                    <div style={{ fontWeight: '700', fontSize: '0.9rem' }}>Tiền mặt (COD)</div>
                                    <div style={{ fontSize: '0.75rem', color: '#888' }}>Thanh toán khi nhận hàng</div>
                                </div>
                            </div>

                            {error && <div style={{ background: '#ffebee', color: '#c62828', padding: '10px', borderRadius: '8px', fontSize: '0.85rem', marginBottom: '12px' }}>{error}</div>}

                            <button
                                onClick={handlePlaceOrder}
                                disabled={loading || !isFormValid()}
                                style={{
                                    width: '100%', backgroundColor: isFormValid() ? '#b22830' : '#ccc',
                                    color: 'white', padding: '16px', borderRadius: '10px', border: 'none',
                                    fontWeight: '800', fontSize: '1rem', cursor: isFormValid() ? 'pointer' : 'not-allowed',
                                    letterSpacing: '1px', textTransform: 'uppercase', transition: 'all 0.3s ease'
                                }}
                            >
                                {loading ? '⏳ Đang xử lý...' : '✅ XÁC NHẬN ĐẶT HÀNG'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </>
);
};

export default Checkout;
