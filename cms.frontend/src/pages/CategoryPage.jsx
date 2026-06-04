import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ProductList from '../components/ProductList';
import categoryProductService from '../services/categoryProductService';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const CategoryPage = () => {
    const { id } = useParams();
    const [category, setCategory] = useState(null);
    const [otherCategories, setOtherCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                setLoading(true);
                const categories = await categoryProductService.getAllCategoryProducts();
                
                // Lọc ra các danh mục gốc (ParentId == null)
                const rootCategories = categories.filter(c => c.parentId == null);
                
                // Tìm danh mục hiện tại trong danh sách gốc
                const matchedCat = rootCategories.find(c => c.id === Number(id));
                setCategory(matchedCat);

                // Lấy các danh mục khác
                const others = rootCategories.filter(c => c.id !== Number(id));
                setOtherCategories(others);

            } catch (error) {
                console.error("Lỗi khi tải danh mục:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategory();
    }, [id]);

    const getCategoryStyle = (item) => {
        if (!item) return {};
        const lowerName = item.name.toLowerCase();
        
        if (lowerName.includes('cà phê') || lowerName.includes('ca phe')) {
            return {
                style: { color: '#faebd7', borderColor: '#faebd7', backgroundColor: '#2a1a15', backgroundImage: 'url(https://www.highlandscoffee.com.vn/vnt_upload/product/04_2018/menu-PSD-bg.jpg)' },
                img: item.imageUrl || 'https://www.highlandscoffee.com.vn/vnt_upload/product/04_2023/PHIN_SUA_DA_5.1.png',
                displayName: 'CÀ PHÊ',
                displayDescription: item.description || 'Sự kết hợp hoàn hảo giữa hạt cà phê Robusta & Arabica thượng hạng được trồng tại vùng cao nguyên Việt Nam.'
            };
        } else if (lowerName.includes('trà') || lowerName.includes('tra')) {
            return {
                style: { color: '#ffffff', borderColor: '#ffffff', backgroundImage: 'url(https://www.highlandscoffee.com.vn/vnt_upload/product/11_2022/Banner/Product_Tra_BG_Web_Banner.jpg)' },
                img: item.imageUrl || 'https://www.highlandscoffee.com.vn/vnt_upload/product/06_2023/TRA-SEN-VANG-CN-5.1.png',
                displayName: 'TRÀ',
                displayDescription: item.description || 'Hương vị trà Việt Nam tinh tế, hòa quyện cùng trái cây tươi mát mang đến cảm giác sảng khoái.'
            };
        } else if (lowerName.includes('freeze')) {
            return {
                style: { color: '#006400', borderColor: '#006400', backgroundColor: '#f0bb7c', backgroundImage: 'url(https://www.highlandscoffee.com.vn/vnt_upload/product/04_2018/menu-FREEZE.jpg)' },
                img: item.imageUrl || 'https://www.highlandscoffee.com.vn/vnt_upload/product/06_2023/FREEZE-TRA-XANH-5.1.png',
                displayName: item.name,
                displayDescription: item.description
            };
        } else {
            return {
                style: { color: '#ffffff', backgroundColor: '#ffffff', backgroundImage: 'url(https://www.highlandscoffee.com.vn/vnt_upload/product/01_2026/O2O_AFF___Banner_1440_x_630.png)' },
                img: item.imageUrl || 'https://www.highlandscoffee.com.vn/vnt_upload/product/CHANH_DAY_DA_VIEN.png',
                displayName: item.name,
                displayDescription: item.description
            };
        }
    };

    if (loading) {
        return <div className="text-center my-5">Đang tải danh mục...</div>;
    }

    if (!category) {
        return <div className="text-center my-5">Không tìm thấy danh mục này hoặc danh mục này là danh mục con.</div>;
    }

    const catStyle = getCategoryStyle(category);

    const sliderSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    };

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
                                <h3 style={{ fontSize: '60px', fontWeight: '900', letterSpacing: '4px' }}><span style={{color: 'inherit'}}>{catStyle.displayName}</span></h3>
                            </div>
                            <div className="des animated fadeInUp" style={{ animationDelay: '0.2s', fontSize: '18px', lineHeight: '1.6', opacity: '0.9', maxWidth: '500px' }}>
                                <span>{catStyle.displayDescription}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Các Danh Mục Con (Ví dụ: Cà Phê Truyền Thống, Cà Phê Phindi) */}
            {category.subcategories && category.subcategories.length > 0 ? (
                category.subcategories.map(subcat => (
                    <div className="menuBoxMid" key={subcat.id}>
                        <div className="wrapper">
                            <div className="box_mid">
                                <div className="mid-title">
                                    <div className="titleL"><h2>{subcat.name}</h2></div>
                                    <div className="titleR"></div>
                                </div>
                                <div className="mid-content">
                                    <div className="mod-content row">
                                        <div id="vnt-main" className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                                            <div className="the-content desc">
                                                {subcat.imageUrl && (
                                                    <div className="img" style={{marginBottom: '5px'}}>
                                                        <img src={subcat.imageUrl} alt={subcat.name} className="img-fluid" style={{width: '100%', borderRadius: '8px'}} />
                                                    </div>
                                                )}
                                                <p><span style={{fontFamily: 'Roboto, sans-serif'}}>{subcat.description}</span></p>
                                            </div>
                                        </div>
                                        <div id="vnt-sidebar" className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                            {/* Render ProductList cho danh mục con này ở dạng cột bên phải */}
                                            <ProductList categoryId={subcat.id} layout="sidebar" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                // Hiển thị sản phẩm trực tiếp nếu không có danh mục con (tương thích ngược)
                <div style={{ backgroundColor: '#f8f8f8', padding: '80px 0' }} id="product-list">
                    <div className="wrapper">
                        <div className="text-center mb-5">
                            <h2 style={{
                                color: '#b22830', 
                                textTransform: 'uppercase', 
                                fontWeight: '900', 
                                fontSize: '36px', 
                                display: 'inline-block', 
                                letterSpacing: '2px',
                                position: 'relative'
                            }}>
                                ☕ TẤT CẢ {catStyle.displayName}
                                <div style={{width: '60px', height: '4px', backgroundColor: '#b22830', margin: '15px auto 0'}}></div>
                            </h2>
                        </div>
                        <ProductList categoryId={id} />
                    </div>
                </div>
            )}

            {/* Phần Dòng Sản Phẩm Khác */}
            {otherCategories.length > 0 && (
                <div className="menuOTher mt-5 pt-5" style={{backgroundColor: '#f5f5f5', padding: '50px 0'}}>
                    <div className="wrapper">
                        <div className="box_mid">
                            <div className="mid-title text-center mb-4">
                                <h2 style={{color: '#53382c', fontWeight: 'bold'}}>DÒNG SẢN PHẨM KHÁC</h2>
                            </div>
                            <div className="mid-content">
                                <Slider {...sliderSettings}>
                                    {otherCategories.map(otherCat => {
                                        const otherStyle = getCategoryStyle(otherCat);
                                        return (
                                            <div key={otherCat.id} className="p-3">
                                                <div className="product text-center">
                                                    <div className="img mb-3">
                                                        <Link to={`/category/${otherCat.id}`}>
                                                            <img src={otherStyle.img} alt={otherStyle.displayName} className="img-fluid mx-auto" style={{maxHeight: '200px', objectFit: 'contain'}} />
                                                        </Link>
                                                    </div>
                                                    <div className="tend">
                                                        <h3>
                                                            <Link to={`/category/${otherCat.id}`} style={{color: '#b22830', textDecoration: 'none', fontWeight: 'bold'}}>
                                                                {otherStyle.displayName}
                                                            </Link>
                                                        </h3>
                                                    </div>
                                                    <div className="des mt-2 text-muted" style={{fontSize: '14px', display: '-webkit-box', WebkitLineClamp: '3', WebkitBoxOrient: 'vertical', overflow: 'hidden'}}>
                                                        {otherStyle.displayDescription}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </Slider>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CategoryPage;
