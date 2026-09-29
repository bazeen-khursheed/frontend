import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const VerifyOTP = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const email = localStorage.getItem("resetEmail");

      await axios.post(
        "http://localhost:8080/verify-otp",
        //  "https://backend-2p6c.vercel.app/verify-otp",
        {
          email,
          otp
        }
      );

      alert("OTP verified successfully!");

      navigate("/reset-password");

    } catch (error) {
      console.log(error);

     alert(
  error.response?.data?.message ||
  error.message ||
  "OTP verification failed!"
);

console.log("OTP ERROR:", error.response?.data || error);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-200">

      <div className="bg-white w-[400px] p-[25px] rounded-[8px] shadow-[0_0_30px_rgba(0,0,0,0.2)]">

        <h2 className="text-[24px] font-bold text-[#071a2f] text-center mb-[10px]">
          Verify OTP
        </h2>

        <p className="text-center text-gray-600 text-[14px] mb-[25px]">
          Enter the 6-digit OTP sent to your email
        </p>

        <form onSubmit={handleSubmit}>

          <label className="text-[15px] font-semibold block mb-[5px]">
            OTP Code
          </label>

          <input
            type="text"
            maxLength="6"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            className="w-full p-[10px] rounded-[6px] border border-[#071a2f] mb-[20px] text-center tracking-[8px]"
          />

          <button
            type="submit"
            className="w-full p-[10px] bg-[#071a2f] text-white rounded-[8px] cursor-pointer text-[16px]"
          >
            Verify OTP
          </button>

        </form>

        <div className="text-center mt-[20px]">

          <Link
            to="/forgot-password"
            className="text-black font-semibold no-underline text-[14px]"
          >
            Back to Forgot Password
          </Link>

        </div>

      </div>

    </div>
  );
};

export default VerifyOTP;