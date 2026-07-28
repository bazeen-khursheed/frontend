import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import ProfileSidebar from "./ProfileSidebar";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/register");
  };

 return (
  <>
    <Navbar />

    <div className="h-[calc(100vh-88px)] bg-slate-100 flex overflow-hidden">

      {/* Sidebar */}
      <ProfileSidebar />

      {/* Profile Section */}
      <div className="flex-1 ml-[270px] flex items-center justify-center p-6 overflow-hidden">

        <div className="w-[490px] bg-white rounded-4xl shadow-2xl overflow-hidden">

          {/* Top Section */}
          <div className="bg-[#071a2f] h-40 flex justify-center items-center relative">

            <div className="w-32 h-32 rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 flex justify-center items-center text-white text-5xl font-bold border-4 border-white absolute -bottom-16">
              {user?.name?.charAt(0).toUpperCase()}
            </div>

          </div>

          {/* Profile Info */}
          <div className="pt-15 pb-6 px-8">

            <h1 className="text-3xl font-bold text-center text-[#071a2f]">
              {user?.name}
            </h1>

            <p className="text-center text-gray-500 mt-1">
              Welcome to your profile
            </p>

            <div className="mt-4 space-y-3">

              <div className="bg-slate-100 rounded-xl p-2">
                <h3 className="text-gray-500 text-sm">Name</h3>
                <p className="text-lg font-semibold">{user?.name}</p>
              </div>

              <div className="bg-slate-100 rounded-xl p-2">
                <h3 className="text-gray-500 text-sm">Email</h3>
                <p className="text-lg font-semibold">{user?.email}</p>
              </div>

              <div className="bg-slate-100 rounded-xl p-2">
                <h3 className="text-gray-500 text-sm">Phone Number</h3>
                <p className="text-lg font-semibold">{user?.phone}</p>
              </div>

              <div className="bg-slate-100 rounded-xl p-2">
                <h3 className="text-gray-500 text-sm">Password</h3>
                <p className="text-lg font-semibold">********</p>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  </>
);
};

export default Profile;