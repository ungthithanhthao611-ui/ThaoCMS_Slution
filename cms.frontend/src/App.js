import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/home/index';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import ProductDetail from './pages/ProductDetail';
import CategoryPage from './pages/CategoryPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import OrderSuccess from './pages/OrderSuccess';
import BlogDetail from './pages/blog-detail/index';
import Blog from './pages/blog/index';
import About from './pages/About';
import Search from './pages/Search';
import ForgotPassword from './pages/ForgotPassword';
import { CartProvider } from './context/CartContext';
import './assets/css/App.css';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <div id="vnt-wrapper">
          <div id="vnt-container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/san-pham" element={<Shop />} />
              <Route path="/category/:id" element={<CategoryPage />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/search" element={<Search />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/order-success" element={<OrderSuccess />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/post/:id" element={<BlogDetail />} />
              <Route path="/tin-tuc" element={<Blog />} />
              <Route path="/gioi-thieu" element={<About />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
