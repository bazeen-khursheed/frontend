import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import CreateProduct from "./pages/CreateProduct";
import ProductList from "./pages/ProductList";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoutes from "./pages/ProtectedRoutes";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Navbar from "./pages/Navbar";
import Cart from "./pages/Cart";

import About from "./pages/About";
import Contact from "./pages/Contact";
import { CartProvider } from "./pages/CartContext";
import { WishlistProvider } from "./pages/WishlistContext";

import Profile from "./pages/Profile";
import ProfileSidebar from "./pages/ProfileSidebar";
import OrderHistory from "./pages/OrderHistory";
import Wishlist from "./pages/Wishlist";
import ProductDetail from "./pages/ProductDetail";

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <WishlistProvider>

          <Routes>

            <Route path="/" element={<Register />} />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/contact" element={<Contact/>} />
<Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />

            {/* ❤️ Wishlist Page */}
            <Route path="/wishlist" element={<Wishlist />} />


            <Route
              path="/dashboard"
              element={
                <ProtectedRoutes>
                  <Dashboard />
                </ProtectedRoutes>
              }
            />

            <Route
              path="/create-product"
              element={
                <ProtectedRoutes>
                  <CreateProduct />
                </ProtectedRoutes>
              }
            />

            <Route
              path="/product-list"
              element={
                <ProtectedRoutes>
                  <ProductList />
                </ProtectedRoutes>
              }
            />
         
          

            <Route path="/profile" element={<Profile />} />
            <Route path="/profilesidebar" element={<ProfileSidebar />} />
            <Route path="/orderhistory" element={<OrderHistory />} />


          </Routes>

        </WishlistProvider>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;