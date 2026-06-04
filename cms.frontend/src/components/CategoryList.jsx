import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import categoryProductService from '../services/categoryProductService';

const CategoryList = () => {
    const [categoryProducts, setCategoryProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const sectionRefs = useRef([]);

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

    // Observer cho từng section: khi scroll tới thì thêm class 'section-visible' → trigger animation
    useEffect(() => {
        if (loading || categoryProducts.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('section-visible');
                    observer.unobserve(entry.target); // Chỉ kích hoạt 1 lần duy nhất
                }
            });
        }, { threshold: 0.2 });

        sectionRefs.current.forEach(ref => {
            if (ref) observer.observe(ref);
        });

        return () => observer.disconnect();
    }, [loading, categoryProducts]);

    if (loading) {
        return <div className="text-center my-4">Đang tải danh mục...</div>;
    }

    const getCategoryStyle = (item) => {
        const lowerName = item.name.toLowerCase();
        let styleObj = {};

        if (lowerName.includes('cà phê')) {
            styleObj = {
                style: { color: '#faebd7', borderColor: '#faebd7', backgroundColor: '#1a1008', backgroundImage: 'url(https://www.highlandscoffee.com.vn/vnt_upload/product/04_2018/menu-PSD-bg.jpg)' },
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
                style: { color: '#006400', borderColor: '#006400', backgroundColor: '#c8e6f5', backgroundImage: 'url(https://www.highlandscoffee.com.vn/vnt_upload/product/04_2018/menu-FREEZE.jpg)' },
                img: 'https://www.highlandscoffee.com.vn/vnt_upload/product/06_2023/FREEZE-TRA-XANH-5.1.png',
                displayName: item.name,
                displayDescription: item.description
            };
        } else {
            styleObj = {
                style: { color: '#ffffff', backgroundColor: '#2d5a1b', backgroundImage: 'url(https://www.highlandscoffee.com.vn/vnt_upload/product/01_2026/O2O_AFF___Banner_1440_x_630.png)' },
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
                categoryProducts.map((item, index) => {
                    const catStyle = getCategoryStyle(item);
                    const isEven = index % 2 !== 0;
                    return (
                        <div
                            className="menu hc-menu-category cat-section"
                            style={catStyle.style}
                            key={item.id}
                            ref={el => sectionRefs.current[index] = el}
                        >
                            {/* Ly nước: bay vào từ phải (lẻ) hoặc từ trái (chẵn) */}
                            <div className="imgWrap">
                                <div className="wrapper">
                                    <div className={`imgCat cup-flyIn ${isEven ? 'from-left' : 'from-right'}`}>
                                        <Link to={`/category/${item.id}`}>
                                            <img src={catStyle.img} alt={catStyle.displayName} />
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {/* Caption: text bay vào từ phía ngược lại */}
                            <div className="wrapper d-flex align-items-center h-100">
                                <div className="caption">
                                    <div className={`tend caption-flyIn ${isEven ? 'from-right' : 'from-left'}`} style={{ animationDelay: '0.1s' }}>
                                        <h3><Link to={`/category/${item.id}`}>{catStyle.displayName}</Link></h3>
                                    </div>
                                    <div className={`des caption-flyIn ${isEven ? 'from-right' : 'from-left'}`} style={{ animationDelay: '0.25s' }}>
                                        <span>{catStyle.displayDescription}</span>
                                    </div>
                                    <div className={`link caption-flyIn ${isEven ? 'from-right' : 'from-left'}`} style={{ animationDelay: '0.4s' }}>
                                        <Link to={`/category/${item.id}`}><span>Khám phá thêm</span></Link>
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
