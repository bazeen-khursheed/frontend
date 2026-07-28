// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import "./CreateProduct.css";

// const CreateProduct = () => {
//   const navigate = useNavigate();
//   const { state } = useLocation();

//   const [form, setForm] = useState({
//     title: "",
//     desc: "",
//     price: "",
//     stock: "",
//     category: "",
//     image: "",
//   });

//   useEffect(() => {
//     if (state) setForm(state);
//   }, [state]);

//   const submit = async () => {
//     if(form.title == ""){
//       alert("please fill the title!")
//       return
      
//     }
//     if(form.desc == ""){
//       alert("please fill the description")
//       return
//     }
//     if(form.price == ""){
//       alert("please fill the price")
//       return
//     }
//     if(form.stock == ""){
//       alert("please fill the stock")
//       return
//     }
//     if(form.category == ""){
//       alert("please fill the category")
//       return
//     }
//     if(form.image == ""){
//       alert("please attach image")
//       return
//     }
    
//     if (state) {
//       await axios.put(`http://localhost:8080/update/${state._id}`, {
//         title: form.title,
//         desc: form.desc,
//         price: form.price,
//         image: form.image,
//         category: form.category,
//         stock: form.stock,
//       });
//     } else {
//       await axios.post("http://localhost:8080/product", form);
//     }
//     navigate("/product-list");
//   };

//   return (
//     <div className="layout">
//       {/* Sidebar */}
//       <div className="sidebar">
//         <h2>Admin Panel</h2>
//         <ul>
//           <li onClick={() => navigate("/dashboard")}>Dashboard</li>
//           <li className="active">Create Product</li>
//           <li onClick={() => navigate("/product-list")}>Product List</li>
//         </ul>
//       </div>

//       {/* Main */}
//       <div className="main">
//         <h1>{state ? "Update Product" : "Create Product"}</h1>

//         <div className="form-card">
//           {Object.keys(form).map(key => (
//             <input
//               key={key}
//               placeholder={key}
//               value={form[key]}
//               onChange={e =>
//                 setForm({ ...form, [key]: e.target.value })
//               }
//             />
//           ))}

//           <button onClick={submit}>
//             {state ? "Update Product" : "Add Product"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CreateProduct;






import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const CreateProduct = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [form, setForm] = useState({
    title: "",
    desc: "",
    price: "",
    stock: "",
    category: "",
    image: "",
  });

  useEffect(() => {
    if (state) setForm(state);
  }, [state]);

  const submit = async () => {
    if (!form.title || !form.desc || !form.price || !form.stock || !form.category || !form.image) {
      alert("Please fill all the fields!");
      return;
    }

    if (state) {
      await axios.put(`http://localhost:8080/update/${state._id}`, form);
    } else {
      await axios.post("http://localhost:8080/product", form);
    }
    navigate("/product-list");
  };

  return (
    <div className="flex min-h-screen bg-slate-200 text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1e293b] h-screen pt-9 flex flex-col justify-between shadow-xl sticky top-0">
        {/* Logo */}
        <div className="mb-10 flex items-center gap-2">
          <div className="w-10 h-10 ml-5 bg-emerald-500 rounded-full flex items-center justify-center font-bold text-white">
            BS
          </div>
          <h2 className="text-[24px] font-bold text-white">Bazeen Store</h2>
        </div>

        {/* Menu */}
        <nav className="flex flex-col gap-3">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-4 px-6 py-3 text-[18px] font-semibold
              text-gray-200 hover:bg-gradient-to-r hover:from-emerald-500 hover:to-teal-400 hover:text-white transition-all duration-300 shadow-md"
          >
            <span className="text-2xl">🏠</span>
            Dashboard
          </button>

          <button
            className="flex items-center gap-4 px-6 py-3 text-[18px] font-semibold
              bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white shadow-lg"
          >
            <span className="text-2xl">➕</span>
            {state ? "Update Product" : "Create Product"}
          </button>

          <button
            onClick={() => navigate("/product-list")}
            className="flex items-center gap-4 px-6 py-3 text-[18px] font-semibold
              text-gray-200 hover:bg-gradient-to-r hover:from-emerald-500 hover:to-teal-400 hover:text-white transition-all duration-300 shadow-md"
          >
            <span className="text-2xl">📦</span>
            Product List
          </button>
        </nav>

        {/* Footer */}
        <div className="mt-auto pt-6 text-gray-400 mb-2 text-xs text-center">
          &copy; 2026 Bazeen Store Admin
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-5 ml-10 ">
        <h1 className="text-4xl font-bold mb-4 text-[#1e293b]">
          {state ? "Update Product" : "Create Product"}
        </h1>

        <div className="bg-[#1e293b] p-8 rounded-lg shadow-lg max-w-4xl">
          {Object.keys(form).map((key) => (
            <input
              key={key}
              type={key === "price" || key === "stock" ? "number" : "text"}
              placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
              value={form[key]}
              onChange={(e) => setForm({ ...form, [key]: e.target.value })}
              className="w-full mb-4 px-4 py-3 rounded-md bg-slate-700 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          ))}

          <button
            onClick={submit}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 rounded-md transition-all duration-300"
          >
            {state ? "Update Product" : "Add Product"}
          </button>
        </div>
      </main>
    </div>
  );
};

export default CreateProduct;
