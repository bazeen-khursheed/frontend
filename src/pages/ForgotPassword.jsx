// 


import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      alert("Please enter your email!");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:8080/forgot-password",
        {
          email: email.trim()
        }
      );

      console.log("OTP RESPONSE:", response.data);

      localStorage.setItem("resetEmail", email.trim());

      alert("OTP sent to your email!");

      navigate("/verify-otp");

    } catch (error) {
      console.log("OTP ERROR:", error);

      alert(
        error.response?.data?.message ||
        error.message ||
        "Failed to send OTP!"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-200">

      <div className="bg-white w-[400px] p-[25px] rounded-[8px] shadow-[0_0_30px_rgba(0,0,0,0.2)]">

        <h2 className="text-[24px] font-bold text-[#071a2f] text-center mb-[10px]">
          Forgot Password
        </h2>

        <p className="text-center text-gray-600 text-[14px] mb-[25px]">
          Enter your email to receive an OTP
        </p>

        <form onSubmit={handleSubmit}>

          <label className="text-[15px] font-semibold block mb-[5px]">
            Email address
          </label>

          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-[10px] rounded-[6px] border border-[#071a2f] mb-[20px]"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full p-[10px] bg-[#071a2f] text-white rounded-[8px] cursor-pointer text-[16px] disabled:opacity-50"
          >
            {loading ? "Sending OTP..." : "Send OTP"}
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

export default ForgotPassword;
