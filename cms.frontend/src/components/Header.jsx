import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [customer, setCustomer] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const path = location.pathname;
    const { totalItems } = useCart();

    useEffect(() => {
        const storedCustomer = localStorage.getItem('customer');
        if (storedCustomer) {
            setCustomer(JSON.parse(storedCustomer));
        }
    }, []);

    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem('customer');
        setCustomer(null);
        navigate('/');
    };

    return (
        <div id="vnt-header">
            <div className="vntheader">
                <div className="wrapper">
                    <div className="vhmainhead">
                        <div className="magrip">
                            <div className="mcol acol">
                                <div className="tpmenuhead hidden-xs hidden-sm">
                                    <ul>
                                        <li 
                                            className={`m-product ${(path.startsWith('/san-pham') || path.startsWith('/category')) ? 'current' : ''}`}
                                            onMouseEnter={() => setIsMenuOpen(true)}
                                            onMouseLeave={() => setIsMenuOpen(false)}
                                        >
                                            <Link to="/san-pham" target="_self" className={(path.startsWith('/san-pham') || path.startsWith('/category')) ? 'active current' : ''}>Thực Đơn</Link>
                                        </li>
                                        <li className="m-about"><a href="#" onClick={(e) => e.preventDefault()} style={{ cursor: 'default', color: '#999' }}>Về Highlands</a></li>
                                        <li className={`m-news ${(path.startsWith('/tin-tuc') || path.startsWith('/post')) ? 'current' : ''}`}>
                                            <Link to="/tin-tuc" target="_self" className={(path.startsWith('/tin-tuc') || path.startsWith('/post')) ? 'active current' : ''}>Tin tức</Link>
                                        </li>
                                        <li className="m-"><a href="#" onClick={(e) => e.preventDefault()} style={{ cursor: 'default', color: '#999' }}>HỖ TRỢ</a></li>
                                    </ul>
                                </div>
                                <div className="tpmobihead hidden-md hidden-lg">
                                    <div className="menu_mobile menu_default">
                                        <div className="icon_menu">
                                            <span className="style_icon"></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="hcol bcol">
                                <div className="tplogohead">
                                     <Link to="/" target="_self" title="Highlands Coffee"><img src="https://www.highlandscoffee.com.vn/vnt_upload/weblink/red_BG_logo800.png" alt="Highlands Coffee" /></Link>
                                </div>
                            </div>
                            <div className="mcol ccol">
                                <div className="hptoolhead">
                                    <div className="tlgrip">
                                        <div className="tcol hidden-xs hidden-sm" style={{ display: 'flex', alignItems: 'center', gap: '40px', marginRight: '20px' }}>
                                            <div className="auth-buttons">
                                                {customer ? (
                                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                        <Link to="/profile" style={{color: '#fff', textDecoration: 'none', fontSize: '24px'}}>
                                                            <i className="fa fa-user-circle-o"></i>
                                                        </Link>
                                                        <div style={{color: 'white', fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', marginTop: '2px'}}>{customer.fullName}</div>
                                                        <a href="#" onClick={handleLogout} style={{color: 'rgba(255,255,255,0.7)', fontSize: '10px', textDecoration: 'underline'}}>Đăng xuất</a>
                                                    </div>
                                                ) : (
                                                    <Link to="/login" style={{color: 'white', textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                                        <i className="fa fa-user-circle-o" style={{fontSize: '24px'}}></i>
                                                        <div style={{fontSize: '10px', textTransform: 'uppercase', marginTop: '4px', letterSpacing: '1px'}}>Đăng nhập</div>
                                                    </Link>
                                                )}
                                            </div>

                                            {/* Icon Giỏ Hàng */}
                                            <Link to="/cart" style={{ color: 'white', textDecoration: 'none', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                <div style={{ position: 'relative' }}>
                                                    <i className="fa fa-shopping-cart" style={{ fontSize: '22px' }}></i>
                                                    {totalItems > 0 && (
                                                        <span style={{
                                                            position: 'absolute', top: '-8px', right: '-10px',
                                                            background: '#ffcc00', color: '#b22830',
                                                            borderRadius: '50%', width: '18px', height: '18px',
                                                            fontSize: '11px', fontWeight: '900',
                                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                            animation: 'pulse-badge 0.4s ease'
                                                        }}>
                                                            {totalItems > 9 ? '9+' : totalItems}
                                                        </span>
                                                    )}
                                                </div>
                                                <div style={{ fontSize: '10px', textTransform: 'uppercase', marginTop: '4px', letterSpacing: '1px' }}>Giỏ hàng</div>
                                            </Link>

                                        </div>
                                        <div className="tcol hidden-xs hidden-sm">
                                            <div className="tpfindhead">
                                                <Link to="/">
                                                    <i className="fa fa-map-marker"></i>
                                                    <span>Tìm kiếm cửa hàng</span>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {isMenuOpen && (
                    <div 
                        className="mega-menu-fullwidth" 
                        onMouseEnter={() => setIsMenuOpen(true)}
                        onMouseLeave={() => setIsMenuOpen(false)}
                    >
                        <div className="row-menu">
                            <div className="col-menu">
                                <h4><Link to="/category/1">CÀ PHÊ</Link></h4>
                                <ul>
                                    <li><Link to="/category/1">Cà Phê Truyền Thống</Link></li>
                                    <li><Link to="/category/1">Cà Phê Phindi</Link></li>
                                </ul>
                            </div>
                            <div className="col-menu">
                                <h4><Link to="/category/2">TRÀ</Link></h4>
                            </div>
                            <div className="col-menu">
                                <h4><Link to="/category/3">FREEZE</Link></h4>
                            </div>
                            <div className="col-menu">
                                <h4><Link to="/category/4">KHÁC</Link></h4>
                                <ul>
                                    <li><Link to="/category/4">Cà Phê Đóng Gói</Link></li>
                                    <li><Link to="/category/4">Bánh Mì Que</Link></li>
                                    <li><Link to="/category/4">Bánh Ngọt</Link></li>
                                    <li><Link to="/category/4">Thức Uống Khác</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Header;
