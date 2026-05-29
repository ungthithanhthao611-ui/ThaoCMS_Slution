import axiosClient from '../api/axiosClient';

const productService = {
    // [BUỔI 7] Hàm gọi API lấy toàn bộ danh sách quần áo, váy dạ hội
    getAllProducts: () => {
        const url = '/Products';
        return axiosClient.get(url);
    },
    getProductsByCategory: (categoryId) => {
        const url = `/Products/categoryproduct/${categoryId}`;
        return axiosClient.get(url);
    }
};

export default productService;
