import React from 'react';
import { useLocation } from 'react-router-dom';
import ProductList from '../components/ProductList';

const Search = () => {
    const location = useLocation();
    
    // Parse URL query parameter: ?q=...
    const getQueryParam = () => {
        const params = new URLSearchParams(location.search);
        return params.get('q') || '';
    };

    const searchQuery = getQueryParam();

    return (
        <div id="vnt-content">
            <div style={{ backgroundColor: '#f8f8f8', padding: '60px 0', minHeight: '80vh' }}>
                <div className="wrapper">
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
    );
};

export default Search;
