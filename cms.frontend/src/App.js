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
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import OrderSuccess from './pages/OrderSuccess';
import PostDetail from './pages/PostDetail';
import NewsPage from './pages/NewsPage';
import { CartProvider } from './context/CartContext';
import './assets/css/App.css';

function App() {
  return (
    <CartProvider>
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
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/order-success" element={<OrderSuccess />} />
              <Route path="/post/:id" element={<PostDetail />} />
              <Route path="/tin-tuc" element={<NewsPage />} />
            </Routes>

            <Footer />
          </div>
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
