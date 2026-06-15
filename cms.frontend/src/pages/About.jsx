import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const About = () => {
    const sectionRefs = useRef([]);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        sectionRefs.current.forEach(ref => {
            if (ref) observer.observe(ref);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <div style={{ backgroundColor: '#fff', paddingBottom: '60px', overflowX: 'hidden' }}>
            {/* CSS Animation Nho nhỏ nhúng trực tiếp để không cần đụng file App.css */}
            <style>
                {`
                .anim-box {
                    opacity: 0;
                    transition: all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                }
                .anim-left { transform: translateX(-100px); }
                .anim-right { transform: translateX(100px); }
                
                /* Khi cuộn tới, kích hoạt is-visible để đưa về vị trí gốc */
                .is-visible .anim-left,
                .is-visible .anim-right {
                    opacity: 1;
                    transform: translateX(0);
                }
                
                /* Delay cho khung chữ chạy ra sau ảnh một chút cho đẹp */
                .delay-1 { transition-delay: 0.3s; }
                `}
            </style>

            <div className="wrapper" style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 15px' }}>
                
                {/* Section 1: Nguồn gốc */}
                <div ref={el => sectionRefs.current[0] = el} style={{ position: 'relative', marginBottom: '100px', display: 'flex', alignItems: 'center' }}>
                    
                    {/* Ảnh bay từ TRÁI sang */}
                    <div className="anim-box anim-left" style={{ width: '80%' }}>
                        <img 
                            src="https://www.highlandscoffee.com.vn/vnt_upload/about/ABOUT-CAREER3.jpg" 
                            alt="Nguồn gốc" 
                            style={{ width: '100%', height: 'auto', objectFit: 'cover' }} 
                        />
                    </div>
                    
                    {/* Khung chữ bay từ PHẢI sang */}
                    <div className="anim-box anim-right delay-1" style={{ 
                        position: 'absolute', right: 0, width: '45%', backgroundColor: '#fff', 
                        padding: '50px', boxShadow: '0 15px 40px rgba(0,0,0,0.08)' 
                    }}>
                        <h2 style={{ color: '#b22830', fontWeight: '900', fontSize: '2.5rem', marginBottom: '15px' }}>NGUỒN GỐC</h2>
                        <h4 style={{ fontWeight: 'bold', marginBottom: '15px', fontSize: '1.2rem', color: '#333' }}>CÂU CHUYỆN NÀY LÀ CỦA CHÚNG MÌNH</h4>
                        <p style={{ lineHeight: '1.8', color: '#555', fontSize: '1.05rem', marginBottom: '25px' }}>
                            Highlands Coffee® được thành lập vào năm 1999, bắt nguồn từ tình yêu dành cho đất Việt cùng với cà phê và cộng đồng nơi đây.
                            Ngay từ những ngày đầu tiên, mục tiêu của chúng mình là có thể phục vụ và góp phần phát triển cộng đồng bằng cách siết chặt thêm sự kết nối.
                        </p>
                    </div>
                </div>

                {/* Section 2: Dịch vụ */}
                <div ref={el => sectionRefs.current[1] = el} style={{ position: 'relative', marginBottom: '100px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                    
                    {/* Ảnh bay từ PHẢI sang */}
                    <div className="anim-box anim-right" style={{ width: '80%' }}>
                        <img 
                            src="https://www.highlandscoffee.com.vn/vnt_upload/about/HLC___ngang_social_1920_x_1280_px_1_1.png" 
                            alt="Dịch vụ" 
                            style={{ width: '100%', height: 'auto', objectFit: 'cover' }} 
                        />
                    </div>
                    
                    {/* Khung chữ bay từ TRÁI sang */}
                    <div className="anim-box anim-left delay-1" style={{ 
                        position: 'absolute', left: 0, width: '45%', backgroundColor: '#fff', 
                        padding: '50px', boxShadow: '0 15px 40px rgba(0,0,0,0.08)' 
                    }}>
                        <h2 style={{ color: '#b22830', fontWeight: '900', fontSize: '2.5rem', marginBottom: '15px' }}>DỊCH VỤ</h2>
                        <h4 style={{ fontWeight: 'bold', marginBottom: '15px', fontSize: '1.2rem', color: '#333' }}>DỊCH VỤ NÀY LÀ CỦA CHÚNG MÌNH</h4>
                        <p style={{ lineHeight: '1.8', color: '#555', fontSize: '1.05rem', marginBottom: '25px' }}>
                            Highlands Coffee® là không gian của chúng mình nên mọi thứ ở đây đều vì sự thoải mái của chúng mình. 
                            Đừng giữ trong lòng, hãy chia sẻ với chúng mình điều bạn mong muốn để cùng nhau giúp Highlands Coffee® trở nên tuyệt vời hơn.
                        </p>
                    </div>
                </div>

                {/* Section 3: Nghề nghiệp */}
                <div ref={el => sectionRefs.current[2] = el} style={{ position: 'relative', marginBottom: '40px', display: 'flex', alignItems: 'center' }}>
                    
                    {/* Ảnh bay từ TRÁI sang */}
                    <div className="anim-box anim-left" style={{ width: '80%' }}>
                        <img 
                            src="https://www.highlandscoffee.com.vn/vnt_upload/about/8W1A6722_1.jpg" 
                            alt="Nghề nghiệp" 
                            style={{ width: '100%', height: 'auto', objectFit: 'cover' }} 
                        />
                    </div>
                    
                    {/* Khung chữ bay từ PHẢI sang */}
                    <div className="anim-box anim-right delay-1" style={{ 
                        position: 'absolute', right: 0, width: '45%', backgroundColor: '#fff', 
                        padding: '50px', boxShadow: '0 15px 40px rgba(0,0,0,0.08)' 
                    }}>
                        <h2 style={{ color: '#b22830', fontWeight: '900', fontSize: '2.5rem', marginBottom: '15px' }}>NGHỀ NGHIỆP</h2>
                        <h4 style={{ fontWeight: 'bold', marginBottom: '15px', fontSize: '1.2rem', color: '#333' }}>CƠ HỘI NÀY LÀ CỦA CHÚNG MÌNH</h4>
                        <p style={{ lineHeight: '1.8', color: '#555', fontSize: '1.05rem', marginBottom: '25px' }}>
                            Là điểm hội tụ của cộng đồng, Highlands Coffee® luôn tìm kiếm những thành viên mới với mong muốn không ngừng hoàn thiện một không gian dành cho tất cả mọi người.
                            Chúng mình luôn chào đón bạn trở thành một phần của Highlands Coffee®.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default About;
