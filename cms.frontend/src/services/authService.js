import axiosClient from './../api/axiosClient';

const authService = {
    // Gọi API Đăng ký khách hàng
    register: async (customerData) => {
        try {
            const response = await axiosClient.post('/Auth/CustomerRegister', customerData);
            return response;
        } catch (error) {
            console.error('Lỗi khi đăng ký:', error);
            throw error;
        }
    },

    // Gọi API Đăng nhập khách hàng
    login: async (email, password) => {
        try {
            const response = await axiosClient.post('/Auth/CustomerLogin', { email, password });
            return response;
        } catch (error) {
            console.error('Lỗi khi đăng nhập:', error);
            throw error;
        }
    },

    // Gọi API Yêu cầu gửi OTP quên mật khẩu
    forgotPassword: async (email) => {
        try {
            const response = await axiosClient.post('/Auth/ForgotPassword', { email });
            return response;
        } catch (error) {
            console.error('Lỗi khi yêu cầu OTP:', error);
            throw error;
        }
    },

    // Gọi API Xác thực OTP và đặt lại mật khẩu mới
    resetPassword: async (email, otp, newPassword) => {
        try {
            const response = await axiosClient.post('/Auth/ResetPassword', { email, otp, newPassword });
            return response;
        } catch (error) {
            console.error('Lỗi khi đặt lại mật khẩu:', error);
            throw error;
        }
    }
};

export default authService;
