

// Products.js
import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { CartContext } from './CartContext';
import { toast } from 'react-hot-toast'; 
import { Heart } from "lucide-react";
import { WishlistContext } from "./WishlistContext";



const Products = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  

  const { addToCart } = useContext(CartContext);
   const { wishlistItems, toggleWishlist } =
     useContext(WishlistContext);

  const getProducts = async () => {
    try {
      const res = await axios.get("http://localhost:8080/product");
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to load products");
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  // Checkout function (Buy Now)
  async function checkout(id) {
    try {
      const item = products.find(item => item._id === id);
      
      const data = await axios.post("http://localhost:8080/create-checkout-link", {
        name: item.title,
        description: item.desc,
        images: [item.image],
        price: item.price,
        quantity: 1
      });

      navigate(data.data.paymentLink.url);
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Checkout failed");
    }
  }

  // Add to Cart handler
  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`${product.title} added to cart!`);
  };

  
  return (
    <>
      <Navbar />
      
      {/* Products Grid */}
      <div className='flex flex-wrap justify-center   gap-6 bg-slate-300 min-h-screen py-10'>
        
        <div className="text-center mt-8 mb-14">


          <h1 className="text-5xl font-black text-[#0b2545]">
  Explore Our <span className="text-teal-400">Collection</span>
</h1>


          <p className="
          text-gray-600
          font-[700]
          mt-4
          ">
             Discover premium products carefully selected for quality, style, and value. <br />
  Shop the latest collections with confidence and enjoy an exceptional shopping experience.
          </p>


        </div>
        <div className= 'flex flex-wrap justify-center   gap-6 bg-slate-300 min-h-screen '>
        {products.map(item => (
          <div
          
  key={item._id}
  
  className="group w-[280px] bg-white rounded-[24px] overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-500"
>
  {/* Top Gradient */}
  <div className="h-3 bg-gradient-to-r from-[#0f172a] via-[#0b2545] to-[#020617]"></div>
 
  {/* Image */}
  <div 
   
     className="bg-white h-56 flex items-center justify-center relative">
    {/* Wishlist */}
     <button
             onClick={() => toggleWishlist(item)}
             className="absolute top-4 right-4 bg-gray-200 cursor-pointer shadow-md p-2 rounded-full hover:scale-110 transition"
           >
             <Heart
               size={22}
               className={
                 wishlistItems.some((p) => p._id === item._id)
                   ? "fill-red-500 text-red-500"
                   : "text-gray-600"
               }
             />
           </button>
    <img
      src={item.image}
      alt={item.title}
      className="h-44 object-contain "
    />
  </div>

  {/* Content */}
  <div
   
  className="p-5 bg-[#071a2f] text-white  -mt-4 relative z-10">
 
    {/* Category */}
   <span className="inline-block px-3 py-1 rounded-full bg-teal-500/20 text-teal-400 text-xs font-semibold mb-3">
   
  {item.category}
</span>

    {/* Title */}
    <h2
     onClick={() => navigate(`/product/${item._id}`)}
      className="text-xl font-bold text-white">
      
  {item.title}
</h2>

    {/* Description */}
    <p
     onClick={() => navigate(`/product/${item._id}`)}
    className="text-gray-300 text-sm mt-2 line-clamp-2">
  {item.desc}
</p>
    {/* Price */}
    <div 
     onClick={() => navigate(`/product/${item._id}`)}
    className="flex justify-between items-center mt-5">
      <div>
        <h3 
         onClick={() => navigate(`/product/${item._id}`)}
        className="text-2xl font-bold text-teal-400">
  Rs {item.price}
</h3>

        <p
         onClick={() => navigate(`/product/${item._id}`)}
        className="text-sm text-gray-400 mt-1">
  Stock : {item.stock}
</p>
      </div>

      
    </div>

    {/* Buttons */}
    <div className="flex gap-3 mt-6">
    <button
  onClick={() => checkout(item._id)}
  className="flex-1 py-2.5 rounded-xl font-semibold text-white
  bg-gradient-to-r
  from-teal-300
  via-teal-400
  to-teal-600
  hover:opacity-90
  transition duration-300 cursor-pointer"
>
  Buy Now
</button>

      <button
        onClick={() => handleAddToCart(item)}
        className="flex-1 py-2.5 rounded-xl border-2 border-teal-400
        text-teal-400 hover:bg-teal-400 hover:text-white
        transition cursor-pointer"
      >
        Add to Cart
      </button>
    </div>
  </div>
</div>

        ))}
        </div>
      </div>
      {/* Footer */}
<footer className="
      bg-gradient-to-r
from-[#071a2f]
via-[#0b2545]
to-[#020617]
      text-gray-300
      py-14
      px-8
      ">


        <div className="
        max-w-7xl
        mx-auto
        grid
        md:grid-cols-4
        gap-10
        ">



          <div>

            <h2 className="
            text-3xl
            font-black
            text-white
            ">

              Bazeen

              <span className="text-teal-400">
                Store
              </span>

            </h2>


            <p className="
            text-gray-400
            mt-4
            ">
              Your premium online shopping destination.
            </p>

          </div>





          <div>

            <h3 className="text-white font-bold mb-4">
              Quick Links
            </h3>

            <p>Home</p>
            <p>Products</p>
            <p>About</p>
            <p>Contact</p>

          </div>





          <div>

            <h3 className="text-white font-bold mb-4">
              Support
            </h3>

            <p>FAQ</p>
            <p>Returns</p>
            <p>Help Center</p>

          </div>





          <div>

            <h3 className="text-white font-bold mb-4">
              Newsletter
            </h3>


            <input
            placeholder="Email Address"
            className="
            w-full
            p-3
            rounded-xl
            bg-[#071a2f]
            border
            border-gray-700
            outline-none
            "
            />

          </div>



        </div>





        <div className="
        text-center
        border-t
        border-gray-700
        mt-10
        pt-5
        ">

          © 2026 Bazeen Store. All rights reserved.

        </div>


      </footer>
    </>
  );



};

export default Products;