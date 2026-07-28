import React, { useContext } from "react";
import Navbar from "./Navbar";
import { CartContext } from "./CartContext";
import ProfileSidebar from "./ProfileSidebar";

const OrderHistory = () => {
  const { cartItems } = useContext(CartContext);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <>
      <Navbar />
     <div className="min-h-screen bg-slate-100 pl-72">

        {/* Sidebar */}
        <ProfileSidebar />

        {/* Right Side */}
        <div className="flex-1 p-10">

          <h1 className="text-3xl font-bold mb-8">
            Order History
          </h1>

          {cartItems.length === 0 ? (
            <p className="text-gray-500 text-lg">
              No Orders Found
            </p>
          ) : (
            <div className="space-y-5">

              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-xl shadow-md p-5 flex items-center justify-between"
                >
                  <div className="flex items-center gap-5">

                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-24 h-24 object-cover rounded-lg"
                    />

                    <div>
                      <h2 className="text-xl font-bold">
                        {item.title}
                      </h2>

                      <p className="text-gray-500">
                        Quantity : {item.quantity}
                      </p>

                      <p className="text-green-600 font-semibold">
                        Rs. {item.price}
                      </p>
                    </div>

                  </div>

                  <h2 className="text-xl font-bold text-blue-600">
                    Rs. {item.price * item.quantity}
                  </h2>

                </div>
              ))}

              <div className="bg-white p-5 rounded-xl shadow-md flex justify-between text-2xl font-bold">
                <span>Total</span>
                <span>Rs. {totalPrice}</span>
              </div>

            </div>
          )}

        </div>

      </div>
    </>
  );
};

export default OrderHistory;