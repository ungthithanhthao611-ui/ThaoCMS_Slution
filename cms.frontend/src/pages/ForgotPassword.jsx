import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const ForgotPassword = () => {
    const [step, setStep] = useState(1); // 1: Nhập email, 2: Nhập OTP & mật khẩu mới
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSendOtp = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            const res = await authService.forgotPassword(email);
            setSuccess(res.message || 'Mã OTP đã được gửi về Email của bạn!');
            setStep(2);
        } catch (err) {
            setError(err.response?.data?.message || 'Không tìm thấy tài khoản với email này.');
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (newPassword !== confirmPassword) {
            setError('Mật khẩu xác nhận không trùng khớp.');
            return;
        }

        setLoading(true);

        try {
            const res = await authService.resetPassword(email, otp, newPassword);
            alert(res.message || 'Đổi mật khẩu thành công!');
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || 'Mã OTP không đúng hoặc đã hết hạn.');
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
                maxWidth: '450px',
                backdropFilter: 'blur(10px)',
                margin: 'auto',
                boxSizing: 'border-box'
            }}>
                <div style={{ marginBottom: '20px' }}>
                    <Link to="/login" style={{ color: '#b22830', textDecoration: 'none', fontSize: '14px', fontWeight: 'bold' }}>
                        <i className="fa fa-arrow-left" style={{ marginRight: '6px' }}></i> Quay về Đăng nhập
                    </Link>
                </div>

                <h2 style={{ color: '#b22830', fontWeight: 'bold', textAlign: 'center', marginBottom: '30px', letterSpacing: '1px' }}>QUÊN MẬT KHẨU</h2>
                
                {error && <div style={{background: '#f8d7da', color: '#721c24', padding: '10px', borderRadius: '5px', marginBottom: '20px', textAlign: 'center', fontSize: '14px'}}>{error}</div>}
                {success && <div style={{background: '#d4edda', color: '#155724', padding: '10px', borderRadius: '5px', marginBottom: '20px', textAlign: 'center', fontSize: '14px'}}>{success}</div>}

                {step === 1 ? (
                    <form onSubmit={handleSendOtp}>
                        <div style={{ marginBottom: '25px' }}>
                            <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#333' }}>Email tài khoản của bạn</label>
                            <input 
                                type="email" 
                                style={{ width: '100%', padding: '12px 15px', border: '1px solid #ccc', borderRadius: '6px', fontSize: '15px', outline: 'none', boxSizing: 'border-box' }}
                                placeholder="VD: mailcua-ban@gmail.com" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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
                                opacity: loading ? 0.7 : 1
                            }}
                            disabled={loading}
                        >
                            {loading ? 'ĐANG GỬI OTP...' : 'GỬI MÃ XÁC THỰC (OTP)'}
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleResetPassword}>
                        <div style={{ marginBottom: '15px' }}>
                            <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px', color: '#333' }}>Mã OTP (Được gửi về email)</label>
                            <input 
                                type="text" 
                                style={{ width: '100%', padding: '12px 15px', border: '1px solid #ccc', borderRadius: '6px', fontSize: '15px', outline: 'none', boxSizing: 'border-box', textAlign: 'center', letterSpacing: '4px', fontWeight: 'bold' }}
                                placeholder="Nhập 6 số OTP" 
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                required 
                            />
                        </div>
                        <div style={{ marginBottom: '15px' }}>
                            <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px', color: '#333' }}>Mật khẩu mới</label>
                            <input 
                                type="password" 
                                style={{ width: '100%', padding: '12px 15px', border: '1px solid #ccc', borderRadius: '6px', fontSize: '15px', outline: 'none', boxSizing: 'border-box' }}
                                placeholder="Nhập mật khẩu mới" 
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required 
                            />
                        </div>
                        <div style={{ marginBottom: '25px' }}>
                            <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px', color: '#333' }}>Xác nhận mật khẩu mới</label>
                            <input 
                                type="password" 
                                style={{ width: '100%', padding: '12px 15px', border: '1px solid #ccc', borderRadius: '6px', fontSize: '15px', outline: 'none', boxSizing: 'border-box' }}
                                placeholder="Nhập lại mật khẩu mới" 
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required 
                            />
                        </div>
                        <button 
                            type="submit" 
                            style={{ 
                                width: '100%', 
                                padding: '14px', 
                                backgroundColor: '#11CAA0', 
                                color: 'white', 
                                border: 'none', 
                                borderRadius: '6px', 
                                fontSize: '16px', 
                                fontWeight: 'bold', 
                                cursor: loading ? 'not-allowed' : 'pointer',
                                opacity: loading ? 0.7 : 1
                            }}
                            disabled={loading}
                        >
                            {loading ? 'ĐANG XỬ LÝ...' : 'XÁC NHẬN ĐỔI MẬT KHẨU'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ForgotPassword;
