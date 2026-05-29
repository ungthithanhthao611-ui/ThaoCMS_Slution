import React, { useState, useEffect } from 'react';
import categoryProductService from '../services/categoryProductService';

const CategoryList = () => {
    const [categoryProducts, setCategoryProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategoryProducts = async () => {
            try {
                setLoading(true);
                const data = await categoryProductService.getAllCategoryProducts();
                setCategoryProducts(data);
            } catch (error) {
                console.error("Lỗi khi tải danh mục sản phẩm:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategoryProducts();
    }, []);

    useEffect(() => {
        if (loading || categoryProducts.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    const eff = entry.target.getAttribute('data-eff');
                    if (eff) entry.target.classList.add(eff);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        const elements = document.querySelectorAll('.lazyloading');
        elements.forEach(el => observer.observe(el));

        return () => observer.disconnect();
    }, [loading, categoryProducts]);

    if (loading) {
        return <div className="text-center my-4">Đang tải danh mục...</div>;
    }

    // Mapping giao diện Highlands cho từng danh mục
    const getCategoryStyle = (item) => {
        const lowerName = item.name.toLowerCase();
        
        let styleObj = {};
        
        if (lowerName.includes('cà phê')) {
            styleObj = {
                style: { color: '#faebd7', borderColor: '#faebd7', backgroundColor: '#fbedd7', backgroundImage: 'url(https://www.highlandscoffee.com.vn/vnt_upload/product/04_2018/menu-PSD-bg.jpg)' },
                img: 'https://www.highlandscoffee.com.vn/vnt_upload/product/04_2023/PHIN_SUA_DA_5.1.png',
                displayName: item.name,
                displayDescription: item.description
            };
        } else if (lowerName.includes('trà')) {
            styleObj = {
                style: { color: '#ffffff', borderColor: '#ffffff', backgroundImage: 'url(https://www.highlandscoffee.com.vn/vnt_upload/product/11_2022/Banner/Product_Tra_BG_Web_Banner.jpg)' },
                img: 'https://www.highlandscoffee.com.vn/vnt_upload/product/06_2023/TRA-SEN-VANG-CN-5.1.png',
                displayName: item.name,
                displayDescription: item.description
            };
        } else if (lowerName.includes('freeze')) {
            styleObj = {
                style: { color: '#006400', borderColor: '#006400', backgroundColor: '#f0bb7c', backgroundImage: 'url(https://www.highlandscoffee.com.vn/vnt_upload/product/04_2018/menu-FREEZE.jpg)' },
                img: 'https://www.highlandscoffee.com.vn/vnt_upload/product/06_2023/FREEZE-TRA-XANH-5.1.png',
                displayName: item.name,
                displayDescription: item.description
            };
        } else {
            // Bánh mì que hoặc Khác -> Đổi thành Nước Chanh Dây
            styleObj = {
                style: { color: '#ffffff', backgroundColor: '#ffffff', backgroundImage: 'url(https://www.highlandscoffee.com.vn/vnt_upload/product/01_2026/O2O_AFF___Banner_1440_x_630.png)' },
                img: 'https://www.highlandscoffee.com.vn/vnt_upload/product/CHANH_DAY_DA_VIEN.png',
                displayName: 'NƯỚC CHANH DÂY',
                displayDescription: 'Thức uống giải khát thanh mát, bừng tỉnh ngày hè với hương vị chanh dây tự nhiên chua chua ngọt ngọt.'
            };
        }
        
        return styleObj;
    };

    return (
        <div className="block-category">
            {categoryProducts.length === 0 ? (
                <div className="text-center"><span className="text-muted">Không có danh mục nào.</span></div>
            ) : (
                categoryProducts.map((item) => {
                    const catStyle = getCategoryStyle(item);
                    return (
                        <div className="menu hc-menu-category" style={catStyle.style} key={item.id}>
                            <div className="imgWrap">
                                <div className="wrapper d-flex align-items-center">
                                    <div className="imgCat lazyloading" data-eff="fadeIn" style={{ animationDelay: '0.4s' }}>
                                        <a href="#product-list">
                                            <img src={catStyle.img} alt={catStyle.displayName} />
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="wrapper d-flex align-items-center h-100">
                                <div className="caption">
                                    <div className="tend lazyloading" data-eff="fadeInUp" style={{ animationDelay: '0.2s' }}>
                                        <h3><a href="#product-list">{catStyle.displayName}</a></h3>
                                    </div>
                                    <div className="des lazyloading" data-eff="fadeInUp" style={{ animationDelay: '0.4s' }}>
                                        <span style={{fontFamily: 'Roboto, sans-serif'}}>{catStyle.displayDescription}</span>
                                    </div>
                                    <div className="link lazyloading" data-eff="fadeInUp" style={{ animationDelay: '0.6s' }}>
                                        <a href="#product-list"><span>Khám phá thêm</span></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })
            )}
        </div>
    );
};

export default CategoryList;
