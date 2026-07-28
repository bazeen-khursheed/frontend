import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ShoppingCart, Search, Heart } from "lucide-react";
import { WishlistContext } from "./WishlistContext";
import { CartContext } from "./CartContext";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
const Navbar = () => {

  const { wishlistItems } = useContext(WishlistContext);
  const { cartCount, clearCart } = useContext(CartContext);
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
const [notFound, setNotFound] = useState(false);
const [suggestions, setSuggestions] = useState([]);
const [selectedIndex, setSelectedIndex] = useState(-1);

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    
    clearCart();

    localStorage.removeItem("cart");
    localStorage.removeItem("orders");
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    navigate("/register");
  };

useEffect(() => {
  axios
    .get("http://localhost:8080/product")
    .then((res) => {
      setProducts(res.data);
    })
    .catch((err) => console.log(err));
}, []);

const handleSearch = () => {
  if (!search.trim()) return;

  const product = products.find((item) =>
    item.title.toLowerCase().trim().includes(search.toLowerCase().trim())
  );

  if (product) {
    setNotFound(false);
    navigate(`/product/${product._id}`);
    setSearch("");
    setSuggestions([]);
  } else {
    setNotFound(true);
    setSuggestions([]);
  }
};
  return (
    <nav className="w-full bg-[#071a2f] shadow-xl sticky top-0 z-50">
      <div className="max-w-[1550px] mx-auto px-10 py-5 flex items-center justify-between">


        {/* Brand */}
        <h1 className="text-4xl font-black tracking-wide">
          <span className="text-white">Bazeen</span>
          <span className="text-[33px] font-extrabold bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 bg-clip-text text-transparent ml-2">
            Store
          </span>
        </h1>



        {/* Right Section */}
        <div className="flex items-center gap-5 text-[17px] font-medium ">


          <NavLink
  to="/home"
  className={({ isActive }) =>
    `text-[18px] ${
      isActive
        ? "text-[#14B8A6]"
        : "text-gray-200 hover:text-[#14B8A6]"
    }`
  }
>
  Home
</NavLink>


          <NavLink
  to="/products"
  className={({ isActive }) =>
    `text-[18px] ${
      isActive
        ? "text-[#14B8A6]"
        : "text-gray-200 hover:text-[#14B8A6]"
    }`
  }
>
  Products
</NavLink>


          <NavLink
  to="/about"
  className={({ isActive }) =>
    `text-[18px]  ${
      isActive
        ? "text-[#14B8A6]"
        : "text-gray-200 hover:text-[#14B8A6] "
    }`
  }
>
  About
</NavLink>


          <NavLink
  to="/contact"
  className={({ isActive }) =>
    `text-[18px] ${
      isActive
        ? "text-[#14B8A6]"
        : "text-gray-200 hover:text-[#14B8A6]"
    }`
  }
>
  Contact
</NavLink>



{/* Search */}
<div className="relative">

  <Search
    onClick={handleSearch}
    className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 cursor-pointer"
  />

  <input
    type="text"
    placeholder="Search products..."
    value={search}
onChange={(e) => {
  const value = e.target.value;

  setSearch(value);
  setSelectedIndex(-1);
  setNotFound(false);

  if(value.trim() !== ""){

    const filtered = products.filter((item)=>
      item.title.toLowerCase().includes(value.toLowerCase())
    );

    setSuggestions(filtered);

  } else {
    setSuggestions([]);
  }
}}

 onKeyDown={(e) => {

  if(e.key === "ArrowDown"){

    setSelectedIndex((prev)=>
      prev < suggestions.length - 1 ? prev + 1 : prev
    );

  }


  if(e.key === "ArrowUp"){

    setSelectedIndex((prev)=>
      prev > 0 ? prev - 1 : 0
    );

  }


  if(e.key === "Enter"){

    if(selectedIndex >= 0){

      const product = suggestions[selectedIndex];

      navigate(`/product/${product._id}`);

      setSearch("");
      setSuggestions([]);
      setSelectedIndex(-1);

    }

  }

}}

    className="w-82 pl-12 pr-4 py-2.5 rounded-full bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#14B8A6]"
  />


  {/* Suggestions */}
  {suggestions.length > 0 && (
   <div className="absolute top-12 left-0 w-[320px] max-h-80 overflow-y-auto bg-white rounded-xl shadow-xl z-50">

      {suggestions.slice(0,5).map((item,index)=>(
        <div
          key={item._id}
          onClick={()=>{
            navigate(`/product/${item._id}`);
            setSearch("");
            setSuggestions([]);
          }}

          className={`px-4 py-3 text-black cursor-pointer 
${
 selectedIndex === index 
 ? "bg-gray-200" 
 : "hover:bg-gray-100"
}`}
        >
          {item.title}
        </div>
      ))}

    </div>
  )}



  {/* No Product */}
  {notFound && (
    <p className="absolute top-full left-0 mt-2 text-red-400 text-sm bg-[#071a2f] px-3 py-1 rounded">
      No Product Found 😕
    </p>
  )}

</div>



          {/* Wishlist ❤️ */}
          <Link to="/wishlist" className="relative">

            <Heart
              className="w-7 h-7 text-white hover:text-red-500 transition"
            />

            {wishlistItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {wishlistItems.length}
              </span>
            )}

          </Link>




          {/* Cart */}
          <Link to="/cart" className="relative">

            <ShoppingCart className="w-7 h-7 text-white hover:text-[#14B8A6] transition"/>

            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#14B8A6] text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}

          </Link>




          {/* User */}
          <div className="flex items-center gap-3">

          {user ? (
            <>
              <Link
                to="/profile"
                className="text-white px-6 uppercase font-semibold hover:text-cyan-400"
              >
                {user.name}
              </Link>


              <button
                onClick={logout}
                className="px-5 py-2 rounded-full bg-red-500 text-white hover:bg-red-600 cursor-pointer"
              >
                Logout
              </button>
            </>
          ) : (

            <>
              <Link to="/login">
                <button className="px-6 py-2 rounded-full border-2 border-[#14B8A6] text-[#14B8A6] font-semibold hover:bg-[#14B8A6] hover:text-white">
                  Login
                </button>
              </Link>


              <Link to="/register">
                <button className="px-5 py-2 rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white">
                  Signup
                </button>
              </Link>
            </>
          )}

          </div>


        </div>
      </div>
    </nav>
  );
};

export default Navbar;