import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import axiosClient, { API_BASE } from '../api/axiosClient';

const HIGHLANDS_STORES = [
    { id: 1, district: 'Quận 1', name: 'Highlands Coffee Nguyễn Huệ', address: '65 Nguyễn Huệ, P. Bến Nghé, Quận 1, TP.HCM' },
    { id: 2, district: 'Quận 1', name: 'Highlands Coffee Đồng Khởi', address: '42 Đồng Khởi, P. Bến Nghé, Quận 1, TP.HCM' },
    { id: 3, district: 'Quận 3', name: 'Highlands Coffee Võ Văn Tần', address: '36 Võ Văn Tần, P. 6, Quận 3, TP.HCM' },
    { id: 4, district: 'Quận 3', name: 'Highlands Coffee CMT8', address: '164 Cách Mạng Tháng 8, P. 10, Quận 3, TP.HCM' },
    { id: 5, district: 'Quận 5', name: 'Highlands Coffee Trần Hưng Đạo', address: '258 Trần Hưng Đạo, P. 11, Quận 5, TP.HCM' },
    { id: 6, district: 'Quận 7', name: 'Highlands Coffee SC VivoCity', address: '1058 Nguyễn Văn Linh, Quận 7, TP.HCM' },
    { id: 7, district: 'Quận 10', name: 'Highlands Coffee Sư Vạn Hạnh', address: '371 Sư Vạn Hạnh, P. 12, Quận 10, TP.HCM' },
    { id: 8, district: 'Bình Thạnh', name: 'Highlands Coffee Landmark 81', address: '720A Điện Biên Phủ, P. 22, Q. Bình Thạnh, TP.HCM' },
    { id: 9, district: 'Tân Bình', name: 'Highlands Coffee Trường Chinh', address: '197 Trường Chinh, P. 12, Q. Tân Bình, TP.HCM' },
    { id: 10, district: 'Gò Vấp', name: 'Highlands Coffee Nguyễn Kiệm', address: '262 Nguyễn Kiệm, P. 3, Q. Gò Vấp, TP.HCM' },
];

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [closeTimeout, setCloseTimeout] = useState(null);
    const [customer, setCustomer] = useState(null);
    const [menus, setMenus] = useState([]);
    const [subMenus, setSubMenus] = useState([]);
    const [isStoreModalOpen, setIsStoreModalOpen] = useState(false);
    const [storeSearch, setStoreSearch] = useState('');
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

    // Gọi API lấy danh sách menu từ database bằng axiosClient
    useEffect(() => {
        axiosClient.get('/menus')
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
                                                        <div style={{color: 'white', fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', marginTop: '2px', whiteSpace: 'nowrap'}}>{customer.fullName}</div>
                                                        <a href="#" onClick={handleLogout} style={{color: 'rgba(255,255,255,0.7)', fontSize: '10px', textDecoration: 'underline', whiteSpace: 'nowrap'}}>Đăng xuất</a>
                                                    </div>
                                                ) : (
                                                    <Link to="/login" style={{color: 'white', textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                                        <i className="fa fa-user-circle-o" style={{fontSize: '24px'}}></i>
                                                        <div style={{fontSize: '10px', textTransform: 'uppercase', marginTop: '4px', letterSpacing: '1px', whiteSpace: 'nowrap'}}>Đăng nhập</div>
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
                                                <div style={{ fontSize: '10px', textTransform: 'uppercase', marginTop: '4px', letterSpacing: '1px', whiteSpace: 'nowrap' }}>Giỏ hàng</div>
                                            </Link>

                                        </div>
                                        <div className="tcol hidden-xs hidden-sm">
                                            <div className="tpfindhead" style={{ cursor: 'pointer' }} onClick={() => setIsStoreModalOpen(true)}>
                                                <a href="#" onClick={(e) => e.preventDefault()} style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
                                                    <i className="fa fa-map-marker" style={{ fontSize: '18px', color: '#fff' }}></i>
                                                    <span style={{ color: '#fff' }}>Tìm kiếm cửa hàng</span>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal Tìm kiếm cửa hàng */}
            {isStoreModalOpen && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 10001,
                    padding: '20px',
                    boxSizing: 'border-box'
                }}
                onClick={() => setIsStoreModalOpen(false)}
                >
                    <div style={{
                        backgroundColor: '#fff',
                        borderRadius: '20px',
                        width: '100%',
                        maxWidth: '550px',
                        maxHeight: '85vh',
                        display: 'flex',
                        flexDirection: 'column',
                        overflow: 'hidden',
                        boxShadow: '0 15px 40px rgba(0,0,0,0.2)',
                        boxSizing: 'border-box'
                    }}
                    onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div style={{
                            padding: '20px 25px',
                            background: 'linear-gradient(135deg, #b22830, #8c1e24)',
                            color: 'white',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <h4 style={{ margin: 0, fontWeight: '800', fontSize: '1.25rem', letterSpacing: '0.5px' }}>
                                📍 Hệ thống cửa hàng Highlands
                            </h4>
                            <button 
                                onClick={() => setIsStoreModalOpen(false)}
                                style={{
                                    background: 'transparent',
                                    border: 'none',
                                    color: 'white',
                                    fontSize: '24px',
                                    cursor: 'pointer',
                                    fontWeight: 'bold',
                                    outline: 'none'
                                }}
                            >
                                &times;
                            </button>
                        </div>

                        {/* Search Bar inside Modal */}
                        <div style={{ padding: '20px 25px 10px' }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                border: '1px solid #cbd5e1',
                                borderRadius: '30px',
                                padding: '8px 16px',
                                backgroundColor: '#f8fafc'
                            }}>
                                <i className="fa fa-search" style={{ color: '#94a3b8', marginRight: '10px' }}></i>
                                <input 
                                    type="text" 
                                    placeholder="Tìm theo tên cửa hàng hoặc quận (VD: Quận 1)..."
                                    value={storeSearch}
                                    onChange={(e) => setStoreSearch(e.target.value)}
                                    style={{
                                        border: 'none',
                                        background: 'transparent',
                                        outline: 'none',
                                        width: '100%',
                                        fontSize: '0.9rem',
                                        color: '#334155'
                                    }}
                                />
                            </div>
                        </div>

                        {/* Store List */}
                        <div style={{
                            overflowY: 'auto',
                            padding: '10px 25px 25px',
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '12px'
                        }}>
                            {HIGHLANDS_STORES.filter(store => 
                                store.name.toLowerCase().includes(storeSearch.toLowerCase()) ||
                                store.address.toLowerCase().includes(storeSearch.toLowerCase())
                            ).map(store => (
                                <div 
                                    key={store.id} 
                                    style={{
                                        padding: '16px',
                                        borderRadius: '16px',
                                        border: '1px solid #e2e8f0',
                                        backgroundColor: '#fff',
                                        transition: 'all 0.2s',
                                        display: 'flex',
                                        alignItems: 'flex-start',
                                        gap: '12px'
                                    }}
                                    className="store-item-hover"
                                >
                                    <div style={{
                                        width: '36px',
                                        height: '36px',
                                        borderRadius: '50%',
                                        backgroundColor: '#fff5f5',
                                        color: '#b22830',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '16px',
                                        flexShrink: 0
                                    }}>
                                        <i className="fa fa-map-marker"></i>
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontWeight: '700', color: '#1e293b', fontSize: '0.95rem' }}>{store.name}</div>
                                        <div style={{ color: '#64748b', fontSize: '0.82rem', marginTop: '4px', lineHeight: '1.4' }}>{store.address}</div>
                                        <div style={{ marginTop: '8px' }}>
                                            <a 
                                                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(store.name + " " + store.address)}`}
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                style={{
                                                    fontSize: '0.78rem',
                                                    color: '#b22830',
                                                    fontWeight: '700',
                                                    textDecoration: 'none'
                                                }}
                                            >
                                                Xem bản đồ <i className="fa fa-external-link"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {HIGHLANDS_STORES.filter(store => 
                                store.name.toLowerCase().includes(storeSearch.toLowerCase()) ||
                                store.address.toLowerCase().includes(storeSearch.toLowerCase())
                            ).length === 0 && (
                                <div style={{ textAlign: 'center', padding: '40px 0', color: '#64748b' }}>
                                    Không tìm thấy cửa hàng nào khớp với tìm kiếm.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Header;
