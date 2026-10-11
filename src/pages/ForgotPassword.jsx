import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    const normalizedEmail = email.trim().toLowerCase();

    try {
      const response = await API.post("/forgot-password", {
        email: normalizedEmail,
      });

      localStorage.setItem("resetEmail", normalizedEmail);

      navigate("/verify-otp", {
        state: { email: normalizedEmail },
      });
    } catch (err) {
      setError(
        err.response?.data?.message || "Could not send OTP. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-[85vh] items-center justify-center bg-[#07111f] px-4 py-12 text-white">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#0b1727] p-7 shadow-2xl sm:p-9">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-300/10 text-teal-300">
          <span className="text-2xl">✉</span>
        </div>

        <p className="mt-6 text-center text-sm font-bold uppercase tracking-widest text-teal-300">
          Account Recovery
        </p>

        <h1 className="mt-3 text-center text-3xl font-extrabold">
          Forgot Password?
        </h1>

        <p className="mt-3 text-center text-sm leading-6 text-slate-400">
          Enter your registered email address. We will send you a verification
          code to reset your password.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium">
              Email address
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
              required
              className="w-full rounded-xl border border-white/10 bg-[#07111f] px-4 py-3.5 text-sm outline-none focus:border-teal-300"
            />
          </div>

          {error && (
            <p role="alert" className="rounded-xl bg-red-400/10 p-3 text-sm text-red-300">
              {error}
            </p>
          )}

          {message && (
            <p role="status" className="text-sm text-teal-300">
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-gradient-to-r from-teal-300 to-cyan-300 px-4 py-3.5 font-bold text-[#07111f] disabled:opacity-60"
          >
            {loading ? "Sending OTP..." : "Send Verification Code →"}
          </button>
        </form>

        <p className="mt-7 text-center text-sm text-slate-400">
          Remember your password?{" "}
          <Link to="/login" className="font-semibold text-teal-300">
            Back to Login
          </Link>
        </p>
      </div>
    </main>
  );
}