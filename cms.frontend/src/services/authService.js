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
    }
};

export default authService;
