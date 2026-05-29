import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

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
            {/* 1. Main Banner */}
            <div className="boxhome">
                <div className="bannerhome lazy-start fadeIn" data-eff="fadeIn" data-delay="0.2">
                    <div style={{ width: '100%', display: 'block' }}>
                        <Link to="/shop" className="bg" style={{ display: 'block' }}>
                            <img src="https://www.highlandscoffee.com.vn/vnt_upload/weblink/2025/HCO_7825_SUMMERDI_DC_BANNER_1920x926.jpg" alt="Banner" style={{ width: '100%' }} />
                        </Link>
                    </div>
                </div>
            </div>

            {/* 2. App Thành Viên */}
            <div className="boxhome">
                <div className="aainfohome">
                    <div className="tpaainfohh">
                        <div className="itaainfohh lazyloading" data-eff="fadeIn" data-delay="0.2">
                            <div className="hhgrip">
                                <div className="mcol">
                                    <div className="thumb">
                                        <a href="https://di.highlandscoffee.com.vn/hlcapp" target="_blank" rel="noreferrer">
                                            <img src="https://www.highlandscoffee.com.vn/vnt_upload/home/Website_bannerr.png" alt="App Thành Viên HighlandsĐI" />
                                        </a>
                                    </div>
                                </div>
                                <div className="hcol">
                                    <div className="decss">
                                        <div className="dswrap">
                                            <div className="dstitle">
                                                <h3><a href="https://di.highlandscoffee.com.vn/hlcapp" target="_blank" rel="noreferrer">App Thành Viên HighlandsĐI</a></h3>
                                            </div>
                                            <div className="dsconts">Đặt trước - Lấy ngay, không cần đợi </div>
                                            <div className="dsviews"><a href="https://di.highlandscoffee.com.vn/hlcapp" target="_blank" rel="noreferrer">TẢI APP NGAY</a></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 3. Đồng Hành Cùng Highlands */}
            <div className="boxhome">
                <div className="bbinfohome lazyloading" data-eff="fadeIn" data-delay="0.2">
                    <div className="wrapping">
                        <div className="hpbbinfohh">
                            <div className="hhtitle">
                                <h2>Đồng Hành Cùng Highlands</h2>
                            </div>
                            <div className="hhconts">
                                <div className="tpbbinfohh">
                                    <div className="vmarginam">
                                        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
                                            <div style={{ flex: '1', minWidth: '300px' }}>
                                                <div className="itbbinfohh">
                                                    <div className="thumb">
                                                        <a href="https://bit.ly/4lRdyvH" target="_blank" rel="noreferrer">
                                                            <img src="https://www.highlandscoffee.com.vn/vnt_upload/home/WEB_Banner.png" alt="HIGHLANDS REWARDS" style={{width: '100%', borderRadius: '8px'}} />
                                                        </a>
                                                    </div>
                                                    <div className="decss text-center mt-3">
                                                        <div className="dstitle">
                                                            <h3><a href="https://bit.ly/4lRdyvH" target="_blank" rel="noreferrer">HIGHLANDS REWARDS</a></h3>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div style={{ flex: '1', minWidth: '300px' }}>
                                                <div className="itbbinfohh">
                                                    <div className="thumb">
                                                        <a href="https://card.highlandscoffee.com.vn/" target="_blank" rel="noreferrer">
                                                            <img src="https://www.highlandscoffee.com.vn/vnt_upload/home/bbimg2.jpg" alt="THẺ HIGHLANDS" style={{width: '100%', borderRadius: '8px'}} />
                                                        </a>
                                                    </div>
                                                    <div className="decss text-center mt-3">
                                                        <div className="dstitle">
                                                            <h3><a href="https://card.highlandscoffee.com.vn/" target="_blank" rel="noreferrer">THẺ HIGHLANDS</a></h3>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div style={{ flex: '1', minWidth: '300px' }}>
                                                <div className="itbbinfohh">
                                                    <div className="thumb">
                                                        <a href="https://careers.highlandscoffee.com.vn/vi/viec-lam/" target="_blank" rel="noreferrer">
                                                            <img src="https://www.highlandscoffee.com.vn/vnt_upload/home/505392773_1120548066764868_2724070916068790506_n.jpg" alt="CƠ HỘI NGHỀ NGHIỆP" style={{width: '100%', borderRadius: '8px'}} />
                                                        </a>
                                                    </div>
                                                    <div className="decss text-center mt-3">
                                                        <div className="dstitle">
                                                            <h3><a href="https://careers.highlandscoffee.com.vn/vi/viec-lam/" target="_blank" rel="noreferrer">CƠ HỘI NGHỀ NGHIỆP</a></h3>
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
                <div className="ccinfohome lazyloading" data-eff="fadeIn" data-delay="0.2">
                    <div className="wrapping">
                        <div className="hpccinfohh">
                            <div className="tpccinfohh">
                                <div className="hhgrip">
                                    <div className="hcol">
                                        <div className="itccinfohh">
                                            <div className="thumb">
                                                <Link to="/shop">
                                                    <img src="https://www.highlandscoffee.com.vn/vnt_upload/home/web_banner_2000x2000.jpg" alt="NƯỚC NGON THƯỞNG VỊ" />
                                                </Link>
                                            </div>
                                            <div className="decss">
                                                <div className="dstitle">
                                                    <h3><Link to="/shop">NƯỚC NGON THƯỞNG VỊ</Link></h3>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="hcol">
                                        <div className="itccinfohh">
                                            <div className="thumb">
                                                <Link to="/shop">
                                                    <img src="https://www.highlandscoffee.com.vn/vnt_upload/home/2.png" alt="BÁNH NGON NO ĐẦY" />
                                                </Link>
                                            </div>
                                            <div className="decss">
                                                <div className="dstitle">
                                                    <h3><Link to="/shop">BÁNH NGON NO ĐẦY</Link></h3>
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

            {/* 5. Cửa Hàng Gần Bạn */}
            <div className="boxhome">
                <div className="aainfohome">
                    <div className="tpaainfohh">
                        <div className="itaainfohh vchange lazyloading" data-eff="fadeIn" data-delay="0.2">
                            <div className="hhgrip">
                                <div className="mcol">
                                    <div className="thumb">
                                        <Link to="/">
                                            <img src="https://www.highlandscoffee.com.vn/vnt_upload/home/1_1.jpg" alt="Cửa Hàng - Highlands Gần Bạn" />
                                        </Link>
                                    </div>
                                </div>
                                <div className="hcol">
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

        </div>
    );
};

export default Home;
