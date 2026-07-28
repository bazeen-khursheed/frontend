import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ShoppingBag, LogOut, User } from "lucide-react";
import { CartContext } from "./CartContext";

const ProfileSidebar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const { clearCart } = useContext(CartContext);

 const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  localStorage.removeItem("cart"); // 👈 ye add karo
  navigate("/Register");
};

  return (
   <div className="fixed top-20 left-0 w-72 h-[calc(100vh-80px)] bg-gradient-to-b from-[#071a2f] via-[#0c2f52] to-[#0e7490] shadow-2xl flex flex-col">
      {/* Profile */}
      <div className="flex flex-col items-center pt-10 pb-8 border-b border-white/20">

        <div className="w-28 h-28 rounded-full bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 flex justify-center items-center text-5xl font-bold text-white shadow-[0_0_35px_rgba(45,212,191,0.6)] border-4 border-white">
          {user?.name?.charAt(0).toUpperCase()}
        </div>

        <h2 className="mt-5 text-2xl font-bold text-white">
          {user?.name}
        </h2>

        <p className="text-gray-300 text-sm mt-1">
          {user?.email}
        </p>

      </div>

      {/* Menu */}
      <div className="px-5 mt-10 space-y-4">
       <NavLink
  to="/profile"
  className={({ isActive }) =>
    `flex items-center gap-4 p-4 rounded-xl duration-300 ${
      isActive
        ? "bg-white text-[#071a2f] shadow-lg font-semibold"
        : "text-white hover:bg-white/20"
    }`
  }
>
  <User size={24} />
  <span>Profile</span>
</NavLink>
        <NavLink
          to="/orderhistory"
          className={({ isActive }) =>
            `flex items-center gap-4 p-4 rounded-xl duration-300 ${
              isActive
                ? "bg-white text-[#071a2f] shadow-lg font-semibold"
                : "text-white hover:bg-white/20"
            }`
          }
        >
          <ShoppingBag size={24} />
          <span>Order History</span>
        </NavLink>

      </div>

      {/* Logout */}
      <div className="mt-auto px-5 pb-8">

        <button
          onClick={logout}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-4 rounded-xl flex items-center justify-center gap-3 text-lg font-semibold transition-all duration-300 hover:scale-105"
        >
          <LogOut size={24} />
          Logout
        </button>

      </div>

    </div>
  );
};

export default ProfileSidebar;