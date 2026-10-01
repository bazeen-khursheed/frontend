import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const email = localStorage.getItem("resetEmail");

      await axios.post(
        // "http://localhost:8080/reset-password",
         "https://backend-2p6c.vercel.app/reset-password",
        {
          email,
          password
        }
      );

      alert("Password reset successfully!");

      localStorage.removeItem("resetEmail");

      navigate("/login");

    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
        "Something went wrong!"
      );
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-200">

      <div className="bg-white w-[400px] p-[25px] rounded-[8px] shadow-[0_0_30px_rgba(0,0,0,0.2)]">

        <h2 className="text-[24px] font-bold text-[#071a2f] text-center mb-[10px]">
          Reset Password
        </h2>

        <p className="text-center text-gray-600 text-[14px] mb-[25px]">
          Enter your new password
        </p>

        <form onSubmit={handleSubmit}>

          <label className="text-[15px] font-semibold block mb-[5px]">
            New Password
          </label>

          <input
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-[10px] rounded-[6px] border border-[#071a2f] mb-[15px]"
          />

          <label className="text-[15px] font-semibold block mb-[5px]">
            Confirm Password
          </label>

          <input
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full p-[10px] rounded-[6px] border border-[#071a2f] mb-[20px]"
          />

          <button
            type="submit"
            className="w-full p-[10px] bg-[#071a2f] text-white rounded-[8px] cursor-pointer text-[16px]"
          >
            Reset Password
          </button>

        </form>

        <div className="text-center mt-[20px]">

          <Link
            to="/login"
            className="text-black font-semibold no-underline text-[14px]"
          >
            Back to Login
          </Link>

        </div>

      </div>

    </div>
  );
};

export default ResetPassword;