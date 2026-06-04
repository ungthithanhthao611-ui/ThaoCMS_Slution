import React, { useState } from 'react';
import CategoryList from '../components/CategoryList';
import ProductList from '../components/ProductList';

const Shop = () => {
    const [showAll, setShowAll] = useState(false);

    return (
        <div id="vnt-content">
            {/* Danh mục (băng rôn) nằm tràn viền */}
            <CategoryList />
            
            {/* Lưới sản phẩm tổng quát */}
            <div style={{ backgroundColor: '#f8f8f8', padding: '60px 0', marginTop: '20px' }}>
                <div className="wrapper">
                    <h2 style={{ 
                        color: '#b22830', fontWeight: '800', textTransform: 'uppercase', 
                        marginBottom: '40px', fontSize: '30px', textAlign: 'center', letterSpacing: '1px'
                    }}>
                        {showAll ? '☕ Tất cả sản phẩm' : '🌴 Sản phẩm nổi bật mùa hè'}
                    </h2>
                    
                    <ProductList limit={showAll ? undefined : 4} />

                    <div className="text-center mt-5">
                        <button 
                            onClick={() => setShowAll(!showAll)}
                            style={{
                                backgroundColor: 'transparent',
                                border: '2px solid #b22830',
                                color: '#b22830',
                                padding: '12px 40px',
                                borderRadius: '30px',
                                fontWeight: 'bold',
                                fontSize: '16px',
                                cursor: 'pointer',
                                transition: 'all 0.3s'
                            }}
                            onMouseEnter={(e) => { e.target.style.backgroundColor = '#b22830'; e.target.style.color = '#fff'; }}
                            onMouseLeave={(e) => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = '#b22830'; }}
                        >
                            {showAll ? 'Thu gọn sản phẩm 🔼' : 'Xem tất cả sản phẩm 🔽'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shop;
