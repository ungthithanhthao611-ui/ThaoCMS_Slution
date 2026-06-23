import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axiosClient, { IMAGE_BASE } from '../api/axiosClient';

const About = () => {
    const [sections, setSections] = useState([]);
    const [loading, setLoading] = useState(true);
    const sectionRefs = useRef([]);

    useEffect(() => {
        const fetchAbout = async () => {
            try {
                const data = await axiosClient.get('/About');
                setSections(data);
            } catch (error) {
                console.error("Lỗi tải thông tin giới thiệu:", error);
                // Fallback nếu API lỗi
                setSections([
                    {
                        id: 1,
                        sectionName: "Nguồn gốc",
                        title: "NGUỒN GỐC",
                        subtitle: "CÂU CHUYỆN NÀY LÀ CỦA CHÚNG MÌNH",
                        content: "Highlands Coffee® được thành lập vào năm 1999, bắt nguồn từ tình yêu dành cho đất Việt cùng với cà phê và cộng đồng nơi đây. Ngay từ những ngày đầu tiên, mục tiêu của chúng mình là có thể phục vụ và góp phần phát triển cộng đồng bằng cách siết chặt thêm sự kết nối.",
                        imageUrl: "https://www.highlandscoffee.com.vn/vnt_upload/about/ABOUT-CAREER3.jpg"
                    },
                    {
                        id: 2,
                        sectionName: "Dịch vụ",
                        title: "DỊCH VỤ",
                        subtitle: "DỊCH VỤ NÀY LÀ CỦA CHÚNG MÌNH",
                        content: "Highlands Coffee® là không gian của chúng mình nên mọi thứ ở đây đều vì sự thoải mái của chúng mình. Đừng giữ trong lòng, hãy chia sẻ với chúng mình điều bạn mong muốn để cùng nhau giúp Highlands Coffee® trở nên tuyệt vời hơn.",
                        imageUrl: "https://www.highlandscoffee.com.vn/vnt_upload/about/HLC___ngang_social_1920_x_1280_px_1_1.png"
                    },
                    {
                        id: 3,
                        sectionName: "Nghề nghiệp",
                        title: "NGHỀ NGHIỆP",
                        subtitle: "CƠ HỘI NÀY LÀ CỦA CHÚNG MÌNH",
                        content: "Là điểm hội tụ của cộng đồng, Highlands Coffee® luôn tìm kiếm những thành viên mới với mong muốn không ngừng hoàn thiện một không gian dành cho tất cả mọi người. Chúng mình luôn chào đón bạn trở thành một phần của Highlands Coffee®.",
                        imageUrl: "https://www.highlandscoffee.com.vn/vnt_upload/about/8W1A6722_1.jpg"
                    }
                ]);
            } finally {
                setLoading(false);
            }
        };
        fetchAbout();
    }, []);

    useEffect(() => {
        if (sections.length > 0) {
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
        }
    }, [sections]);

    return (
        <>
            <Header />
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
                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '100px 0', color: '#b22830', fontWeight: 'bold' }}>
                            <i className="fa fa-spinner fa-spin mr-2"></i> Đang tải thông tin giới thiệu...
                        </div>
                    ) : (
                        sections.map((section, idx) => {
                            const isEven = idx % 2 === 0;
                            const imgUrl = section.imageUrl
                                ? (section.imageUrl.startsWith('http')
                                    ? section.imageUrl
                                    : `${IMAGE_BASE}${section.imageUrl.startsWith('/') ? '' : '/'}${section.imageUrl}`)
                                : 'https://www.highlandscoffee.com.vn/vnt_upload/about/ABOUT-CAREER3.jpg';

                            return (
                                <div 
                                    key={section.id} 
                                    ref={el => sectionRefs.current[idx] = el} 
                                    style={{ 
                                        position: 'relative', 
                                        marginBottom: '100px', 
                                        display: 'flex', 
                                        alignItems: 'center',
                                        justifyContent: isEven ? 'flex-start' : 'flex-end'
                                    }}
                                >
                                    {/* Ảnh bay */}
                                    <div className={`anim-box ${isEven ? 'anim-left' : 'anim-right'}`} style={{ width: '80%' }}>
                                        <img 
                                            src={imgUrl} 
                                            alt={section.title} 
                                            style={{ width: '100%', height: 'auto', objectFit: 'cover' }} 
                                        />
                                    </div>
                                    
                                    {/* Khung chữ bay */}
                                    <div className={`anim-box ${isEven ? 'anim-right' : 'anim-left'} delay-1`} style={{ 
                                        position: 'absolute', 
                                        left: isEven ? 'auto' : 0,
                                        right: isEven ? 0 : 'auto', 
                                        width: '45%', 
                                        backgroundColor: '#fff', 
                                        padding: '50px', 
                                        boxShadow: '0 15px 40px rgba(0,0,0,0.08)' 
                                    }}>
                                        <h2 style={{ color: '#b22830', fontWeight: '900', fontSize: '2.5rem', marginBottom: '15px' }}>{section.title}</h2>
                                        {section.subtitle && <h4 style={{ fontWeight: 'bold', marginBottom: '15px', fontSize: '1.2rem', color: '#333' }}>{section.subtitle}</h4>}
                                        <p style={{ lineHeight: '1.8', color: '#555', fontSize: '1.05rem', marginBottom: '25px', whiteSpace: 'pre-line' }}>
                                            {section.content}
                                        </p>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default About;
