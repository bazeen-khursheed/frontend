// Cart.js
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from './CartContext';
import { Trash2, Plus, Minus, ArrowLeft } from 'lucide-react';
import Navbar from './Navbar';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const Cart = () => {
  const { cartItems, cartTotal, updateQuantity, removeFromCart, clearCart } = useContext(CartContext);

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      toast.error("Cart is empty!");
      return;
    }

    try {
      toast.loading("Redirecting to payment...", { id: 'checkout' });

      // 🔍 Debug (optional but useful)
      console.log("Cart Items:", cartItems);
console.log(cartItems);

      const res = await axios.post("https://backend-2p6c.vercel.app/checkout", {
        items: cartItems
      });
      console.log(res);
      

      // toast.dismiss('checkout');
      // toast.success("Redirecting to Stripe...");

      // // ✅ Redirect to Stripe
      window.location.href = res.data.paymentLink.url;

    } catch (err) {
      toast.dismiss('checkout');
      toast.error("Checkout failed!");

      // ✅ BETTER ERROR LOGGING (IMPORTANT FIX)
      console.error("Checkout Error:", err.response?.data || err.message);
    }
  };

  if (cartItems.length === 0) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-slate-200 flex flex-col items-center justify-center">
          <div className="bg-white p-12 rounded-2xl shadow-xl text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Your Cart is Empty</h2>
            <p className="text-gray-600 mb-8">Add some products to your cart and come back!</p>
            <Link to="/products">
              <button className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition">
                Continue Shopping
              </button>
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-slate-200 py-10">
        <div className="max-w-[1500px] mx-auto px-4">

          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Shopping Cart</h1>
            <button
              onClick={clearCart}
              className="text-red-500 hover:text-red-700 font-semibold flex items-center gap-2"
            >
              <Trash2 size={20} />
              Clear Cart
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
              
                <div key={item._id} className="bg-white rounded-xl shadow-lg p-6 flex flex-col sm:flex-row gap-6">

                  <div className="sm:w-32 h-32 flex-shrink-0 ">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className="flex-grow">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800">{item.title}</h3>
                        <p className="text-gray-600 text-[18px] mt-1 line-clamp-2">{item.desc}</p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <p className="text-lg font-bold text-teal-600">Rs {item.price}</p>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item._id, item.quantity - 1)}
                            className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition"
                          >
                            <Minus size={16} />
                          </button>

                          <span className="w-8 text-center font-semibold">{item.quantity}</span>

                          <button
                            onClick={() => updateQuantity(item._id, item.quantity + 1)}
                            className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </div>

                      <p className="text-lg font-bold text-gray-800">
                        Rs {(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>

                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item._id} className="flex justify-between text-gray-600">
                      <span>{item.title} x {item.quantity}</span>
                      <span>Rs {(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}

                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <div className="flex justify-between text-lg font-bold text-gray-800">
                      <span>Total:</span>
                      <span className="text-teal-600">Rs {cartTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  <button
                    onClick={handleCheckout}
                    className="w-full cursor-pointer bg-gradient-to-r from-emerald-500 to-cyan-500 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition mt-6"
                  >
                    Proceed to Checkout
                  </button>

                  <Link to="/products">
                    <button className="w-full border border-teal-500 text-teal-500 py-3 cursor-pointer rounded-lg font-semibold hover:bg-teal-50 transition flex items-center justify-center gap-2 mt-3">
                      <ArrowLeft size={20} />
                      Continue Shopping
                    </button>
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;