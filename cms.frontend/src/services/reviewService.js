import axiosClient from '../api/axiosClient';

const reviewService = {
    // Lấy tất cả đánh giá của 1 sản phẩm
    getReviewsByProduct: (productId) => {
        return axiosClient.get(`/Reviews/product/${productId}`);
    },

    // Lấy tất cả đánh giá của 1 khách hàng
    getReviewsByCustomer: (customerId) => {
        return axiosClient.get(`/Reviews/customer/${customerId}`);
    },

    // Kiểm tra xem khách hàng có được phép đánh giá sản phẩm không
    checkCanReview: (productId, customerId) => {
        return axiosClient.get(`/Reviews/check-can-review`, {
            params: { productId, customerId }
        });
    },

    // Thêm đánh giá mới (sử dụng FormData vì có upload ảnh)
    addReview: (formData) => {
        return axiosClient.post('/Reviews', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    }
};

export default reviewService;
