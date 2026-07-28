import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import { CartContext } from "./CartContext";
import { useContext } from "react";
const ProductDetail = () => {

  const { id } = useParams();

  const [product, setProduct] = useState({});
const { addToCart } = useContext(CartContext);
  useEffect(() => {
    axios
      .get(`http://localhost:8080/product/${id}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);
console.log(product);
return (
  <>
    <Navbar />

    <div className="h-[calc(100vh-88px)] bg-slate-200 overflow-hidden flex items-center justify-center px-8 py-4">
      <div className="max-w-7xl w-full h-full bg-white rounded-3xl shadow-xl grid md:grid-cols-2 gap-10 overflow-hidden">

        {/* Left */}
        <div className="bg-gray-100 flex items-center justify-center p-8">
          <img
            src={product.image}
            alt={product.title}
            className="w-full max-h-[450px] object-contain"
          />
        </div>

        {/* Right */}
        <div className="flex flex-col justify-center px-10">

          <span className="inline-block w-fit bg-teal-100 text-teal-600 px-6 py-2 rounded-full text-lg font-semibold">
            {product.category}
          </span>

          <h1 className="text-4xl font-bold uppercase mt-8">
            {product.title}
          </h1>

          <p className="text-gray-600 text-xl leading-9 mt-6">
            {product.desc}
          </p>

          <h2 className="text-4xl font-bold text-teal-500 mt-8">
            Rs {product.price}
          </h2>

          <p className="text-lg text-gray-700 mt-4">
            <span className="font-semibold">Stock:</span> {product.stock}
          </p>

          <div className="flex gap-4 mt-10">
            <button className="px-10 py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-teal-300 via-teal-400 to-teal-600 hover:opacity-90 transition cursor-pointer">
              Buy Now
            </button>
<button
  onClick={() => addToCart(product)}
  className="px-10 py-3 rounded-xl border-2 border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition cursor-pointer"
>
  Add to Cart
</button>
          </div>

        </div>

      </div>
    </div>
  </>
);
};

export default ProductDetail;