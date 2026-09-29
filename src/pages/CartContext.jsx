import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const CartContext = createContext();

const API = "https://backend-2p6c.vercel.app";

export const CartProvider = ({ children }) => {

  const [cartItems, setCartItems] = useState([]);


  const loadCart = async () => {
    try {

      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) {
        setCartItems([]);
        return;
      }

      const res = await axios.get(
        `${API}/cart/${user.id}`
      );

      setCartItems(res.data || []);

    } catch (error) {
      console.log("Cart Load Error:", error);
      setCartItems([]);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

 
  const saveCart = async (updatedCart) => {
    try {

      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) return;

      await axios.put(
        `${API}/cart/${user.id}`,
        {
          cart: updatedCart
        }
      );

    } catch (error) {
      console.log("Cart Save Error:", error);
    }
  };

 
  const addToCart = (product) => {

    setCartItems((prevItems) => {

      const existingItem = prevItems.find(
        (item) => item._id === product._id
      );

      let updatedCart;

      if (existingItem) {

        updatedCart = prevItems.map((item) =>
          item._id === product._id
            ? {
                ...item,
                quantity: item.quantity + 1
              }
            : item
        );

      } else {

        updatedCart = [
          ...prevItems,
          {
            ...product,
            quantity: 1
          }
        ];

      }

      saveCart(updatedCart);

      return updatedCart;
    });
  };

 
  const removeFromCart = (productId) => {

    setCartItems((prevItems) => {

      const updatedCart = prevItems.filter(
        (item) => item._id !== productId
      );

      saveCart(updatedCart);

      return updatedCart;
    });
  };


  const updateQuantity = (productId, newQuantity) => {

    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCartItems((prevItems) => {

      const updatedCart = prevItems.map((item) =>
        item._id === productId
          ? {
              ...item,
              quantity: newQuantity
            }
          : item
      );

      saveCart(updatedCart);

      return updatedCart;
    });
  };


  const clearCart = () => {
    setCartItems([]);
  };

 
  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );


  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        cartTotal,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        loadCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};