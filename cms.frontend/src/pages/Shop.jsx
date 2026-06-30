import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductList from '../components/ProductList';
import categoryProductService, { getCategoryImage } from '../services/categoryProductService';
import bannerService from '../services/bannerService';
import { IMAGE_BASE } from '../api/axiosClient';

const Shop = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null); // null = tất cả
    const [filterType, setFilterType] = useState('all'); // 'all', 'new', 'sale'
    const [minPriceInput, setMinPriceInput] = useState('');
    const [maxPriceInput, setMaxPriceInput] = useState('');
    const [minPrice, setMinPrice] = useState(undefined);
    const [maxPrice, setMaxPrice] = useState(undefined);
    const [banner, setBanner] = useState(null);

    useEffect(() => {
        categoryProductService.getAllCategoryProducts()
            .then(data => {
                const roots = data.filter(c => c.parentId == null);
                setCategories(roots);
            })
            .catch(err => console.error("Lỗi tải danh mục:", err));

        bannerService.getAllBanners()
            .then(data => {
                const activeBanners = data.filter(b => b.status === 1 || b.status === true || b.status === 'Active');
                if (activeBanners.length > 0) {
                    setBanner(activeBanners[0]);
                } else if (data.length > 0) {
                    setBanner(data[0]);
                }
            })
            .catch(err => console.error("Lỗi tải banner:", err));
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

    const bannerImage = banner?.imageUrl 
        ? (banner.imageUrl.startsWith('http') ? banner.imageUrl : `${IMAGE_BASE}${banner.imageUrl.startsWith('/') ? '' : '/'}${banner.imageUrl}`)
        : "https://www.highlandscoffee.com.vn/vnt_upload/product/04_2023/PHIN_SUA_DA_5.1.png";
    const bannerTitle = banner?.name || banner?.title || "HƯƠNG VỊ\nĐẬM ĐÀ\nTUYỆT HẢO!";
    const bannerDesc = banner?.description || "Thỏa mãn mọi đam mê của bạn";
    const bannerLink = banner?.linkUrl || "#";

    return (
        <div style={{ backgroundColor: '#fdf7f2', minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>
            <Header />
            
            {/* TẦNG 1: HERO BANNER */}
            <div style={{ padding: '30px 20px 10px' }}>
                <div className="wrapper" style={{ margin: '0 auto' }}>
                    <Link to={bannerLink} style={{ 
                        display: 'block', 
                        width: '100%', 
                        position: 'relative', 
                        borderRadius: '30px', 
                        overflow: 'hidden', 
                        boxShadow: '0 15px 40px rgba(178,40,48,0.15)',
                        backgroundColor: '#fff'
                    }}>
                        <img src={bannerImage} alt={bannerTitle} style={{ 
                            width: '100%', 
                            display: 'block', 
                            objectFit: 'cover', 
                            maxHeight: '450px' 
                        }} />
                        
                        {/* Hiển thị text từ Admin dưới dạng một box nổi tinh tế (nếu không muốn bị trùng với text trong ảnh) */}
                        <div style={{
                            position: 'absolute',
                            bottom: '30px',
                            left: '30px',
                            backgroundColor: 'rgba(255,255,255,0.95)',
                            padding: '20px 30px',
                            borderRadius: '20px',
                            maxWidth: '400px',
                            boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                            backdropFilter: 'blur(10px)'
                        }}>
                            <h2 style={{ color: '#b22830', fontSize: '1.5rem', fontWeight: '900', margin: '0 0 10px 0', lineHeight: '1.2' }}>{bannerTitle}</h2>
                            <p style={{ color: '#555', fontSize: '1rem', margin: 0, fontWeight: '500' }}>{bannerDesc}</p>
                        </div>
                    </Link>
                </div>
            </div>

            <div id="vnt-content" style={{ paddingBottom: '70px' }}>
                <div className="wrapper">
                    
                    {/* TẦNG 2: MENU (Dakingo style) */}
                    <div style={{ marginTop: '50px', marginBottom: '50px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '30px', flexWrap: 'wrap', gap: '20px' }}>
                            <div>
                                <h2 style={{ color: '#b22830', fontSize: '2.2rem', fontWeight: '900', margin: 0 }}>Thực Đơn</h2>
                                <p style={{ color: '#666', fontSize: '1.1rem', margin: '5px 0 0 0', fontWeight: '600' }}>Hôm nay bạn muốn thưởng thức gì?</p>
                                {/* Filter type buttons */}
                                <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                                    <button onClick={() => setFilterType('all')} style={{ background: filterType === 'all' ? '#b22830' : '#fcebe3', color: filterType === 'all' ? '#fff' : '#b22830', padding: '8px 15px', borderRadius: '8px', fontSize: '13px', fontWeight: 'bold', border: 'none', cursor: 'pointer', transition: 'all 0.3s' }}>
                                        <i className="fa fa-th-large" style={{ marginRight: '5px' }}></i> Tất cả
                                    </button>
                                    <button onClick={() => setFilterType('new')} style={{ background: filterType === 'new' ? '#b22830' : '#fcebe3', color: filterType === 'new' ? '#fff' : '#b22830', padding: '8px 15px', borderRadius: '8px', fontSize: '13px', fontWeight: 'bold', border: 'none', cursor: 'pointer', transition: 'all 0.3s' }}>
                                        <i className="fa fa-star" style={{ marginRight: '5px' }}></i> Mới nhất
                                    </button>
                                    <button onClick={() => setFilterType('sale')} style={{ background: filterType === 'sale' ? '#b22830' : '#fcebe3', color: filterType === 'sale' ? '#fff' : '#b22830', padding: '8px 15px', borderRadius: '8px', fontSize: '13px', fontWeight: 'bold', border: 'none', cursor: 'pointer', transition: 'all 0.3s' }}>
                                        <i className="fa fa-tags" style={{ marginRight: '5px' }}></i> Đang Sale
                                    </button>
                                </div>
                            </div>
                            
                            {/* Categories Row */}
                            <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                                <button
                                    onClick={() => setSelectedCategoryId(null)}
                                    style={{
                                        width: '80px', height: '80px', borderRadius: '20px',
                                        backgroundColor: selectedCategoryId === null ? '#fcebe3' : '#fff',
                                        color: selectedCategoryId === null ? '#b22830' : '#b22830',
                                        border: selectedCategoryId === null ? '2px solid #b22830' : '2px solid #ecd5c4',
                                        cursor: 'pointer',
                                        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                                        transition: 'all 0.3s', boxShadow: '0 5px 15px rgba(0,0,0,0.05)'
                                    }}
                                >
                                    <i className="fa fa-th-large" style={{ fontSize: '24px', marginBottom: '5px' }}></i>
                                    <span style={{ fontSize: '10px', fontWeight: '800', textTransform: 'uppercase' }}>Tất cả</span>
                                </button>
                                {categories.map(cat => {
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
                                                width: '80px', height: '80px', borderRadius: '20px',
                                                backgroundColor: isActive ? '#fcebe3' : '#fff',
                                                color: isActive ? '#b22830' : '#b22830',
                                                border: isActive ? '2px solid #b22830' : '2px solid #ecd5c4',
                                                cursor: 'pointer',
                                                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                                                transition: 'all 0.3s', boxShadow: '0 5px 15px rgba(0,0,0,0.05)'
                                            }}
                                        >
                                            {imgUrl ? (
                                                <img src={imgUrl} alt={cat.name} style={{ width: '40px', height: '40px', objectFit: 'contain', marginBottom: '5px', borderRadius: '8px' }} />
                                            ) : (
                                                <i className="fa fa-coffee" style={{ fontSize: '24px', marginBottom: '5px' }}></i>
                                            )}
                                            <span style={{ fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', padding: '0 5px', textAlign: 'center', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{cat.name}</span>
                                        </button>
                                    )
                                })}
                            </div>
                        </div>
                    </div>

                    {/* TẦNG 3: SẢN PHẨM BÁN CHẠY (Product List) */}
                    <div style={{ marginBottom: '70px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', flexWrap: 'wrap', gap: '20px' }}>
                            <h3 style={{ color: '#b22830', fontSize: '1.8rem', fontWeight: '900', margin: 0 }}>
                                Sản phẩm Bán chạy từ chúng tôi
                            </h3>
                            {/* Bộ lọc giá inline - thu gọn */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#fff', padding: '8px 15px', borderRadius: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', border: '1px solid #ecd5c4' }}>
                                <i className="fa fa-filter" style={{ color: '#b22830' }}></i>
                                <input type="number" placeholder="Từ..." value={minPriceInput} onChange={e => setMinPriceInput(e.target.value)} style={{ width: '70px', border: 'none', borderBottom: '1px solid #ccc', outline: 'none', fontSize: '13px' }} />
                                <span>-</span>
                                <input type="number" placeholder="Đến..." value={maxPriceInput} onChange={e => setMaxPriceInput(e.target.value)} style={{ width: '70px', border: 'none', borderBottom: '1px solid #ccc', outline: 'none', fontSize: '13px' }} />
                                <button onClick={handleFilter} style={{ background: '#b22830', color: '#fff', border: 'none', borderRadius: '15px', padding: '4px 12px', fontSize: '12px', fontWeight: 'bold' }}>Lọc</button>
                                {(minPrice !== undefined || maxPrice !== undefined) && (
                                    <button onClick={handleClearFilter} style={{ background: 'transparent', color: '#888', border: 'none', fontSize: '14px', cursor: 'pointer' }}>✕</button>
                                )}
                            </div>
                        </div>
                        <ProductList categoryId={selectedCategoryId} minPrice={minPrice} maxPrice={maxPrice} filterType={filterType} />
                    </div>

                    {/* TẦNG 4: OUR PROMISE (Dakingo style) */}
                    <div>
                        <h3 style={{ color: '#b22830', fontSize: '2rem', fontWeight: '900', margin: 0 }}>Cam kết của chúng tôi</h3>
                        <p style={{ color: '#666', fontSize: '1.1rem', margin: '5px 0 30px 0', fontWeight: '600' }}>Không có bí mật nào cả - chỉ có sự trung thực trong công việc!</p>
                        
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px' }}>
                            {/* Left block (Icons & Promo) */}
                            <div style={{ flex: '1', minWidth: '350px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                <div style={{ backgroundColor: '#fcebe3', padding: '30px', borderRadius: '20px' }}>
                                    <h4 style={{ color: '#b22830', fontWeight: '800', textAlign: 'center', marginBottom: '25px', fontSize: '1.1rem' }}>Một góc nhìn vào thế giới dịch vụ của chúng tôi!</h4>
                                    <div style={{ display: 'flex', justifyContent: 'space-around', textAlign: 'center' }}>
                                        <div>
                                            <div style={{ width: '60px', height: '60px', borderRadius: '50%', border: '2px solid #b22830', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px', color: '#b22830', fontSize: '24px' }}><i className="fa fa-truck"></i></div>
                                            <div style={{ fontSize: '10px', fontWeight: '800', color: '#b22830', textTransform: 'uppercase' }}>Giao hàng<br/>Đúng giờ</div>
                                        </div>
                                        <div>
                                            <div style={{ width: '60px', height: '60px', borderRadius: '50%', border: '2px solid #b22830', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px', color: '#b22830', fontSize: '24px' }}><i className="fa fa-coffee"></i></div>
                                            <div style={{ fontSize: '10px', fontWeight: '800', color: '#b22830', textTransform: 'uppercase' }}>500+<br/>Sản phẩm</div>
                                        </div>
                                        <div>
                                            <div style={{ width: '60px', height: '60px', borderRadius: '50%', border: '2px solid #b22830', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px', color: '#b22830', fontSize: '24px' }}><i className="fa fa-clock-o"></i></div>
                                            <div style={{ fontSize: '10px', fontWeight: '800', color: '#b22830', textTransform: 'uppercase' }}>Hỗ trợ<br/>24/7</div>
                                        </div>
                                        <div>
                                            <div style={{ width: '60px', height: '60px', borderRadius: '50%', border: '2px solid #b22830', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px', color: '#b22830', fontSize: '24px' }}><i className="fa fa-heart-o"></i></div>
                                            <div style={{ fontSize: '10px', fontWeight: '800', color: '#b22830', textTransform: 'uppercase' }}>Tươi ngon<br/>Mỗi ngày</div>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ backgroundColor: '#fcebe3', padding: '25px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '20px' }}>
                                    <div style={{ background: '#f5c942', padding: '15px', borderRadius: '10px', transform: 'rotate(-10deg)', fontWeight: '900', color: '#b22830', fontSize: '20px', boxShadow: '2px 5px 10px rgba(0,0,0,0.1)', textAlign: 'center', lineHeight: '1.2' }}>
                                        TICKET<br/>PROMO
                                    </div>
                                    <div>
                                        <h4 style={{ color: '#b22830', fontWeight: '900', fontSize: '1.2rem', margin: '0 0 5px 0', textTransform: 'uppercase' }}>VÉ MA THUẬT</h4>
                                        <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '15px', fontWeight: '600' }}>Thêm 3 nhắc nhở vào tài khoản. Nhận ưu đãi trị giá 200k.</p>
                                        <button style={{ background: '#b22830', color: '#fff', border: 'none', padding: '8px 25px', borderRadius: '20px', fontWeight: '800', cursor: 'pointer' }}>MỞ KHÓA NGAY</button>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Right block (Image grid) */}
                            <div style={{ flex: '1', minWidth: '350px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                                {categories.slice(0, 4).map((cat) => {
                                    const imgUrl = cat.imageUrl 
                                        ? (cat.imageUrl.startsWith('http') ? cat.imageUrl : `${IMAGE_BASE}${cat.imageUrl.startsWith('/') ? '' : '/'}${cat.imageUrl}`)
                                        : getCategoryImage(cat.name);
                                    
                                    return (
                                        <Link to={`/category/${cat.id}`} key={cat.id} style={{ display: 'block', transition: 'transform 0.3s' }} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
                                            <img src={imgUrl} alt={cat.name} title={cat.name} style={{ width: '100%', height: '170px', objectFit: 'contain', padding: '15px', borderRadius: '20px', backgroundColor: '#fff', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }} />
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                        
                        <div style={{ background: 'linear-gradient(90deg, #b22830, #8c1e24)', color: '#fff', textAlign: 'center', padding: '20px', borderRadius: '15px', marginTop: '30px', fontWeight: '800', fontSize: '1.2rem', boxShadow: '0 10px 20px rgba(178,40,48,0.2)' }}>
                            THAO COFFEE - Sự lựa chọn đáng tin cậy cho mọi dịp kỷ niệm!
                        </div>
                    </div>
                </div>
            </div>
            
            <Footer />
        </div>
    );
};

export default Shop;
