import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const Register = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        phone: '',
        address: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');

        // Validation cơ bản
        if (formData.password.length < 6) {
            setError('Mật khẩu phải có ít nhất 6 ký tự.');
            return;
        }
        const phoneRegex = /^[0-9]{10,11}$/;
        if (!phoneRegex.test(formData.phone)) {
            setError('Số điện thoại không hợp lệ (cần 10-11 số).');
            return;
        }
        if (!formData.address || formData.address.trim() === '') {
            setError('Vui lòng nhập địa chỉ để giao hàng.');
            return;
        }

        setLoading(true);

        try {
            await authService.register(formData);
            alert('Đăng ký thành công! Vui lòng đăng nhập.');
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || 'Lỗi kết nối đến máy chủ.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            overflowY: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("https://images.unsplash.com/photo-1497935586351-b67a49e012bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1951&q=80")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            padding: '20px',
            boxSizing: 'border-box',
            zIndex: 9999
        }}>
            <div style={{
                background: 'rgba(255, 255, 255, 0.95)',
                padding: '40px',
                borderRadius: '16px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                width: '100%',
                maxWidth: '500px',
                backdropFilter: 'blur(10px)',
                margin: 'auto',
                boxSizing: 'border-box'
            }}>
                <div style={{ marginBottom: '20px' }}>
                    <Link to="/" style={{ color: '#b22830', textDecoration: 'none', fontSize: '14px', fontWeight: 'bold' }}>
                        <i className="fa fa-arrow-left" style={{ marginRight: '6px' }}></i> Quay về Trang Chủ
                    </Link>
                </div>

                <h2 style={{ color: '#b22830', fontWeight: 'bold', textAlign: 'center', marginBottom: '30px', letterSpacing: '1px' }}>ĐĂNG KÝ TÀI KHOẢN</h2>
                
                {error && <div style={{background: '#f8d7da', color: '#721c24', padding: '10px', borderRadius: '5px', marginBottom: '20px', textAlign: 'center', fontSize: '14px'}}>{error}</div>}

                <form onSubmit={handleRegister}>
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#333' }}>Họ và tên *</label>
                        <input 
                            type="text" 
                            style={{ width: '100%', padding: '12px 15px', border: '1px solid #ccc', borderRadius: '6px', fontSize: '15px', outline: 'none', transition: 'border-color 0.3s' }}
                            name="fullName"
                            placeholder="Nhập họ và tên"
                            value={formData.fullName}
                            onChange={handleChange}
                            onFocus={(e) => e.target.style.borderColor = '#b22830'}
                            onBlur={(e) => e.target.style.borderColor = '#ccc'}
                            required 
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#333' }}>Email *</label>
                        <input 
                            type="email" 
                            style={{ width: '100%', padding: '12px 15px', border: '1px solid #ccc', borderRadius: '6px', fontSize: '15px', outline: 'none', transition: 'border-color 0.3s' }}
                            name="email"
                            placeholder="Nhập email"
                            value={formData.email}
                            onChange={handleChange}
                            onFocus={(e) => e.target.style.borderColor = '#b22830'}
                            onBlur={(e) => e.target.style.borderColor = '#ccc'}
                            required 
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#333' }}>Mật khẩu *</label>
                        <input 
                            type="password" 
                            style={{ width: '100%', padding: '12px 15px', border: '1px solid #ccc', borderRadius: '6px', fontSize: '15px', outline: 'none', transition: 'border-color 0.3s' }}
                            name="password"
                            placeholder="Mật khẩu tối thiểu 6 ký tự"
                            value={formData.password}
                            onChange={handleChange}
                            onFocus={(e) => e.target.style.borderColor = '#b22830'}
                            onBlur={(e) => e.target.style.borderColor = '#ccc'}
                            required 
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#333' }}>Số điện thoại giao hàng *</label>
                        <input 
                            type="text" 
                            style={{ width: '100%', padding: '12px 15px', border: '1px solid #ccc', borderRadius: '6px', fontSize: '15px', outline: 'none', transition: 'border-color 0.3s' }}
                            name="phone"
                            placeholder="Nhập số điện thoại (10-11 số)"
                            value={formData.phone}
                            onChange={handleChange}
                            onFocus={(e) => e.target.style.borderColor = '#b22830'}
                            onBlur={(e) => e.target.style.borderColor = '#ccc'}
                            required 
                        />
                    </div>
                    <div style={{ marginBottom: '30px' }}>
                        <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#333' }}>Địa chỉ giao hàng *</label>
                        <input 
                            type="text" 
                            style={{ width: '100%', padding: '12px 15px', border: '1px solid #ccc', borderRadius: '6px', fontSize: '15px', outline: 'none', transition: 'border-color 0.3s' }}
                            name="address"
                            placeholder="Ví dụ: 123 Đường A, Quận B"
                            value={formData.address}
                            onChange={handleChange}
                            onFocus={(e) => e.target.style.borderColor = '#b22830'}
                            onBlur={(e) => e.target.style.borderColor = '#ccc'}
                            required 
                        />
                    </div>
                    <button 
                        type="submit" 
                        style={{ 
                            width: '100%', 
                            padding: '14px', 
                            backgroundColor: '#b22830', 
                            color: 'white', 
                            border: 'none', 
                            borderRadius: '6px', 
                            fontSize: '16px', 
                            fontWeight: 'bold', 
                            cursor: loading ? 'not-allowed' : 'pointer',
                            transition: 'background-color 0.3s',
                            opacity: loading ? 0.7 : 1
                        }}
                        disabled={loading}
                        onMouseOver={(e) => !loading && (e.target.style.backgroundColor = '#8c1e24')}
                        onMouseOut={(e) => !loading && (e.target.style.backgroundColor = '#b22830')}
                    >
                        {loading ? 'ĐANG XỬ LÝ...' : 'ĐĂNG KÝ TÀI KHOẢN'}
                    </button>
                    
                    <div style={{ textAlign: 'center', marginTop: '25px', fontSize: '14px', color: '#555' }}>
                        Đã có tài khoản? <Link to="/login" style={{ color: '#b22830', fontWeight: 'bold', textDecoration: 'none' }}>Đăng nhập ngay</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
