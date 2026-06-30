import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const navigate = useNavigate();

    const showToast = (msg) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(''), 3000);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await authService.login(email, password);
            if (res && res.customer) {
                // Lưu thông tin vào localStorage
                localStorage.setItem('customer', JSON.stringify(res.customer));
                showToast('Đăng nhập thành công!');
                
                // Đợi 1.5 giây để hiện thông báo rồi mới chuyển trang
                setTimeout(() => {
                    navigate('/');
                    window.location.reload();
                }, 1500);
            }
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
                maxWidth: '420px',
                backdropFilter: 'blur(10px)',
                margin: 'auto',
                boxSizing: 'border-box'
            }}>
                <div style={{ marginBottom: '20px' }}>
                    <Link to="/" style={{ color: '#b22830', textDecoration: 'none', fontSize: '14px', fontWeight: 'bold' }}>
                        <i className="fa fa-arrow-left" style={{ marginRight: '6px' }}></i> Quay về Trang Chủ
                    </Link>
                </div>

                <h2 style={{ color: '#b22830', fontWeight: 'bold', textAlign: 'center', marginBottom: '30px', letterSpacing: '1px' }}>ĐĂNG NHẬP</h2>
                
                {error && <div style={{background: '#f8d7da', color: '#721c24', padding: '10px', borderRadius: '5px', marginBottom: '20px', textAlign: 'center', fontSize: '14px'}}>{error}</div>}

                <form onSubmit={handleLogin}>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#333' }}>Email của bạn</label>
                        <input 
                            type="email" 
                            style={{ width: '100%', padding: '12px 15px', border: '1px solid #ccc', borderRadius: '6px', fontSize: '15px', outline: 'none', transition: 'border-color 0.3s' }}
                            placeholder="VD: thao@gmail.com" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onFocus={(e) => e.target.style.borderColor = '#b22830'}
                            onBlur={(e) => e.target.style.borderColor = '#ccc'}
                            required 
                        />
                    </div>
                    <div style={{ marginBottom: '30px' }}>
                        <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#333' }}>Mật khẩu</label>
                        <input 
                            type="password" 
                            style={{ width: '100%', padding: '12px 15px', border: '1px solid #ccc', borderRadius: '6px', fontSize: '15px', outline: 'none', transition: 'border-color 0.3s' }}
                            placeholder="Nhập mật khẩu" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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
                        {loading ? 'ĐANG XỬ LÝ...' : 'ĐĂNG NHẬP'}
                    </button>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '25px', fontSize: '14px' }}>
                        <Link to="/forgot-password" style={{ color: '#b22830', textDecoration: 'none', fontWeight: 'bold' }}>Quên mật khẩu?</Link>
                        <span style={{ color: '#555' }}>
                            Chưa có tài khoản? <Link to="/register" style={{ color: '#b22830', fontWeight: 'bold', textDecoration: 'none' }}>Đăng ký</Link>
                        </span>
                    </div>
                </form>
            </div>

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
        </div>
    );
};

export default Login;
