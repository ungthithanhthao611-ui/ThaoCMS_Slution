import axiosClient from '../api/axiosClient';
import { IMAGE_BASE } from '../api/axiosClient';

export const getCategoryImage = (name) => {
    if (!name) return 'https://www.highlandscoffee.com.vn/vnt_upload/product/CHANH_DAY_DA_VIEN.png';
    const lower = name.toLowerCase();
    if (lower.includes('cà phê') || lower.includes('coffee') || lower.includes('phin')) {
        return 'https://www.highlandscoffee.com.vn/vnt_upload/product/04_2023/PHIN_SUA_DA_5.1.png';
    }
    if (lower.includes('trà') || lower.includes('tea')) {
        return 'https://www.highlandscoffee.com.vn/vnt_upload/product/06_2023/TRA-SEN-VANG-CN-5.1.png';
    }
    if (lower.includes('freeze')) {
        return 'https://www.highlandscoffee.com.vn/vnt_upload/product/06_2023/FREEZE-TRA-XANH-5.1.png';
    }
    if (lower.includes('bánh mì') || lower.includes('banh mi') || lower.includes('khác')) {
        return 'https://www.highlandscoffee.com.vn/vnt_upload/product/CHANH_DAY_DA_VIEN.png';
    }
    return 'https://www.highlandscoffee.com.vn/vnt_upload/product/CHANH_DAY_DA_VIEN.png';
};

const categoryProductService = {
    /**
     * Hàm lấy toàn bộ danh mục SẢN PHẨM từ Backend
     * Endpoint này kết nối tới CategoriesProductsController trong ASP.NET Core
     */
    getAllCategoryProducts: () => {
        // Đường dẫn định tuyến khớp chính xác với cấu trúc định tuyến [Route("api/[controller]")] của Backend
        const url = '/categoriesproducts';
        return axiosClient.get(url);
    }
};

export default categoryProductService;
