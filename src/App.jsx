
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
  Outlet,
} from "react-router-dom";

import Navbar from "./pages/Navbar";
import Home from "./pages/Home";
import Scholarship from "./pages/Scholarship";
import Profile from "./pages/Profile";
import Assistant from "./pages/Assistant";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyOTP from "./pages/VerifyOTP";
import ResetPassword from "./pages/ResetPassword";
import "./index.css";

// Check login
function ProtectedRoute() {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

// Student protected routes
function StudentProtectedRoute() {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

function AppLayout() {
  const location = useLocation();

  const authPages = [
  "/login",
  "/register",
  "/forgot-password",
  "/verify-otp",
  "/reset-password",
];
  const isAuthPage = authPages.includes(location.pathname);

  return (
    <div className="min-h-screen bg-[#07111f] text-slate-100">
      {!isAuthPage && <Navbar />}

      <Routes>
        {/* Default page */}
        <Route
          path="/"
          element={<Navigate to="/register" replace />}
        />
```jsx
{/* Public authentication pages */}
<Route path="/login" element={<Login />} />
<Route path="/register" element={<Register />} />
<Route
  path="/forgot-password"
  element={<ForgotPassword />}
/>
<Route
  path="/verify-otp"
  element={<VerifyOTP />}
/>
<Route
  path="/reset-password"
  element={<ResetPassword />}
/>

{/* All logged-in pages */}
<Route element={<ProtectedRoute />}>
  <Route path="/home" element={<Home />} />
  <Route path="/scholarship" element={<Scholarship />} />
  <Route path="/profile" element={<Profile />} />
  <Route path="/assistant" element={<Assistant />} />

  <Route path="/student" element={<StudentProtectedRoute />}>
    <Route
      index
      element={<Navigate to="/profile" replace />}
    />
  </Route>
</Route>


        {/* All logged-in pages */}
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/scholarship" element={<Scholarship />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/assistant" element={<Assistant />} />
      
          {/* Student-only profile management section */}
          <Route path="/student" element={<StudentProtectedRoute />}>
            <Route
              index
              element={<Navigate to="/profile" replace />}
            />

            {/* Add edit/delete pages here when created */}
            {/* Example:
            <Route
              path="edit-profile"
              element={<EditProfile />}
            />
            */}
          </Route>
        </Route>

        {/* Unknown URLs */}
        <Route
          path="*"
          element={<Navigate to="/login" replace />}
        />
      </Routes>

      {!isAuthPage && (
        <footer className="border-t border-white/10 px-5 py-8 text-center text-sm text-slate-400">
          <p className="font-semibold text-white">
            Scholarship
            <span className="text-teal-300">Match</span> AI 🇵🇰
          </p>

          <p className="mt-2">
            Discover opportunities. Build your future.
          </p>

          <p className="mt-3 text-xs text-slate-500">
            © {new Date().getFullYear()} ScholarshipMatch AI.
            Verify scholarship details with official providers.
          </p>
        </footer>
      )}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}
