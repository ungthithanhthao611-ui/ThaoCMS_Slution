import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import orderService from '../services/orderService';
import { IMAGE_BASE } from '../api/axiosClient';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios from 'axios'; // Dùng axios mặc định để gọi API ngoài

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

const Checkout = () => {
    const { cartItems, totalPrice, clearCart } = useCart();
    const navigate = useNavigate();

    // Customer Info (ReadOnly mostly)
    const [customer, setCustomer] = useState({ fullName: '', email: '', phone: '', gender: 1 });

    // API Address States
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    
    // Selected Address States
    const [selectedDistrictId, setSelectedDistrictId] = useState('');
    const [selectedDistrictName, setSelectedDistrictName] = useState('');
    const [selectedWardCode, setSelectedWardCode] = useState('');
    const [selectedWardName, setSelectedWardName] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [notes, setNotes] = useState('');
    
    // Auto-selected branch
    const [assignedBranch, setAssignedBranch] = useState(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    // 1. Fetch Customer info from LocalStorage
    useEffect(() => {
        const stored = localStorage.getItem('customer');
        if (stored) {
            const cust = JSON.parse(stored);
            setCustomer({
                fullName: cust.fullName || '',
                email: cust.email || '',
                phone: cust.phone || '',
                gender: cust.gender !== undefined ? cust.gender : 1 // 1 Nam, 0 Nu
            });
        }
    }, []);

    const handleCustomerChange = (field, value) => {
        setCustomer(prev => ({ ...prev, [field]: value }));
    };

    // 2. Fetch Districts of TP.HCM (code = 79)
    useEffect(() => {
        const fetchDistricts = async () => {
            try {
                const res = await axios.get('https://provinces.open-api.vn/api/p/79?depth=2');
                setDistricts(res.data.districts);
            } catch (err) {
                console.error("Lỗi lấy danh sách quận:", err);
            }
        };
        fetchDistricts();
    }, []);

    // 3. When District changes -> fetch Wards & Assign Branch
    useEffect(() => {
        if (!selectedDistrictId) {
            setWards([]);
            setAssignedBranch(null);
            return;
        }

        // Fetch Wards
        const fetchWards = async () => {
            try {
                const res = await axios.get(`https://provinces.open-api.vn/api/d/${selectedDistrictId}?depth=2`);
                setWards(res.data.wards);
            } catch (err) {
                console.error("Lỗi lấy phường xã:", err);
            }
        };
        fetchWards();

        // Assign Branch
        const districtObj = districts.find(d => d.code === Number(selectedDistrictId));
        if (districtObj) {
            const dName = districtObj.name;
            setSelectedDistrictName(dName);

            // Tìm branch phù hợp (so khớp tên quận có chữ Quận 1, Quận 3, Bình Thạnh...)
            let found = HCM_BRANCHES.find(b => dName.includes(b.district));
            
            // Nếu không tìm thấy, gán đại một chi nhánh trung tâm
            if (!found) {
                found = HCM_BRANCHES[0]; 
            }
            setAssignedBranch(found);
        }

        // Reset ward
        setSelectedWardCode('');
        setSelectedWardName('');
    }, [selectedDistrictId, districts]);

    // Update selected Ward name
    const handleWardChange = (e) => {
        const code = e.target.value;
        setSelectedWardCode(code);
        const wardObj = wards.find(w => w.code === Number(code));
        if (wardObj) {
            setSelectedWardName(wardObj.name);
        }
    };

    // Calculate full address string to save to DB
    const fullDeliveryAddress = () => {
        if (!selectedDistrictName || !selectedWardName || !streetAddress.trim()) return '';
        return `Người nhận: ${customer.fullName} - ${customer.phone}\nĐịa chỉ: ${streetAddress}, ${selectedWardName}, ${selectedDistrictName}, TP.HCM\n(Giao từ: ${assignedBranch?.name})`;
    };

    const isFormValid = () => {
        return selectedDistrictId && selectedWardCode && streetAddress.trim();
    };

    const handlePlaceOrder = async () => {
        const custId = JSON.parse(localStorage.getItem('customer') || 'null')?.id;
        if (!custId) {
            navigate('/login');
            return;
        }
        if (!isFormValid()) {
            setError('Vui lòng điền đầy đủ thông tin giao hàng.');
            return;
        }
        setError('');
        setLoading(true);

        try {
            const orderData = {
                customerId: custId,
                notes: notes || 'Không có ghi chú',
                deliveryAddress: fullDeliveryAddress(),
                deliveryTime: null, // Giao ngay
                items: cartItems.map(item => ({ productId: item.id, quantity: item.quantity, size: item.selectedSize || 'S' }))
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

    useEffect(() => {
        if (cartItems.length === 0 && !isSuccess) {
            navigate('/cart');
        }
    }, [cartItems.length, navigate, isSuccess]);

    if (cartItems.length === 0 && !isSuccess) return null;

    const inputStyle = {
        width: '100%', padding: '12px 15px', borderRadius: '4px',
        border: '1px solid #ddd', fontSize: '0.95rem', outline: 'none',
        boxSizing: 'border-box', backgroundColor: '#fdfdfd'
    };

    const labelStyle = {
        minWidth: '100px', fontWeight: '500', color: '#555', fontSize: '0.95rem', display: 'flex', alignItems: 'center'
    };

    const rowStyle = {
        display: 'flex', marginBottom: '20px', alignItems: 'flex-start', gap: '15px'
    };

    return (
        <>
            <Header />
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes slideIn {
                    from { opacity: 0; transform: translateX(-15px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                .checkout-wrapper {
                    animation: fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1);
                }
                .custom-input {
                    transition: all 0.3s ease;
                }
                .custom-input:focus:not([readonly]) {
                    border-color: #3498db !important;
                    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.15) !important;
                    background-color: #fff !important;
                }
                .hover-item {
                    transition: all 0.3s ease;
                    padding: 10px;
                    border-radius: 8px;
                }
                .hover-item:hover {
                    background: #f9f9f9;
                    transform: translateX(5px);
                }
                .submit-btn {
                    transition: all 0.3s ease;
                }
                .submit-btn:hover:not(:disabled) {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 15px rgba(52, 73, 94, 0.3);
                    background: #2c3e50 !important;
                }
                .submit-btn:active:not(:disabled) {
                    transform: translateY(0);
                    box-shadow: none;
                }
                .branch-notify {
                    animation: slideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                }
            `}</style>
            <div style={{ minHeight: '80vh', backgroundColor: '#fff', padding: '40px 0' }}>
                <div className="wrapper checkout-wrapper">
                    
                    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: '30px' }}>
                        <div style={{ fontSize: '0.9rem', color: '#666' }}>
                            Trang chủ / <span style={{ color: '#333' }}>Đặt hàng</span>
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
                        
                        {/* CỘT TRÁI: Đặt hàng (Form) */}
                        <div style={{ flex: 1, minWidth: '400px', padding: '10px 20px 30px 20px' }}>
                            <h3 style={{ fontWeight: '300', color: '#555', fontSize: '24px', marginBottom: '30px', paddingBottom: '10px' }}>
                                Đặt hàng
                            </h3>

                            {/* Họ tên */}
                            <div style={rowStyle}>
                                <div style={labelStyle}>Họ tên*</div>
                                <div style={{ flex: 1 }}>
                                    <input className="custom-input" type="text" value={customer.fullName} onChange={e => handleCustomerChange('fullName', e.target.value)} style={inputStyle} />
                                </div>
                            </div>

                            {/* Giới tính */}
                            <div style={rowStyle}>
                                <div style={labelStyle}>Giới tính</div>
                                <div style={{ flex: 1, display: 'flex', gap: '30px', alignItems: 'center', height: '45px' }}>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: '#555' }}>
                                        <input type="radio" name="gender" checked={customer.gender === 1} onChange={() => handleCustomerChange('gender', 1)} /> Nam
                                    </label>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: '#555' }}>
                                        <input type="radio" name="gender" checked={customer.gender === 0} onChange={() => handleCustomerChange('gender', 0)} /> Nữ
                                    </label>
                                </div>
                            </div>

                            {/* Email */}
                            <div style={rowStyle}>
                                <div style={labelStyle}>Email*</div>
                                <div style={{ flex: 1 }}>
                                    <input className="custom-input" type="email" value={customer.email} onChange={e => handleCustomerChange('email', e.target.value)} style={inputStyle} />
                                </div>
                            </div>

                            {/* Địa chỉ (Tỉnh/Thành cố định TP.HCM) */}
                            <div style={rowStyle}>
                                <div style={labelStyle}>Tỉnh/Thành*</div>
                                <div style={{ flex: 1 }}>
                                    <input type="text" value="Hồ Chí Minh" readOnly style={{ ...inputStyle, backgroundColor: '#f9f9f9', color: '#777' }} />
                                </div>
                            </div>

                            {/* Quận / Huyện */}
                            <div style={rowStyle}>
                                <div style={labelStyle}>Quận/Huyện*</div>
                                <div style={{ flex: 1 }}>
                                    <select className="custom-input" value={selectedDistrictId} onChange={e => setSelectedDistrictId(e.target.value)} style={inputStyle}>
                                        <option value="">-- Chọn Quận/Huyện --</option>
                                        {districts.map(d => <option key={d.code} value={d.code}>{d.name}</option>)}
                                    </select>
                                </div>
                            </div>

                            {/* Phường / Xã */}
                            <div style={rowStyle}>
                                <div style={labelStyle}>Phường/Xã*</div>
                                <div style={{ flex: 1 }}>
                                    <select className="custom-input" value={selectedWardCode} onChange={handleWardChange} disabled={!selectedDistrictId} style={{ ...inputStyle, cursor: selectedDistrictId ? 'pointer' : 'not-allowed', opacity: selectedDistrictId ? 1 : 0.6 }}>
                                        <option value="">-- Chọn Phường/Xã --</option>
                                        {wards.map(w => <option key={w.code} value={w.code}>{w.name}</option>)}
                                    </select>
                                </div>
                            </div>

                            {/* Địa chỉ chi tiết */}
                            <div style={rowStyle}>
                                <div style={labelStyle}>Địa chỉ*</div>
                                <div style={{ flex: 1 }}>
                                    <input 
                                        className="custom-input"
                                        type="text" 
                                        value={streetAddress} 
                                        onChange={e => setStreetAddress(e.target.value)} 
                                        placeholder="VD: 12 Nguyễn Trãi"
                                        style={inputStyle} 
                                    />
                                </div>
                            </div>

                            {/* Hiển thị chi nhánh giao hàng TỰ ĐỘNG */}
                            {assignedBranch && (
                                <div className="branch-notify" style={{ ...rowStyle, marginBottom: '20px' }}>
                                    <div style={{ ...labelStyle, color: '#3498db' }}>Giao từ</div>
                                    <div style={{ flex: 1, padding: '12px 15px', background: '#ebf5fb', color: '#2980b9', borderRadius: '8px', border: '1px solid #d6eaf8', fontSize: '0.95rem', display: 'flex', alignItems: 'center' }}>
                                        <i className="fa fa-map-marker" style={{ marginRight: '10px', fontSize: '1.2rem' }}></i>
                                        <strong>{assignedBranch.name}</strong>
                                    </div>
                                </div>
                            )}

                            {/* Điện thoại */}
                            <div style={rowStyle}>
                                <div style={labelStyle}>Điện thoại*</div>
                                <div style={{ flex: 1 }}>
                                    <input className="custom-input" type="text" value={customer.phone} onChange={e => handleCustomerChange('phone', e.target.value)} style={inputStyle} />
                                </div>
                            </div>

                            {/* Ghi chú */}
                            <div style={rowStyle}>
                                <div style={labelStyle}>Ghi chú</div>
                                <div style={{ flex: 1 }}>
                                    <textarea 
                                        className="custom-input"
                                        value={notes} 
                                        onChange={e => setNotes(e.target.value)} 
                                        rows={4} 
                                        style={{ ...inputStyle, resize: 'vertical' }}
                                    ></textarea>
                                </div>
                            </div>

                        </div>

                        {/* CỘT PHẢI: Đơn hàng của bạn */}
                        <div style={{ width: '450px', flexShrink: 0, background: 'white', border: '1px solid #f0f0f0', borderRadius: '4px', marginTop: '10px' }}>
                            <div style={{ padding: '20px', background: '#fafafa', borderBottom: '1px solid #f0f0f0' }}>
                                <h3 style={{ fontWeight: '400', color: '#555', fontSize: '20px', margin: 0 }}>
                                    Đơn hàng của bạn
                                </h3>
                            </div>
                            
                            <div style={{ padding: '20px' }}>
                                {/* Danh sách sản phẩm */}
                                {cartItems.map(item => (
                                    <div key={`${item.id}-${item.selectedSize || 'S'}`} className="hover-item" style={{ display: 'flex', gap: '15px', marginBottom: '10px', alignItems: 'center' }}>
                                        <div style={{ width: '60px', height: '60px', borderRadius: '4px', overflow: 'hidden', border: '1px solid #eee', flexShrink: 0 }}>
                                            {item.imageUrl ? (
                                                <img 
                                                    src={item.imageUrl.startsWith('http') ? item.imageUrl : `${IMAGE_BASE}${item.imageUrl.startsWith('/') ? '' : '/'}${item.imageUrl}`} 
                                                    alt={item.name} 
                                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                                                />
                                            ) : (
                                                <div style={{ width: '100%', height: '100%', background: '#eee' }}></div>
                                            )}
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ color: '#444', fontSize: '0.95rem', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                <span>{item.name}</span>
                                                <span style={{ fontSize: '0.75rem', fontWeight: 'bold', background: '#e2e8f0', color: '#4a5568', padding: '2px 6px', borderRadius: '4px' }}>
                                                    Size {item.selectedSize || 'S'}
                                                </span>
                                            </div>
                                            <div style={{ color: '#888', fontSize: '0.85rem', marginTop: '4px' }}>Số lượng: {item.quantity}</div>
                                            <div style={{ color: '#999', fontSize: '0.85rem', marginTop: '2px' }}>Đơn giá: {new Intl.NumberFormat('vi-VN').format(item.price)} VND</div>
                                        </div>
                                    </div>
                                ))}

                                <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '20px 0' }} />

                                {/* Tổng tiền */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ fontSize: '1.1rem', color: '#555' }}>Tổng tiền:</span>
                                    <span style={{ fontSize: '1.4rem', color: '#333' }}>{new Intl.NumberFormat('vi-VN').format(totalPrice)} VND</span>
                                </div>
                            </div>

                            {/* Hình thức thanh toán */}
                            <div style={{ background: '#fafafa', padding: '20px', borderTop: '1px solid #f0f0f0', borderBottom: '1px solid #f0f0f0' }}>
                                <h4 style={{ color: '#555', fontSize: '1.2rem', margin: '0 0 15px 0', fontWeight: '400' }}>Hình thức thanh toán</h4>
                                
                                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#444', cursor: 'pointer', fontSize: '0.95rem' }}>
                                    <input type="radio" checked readOnly style={{ accentColor: '#3498db' }} /> 
                                    Thanh toán khi nhận hàng
                                </label>
                                
                                <div style={{ background: '#fff', padding: '15px', marginTop: '15px', borderRadius: '4px', border: '1px solid #f0f0f0', fontSize: '0.85rem', color: '#666', lineHeight: 1.5 }}>
                                    Cửa hàng sẽ gửi hàng đến địa chỉ của bạn, bạn xem hàng rồi thanh toán tiền cho nhân viên giao hàng
                                </div>
                            </div>

                            {/* Nút đặt hàng */}
                            <div style={{ padding: '30px', textAlign: 'center' }}>
                                {error && <div style={{ color: '#e74c3c', fontSize: '0.9rem', marginBottom: '15px' }}>{error}</div>}
                                
                                <button
                                    className="submit-btn"
                                    onClick={handlePlaceOrder}
                                    disabled={loading || !isFormValid()}
                                    style={{
                                        background: isFormValid() ? '#34495e' : '#bdc3c7',
                                        color: 'white', padding: '12px 30px', borderRadius: '8px', border: 'none',
                                        fontSize: '0.95rem', cursor: isFormValid() ? 'pointer' : 'not-allowed',
                                        width: '220px', fontWeight: '500'
                                    }}
                                >
                                    {loading ? 'Đang xử lý...' : 'Đặt hàng >'}
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
