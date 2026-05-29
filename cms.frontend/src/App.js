import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import ProductDetail from './pages/ProductDetail';
import CategoryPage from './pages/CategoryPage';
import './assets/css/App.css';

function App() {
  return (
    <BrowserRouter>
      <div id="vnt-wrapper">
        <div id="vnt-container">
          <Header />
          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/san-pham" element={<Shop />} />
            <Route path="/category/:id" element={<CategoryPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/product/:id" element={<ProductDetail />} />
          </Routes>

          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
