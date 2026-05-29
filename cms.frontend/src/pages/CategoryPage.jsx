import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductList from '../components/ProductList';
import categoryProductService from '../services/categoryProductService';

const CategoryPage = () => {
    const { id } = useParams();
    const [category, setCategory] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                setLoading(true);
                const categories = await categoryProductService.getAllCategoryProducts();
                // Tìm danh mục có id tương ứng (id từ URL là chuỗi nên ép kiểu sang Number)
                const matchedCat = categories.find(c => c.id === Number(id));
                setCategory(matchedCat);
            } catch (error) {
                console.error("Lỗi khi tải danh mục:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategory();
    }, [id]);

    // Lấy giao diện banner tương tự như CategoryList
    const getCategoryStyle = (item) => {
        if (!item) return {};
        const lowerName = item.name.toLowerCase();
        
        if (lowerName.includes('cà phê')) {
            return {
                style: { color: '#faebd7', borderColor: '#faebd7', backgroundColor: '#fbedd7', backgroundImage: 'url(https://www.highlandscoffee.com.vn/vnt_upload/product/04_2018/menu-PSD-bg.jpg)' },
                img: 'https://www.highlandscoffee.com.vn/vnt_upload/product/04_2023/PHIN_SUA_DA_5.1.png',
                displayName: item.name,
                displayDescription: item.description
            };
        } else if (lowerName.includes('trà')) {
            return {
                style: { color: '#ffffff', borderColor: '#ffffff', backgroundImage: 'url(https://www.highlandscoffee.com.vn/vnt_upload/product/11_2022/Banner/Product_Tra_BG_Web_Banner.jpg)' },
                img: 'https://www.highlandscoffee.com.vn/vnt_upload/product/06_2023/TRA-SEN-VANG-CN-5.1.png',
                displayName: item.name,
                displayDescription: item.description
            };
        } else if (lowerName.includes('freeze')) {
            return {
                style: { color: '#006400', borderColor: '#006400', backgroundColor: '#f0bb7c', backgroundImage: 'url(https://www.highlandscoffee.com.vn/vnt_upload/product/04_2018/menu-FREEZE.jpg)' },
                img: 'https://www.highlandscoffee.com.vn/vnt_upload/product/06_2023/FREEZE-TRA-XANH-5.1.png',
                displayName: item.name,
                displayDescription: item.description
            };
        } else {
            return {
                style: { color: '#ffffff', backgroundColor: '#ffffff', backgroundImage: 'url(https://www.highlandscoffee.com.vn/vnt_upload/product/01_2026/O2O_AFF___Banner_1440_x_630.png)' },
                img: 'https://www.highlandscoffee.com.vn/vnt_upload/product/CHANH_DAY_DA_VIEN.png',
                displayName: 'NƯỚC CHANH DÂY',
                displayDescription: 'Thức uống giải khát thanh mát, bừng tỉnh ngày hè với hương vị chanh dây tự nhiên chua chua ngọt ngọt.'
            };
        }
    };

    if (loading) {
        return <div className="text-center my-5">Đang tải danh mục...</div>;
    }

    if (!category) {
        return <div className="text-center my-5">Không tìm thấy danh mục này.</div>;
    }

    const catStyle = getCategoryStyle(category);

    return (
        <div id="vnt-content">
            {/* Banner Khổng Lồ của Danh Mục */}
            <div className="block-category" style={{marginTop: '-20px'}}>
                <div className="menu hc-menu-category" style={catStyle.style}>
                    <div className="imgWrap">
                        <div className="wrapper d-flex align-items-center">
                            <div className="imgCat animated fadeIn" style={{ animationDelay: '0.2s' }}>
                                <img src={catStyle.img} alt={catStyle.displayName} />
                            </div>
                        </div>
                    </div>
                    <div className="wrapper d-flex align-items-center h-100">
                        <div className="caption">
                            <div className="tend animated fadeInUp" style={{ animationDelay: '0.1s' }}>
                                <h3><span style={{color: 'inherit'}}>{catStyle.displayName}</span></h3>
                            </div>
                            <div className="des animated fadeInUp" style={{ animationDelay: '0.2s' }}>
                                <span style={{fontFamily: 'Roboto, sans-serif'}}>{catStyle.displayDescription}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Danh sách sản phẩm của Danh Mục */}
            <div className="wrapper mt-5 pt-5 mb-5" id="product-list">
                <div className="text-center mb-5">
                    <h2 style={{color: '#b22830', textTransform: 'uppercase', fontWeight: 'bold', fontSize: '30px', borderBottom: '2px solid #b22830', display: 'inline-block', paddingBottom: '10px'}}>
                        Sản Phẩm Thuộc Danh Mục {catStyle.displayName}
                    </h2>
                </div>
                <ProductList categoryId={id} />
            </div>
        </div>
    );
};

export default CategoryPage;
