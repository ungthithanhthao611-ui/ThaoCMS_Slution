import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import categoryProductService from '../services/categoryProductService';
import { IMAGE_BASE } from '../api/axiosClient';

const CategoryMenu = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await categoryProductService.getAllCategoryProducts();
                setCategories(data);
            } catch (error) {
                console.error("Lỗi khi tải danh mục sản phẩm:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCategories();
    }, []);

    if (loading) {
        return <div className="text-center my-3">Đang tải danh mục...</div>;
    }

    if (categories.length === 0) return null;

    // Hàm lấy ảnh đại diện phù hợp theo tên danh mục (đồ uống hoặc thời trang)
    const getCategoryImage = (name) => {
        const lower = name.toLowerCase();
        
        // Nhóm đồ uống Highlands
        if (lower.includes('cà phê') || lower.includes('coffee') || lower.includes('phin')) {
            return 'https://www.highlandscoffee.com.vn/vnt_upload/product/04_2023/PHIN_SUA_DA_5.1.png';
        }
        if (lower.includes('trà') || lower.includes('tea')) {
            return 'https://www.highlandscoffee.com.vn/vnt_upload/product/06_2023/TRA-SEN-VANG-CN-5.1.png';
        }
        if (lower.includes('freeze')) {
            return 'https://www.highlandscoffee.com.vn/vnt_upload/product/06_2023/FREEZE-TRA-XANH-5.1.png';
        }
        
        // Nhóm thời trang / quần áo
        if (lower.includes('đầm') || lower.includes('váy')) {
            return 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=150';
        }
        if (lower.includes('áo')) {
            return 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=150';
        }
        if (lower.includes('quần')) {
            return 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=150';
        }
        if (lower.includes('phụ kiện')) {
            return 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=150';
        }
        if (lower.includes('điện tử')) {
            return 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=150';
        }
        if (lower.includes('gia dụng')) {
            return 'https://images.unsplash.com/photo-1588854337236-6889d631faa8?w=150';
        }

        // Mặc định
        return 'https://www.highlandscoffee.com.vn/vnt_upload/product/CHANH_DAY_DA_VIEN.png';
    };

    return (
        <div style={{ backgroundColor: '#fff', padding: '40px 0', borderBottom: '1px solid #eee' }}>
            <div className="wrapper" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '30px', flexWrap: 'wrap' }}>
                {categories.map((cat) => {
                    const imgUrl = cat.imageUrl
                        ? (cat.imageUrl.startsWith('http')
                            ? cat.imageUrl
                            : `${IMAGE_BASE}${cat.imageUrl.startsWith('/') ? '' : '/'}${cat.imageUrl}`)
                        : getCategoryImage(cat.name);
                    return (
                        <Link 
                            to={`/category/${cat.id}`} 
                            key={cat.id} 
                            style={{ 
                                display: 'flex', 
                                flexDirection: 'column', 
                                alignItems: 'center', 
                                textDecoration: 'none', 
                                width: '110px',
                                transition: 'all 0.3s' 
                            }}
                            className="hc-category-circle-item"
                        >
                            <div 
                                style={{ 
                                    width: '90px', 
                                    height: '90px', 
                                    borderRadius: '50%', 
                                    border: '2px dashed #b22830', 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'center', 
                                    backgroundColor: '#f9f9f9',
                                    overflow: 'hidden',
                                    transition: 'all 0.3s ease',
                                    boxShadow: '0 4px 10px rgba(0,0,0,0.05)'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'scale(1.1)';
                                    e.currentTarget.style.borderColor = '#facc15';
                                    e.currentTarget.style.backgroundColor = '#fff';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'scale(1)';
                                    e.currentTarget.style.borderColor = '#b22830';
                                    e.currentTarget.style.backgroundColor = '#f9f9f9';
                                }}
                            >
                                <img 
                                    src={imgUrl} 
                                    alt={cat.name} 
                                    style={{ 
                                        width: '75%', 
                                        height: '75%', 
                                        objectFit: 'contain',
                                        borderRadius: '50%'
                                    }} 
                                />
                            </div>
                            <span 
                                style={{ 
                                    marginTop: '12px', 
                                    fontWeight: 'bold', 
                                    color: '#333', 
                                    fontSize: '0.85rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px',
                                    textAlign: 'center'
                                }}
                            >
                                {cat.name}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default CategoryMenu;
