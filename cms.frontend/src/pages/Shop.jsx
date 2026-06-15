import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductList from '../components/ProductList';
import categoryProductService from '../services/categoryProductService';
import { IMAGE_BASE } from '../api/axiosClient';

// Hàm lấy ảnh đại diện theo tên danh mục (giống CategoryMenu trên home)
const getCategoryImage = (name) => {
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

const Shop = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null); // null = tất cả
    const [minPriceInput, setMinPriceInput] = useState('');
    const [maxPriceInput, setMaxPriceInput] = useState('');
    const [minPrice, setMinPrice] = useState(undefined);
    const [maxPrice, setMaxPrice] = useState(undefined);

    useEffect(() => {
        categoryProductService.getAllCategoryProducts()
            .then(data => {
                const roots = data.filter(c => c.parentId == null);
                setCategories(roots);
            })
            .catch(err => console.error("Lỗi tải danh mục:", err));
    }, []);

    const handleFilter = () => {
        setMinPrice(minPriceInput ? Number(minPriceInput) : undefined);
        setMaxPrice(maxPriceInput ? Number(maxPriceInput) : undefined);
    };

    const handleClearFilter = () => {
        setMinPriceInput('');
        setMaxPriceInput('');
        setMinPrice(undefined);
        setMaxPrice(undefined);
    };

    const selectedCat = categories.find(c => c.id === selectedCategoryId);

    return (
        <>
            <Header />
            <div id="vnt-content" style={{ backgroundColor: '#f5f5f5', minHeight: '100vh' }}>

                {/* ===== BANNER ===== */}

                {/* ===== DANH MỤC VÒNG TRÒN (giống home) ===== */}
                <div style={{ backgroundColor: '#fff', borderBottom: '1px solid #eee', padding: '32px 0' }}>
                    <div className="wrapper" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '30px', flexWrap: 'wrap' }}>

                        {/* Nút "Tất cả" */}
                        <button
                            onClick={() => setSelectedCategoryId(null)}
                            style={{
                                display: 'flex', flexDirection: 'column', alignItems: 'center',
                                background: 'none', border: 'none', cursor: 'pointer',
                                width: '110px', gap: '10px', textDecoration: 'none'
                            }}
                        >
                            <div style={{
                                width: '90px', height: '90px', borderRadius: '50%',
                                border: selectedCategoryId === null ? '3px solid #facc15' : '2px dashed #b22830',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                backgroundColor: selectedCategoryId === null ? '#fff8e1' : '#f9f9f9',
                                transition: 'all 0.3s ease',
                                boxShadow: selectedCategoryId === null ? '0 4px 14px rgba(178,40,48,0.25)' : '0 2px 8px rgba(0,0,0,0.06)',
                                fontSize: '2.2rem'
                            }}>
                                🏠
                            </div>
                            <span style={{
                                fontWeight: selectedCategoryId === null ? '900' : '700',
                                color: selectedCategoryId === null ? '#b22830' : '#333',
                                fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.5px',
                                textAlign: 'center'
                            }}>
                                Tất cả
                            </span>
                        </button>

                        {/* Từng danh mục */}
                        {categories.map((cat) => {
                            const isActive = selectedCategoryId === cat.id;
                            const imgUrl = cat.imageUrl
                                ? (cat.imageUrl.startsWith('http')
                                    ? cat.imageUrl
                                    : `${IMAGE_BASE}${cat.imageUrl.startsWith('/') ? '' : '/'}${cat.imageUrl}`)
                                : getCategoryImage(cat.name);
                            return (
                                <button
                                    key={cat.id}
                                    onClick={() => setSelectedCategoryId(cat.id)}
                                    style={{
                                        display: 'flex', flexDirection: 'column', alignItems: 'center',
                                        background: 'none', border: 'none', cursor: 'pointer',
                                        width: '110px', gap: '10px'
                                    }}
                                >
                                    <div style={{
                                        width: '90px', height: '90px', borderRadius: '50%',
                                        border: isActive ? '3px solid #facc15' : '2px dashed #b22830',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        backgroundColor: isActive ? '#fff8e1' : '#f9f9f9',
                                        overflow: 'hidden',
                                        transition: 'all 0.3s ease',
                                        boxShadow: isActive ? '0 4px 14px rgba(178,40,48,0.3)' : '0 2px 8px rgba(0,0,0,0.06)',
                                        transform: isActive ? 'scale(1.08)' : 'scale(1)'
                                    }}
                                        onMouseEnter={e => {
                                            if (!isActive) {
                                                e.currentTarget.style.transform = 'scale(1.1)';
                                                e.currentTarget.style.borderColor = '#facc15';
                                            }
                                        }}
                                        onMouseLeave={e => {
                                            if (!isActive) {
                                                e.currentTarget.style.transform = 'scale(1)';
                                                e.currentTarget.style.borderColor = '#b22830';
                                            }
                                        }}
                                    >
                                        <img
                                            src={imgUrl}
                                            alt={cat.name}
                                            style={{ width: '75%', height: '75%', objectFit: 'contain' }}
                                        />
                                    </div>
                                    <span style={{
                                        fontWeight: isActive ? '900' : '700',
                                        color: isActive ? '#b22830' : '#333',
                                        fontSize: '0.82rem', textTransform: 'uppercase',
                                        letterSpacing: '0.5px', textAlign: 'center'
                                    }}>
                                        {cat.name}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* ===== KHU VỰC SẢN PHẨM ===== */}
                <div style={{ padding: '50px 0 70px' }}>
                    <div className="wrapper">
                        {/* Tiêu đề + bộ lọc giá */}
                        <div style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                            flexWrap: 'wrap', gap: '16px', marginBottom: '36px'
                        }}>
                            <h2 style={{
                                color: '#b22830', fontWeight: '900', textTransform: 'uppercase',
                                fontSize: '1.4rem', margin: 0
                            }}>
                                {selectedCat ? `☕ ${selectedCat.name}` : '🍽️ Tất cả sản phẩm'}
                            </h2>

                            {/* Bộ lọc giá inline */}
                            <div style={{
                                display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap',
                                background: '#fff', padding: '12px 18px', borderRadius: '12px',
                                boxShadow: '0 2px 10px rgba(0,0,0,0.07)'
                            }}>
                                <span style={{ fontWeight: '700', fontSize: '0.85rem', color: '#555' }}>🏷️ Giá:</span>
                                <input
                                    type="number" placeholder="Từ"
                                    value={minPriceInput}
                                    onChange={e => setMinPriceInput(e.target.value)}
                                    style={{ width: '80px', padding: '6px 8px', border: '1.5px solid #e0e0e0', borderRadius: '6px', fontSize: '0.85rem', outline: 'none' }}
                                />
                                <span style={{ color: '#aaa' }}>–</span>
                                <input
                                    type="number" placeholder="Đến"
                                    value={maxPriceInput}
                                    onChange={e => setMaxPriceInput(e.target.value)}
                                    style={{ width: '80px', padding: '6px 8px', border: '1.5px solid #e0e0e0', borderRadius: '6px', fontSize: '0.85rem', outline: 'none' }}
                                />
                                <button onClick={handleFilter} style={{
                                    background: '#b22830', color: '#fff', border: 'none',
                                    padding: '7px 16px', borderRadius: '6px',
                                    fontWeight: '700', cursor: 'pointer', fontSize: '0.85rem'
                                }}>Lọc</button>
                                {(minPrice !== undefined || maxPrice !== undefined) && (
                                    <button onClick={handleClearFilter} style={{
                                        background: 'transparent', color: '#888',
                                        border: '1.5px solid #ccc', padding: '6px 12px',
                                        borderRadius: '6px', fontWeight: '600',
                                        cursor: 'pointer', fontSize: '0.83rem'
                                    }}>✕</button>
                                )}
                            </div>
                        </div>

                        {/* Danh sách sản phẩm */}
                        <ProductList
                            categoryId={selectedCategoryId}
                            minPrice={minPrice}
                            maxPrice={maxPrice}
                        />
                    </div>
                </div>

            </div>
            <Footer />
        </>
    );
};

export default Shop;
