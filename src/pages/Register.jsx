
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import API from "../api";
import { auth, googleProvider } from "./Firebase";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      await API.post("/register", {
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        password: form.password,
      });

      navigate("/login", {
        state: {
          message: "Account created successfully! Please log in.",
        },
      });
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    setLoading(true);

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const idToken = await result.user.getIdToken();

      const response = await API.post("/google-login", { idToken });
      const { token, user } = response.data;

      if (!token || !user) {
        throw new Error("Login response is incomplete.");
      }

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      navigate("/home", { replace: true });
    } catch (err) {
      console.error("Google sign-in error:", err);

      setError(
        err.response?.data?.message ||
          (err.code === "auth/popup-closed-by-user"
            ? "Google sign-in was cancelled."
            : err.code === "auth/unauthorized-domain"
            ? "This domain is not authorized in Firebase."
            : err.message || "Google sign-in failed. Please try again.")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-[85vh] items-center justify-center overflow-hidden px-4 py-14 sm:px-6">
      <div className="pointer-events-none absolute left-0 top-10 h-72 w-72 rounded-full bg-teal-400/10 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-[100px]" />

      <div className="relative grid w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-[#0b1727] shadow-2xl shadow-black/30 md:grid-cols-2">
       
        <section className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-teal-400/15 via-[#0b1727] to-cyan-400/10 p-10 md:flex">
          <div>
            <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-300 text-2xl font-black text-[#07111f]">
              S
            </div>

            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-teal-300">
              Your future starts here
            </p>

            <h1 className="text-4xl font-extrabold leading-tight text-white">
              Make your
              <br />
              ambitions
              <br />
              <span className="text-teal-300">possible.</span>
            </h1>

            <p className="mt-5 max-w-sm leading-7 text-slate-400">
              Discover scholarship opportunities that match your education,
              goals and financial needs.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <p className="text-sm leading-6 text-slate-300">
              Your next opportunity could change your entire future.
            </p>
            <p className="mt-3 text-xs font-semibold text-teal-300">
              SCHOLARSHIPMATCH AI · PAKISTAN
            </p>
          </div>
        </section>

       
        <section className="p-6 sm:p-10">
          <Link
            to="/"
            className="text-sm font-medium text-slate-400 transition hover:text-teal-300"
          >
            ← Back to home
          </Link>

          <div className="mb-8 mt-8">
            <p className="text-sm font-semibold text-teal-300">
              CREATE YOUR ACCOUNT
            </p>

            <h2 className="mt-2 text-3xl font-extrabold text-white">
              Join ScholarshipMatch
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              Create your student account to start exploring opportunities.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-slate-200"
              >
                Full name
              </label>

              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Enter your full name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-white/10 bg-[#07111f] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-teal-300/60 focus:ring-2 focus:ring-teal-300/10"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-slate-200"
              >
                Email address
              </label>

              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-white/10 bg-[#07111f] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-teal-300/60 focus:ring-2 focus:ring-teal-300/10"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-slate-200"
              >
                Password
              </label>

              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="At least 8 characters"
                value={form.password}
                onChange={handleChange}
                minLength={8}
                required
                className="w-full rounded-xl border border-white/10 bg-[#07111f] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-teal-300/60 focus:ring-2 focus:ring-teal-300/10"
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-sm font-medium text-slate-200"
              >
                Confirm password
              </label>

              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="Enter your password again"
                value={form.confirmPassword}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-white/10 bg-[#07111f] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-teal-300/60 focus:ring-2 focus:ring-teal-300/10"
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
              <p
                role="alert"
                className="rounded-xl border border-amber-400/20 bg-amber-400/5 px-4 py-3 text-sm leading-6 text-amber-200"
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-gradient-to-r from-teal-300 to-cyan-300 px-4 py-3.5 font-bold text-[#07111f] shadow-lg shadow-teal-500/10 transition hover:-translate-y-0.5 hover:shadow-teal-400/20 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Please wait..." : "Create Student Account →"}
            </button>
          </form>

        
          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-xs font-medium text-slate-500">
              OR CONTINUE WITH
            </span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading}
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-white/10 bg-white px-4 py-3.5 font-semibold text-slate-800 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <svg
              viewBox="0 0 48 48"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path
                fill="#4285F4"
                d="M43.6 24.5c0-1.4-.1-2.8-.4-4.1H24v7.8h11a9.4 9.4 0 0 1-4.1 6.2v5.1h6.6c3.9-3.6 6.1-8.8 6.1-15Z"
              />
              <path
                fill="#34A853"
                d="M24 44c5.5 0 10.1-1.8 13.5-4.8l-6.6-5.1c-1.8 1.2-4.1 2-6.9 2-5.3 0-9.8-3.6-11.4-8.4H5.8v5.3A20 20 0 0 0 24 44Z"
              />
              <path
                fill="#FBBC05"
                d="M12.6 27.7a12 12 0 0 1 0-7.5v-5.3H5.8a20 20 0 0 0 0 18.1l6.8-5.3Z"
              />
              <path
                fill="#EA4335"
                d="M24 11.8c3 0 5.7 1 7.8 3.1l5.8-5.8A19.4 19.4 0 0 0 24 4 20 20 0 0 0 5.8 14.9l6.8 5.3c1.6-4.8 6.1-8.4 11.4-8.4Z"
              />
            </svg>

            {loading ? "Please wait..." : "Continue with Google"}
          </button>

          <p className="mt-7 text-center text-sm text-slate-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-bold text-teal-300 transition hover:text-cyan-200"
            >
              Log in
            </Link>
          </p>

          <p className="mt-6 text-center text-xs leading-5 text-slate-500">
            Your account details are handled by the application backend.
          </p>
        </section>
      </div>
    </main>
  );
}
