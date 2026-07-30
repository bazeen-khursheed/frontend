import React, { createContext, useState, useEffect } from "react";

export const WishlistContext = createContext();
export const WishlistProvider = ({ children }) => {

const user = JSON.parse(localStorage.getItem("user"));
const wishlistKey = user ? `wishlist_${user._id}` : "wishlist_guest";
const [wishlistItems, setWishlistItems] = useState(() => {
const savedWishlist = localStorage.getItem(wishlistKey);
    return savedWishlist ? JSON.parse(savedWishlist) : [];
});

 
useEffect(() => {
const currentUser = JSON.parse(localStorage.getItem("user"));
const key = currentUser ? `wishlist_${currentUser._id}` : "wishlist_guest";
const savedWishlist = localStorage.getItem(key);
    setWishlistItems(savedWishlist ? JSON.parse(savedWishlist) : []);
}, [wishlistKey]);

  
useEffect(() => {
    localStorage.setItem(wishlistKey, JSON.stringify(wishlistItems));
}, [wishlistItems, wishlistKey]);

  
const toggleWishlist = (product) => {
const exists = wishlistItems.find(
      (item) => item._id === product._id
);

if (exists) {
      setWishlistItems((prev) =>
        prev.filter((item) => item._id !== product._id)
      );
    } else {
      setWishlistItems((prev) => [...prev, product]);
    }
};

 
const isWishlisted = (id) => {
    return wishlistItems.some((item) => item._id === id);
};

  
const removeWishlist = (id) => {
    setWishlistItems((prev) =>
      prev.filter((item) => item._id !== id)
    );
};

 
const clearWishlist = () => {
    setWishlistItems([]);
    localStorage.removeItem(wishlistKey);
};



return (
    <WishlistContext.Provider value={{wishlistItems,toggleWishlist,isWishlisted,removeWishlist,clearWishlist,}}>
    {children}</WishlistContext.Provider>
);
};

export default WishlistContext;