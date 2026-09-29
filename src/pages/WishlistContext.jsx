import React, {
  createContext,
  useState,
  useEffect
} from "react";

import axios from "axios";

export const WishlistContext = createContext();

const API = "https://backend-2p6c.vercel.app";

export const WishlistProvider = ({ children }) => {

const [wishlistItems, setWishlistItems] = useState([]);
const loadWishlist = async () => {

    try {

      const user = JSON.parse(
        localStorage.getItem("user")
      );

      if (!user) {
        setWishlistItems([]);
        return;
      }

      const res = await axios.get(
        `${API}/wishlist/${user.id}`
      );

      console.log("Wishlist from MongoDB:", res.data);

      setWishlistItems(res.data || []);

    } catch (error) {

      console.log(
        "Wishlist Load Error:",
        error
      );

      setWishlistItems([]);

    }

  };


 useEffect(() => {

    loadWishlist();

  }, []);


const saveWishlist = async (updatedWishlist) => {

    try {

      const user = JSON.parse(
        localStorage.getItem("user")
      );

      if (!user) return;

      await axios.put(
        `${API}/wishlist/${user.id}`,
        {
          wishlist: updatedWishlist
        }
      );

      console.log("Wishlist saved to MongoDB");

    } catch (error) {

      console.log(
        "Wishlist Save Error:",
        error
      );

    }

  };
const toggleWishlist = (product) => {

    setWishlistItems((prevItems) => {

      const exists = prevItems.find(
        (item) => item._id === product._id
      );

      let updatedWishlist;

      if (exists) {

        updatedWishlist = prevItems.filter(
          (item) => item._id !== product._id
        );

      } else {

        updatedWishlist = [
          ...prevItems,
          product
        ];

      }

      saveWishlist(updatedWishlist);

      return updatedWishlist;

    });

  };


const isWishlisted = (id) => {

    return wishlistItems.some(
      (item) => item._id === id
    );

  };

const removeWishlist = (id) => {

    setWishlistItems((prevItems) => {

      const updatedWishlist =
        prevItems.filter(
          (item) => item._id !== id
        );

      saveWishlist(updatedWishlist);

      return updatedWishlist;

    });

  };
const clearWishlist = () => {

    setWishlistItems([]);

  };


  return (

    <WishlistContext.Provider
      value={{
        wishlistItems,
        toggleWishlist,
        isWishlisted,
        removeWishlist,
        clearWishlist,
        loadWishlist
      }}
    >

      {children}

    </WishlistContext.Provider>

  );

};

export default WishlistContext;