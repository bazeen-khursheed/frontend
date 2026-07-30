import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import toast from "react-hot-toast"
import Navbar from './Navbar'

const Login = () => {

  useEffect(() => {
    document.body.classList.add(
      "bg-slate-200",
      "flex",
      "items-center",
      "justify-center",
    );
  }, []);

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  async function submit(e) {
    e.preventDefault()

    try {
      const data = await axios.post("https://backend-2p6c.vercel.app/login", {
        email,
        password
      });

      alert("Login Successfully!");
     localStorage.removeItem("cart");
      // User ki details save karo
      localStorage.setItem("user", JSON.stringify(data.data.user));

      // User ID save karo
      localStorage.setItem("token", data.data.user.id);

      console.log(data);

      navigate("/home");

    } catch (error) {
      alert(error.response?.data?.message || "Please try again later!");
    }
  }

  // return yahan se start hoga
  return ( 
    <> 

    
    <div className="container  mt-[38px] bg-white h-[520px] w-[400px] p-[25px] rounded-[8px] shadow-[0_0_30px_rgba(0,0,0,0.2)]">
      
      <div className="tabs flex justify-center gap-[10px] mt-[15px] mb-[20px]">
        <Link to={"/login"}><button className="tab-active  border rounded-[6px] border-[#071a2f] bg-[#071a2f]  font-sbold text-white cursor-pointer px-[25px] py-[8.5px]">Login</button></Link>
        <Link to={"/"}><button className="tab px-[17px] py-[8px] border border-[#ddd] rounded-[6px] bg-white cursor-pointer
       ">Sign Up</button></Link>
      </div>

      <form className='mt-[20px]' onSubmit={(e) => submit(e)} id="loginForm  ">

        <label className='text-[15px]  pt-[5px] mb-[5px] font-semibold block
        '>Email address</label>
        <input className='w-full p-[10px] rounded-[6px] border border-[#071a2f] mb-[15px]' onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter your email address" required />

        <div className="password-header flex justify-between items-center ">
          <label className='text-[15px] mb-[5px]   font-semibold block'>Password</label>
          <a href="#" className="forgot text-[12px] no-underline text-black">Forgot password?</a>
        </div>

        <div className="password-box relative mt-[5px]">
          <input className='w-full p-[10px] rounded-[6px] border border-[#071a2f] mb-[15px]' onChange={(e) => setPassword(e.target.value)} type="password" id="password" placeholder="Enter your password" required />
        </div>

        <button type="submit" className="login-btn mt-[5px] w-full p-[10px] bg-[#071a2f] text-white border-none rounded-[8px] cursor-pointer text-[16px]">Login</button>
      </form>

      <div className="divider text-center my-[20px]   text-[#071a2f] font-[600]">OR</div>

      <div className="social-login flex flex-col gap-[10px]">
        <button className="social google  p-[10px] rounded-[6px] border border-[#ddd] bg-white cursor-pointer">Continue with Google</button>
      </div>

      <p className="signup-text text-center mt-[20px]  gap-[10px]  text-[#071a2f]  flex justify-center">
        Don’t have an account yet? 
        <a className="font-bold no-underline text-black "><Link to={"/"}>Sign up</Link></a>
      </p>
    </div>
   </>
  )
}

export default Login