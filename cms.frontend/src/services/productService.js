import axiosClient from '../api/axiosClient';

const toNumber = (value) => {
    if (value === null || value === undefined || value === '') return value;
    const numberValue = Number(value);
    return Number.isNaN(numberValue) ? value : numberValue;
};

const normalizeProduct = (product) => {
    if (!product) return product;

    return {
        ...product,
        id: product.id ?? product.Id,
        name: product.name ?? product.Name,
        price: toNumber(product.price ?? product.Price),
        salePrice: toNumber(product.salePrice ?? product.SalePrice),
        imageUrl: product.imageUrl ?? product.ImageUrl,
        stockQuantity: product.stockQuantity ?? product.StockQuantity,
        categoryProductId: product.categoryProductId ?? product.CategoryProductId,
    };
};

const normalizeProducts = (data) => Array.isArray(data) ? data.map(normalizeProduct) : normalizeProduct(data);

const productService = {
    // [BUỔI 7] Hàm gọi API lấy toàn bộ danh sách quần áo, váy dạ hội
    getAllProducts: async (params = {}) => {
        const url = '/Products';
        const data = await axiosClient.get(url, { params });
        return normalizeProducts(data);
    },
    getProductsByCategory: async (categoryId) => {
        const url = `/Products/category/${categoryId}`;  // Đúng với route [HttpGet("category/{categoryProductId}")] trong Backend
        const data = await axiosClient.get(url);
        return normalizeProducts(data);
    },
    getLatestProducts: async () => {
        const url = '/Products/latest';
        const data = await axiosClient.get(url);
        return normalizeProducts(data);
    },
    getHotProducts: async () => {
        const url = '/Products/hot';
        const data = await axiosClient.get(url);
        return normalizeProducts(data);
    },
    getSaleProducts: async () => {
        const url = '/Products/sale';
        const data = await axiosClient.get(url);
        return normalizeProducts(data);
    }
};

export default productService;
