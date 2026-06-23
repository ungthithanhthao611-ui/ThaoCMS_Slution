import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import HeroBanner from './HeroBanner';
import CategoryMenu from './CategoryMenu';
import ProductGrid from './ProductGrid';
import LatestBlog from './LatestBlog';

const Home = () => {
    useEffect(() => {
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
    }, []);

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

            {/* 5. Cửa Hàng Gần Bạn */}
            <div className="boxhome">
                <div className="aainfohome">
                    <div className="tpaainfohh">
                        <div className="itaainfohh vchange">
                            <div className="hhgrip">
                                <div className="mcol lazyloading" data-eff="fadeInRight" data-delay="0.2">
                                    <div className="thumb">
                                        <Link to="/">
                                            <img src="https://www.highlandscoffee.com.vn/vnt_upload/home/1_1.jpg" alt="Cửa Hàng - Highlands Gần Bạn" />
                                        </Link>
                                    </div>
                                </div>
                                <div className="hcol lazyloading" data-eff="fadeInLeft" data-delay="0.4">
                                    <div className="decss">
                                        <div className="dswrap">
                                            <div className="dstitle">
                                                <h3><Link to="/">Cửa Hàng <span>Highlands Gần Bạn</span></Link></h3>
                                            </div>
                                            <div className="dsconts">Bạn ở đâu, có Highlands ở đó!</div>
                                            <div className="dsviews"><Link to="/">KHÁM PHÁ NGAY</Link></div>
                                        </div>
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
