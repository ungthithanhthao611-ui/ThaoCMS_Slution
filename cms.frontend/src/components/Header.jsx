import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
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
                                            className="m-product current"
                                            onMouseEnter={() => setIsMenuOpen(true)}
                                            onMouseLeave={() => setIsMenuOpen(false)}
                                        >
                                            <Link to="/san-pham" target="_self" className="active current">Thực Đơn</Link>
                                        </li>
                                        <li className="m-about"><Link to="/" target="_self">Về Highlands</Link></li>
                                        <li className="m-news"><Link to="/" target="_self">Tin tức</Link></li>
                                        <li className="m-"><a href="https://highlandscoffeevn.zendesk.com/hc/en-us" target="_blank" rel="noreferrer">HỖ TRỢ</a></li>
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
                                        <div className="tcol hidden-xs hidden-sm">
                                            <div className="tplinkhead">
                                                <ul>
                                                     <li className="m-"><a href="https://order.highlandscoffee.com.vn/" target="_blank" rel="noreferrer">Giao hàng</a></li>
                                                </ul>
                                            </div>
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
