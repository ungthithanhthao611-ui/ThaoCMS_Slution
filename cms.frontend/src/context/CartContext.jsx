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
    const addToCart = (product, quantityToAdd = 1) => {
        setCartItems(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantityToAdd }
                        : item
                );
            }
            return [...prev, { ...product, quantity: quantityToAdd }];
        });
    };

    // Xóa 1 sản phẩm khỏi giỏ
    const removeFromCart = (productId) => {
        setCartItems(prev => prev.filter(item => item.id !== productId));
    };

    // Cập nhật số lượng (nếu về 0 thì xóa)
    const updateQuantity = (productId, quantity) => {
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }
        setCartItems(prev =>
            prev.map(item =>
                item.id === productId ? { ...item, quantity } : item
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
