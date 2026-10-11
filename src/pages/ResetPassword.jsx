import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import API from "../api";

export default function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();

  const email =
    location.state?.email || localStorage.getItem("resetEmail") || "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Please start the password reset process again.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await API.post("/reset-password", {
        email,
        password,
      });

      localStorage.removeItem("resetEmail");

      navigate("/login", {
        replace: true,
        state: {
          message:
            response.data.message ||
            "Password changed successfully. Please log in.",
        },
      });
    } catch (err) {
      setError(
        err.response?.data?.message || "Could not reset password."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!email) {
    return (
      <main className="flex min-h-[85vh] items-center justify-center bg-[#07111f] px-4 text-white">
        <div className="max-w-md rounded-2xl border border-white/10 bg-[#0b1727] p-7 text-center">
          <h1 className="text-2xl font-bold">Password reset required</h1>
          <p className="mt-3 text-sm text-slate-400">
            Please request an OTP and verify it before resetting your password.
          </p>
          <Link
            to="/forgot-password"
            className="mt-6 inline-block font-semibold text-teal-300"
          >
            Start password reset →
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-[85vh] items-center justify-center bg-[#07111f] px-4 py-12 text-white">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#0b1727] p-7 shadow-2xl sm:p-9">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-300/10 text-2xl text-teal-300">
          🔐
        </div>

        <p className="mt-6 text-center text-sm font-bold uppercase tracking-widest text-teal-300">
          Secure Your Account
        </p>

        <h1 className="mt-3 text-center text-3xl font-extrabold">
          Create New Password
        </h1>

        <p className="mt-3 break-words text-center text-sm leading-6 text-slate-400">
          Set a new password for {email}.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-medium">
              New password
            </label>

            <input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 8 characters"
              required
              className="w-full rounded-xl border border-white/10 bg-[#07111f] px-4 py-3.5 text-sm outline-none focus:border-teal-300"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="mb-2 block text-sm font-medium">
              Confirm new password
            </label>

            <input
              id="confirmPassword"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              minLength={8}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Enter password again"
              required
              className="w-full rounded-xl border border-white/10 bg-[#07111f] px-4 py-3.5 text-sm outline-none focus:border-teal-300"
            />
          </div>

          <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-400">
            <input
              type="checkbox"
              checked={showPassword}
              onChange={(e) => setShowPassword(e.target.checked)}
              className="accent-teal-300"
            />
            Show password
          </label>

          {error && (
            <p role="alert" className="rounded-xl bg-red-400/10 p-3 text-sm text-red-300">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-gradient-to-r from-teal-300 to-cyan-300 px-4 py-3.5 font-bold text-[#07111f] disabled:opacity-60"
          >
            {loading ? "Updating Password..." : "Reset Password →"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-400">
          <Link to="/login" className="text-teal-300">
            Back to Login
          </Link>
        </p>
      </div>
    </main>
  );
}