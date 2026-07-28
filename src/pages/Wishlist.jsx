import React, { useContext } from "react";
import Navbar from "./Navbar";
import { WishlistContext } from "./WishlistContext";

const Wishlist = () => {
  const { wishlistItems, removeWishlist } = useContext(WishlistContext);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-100 p-10">
        <h1 className="text-3xl font-bold mb-8">
           Wishlist ❤️
        </h1>

        {wishlistItems.length === 0 ? (
          <h2>No Wishlist Items</h2>
        ) : (
          wishlistItems.map((item) => (
            <div
              key={item._id}
              className="bg-white p-5 rounded-xl shadow mb-4 flex justify-between items-center"
            >
              <div className="flex gap-5 items-center">
                <img
                  src={item.image}
                  className="w-24 h-24"
                  alt=""
                />

                <div>
                  <h2 className="text-[27px] font-[600] ">{item.title}</h2>
                  <p className="text-[20px]">Rs {item.price}</p>
                </div>
              </div>

              <button
                onClick={() => removeWishlist(item._id)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default Wishlist;