import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    // Lấy tên key giỏ hàng riêng cho từng tài khoản đăng nhập
    const getCartKey = () => {
        try {
            const customerStr = localStorage.getItem('customer');
            if (customerStr) {
                const customer = JSON.parse(customerStr);
                if (customer && customer.id) {
                    return `hc_cart_${customer.id}`;
                }
            }
        } catch (e) {
            console.error("Lỗi khi đọc tài khoản để lấy giỏ hàng:", e);
        }
        return 'hc_cart_guest';
    };

    // Khôi phục giỏ hàng từ localStorage khi khởi động
    const [cartItems, setCartItems] = useState(() => {
        try {
            const saved = localStorage.getItem(getCartKey());
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });

    // Tự động lưu vào localStorage mỗi khi giỏ hàng thay đổi
    useEffect(() => {
        localStorage.setItem(getCartKey(), JSON.stringify(cartItems));
    }, [cartItems]);

    // Thêm sản phẩm vào giỏ (nếu đã có thì cộng dồn số lượng)
    const addToCart = (product, quantityToAdd = 1, selectedSize = 'S') => {
        setCartItems(prev => {
            const basePrice = product.salePrice && product.salePrice > 0 && product.salePrice < product.price ? product.salePrice : product.price;
            let sizePrice = basePrice;
            if (selectedSize === 'M') {
                if (product.priceSizeM && product.priceSizeM > 0) {
                    sizePrice = product.priceSizeM;
                    if (product.salePrice && product.salePrice > 0 && product.salePrice < product.price) {
                        const discountRatio = product.salePrice / product.price;
                        sizePrice = Math.round(product.priceSizeM * discountRatio);
                    }
                } else {
                    sizePrice = basePrice + 10000;
                }
            }

            const existing = prev.find(item => item.id === product.id && (item.selectedSize || 'S') === selectedSize);
            if (existing) {
                return prev.map(item =>
                    (item.id === product.id && (item.selectedSize || 'S') === selectedSize)
                        ? { ...item, quantity: item.quantity + quantityToAdd }
                        : item
                );
            }
            return [...prev, { ...product, price: sizePrice, selectedSize, quantity: quantityToAdd }];
        });
    };

    // Xóa 1 sản phẩm khỏi giỏ
    const removeFromCart = (productId, size = 'S') => {
        setCartItems(prev => prev.filter(item => !(item.id === productId && (item.selectedSize || 'S') === size)));
    };

    // Cập nhật số lượng (nếu về 0 thì xóa)
    const updateQuantity = (productId, quantity, size = 'S') => {
        if (quantity <= 0) {
            removeFromCart(productId, size);
            return;
        }
        setCartItems(prev =>
            prev.map(item =>
                (item.id === productId && (item.selectedSize || 'S') === size) ? { ...item, quantity } : item
            )
        );
    };

    // Xóa toàn bộ giỏ hàng
    const clearCart = () => {
        setCartItems([]);
    };

    // Tính tổng số lượng (hiển thị trên badge)
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    // Tính tổng tiền
    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            totalItems,
            totalPrice
        }}>
            {children}
        </CartContext.Provider>
    );
};

// Hook tiện lợi để dùng trong các component
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error('useCart must be used within CartProvider');
    return context;
};

export default CartContext;
