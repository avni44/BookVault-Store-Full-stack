import React, { createContext, useContext, useState, useEffect } from 'react';

// ✅ FIRST LINE - Export UserContext for your imports
export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const data = localStorage.getItem("loggedUser");
  const initialUser = data ? JSON.parse(data) : null;
  
  const [loggedUser, setLoggedUser] = useState(initialUser);
  const [cartItems, setCartItems] = useState([]);

  // ✅ Admin check - works with username "admin"
  const isAdmin = loggedUser && (
    loggedUser.role === 'ADMIN' || 
    loggedUser.username === 'admin' ||
    loggedUser.username?.toLowerCase().includes('admin')
  );

  // Load cart
  useEffect(() => {
    const cartData = localStorage.getItem("cartItems");
    if (cartData) {
      setCartItems(JSON.parse(cartData));
    }
  }, []);

  // Save cart
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (book) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === book.id);
      if (existingItem) {
        return prev.map(item => 
          item.id === book.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...book, quantity: 1 }];
    });
  };

  const updateQuantity = (bookId, quantity) => {
    if (quantity <= 0) {
      setCartItems(prev => prev.filter(item => item.id !== bookId));
      return;
    }
    setCartItems(prev => 
      prev.map(item => 
        item.id === bookId 
          ? { ...item, quantity }
          : item
      )
    );
  };

  const removeFromCart = (bookId) => {
    setCartItems(prev => prev.filter(item => item.id !== bookId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const value = {
    loggedUser,
    setLoggedUser,
    isAdmin,
    cartItems,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartCount
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;

