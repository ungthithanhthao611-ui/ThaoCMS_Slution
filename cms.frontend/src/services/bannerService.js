import axiosClient from '../api/axiosClient';

const bannerService = {
    // Gọi API lấy danh sách banner đang hoạt động
    getAllBanners: () => {
        const url = '/Banners';
        return axiosClient.get(url);
    }
};

export default bannerService;
