import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import HeroBanner from './HeroBanner';
import CategoryMenu from './CategoryMenu';
import ProductGrid from './ProductGrid';
import LatestBlog from './LatestBlog';

const Home = () => {
    const [appLoading, setAppLoading] = useState(true);

    useEffect(() => {
        // Giả lập thời gian nạp trang mượt mà
        const timer = setTimeout(() => {
            setAppLoading(false);
        }, 800);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (appLoading) return;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    const eff = entry.target.getAttribute('data-eff');
                    if (eff) entry.target.classList.add(eff);
                    
                    const delay = entry.target.getAttribute('data-delay');
                    if (delay) entry.target.style.animationDelay = delay + 's';
                    
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        const elements = document.querySelectorAll('.lazyloading');
        elements.forEach(el => observer.observe(el));

        return () => observer.disconnect();
    }, [appLoading]);

    if (appLoading) {
        return (
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                background: 'linear-gradient(135deg, #b22830 0%, #7d1c22 100%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 9999,
                color: 'white'
            }}>
                <style>{`
                    @keyframes spinCup {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                    @keyframes pulseText {
                        0%, 100% { opacity: 0.6; transform: scale(0.97); }
                        50% { opacity: 1; transform: scale(1); }
                    }
                `}</style>
                <div style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    border: '4px solid rgba(255,255,255,0.2)',
                    borderTop: '4px solid #fff',
                    animation: 'spinCup 0.9s cubic-bezier(0.68, -0.55, 0.27, 1.55) infinite',
                    marginBottom: '20px'
                }}></div>
                <div style={{
                    fontSize: '1.4rem',
                    fontWeight: '900',
                    letterSpacing: '3px',
                    animation: 'pulseText 1.5s ease-in-out infinite',
                    textShadow: '0 2px 10px rgba(0,0,0,0.2)'
                }}>
                    HIGHLANDS COFFEE
                </div>
                <span style={{ fontSize: '0.85rem', opacity: 0.7, marginTop: '8px', fontWeight: '600', letterSpacing: '0.5px' }}>
                    Đang nạp thực đơn...
                </span>
            </div>
        );
    }

    return (
        <div id="vnt-content">
            {/* TẦNG 1: Header */}
            <Header />

            {/* TẦNG 2: HeroBanner */}
            <HeroBanner />

            {/* TẦNG 3: CategoryMenu */}
            <CategoryMenu />

            {/* 3. Đồng Hành Cùng Highlands */}
            <div className="boxhome">
                <div className="bbinfohome">
                    <div className="wrapping">
                        <div className="hpbbinfohh">
                            <div className="hhtitle lazyloading" data-eff="fadeInUp" data-delay="0.1">
                                <h2>Đồng Hành Cùng Highlands</h2>
                            </div>
                            <div className="hhconts">
                                <div className="tpbbinfohh">
                                    <div className="vmarginam">
                                        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
                                            <div style={{ flex: '1', minWidth: '300px' }} className="lazyloading" data-eff="fadeInUp" data-delay="0.2">
                                                <div className="itbbinfohh" 
                                                     style={{ transition: 'all 0.4s ease', borderRadius: '8px' }}
                                                     onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-15px)'; e.currentTarget.style.boxShadow = '0 15px 30px rgba(0,0,0,0.2)'; }}
                                                     onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
                                                    <div className="thumb">
                                                        <a href="#" onClick={(e) => e.preventDefault()}>
                                                            <img src="https://www.highlandscoffee.com.vn/vnt_upload/home/WEB_Banner.png" alt="HIGHLANDS REWARDS" style={{width: '100%', borderRadius: '8px', transition: 'all 0.4s ease'}} />
                                                        </a>
                                                    </div>
                                                    <div className="decss text-center mt-3">
                                                        <div className="dstitle">
                                                            <h3><a href="#" onClick={(e) => e.preventDefault()}>HIGHLANDS REWARDS</a></h3>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div style={{ flex: '1', minWidth: '300px' }} className="lazyloading" data-eff="fadeInUp" data-delay="0.4">
                                                <div className="itbbinfohh"
                                                     style={{ transition: 'all 0.4s ease', borderRadius: '8px' }}
                                                     onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-15px)'; e.currentTarget.style.boxShadow = '0 15px 30px rgba(0,0,0,0.2)'; }}
                                                     onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
                                                    <div className="thumb">
                                                        <a href="#" onClick={(e) => e.preventDefault()}>
                                                            <img src="https://www.highlandscoffee.com.vn/vnt_upload/home/bbimg2.jpg" alt="THẺ HIGHLANDS" style={{width: '100%', borderRadius: '8px', transition: 'all 0.4s ease'}} />
                                                        </a>
                                                    </div>
                                                    <div className="decss text-center mt-3">
                                                        <div className="dstitle">
                                                            <h3><a href="#" onClick={(e) => e.preventDefault()}>THẺ HIGHLANDS</a></h3>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div style={{ flex: '1', minWidth: '300px' }} className="lazyloading" data-eff="fadeInUp" data-delay="0.6">
                                                <div className="itbbinfohh"
                                                     style={{ transition: 'all 0.4s ease', borderRadius: '8px' }}
                                                     onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-15px)'; e.currentTarget.style.boxShadow = '0 15px 30px rgba(0,0,0,0.2)'; }}
                                                     onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
                                                    <div className="thumb">
                                                        <a href="#" onClick={(e) => e.preventDefault()}>
                                                            <img src="https://www.highlandscoffee.com.vn/vnt_upload/home/505392773_1120548066764868_2724070916068790506_n.jpg" alt="CƠ HỘI NGHỀ NGHIỆP" style={{width: '100%', borderRadius: '8px', transition: 'all 0.4s ease'}} />
                                                        </a>
                                                    </div>
                                                    <div className="decss text-center mt-3">
                                                        <div className="dstitle">
                                                            <h3><a href="#" onClick={(e) => e.preventDefault()}>CƠ HỘI NGHỀ NGHIỆP</a></h3>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 4. Nước Ngon Thưởng Vị / Bánh Ngon No Đầy */}
            <div className="boxhome">
                <div className="ccinfohome">
                    <div className="wrapping">
                        <div className="hpccinfohh">
                            <div className="tpccinfohh">
                                <div className="hhgrip">
                                    <div className="hcol lazyloading" data-eff="fadeInLeft" data-delay="0.2">
                                        <div className="itccinfohh">
                                            <div className="thumb">
                                                <Link to="/category/1">
                                                    <img src="https://www.highlandscoffee.com.vn/vnt_upload/home/web_banner_2000x2000.jpg" alt="NƯỚC NGON THƯỞNG VỊ" />
                                                </Link>
                                            </div>
                                            <div className="decss">
                                                <div className="dstitle">
                                                    <h3><Link to="/category/1">NƯỚC NGON THƯỞNG VỊ</Link></h3>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="hcol lazyloading" data-eff="fadeInRight" data-delay="0.4">
                                        <div className="itccinfohh">
                                            <div className="thumb">
                                                <Link to="/category/5">
                                                    <img src="https://www.highlandscoffee.com.vn/vnt_upload/home/2.png" alt="BÁNH NGON NO ĐẦY" />
                                                </Link>
                                            </div>
                                            <div className="decss">
                                                <div className="dstitle">
                                                    <h3><Link to="/category/5">BÁNH NGON NO ĐẦY</Link></h3>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* TẦNG 4: ProductGrid */}
            <ProductGrid />

            {/* TẦNG 5: LatestBlog */}
            <LatestBlog />

            {/* 5. Cửa Hàng Gần Bạn (Quảng cáo Thương hiệu) */}
            <div className="boxhome" style={{ padding: '60px 0', backgroundColor: '#fcfbf7', overflow: 'hidden' }}>
                <div className="wrapper">
                    <div className="hhgrip" style={{ display: 'flex', gap: '40px', alignItems: 'center', flexWrap: 'wrap' }}>
                        <div className="lazyloading" data-eff="fadeInLeft" data-delay="0.2" style={{ flex: '1 1 450px' }}>
                            <div style={{ borderRadius: '24px', overflow: 'hidden', boxShadow: '0 15px 35px rgba(0,0,0,0.08)' }}>
                                <img src="https://www.highlandscoffee.com.vn/vnt_upload/home/1_1.jpg" alt="Highlands Coffee" style={{ width: '100%', height: 'auto', display: 'block' }} />
                            </div>
                        </div>
                        <div className="lazyloading" data-eff="fadeInRight" data-delay="0.4" style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div>
                                <span style={{ fontSize: '0.85rem', fontWeight: '800', color: '#b22830', letterSpacing: '2px', textTransform: 'uppercase' }}>Quảng cáo</span>
                                <h3 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#b22830', margin: '8px 0 0 0', lineHeight: '1.2' }}>
                                    Highlands Coffee <br />
                                    <span style={{ color: '#333', fontSize: '2rem', fontWeight: '800' }}>Đậm Vị Hạt Việt</span>
                                </h3>
                            </div>
                            <p style={{ color: '#555', fontSize: '1.05rem', lineHeight: '1.8', margin: 0 }}>
                                Mỗi ly cà phê Highlands là sự hòa quyện hoàn hảo giữa hạt Robusta đậm đà đặc trưng và hạt Arabica thơm nồng nàn từ những nông trường trù phú vùng đất Tây Nguyên hùng vĩ, được rang xay và pha chế theo bí quyết độc quyền hơn hai thập kỷ qua.
                            </p>
                            <div style={{ borderTop: '2px dashed #e0dcd3', paddingTop: '20px', marginTop: '10px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div style={{ width: '45px', height: '45px', borderRadius: '50%', backgroundColor: '#b22830', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                                        <i className="fa fa-phone" style={{ fontSize: '20px' }}></i>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '0.8rem', color: '#888', fontWeight: 'bold', textTransform: 'uppercase' }}>Tổng đài hỗ trợ đặt hàng nhanh</div>
                                        <div style={{ fontSize: '1.3rem', fontWeight: '900', color: '#b22830' }}>1900 1755</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* TẦNG 6: Footer */}
            <Footer />
        </div>
    );
};

export default Home;
