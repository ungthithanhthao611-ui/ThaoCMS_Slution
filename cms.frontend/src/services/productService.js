import axiosClient from '../api/axiosClient';

const productService = {
    // [BUỔI 7] Hàm gọi API lấy toàn bộ danh sách quần áo, váy dạ hội
    getAllProducts: () => {
        const url = '/Products';
        return axiosClient.get(url);
    },
    getProductsByCategory: (categoryId) => {
        const url = `/Products/category/${categoryId}`;  // Đúng với route [HttpGet("category/{categoryProductId}")] trong Backend
        return axiosClient.get(url);
    }
};

export default productService;
