import axios from 'axios';

export const IMAGE_BASE = process.env.REACT_APP_IMAGE_BASE_URL || 'https://localhost:7030';
export const API_BASE = process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL.replace(/\/api$/, '') : 'https://localhost:7030';

// [BUỔI 7] Khởi tạo một thực thể axios với cấu hình base chung
const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL || `${API_BASE}/api`, // Lấy từ file .env
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000, // Thời gian tối đa chờ phản hồi từ server (10 giây)
});

// [BUỔI 7] Giải thích: Interceptor giúp chúng ta can thiệp vào dữ liệu trước khi trả về cho component
axiosClient.interceptors.response.use(
    (response) => {
        // Nếu phản hồi thành công, bóc tách lấy thẳng cục data bên trong dữ liệu JSON
        return response.data;
    },
    (error) => {
        // Xử lý lỗi tập trung tại đây (Ví dụ: Server sập, lỗi 404, lỗi 500)
        console.error('Lỗi kết nối API:', error.message);
        return Promise.reject(error);
    }
);

export default axiosClient;
