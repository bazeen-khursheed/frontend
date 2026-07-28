import React from "react";
import { FaShippingFast, FaLock, FaHeadset, FaBox } from "react-icons/fa";
import Navbar from "./Navbar";

const About = () => {
  return (
    <div className="bg-slate-100 min-h-screen">

      <Navbar />

      {/* Hero Section */}
      <div className="bg-[#071a2f] text-white py-20 text-center">
        <h1 className="text-5xl font-black mb-5">
          Bazeen
          <span className="text-teal-400"> Store</span>
        </h1>

        <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Your one-stop destination for trendy fashion, accessories,
          and everyday essentials. We focus on quality, affordability,
          and creating a smooth online shopping experience.
        </p>
      </div>



      {/* About Content */}
      <div className="max-w-7xl mx-auto px-8 py-20 grid md:grid-cols-2 gap-12 items-center">


        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d"
            alt="store"
            className="rounded-3xl shadow-2xl w-full h-[420px] object-cover"
          />

          <div className="absolute -bottom-6 -right-6 bg-teal-500 text-white px-8 py-5 rounded-2xl shadow-xl">
            <h3 className="text-3xl font-bold">
              100%
            </h3>
            <p>
              Customer Focus
            </p>
          </div>

        </div>



        <div>

          <h2 className="text-4xl font-black text-[#071a2f] mb-5">
            Our <span className="text-teal-500">Story</span>
          </h2>


          <p className="text-gray-600 leading-relaxed mb-5 text-lg">
            Bazeen Store was created with the goal of making online
            shopping simple, reliable, and enjoyable. We carefully
            select products that combine style, quality, and value.
          </p>


          <p className="text-gray-600 leading-relaxed text-lg">
            Our mission is to provide customers with a seamless
            ecommerce experience where they can find everything they
            need in one place.
          </p>


          <button className="mt-8 px-8 py-3 rounded-full text-white font-semibold
          bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500
          hover:scale-105 transition">
            Explore Products
          </button>


        </div>

      </div>





      {/* Features */}
      <div className="bg-white py-20">


        <h2 className="text-4xl font-black text-center text-[#071a2f] mb-14">
          Why Choose <span className="text-teal-500">Us</span>
        </h2>



        <div className="grid md:grid-cols-4 gap-8 max-w-7xl mx-auto px-8">


          <div className="text-center p-8 rounded-3xl shadow-xl hover:-translate-y-2 transition bg-slate-50">
            <FaShippingFast className="text-5xl text-teal-500 mx-auto mb-5"/>
            <h3 className="font-bold text-xl text-[#071a2f]">
              Fast Delivery
            </h3>
            <p className="text-gray-500 mt-3">
              Quick and reliable delivery for all orders.
            </p>
          </div>



          <div className="text-center p-8 rounded-3xl shadow-xl hover:-translate-y-2 transition bg-slate-50">
            <FaLock className="text-5xl text-emerald-500 mx-auto mb-5"/>
            <h3 className="font-bold text-xl text-[#071a2f]">
              Secure Payment
            </h3>
            <p className="text-gray-500 mt-3">
              Your transactions are always safe and protected.
            </p>
          </div>




          <div className="text-center p-8 rounded-3xl shadow-xl hover:-translate-y-2 transition bg-slate-50">
            <FaHeadset className="text-5xl text-cyan-500 mx-auto mb-5"/>
            <h3 className="font-bold text-xl text-[#071a2f]">
              24/7 Support
            </h3>
            <p className="text-gray-500 mt-3">
              Our team is always ready to help you.
            </p>
          </div>




          <div className="text-center p-8 rounded-3xl shadow-xl hover:-translate-y-2 transition bg-slate-50">
            <FaBox className="text-5xl text-purple-500 mx-auto mb-5"/>
            <h3 className="font-bold text-xl text-[#071a2f]">
              Quality Products
            </h3>
            <p className="text-gray-500 mt-3">
              Carefully selected high quality products.
            </p>
          </div>



        </div>

      </div>





      {/* Stats */}
      <div className="bg-[#071a2f] text-white py-20">

        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 text-center gap-10">


          <div>
            <h2 className="text-4xl font-black text-teal-400">
              500+
            </h2>
            <p className="text-gray-300 mt-2">
              Products
            </p>
          </div>


          <div>
            <h2 className="text-4xl font-black text-teal-400">
              1000+
            </h2>
            <p className="text-gray-300 mt-2">
              Happy Customers
            </p>
          </div>


          <div>
            <h2 className="text-4xl font-black text-teal-400">
              24/7
            </h2>
            <p className="text-gray-300 mt-2">
              Support
            </p>
          </div>


          <div>
            <h2 className="text-4xl font-black text-teal-400">
              5★
            </h2>
            <p className="text-gray-300 mt-2">
              Customer Rating
            </p>
          </div>


        </div>

      </div>


    </div>
  );
};

export default About;