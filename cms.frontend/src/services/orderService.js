import axiosClient from '../api/axiosClient';

const orderService = {
    // Tạo đơn hàng mới
    createOrder: (orderData) => {
        return axiosClient.post('/Orders', orderData);
    },

    // Lấy lịch sử đơn hàng của khách hàng
    getOrdersByCustomer: (customerId) => {
        return axiosClient.get(`/Orders/customer/${customerId}`);
    }
};

export default orderService;
