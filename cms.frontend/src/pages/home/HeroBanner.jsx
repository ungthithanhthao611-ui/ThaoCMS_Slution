import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import banner1 from '../../assets/images/banner_1.png';
import banner2 from '../../assets/images/banner_2.png';
import banner3 from '../../assets/images/banner_3.png';
import bannerService from '../../services/bannerService';
import { IMAGE_BASE } from '../../api/axiosClient';

const HeroBanner = () => {
    const [currentBanner, setCurrentBanner] = useState(0);
    const [bannerSlides, setBannerSlides] = useState([]);

    useEffect(() => {
        const loadBanners = async () => {
            try {
                const data = await bannerService.getAllBanners();
                if (data && data.length > 0) {
                    const slides = data.map((b) => ({
                        image: b.imageUrl ? (b.imageUrl.startsWith('http') ? b.imageUrl : `${IMAGE_BASE}${b.imageUrl.startsWith('/') ? '' : '/'}${b.imageUrl}`) : banner1,
                        title: b.title,
                        link: b.linkUrl || "/san-pham",
                        description: b.description || ""
                    }));
                    setBannerSlides(slides);
                } else {
                    setBannerSlides([
                        { image: banner1, title: "ĐẶT TRƯỚC - LẤY NGAY", link: "/san-pham", description: "Bỏ qua hàng chờ, nhận nước liền tay với HighlandsĐI" },
                        { image: banner2, title: "PHIN SỮA ĐÁ", link: "/san-pham", description: "Đậm đà hương vị truyền thống Highlands Coffee" },
                        { image: banner3, title: "FREEZE TRÀ XANH", link: "/san-pham", description: "Thơm ngon thanh mát bừng tỉnh năng lượng ngày mới" }
                    ]);
                }
            } catch (error) {
                console.error("Lỗi tải banner quảng cáo:", error);
                setBannerSlides([
                    { image: banner1, title: "ĐẶT TRƯỚC - LẤY NGAY", link: "/san-pham", description: "Bỏ qua hàng chờ, nhận nước liền tay với HighlandsĐI" },
                    { image: banner2, title: "PHIN SỮA ĐÁ", link: "/san-pham", description: "Đậm đà hương vị truyền thống Highlands Coffee" },
                    { image: banner3, title: "FREEZE TRÀ XANH", link: "/san-pham", description: "Thơm ngon thanh mát bừng tỉnh năng lượng ngày mới" }
                ]);
            }
        };
        loadBanners();
    }, []);

    useEffect(() => {
        if (bannerSlides.length === 0) return;
        const timer = setInterval(() => {
            setCurrentBanner((prev) => (prev + 1) % bannerSlides.length);
        }, 4000);
        return () => clearInterval(timer);
    }, [bannerSlides]);

    if (bannerSlides.length === 0) return null;

    return (
        <div className="boxhome">
            <div className="bannerhome lazy-start fadeIn" data-eff="fadeIn" data-delay="0.2">
                <div style={{ width: '100%', display: 'block', position: 'relative', overflow: 'hidden', minHeight: '350px' }}>
                    {bannerSlides.map((slide, index) => (
                        <div
                            key={index}
                            style={{
                                width: '100%',
                                position: index === 0 ? 'relative' : 'absolute',
                                top: 0,
                                left: 0,
                                opacity: currentBanner === index ? 1 : 0,
                                transition: 'opacity 1s ease-in-out',
                                zIndex: currentBanner === index ? 2 : 1,
                                pointerEvents: currentBanner === index ? 'auto' : 'none'
                            }}
                        >
                            <Link to={slide.link} className="bg" style={{ display: 'block', position: 'relative' }}>
                                <img 
                                    src={slide.image} 
                                    alt={slide.title} 
                                    style={{ 
                                        width: '100%', 
                                        maxHeight: '500px',
                                        objectFit: 'cover'
                                    }} 
                                />
                                <div style={{
                                    position: 'absolute',
                                    bottom: '40px',
                                    left: '40px',
                                    backgroundColor: 'rgba(178, 40, 48, 0.85)',
                                    color: '#fff',
                                    padding: '15px 25px',
                                    borderRadius: '8px',
                                    maxWidth: '450px',
                                    textAlign: 'left',
                                    boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                                    zIndex: 3
                                }}>
                                    <h3 style={{ margin: '0 0 5px 0', color: '#ffcc00', fontSize: '1.4rem', fontWeight: 'bold' }}>{slide.title}</h3>
                                    <p style={{ margin: 0, fontSize: '0.9rem', color: '#eee', display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{slide.description}</p>
                                </div>
                            </Link>
                        </div>
                    ))}
                    <div style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '10px', zIndex: 10 }}>
                        {bannerSlides.map((_, index) => (
                            <div 
                                key={index}
                                onClick={() => setCurrentBanner(index)}
                                style={{
                                    width: '12px', height: '12px', borderRadius: '50%',
                                    backgroundColor: currentBanner === index ? '#b22830' : 'rgba(255,255,255,0.6)',
                                    cursor: 'pointer', transition: 'all 0.3s',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroBanner;
