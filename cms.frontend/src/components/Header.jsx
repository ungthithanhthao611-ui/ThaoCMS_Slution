import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { API_BASE } from '../api/axiosClient';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [closeTimeout, setCloseTimeout] = useState(null);
    const [customer, setCustomer] = useState(null);
    const [menus, setMenus] = useState([]);
    const [subMenus, setSubMenus] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const path = location.pathname;
    const { totalItems, clearCart } = useCart();

    useEffect(() => {
        return () => {
            if (closeTimeout) clearTimeout(closeTimeout);
        };
    }, [closeTimeout]);

    const handleMouseEnterMenu = (menuId, hasChildren) => {
        if (closeTimeout) {
            clearTimeout(closeTimeout);
            setCloseTimeout(null);
        }
        if (hasChildren) {
            setIsMenuOpen(menuId);
        } else {
            setIsMenuOpen(false);
        }
    };

    const handleMouseLeaveMenu = () => {
        const timeout = setTimeout(() => {
            setIsMenuOpen(false);
        }, 200);
        setCloseTimeout(timeout);
    };

    useEffect(() => {
        const storedCustomer = localStorage.getItem('customer');
        if (storedCustomer) {
            setCustomer(JSON.parse(storedCustomer));
        }
    }, []);

    // Gọi API lấy danh sách menu từ database
    useEffect(() => {
        fetch(`${API_BASE}/api/menus`)
            .then(res => res.json())
            .then(data => {
                // Tách menu cha (parentId == null) và menu con
                const parents = data.filter(m => m.parentId === null || m.parentId === undefined);
                const children = data.filter(m => m.parentId !== null && m.parentId !== undefined);
                setMenus(parents);
                setSubMenus(children);
            })
            .catch(() => {
                // Fallback nếu API lỗi: dùng menu mặc định
                setMenus([
                    { id: 1, name: 'Thực Đơn',     linkUrl: '/san-pham',   displayOrder: 1 },
                    { id: 2, name: 'Về Highlands',  linkUrl: '/gioi-thieu', displayOrder: 2 },
                    { id: 3, name: 'Tin Tức',       linkUrl: '/tin-tuc',    displayOrder: 3 },
                    { id: 4, name: 'Hỗ Trợ',       linkUrl: '#',           displayOrder: 4 },
                ]);
                setSubMenus([
                    { id: 5, name: 'Cà Phê',   linkUrl: '/category/1', parentId: 1 },
                    { id: 6, name: 'Trà',       linkUrl: '/category/2', parentId: 1 },
                    { id: 7, name: 'Freeze',    linkUrl: '/category/3', parentId: 1 },
                    { id: 8, name: 'Khác',      linkUrl: '/category/5', parentId: 1 },
                ]);
            });
    }, []);

    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem('customer');
        setCustomer(null);
        clearCart(); // Xoá giỏ hàng trong bộ nhớ
        navigate('/');
    };

    // Lấy menu con theo parentId
    const getChildren = (parentId) => subMenus.filter(m => m.parentId === parentId);

    return (
        <div id="vnt-header">
            <div className="vntheader">
                <div className="wrapper">
                    <div className="vhmainhead">
                        <div className="magrip">
                            <div className="mcol acol">
                                <div className="tpmenuhead hidden-xs hidden-sm">
                                    <ul>
                                        {menus.map(menu => {
                                            const children = getChildren(menu.id);
                                            const isActive = path.startsWith(menu.linkUrl) && menu.linkUrl !== '#';
                                            return (
                                                <li
                                                    key={menu.id}
                                                    className={isActive ? 'current' : ''}
                                                    onMouseEnter={() => handleMouseEnterMenu(menu.id, children.length > 0)}
                                                    onMouseLeave={handleMouseLeaveMenu}
                                                >
                                                    {menu.linkUrl === '#' ? (
                                                        <a href="#" onClick={e => e.preventDefault()} style={{ cursor: 'default', color: '#999' }}>
                                                            {menu.name.toUpperCase()}
                                                        </a>
                                                    ) : (
                                                        <Link to={menu.linkUrl} className={isActive ? 'active current' : ''}>
                                                            {menu.name.toUpperCase()}
                                                        </Link>
                                                    )}
                                                </li>
                                            );
                                        })}
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
                                        <div className="tcol hidden-xs hidden-sm" style={{ display: 'flex', alignItems: 'center', gap: '30px', marginRight: '20px' }}>
                                            {/* Ô Tìm Kiếm */}
                                            <div style={{ 
                                                display: 'flex', 
                                                alignItems: 'center', 
                                                backgroundColor: 'rgba(255, 255, 255, 0.15)', 
                                                borderRadius: '20px', 
                                                padding: '6px 12px',
                                                border: '1px solid rgba(255, 255, 255, 0.3)',
                                                marginRight: '10px'
                                            }}>
                                                <input
                                                    type="text"
                                                    placeholder="Tìm sản phẩm..."
                                                    style={{
                                                        background: 'transparent',
                                                        border: 'none',
                                                        color: '#fff',
                                                        outline: 'none',
                                                        fontSize: '0.85rem',
                                                        width: '120px'
                                                    }}
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter' && e.target.value.trim()) {
                                                            navigate(`/search?q=${encodeURIComponent(e.target.value.trim())}`);
                                                            e.target.value = '';
                                                        }
                                                    }}
                                                />
                                                <i className="fa fa-search" style={{ color: '#fff', fontSize: '0.9rem', cursor: 'pointer' }}></i>
                                            </div>

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
                {isMenuOpen && (() => {
                    const activeMenu = menus.find(m => m.id === isMenuOpen);
                    const children = activeMenu ? getChildren(activeMenu.id) : [];
                    return children.length > 0 ? (
                        <div
                            className="mega-menu-fullwidth"
                            style={{ paddingTop: '20px', marginTop: '-20px', position: 'relative', zIndex: 999 }}
                            onMouseEnter={() => {
                                if (closeTimeout) {
                                    clearTimeout(closeTimeout);
                                    setCloseTimeout(null);
                                }
                            }}
                            onMouseLeave={handleMouseLeaveMenu}
                        >
                            <div className="row-menu" style={{ justifyContent: 'center' }}>
                                {children.map(child => (
                                    <div className="col-menu" key={child.id}>
                                        <h4><Link to={child.linkUrl}>{child.name.toUpperCase()}</Link></h4>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : null;
                })()}
            </div>
        </div>
    );
};

export default Header;
