import React from "react";

const Hero = () => {
  return (
    <section className="bg-gradient-to-r from-[#0f172a] via-[#0b2545] to-[#020617] text-white py-20 px-10">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 items-center gap-10">

        {/* Left Side */}
        <div>
          <h1 className="text-5xl font-bold leading-tight mb-6">
            Discover Amazing <span className="text-teal-400">Products</span>
          </h1>

          <p className="text-gray-300 mb-6 text-lg">
            Shop the latest gadgets, fashion and daily essentials all in one
            place with the best deals and fastest delivery.
          </p>

          <div className="flex gap-4">
            <button className="bg-gradient-to-r from-green-400 to-cyan-500 px-6 py-3 rounded-lg font-semibold hover:scale-105 transition">
              Shop Now
            </button>

            <button className="border border-teal-400 px-6 py-3 rounded-lg hover:bg-teal-500 hover:text-white transition">
              Explore Products
            </button>
          </div>

          {/* Discount badge */}
          <div className="mt-6 text-teal-400 font-semibold">
            🔥 Up to 50% OFF on selected items
          </div>
        </div>

        {/* Right Side */}
        <div className="relative flex justify-center">

          <img
            src="https://previews.123rf.com/images/maximleshkovich/maximleshkovich1706/maximleshkovich170600229/80132950-trendy-fashion-black-styled-woman-clothes-and-accessories-collection-on-white-background-flat-lay.jpg"
            alt="product"
            className="w-[420px] rounded-xl shadow-2xl"
          />

          

          {/* Floating Card 2 */}
          <div className="absolute bottom-0 right-0 bg-white text-black p-3 rounded-lg shadow-lg">
            <p className="font-bold">New Fashion</p>
            <p className="text-sm text-gray-500">Trending</p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;