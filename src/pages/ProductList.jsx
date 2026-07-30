import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";

const ProductList = () => {
const [products, setProducts] = useState([]);
const navigate = useNavigate();
const getProducts = async () => {
const res = await axios.get("https://backend-2p6c.vercel.app/product");setProducts(res.data);};
const deleteProduct = async (id) => {await axios.delete(`https://backend-2p6c.vercel.app/delete/${id}`);
getProducts();};
useEffect(() => {getProducts();}, []);

return (
<div className="flex min-h-screen bg-slate-200 text-white">


<aside className="w-67 bg-[#1e293b] h-screen pt-9 flex flex-col justify-between shadow-xl sticky top-0">
<div className="mb-10 flex items-center gap-2">
<div className="w-10 h-10 ml-5 bg-emerald-500 rounded-full flex items-center justify-center font-bold text-white">BS</div>
      <h2 className="text-[24px] font-bold text-white">Bazeen Store</h2>
</div>
<nav className="flex flex-col gap-3">

      <button onClick={() => navigate("/dashboard")}className="flex items-center gap-10 w-67 px-6 py-3  text-[18px]font-semibold text-gray-200 hover:bg-gradient-to-r hover:from-emerald-500 hover:to-teal-400 hover:text-white transition-all duration-300 shadow-md">
      <span className="text-2xl">🏠</span> Dashboard</button>


      <button onClick={() => navigate("/create-product")}
      className="flex items-center gap-4 px-6 py-3 text-[18px] font-semibold text-gray-200 hover:bg-gradient-to-r hover:from-emerald-500 hover:to-teal-400 hover:text-white transition-all duration-300 shadow-md"><span className="text-2xl">➕</span>Create Product</button>

      <button className="flex items-center gap-4 px-6 py-3 text-[18px] font-semibold bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white shadow-lg"><span className="text-2xl">📦</span>Produc List</button>
</nav>

<div className="mt-auto pt-6 text-gray-400 mb-2 text-xs text-center">&copy; 2026 Bazeen Store Admin</div>
</aside>
<main className="flex-1 p-8">
        <h1 className="text-4xl font-bold mb-8 text-[#1e293b]">Product List</h1>
<div className="overflow-x-auto rounded-lg shadow-lg bg-[#1e293b] border border-gray-700">
<table className="min-w-full divide-y divide-gray-700">
<thead className="bg-[#334155]">
<tr>{[
      "Image",
       "Title",
       "Description",
       "Price",
       "Stock",
       "Category",
       "Action",
].map((header) => (
        <th  key={header}className="px-6 py-4 text-left text-sm font-semibold text-gray-200 uppercase tracking-wider">
        {header}</th>))}</tr></thead>
        <tbody className="divide-y divide-gray-700">{products.length > 0 ? (products.map((item) => (
         <tr key={item._id} className="hover:bg-[#0f172a] transition-colors" style={{ verticalAlign: "middle" }}
>
                    <td className="px-6 py-4 align-center">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-20 w-28 object-contain rounded-md border border-gray-600"
                      />
                    </td>

                    <td className="px-6 py-4 font-semibold text-white align-middle">
                      {item.title}
                    </td>

                    <td className="px-6 py-12 text-s text-gray-300 max-w-xs line-clamp-2 align-middle">
                      {item.desc}
                    </td>

                    <td className="px-6 py-4 font-semibold text-emerald-400 align-middle">
                      ₹ {item.price}
                    </td>

                    <td className="px-6 py-4 text-gray-300 align-middle">{item.stock}</td>

                    <td className="px-6 py-4 capitalize text-gray-300 align-middle">
                      {item.category}
                    </td>

                    <td className="px-6 py-4 flex gap-4 items-center align-middle">
                      <button
                        onClick={() => navigate("/create-product", { state: item })}
                        className="text-emerald-400 hover:text-emerald-500 transition text-xl cursor-pointer"
                        aria-label="Edit product"
                      >
                        <FaEdit />
                      </button>

                      <button
                        onClick={() => deleteProduct(item._id)}
                        className="text-red-500 hover:text-red-600 transition text-xl cursor-pointer"
                        aria-label="Delete product"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center p-8 text-gray-400">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default ProductList;