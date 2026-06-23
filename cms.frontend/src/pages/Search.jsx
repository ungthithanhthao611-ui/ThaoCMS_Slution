import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import ProductList from '../components/ProductList';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Search = () => {
    const location = useLocation();
    
    // Parse URL query parameter: ?q=...
    const getQueryParam = () => {
        const params = new URLSearchParams(location.search);
        return params.get('q') || '';
    };

    const searchQuery = getQueryParam();

    return (
        <>
            <Header />
            <div id="vnt-content">
                <div style={{ backgroundColor: '#f8f8f8', padding: '40px 0', minHeight: '80vh' }}>
                    <div className="wrapper">
                        {/* Nút quay lại trang chủ */}
                        <div style={{ marginBottom: '20px' }}>
                            <Link to="/" style={{
                                display: 'inline-block', padding: '10px 20px', backgroundColor: '#fff',
                                color: '#333', textDecoration: 'none', borderRadius: '8px', fontWeight: 'bold',
                                fontSize: '0.9rem', transition: 'all 0.3s', border: '1px solid #ddd',
                                boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
                            }}>
                                <i className="fa fa-arrow-left" style={{ marginRight: '8px' }}></i> Quay về Trang Chủ
                            </Link>
                        </div>

                        <h2 style={{ 
                            color: '#b22830', fontWeight: '800', textTransform: 'uppercase', 
                            marginBottom: '40px', fontSize: '30px', textAlign: 'center', letterSpacing: '1px'
                        }}>
                            🔍 Kết quả tìm kiếm cho: "{searchQuery}"
                        </h2>
                        
                        <ProductList search={searchQuery} />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Search;
