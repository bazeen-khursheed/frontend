import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaBox, FaList, FaBullhorn, FaSignOutAlt } from "react-icons/fa";

const Dashboard = () => {
  const navigate = useNavigate();
  const [totalProducts, setTotalProducts] = useState(0);
 const handleLogout = () => {
  localStorage.removeItem("token"); 
  navigate("/");
}; 
  useEffect(() => {
    axios.get("https://backend-2p6c.vercel.app/product")
      .then(res => setTotalProducts(res.data.length));
  }, []);

  return (

    <div className="flex min-h-screen bg-slate-100">

      {/* Sidebar */}
      <aside className="w-64 bg-[#1e293b] text-white flex flex-col justify-between shadow-xl">

        <div>
          {/* Logo */}
          <div className="mb-10 pt-8 flex items-center gap-2 px-5">
            <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center font-bold">
              BS
            </div>
            <h2 className="text-xl font-bold">Bazeen Store</h2>
          </div>

          {/* Menu */}
          <nav className="flex flex-col gap-3">

            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center gap-3 px-6 py-3 text-lg font-semibold hover:bg-slate-700 transition"
            >
              🏠 Dashboard
            </button>

            <button
              onClick={() => navigate("/create-product")}
              className="flex items-center gap-3 px-6 py-3 text-lg font-semibold hover:bg-slate-700 transition"
            >
              ➕ Create Product
            </button>

            <button
              onClick={() => navigate("/product-list")}
              className="flex items-center gap-3 px-6 py-3 text-lg font-semibold bg-emerald-500"
            >
              📦 Product List
            </button>

          </nav>
        </div>

       <button
  onClick={handleLogout}
  className="flex items-center gap-2 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-sm transition"
>
  <FaSignOutAlt />
  Logout
</button>

      </aside>


      {/* Main */}
      <main className="flex-1 p-10">

        {/* Heading */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-500">Overview of your store</p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-2 gap-8 max-w-[900px]">

          {/* Total Products */}
          <div className="bg-[#1e293b] text-white p-8 rounded-2xl shadow-lg hover:bg-[#334155] transition cursor-pointer">
            <FaBox className="text-5xl text-blue-400 mb-4"/>
            <p className="text-lg text-gray-300">Total Products</p>
            <h2 className="text-3xl font-bold">{totalProducts}</h2>
          </div>

          {/* Manage Products */}
          <div
            onClick={() => navigate("/product-list")}
            className="bg-[#1e293b] text-white p-8 rounded-2xl shadow-lg hover:bg-[#334155] transition cursor-pointer"
          >
            <FaList className="text-5xl text-green-400 mb-4"/>
            <p className="text-lg text-gray-300">Manage Products</p>
            <span>Edit / Delete</span>
          </div>

          {/* Marketing */}
          <div className="bg-[#1e293b] text-white p-8 rounded-2xl shadow-lg hover:bg-[#334155] transition">
            <FaBullhorn className="text-5xl text-orange-400 mb-4"/>
            <p className="text-lg text-gray-300">Marketing</p>
            <span>Boost Sales</span>
          </div>

          {/* Inventory */}
          <div className="bg-[#1e293b] text-white p-8 rounded-2xl shadow-lg hover:bg-[#334155] transition">
            <FaBox className="text-5xl text-purple-400 mb-4"/>
            <p className="text-lg text-gray-300">Inventory</p>
            <span>Stock Overview</span>
          </div>

        </div>

      </main>

    </div>
  );
};

export default Dashboard;