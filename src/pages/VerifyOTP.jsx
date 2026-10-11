import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import API from "../api";

export default function VerifyOTP() {
  const navigate = useNavigate();
  const location = useLocation();

  const email =
    location.state?.email || localStorage.getItem("resetEmail") || "";

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Please request a new OTP first.");
      return;
    }

    setLoading(true);

    try {
      await API.post("/verify-otp", {
        email,
        otp: otp.trim(),
      });

      navigate("/reset-password", {
        state: { email },
      });
    } catch (err) {
      setError(
        err.response?.data?.message || "OTP verification failed."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!email) {
      setError("Please return to Forgot Password and enter your email.");
      return;
    }

    setError("");
    setResending(true);

    try {
      await API.post("/forgot-password", { email });
      setOtp("");
      setError("A new OTP has been sent to your email.");
    } catch (err) {
      setError(
        err.response?.data?.message || "Could not resend OTP."
      );
    } finally {
      setResending(false);
    }
  };

  if (!email) {
    return (
      <main className="flex min-h-[85vh] items-center justify-center bg-[#07111f] px-4 text-white">
        <div className="max-w-md rounded-2xl border border-white/10 bg-[#0b1727] p-7 text-center">
          <h1 className="text-2xl font-bold">Request an OTP first</h1>
          <p className="mt-3 text-sm text-slate-400">
            Enter your email address to receive a verification code.
          </p>
          <Link
            to="/forgot-password"
            className="mt-6 inline-block font-semibold text-teal-300"
          >
            Go to Forgot Password →
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-[85vh] items-center justify-center bg-[#07111f] px-4 py-12 text-white">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#0b1727] p-7 shadow-2xl sm:p-9">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-300/10 text-2xl text-teal-300">
          #
        </div>

        <p className="mt-6 text-center text-sm font-bold uppercase tracking-widest text-teal-300">
          Email Verification
        </p>

        <h1 className="mt-3 text-center text-3xl font-extrabold">
          Verify Your OTP
        </h1>

        <p className="mt-3 break-words text-center text-sm leading-6 text-slate-400">
          Enter the 6-digit code sent to <span className="text-teal-300">{email}</span>.
          The code expires in 10 minutes.
        </p>

        <form onSubmit={handleVerify} className="mt-8 space-y-5">
          <div>
            <label htmlFor="otp" className="mb-2 block text-sm font-medium">
              6-digit OTP
            </label>

            <input
              id="otp"
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={6}
              pattern="[0-9]{6}"
              value={otp}
              onChange={(e) => {
                setOtp(e.target.value.replace(/\D/g, "").slice(0, 6));
                setError("");
              }}
              placeholder="Enter OTP"
              required
              className="w-full rounded-xl border border-white/10 bg-[#07111f] px-4 py-4 text-center text-2xl tracking-[0.5em] outline-none focus:border-teal-300"
            />
          </div>

          {error && (
            <p role="alert" className="rounded-xl bg-amber-400/10 p-3 text-sm text-amber-200">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || otp.length !== 6}
            className="w-full rounded-xl bg-gradient-to-r from-teal-300 to-cyan-300 px-4 py-3.5 font-bold text-[#07111f] disabled:opacity-60"
          >
            {loading ? "Verifying..." : "Verify OTP →"}
          </button>
        </form>

        <button
          type="button"
          onClick={handleResend}
          disabled={resending}
          className="mt-5 w-full text-sm font-semibold text-teal-300 disabled:opacity-60"
        >
          {resending ? "Sending..." : "Resend OTP"}
        </button>

        <p className="mt-5 text-center text-sm text-slate-400">
          <Link to="/forgot-password" className="text-teal-300">
            Change email address
          </Link>
        </p>
      </div>
    </main>
  );
}