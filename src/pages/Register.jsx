import React, { useState } from 'react'
import "./Register.css"
import { Link } from 'react-router-dom'
import axios from "axios"
import toast from "react-hot-toast"
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'


const Register = () => {
    useEffect(() => {
   
    document.body.classList.add("bg-slate-200", 
        // "h-[100vh]",
      
      "flex",
      "items-center",
      "justify-center",
      
      
    );

  
  }, []); 

   
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    async function submit(e) {
        e.preventDefault()
        try {
            const data = await axios.post("http://localhost:8080/register", {
                name,
                email,
                password,
                phone
            })
            alert("Register Successfully!")
            navigate("/login")
        } catch (error) {
           alert("Please try again later!")
        }
    }


    return (
        <>
      
        <div className="container mt-[5px] bg-white h-[580px] w-[400px] p-[25px] rounded-[8px] shadow-[0_0_30px_rgba(0,0,0,0.2)]">
            <div className="tabs flex justify-center gap-[10px] mb-[20px] ">
                <Link to={"/login"}><button className="tabActive  w-[100px] border border-[#ddd] rounded-[6px] bg-white cursor-pointer px-[13px] py-[8.5px] ">Login</button></Link>
                <Link to={"/"}><button className="tab-activee px-[18px] py-[8px] border border-[#071a2f] rounded-[6px] text-white  bg-[#071a2f] cursor-pointer font-sbold 
                ">Sign Up</button></Link>
            </div>

            <form onSubmit={(e) => submit(e)} id="loginForm">
                <label className=' text-[15px] font-semibold block'>Name</label>
                <input className='w-full p-[7px] rounded-[6px] border border-[#071a2f] mb-[15px]' onChange={(e) => setName(e.target.value)} type="text" placeholder="Enter your name" required />

                <label className=' text-[15px]  font-semibold block'>Email address</label>
                <input className='w-full p-[7px] rounded-[6px] border border-[#071a2f] mb-[15px]' onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter your email address" required />
                <label className=' text-[15px]   font-semibold block'>Phone Number</label>
                <input className='w-full p-[7px] rounded-[6px] border border-[#071a2f] mb-[15px]' onChange={(e) => setPhone(e.target.value)} type="number" placeholder="Enter your phone number" required />

                <div className="password-header flex justify-between items-center">
                    <label className=' text-[15px]   font-semibold block'>Password</label>
                </div>

                <div className="password-box relative ">
                    <input className="w-full p-[7px] rounded-[6px] border border-[#071a2f] mb-[15px]" onChange={(e) => setPassword(e.target.value)} type="password" id="password" placeholder="Enter your password" required />
                </div>

                <button type="submit" className="login-btn  w-full p-[8px] bg-[#071a2f] text-white border-none rounded-[8px] cursor-pointer text-[16px]">Sign Up</button>
            </form>

            <div className="divider text-center mt-[15px] text-[#071a2f] font-[600]">OR</div>

            <div className="social-login flex flex-col gap-[10px]">
                <button className="social google mt-[10px] p-[8px] rounded-[6px] border border-[#ddd] bg-white cursor-pointer  ">Continue with Google</button>
            </div>

            <p className="signup-text text-center   gap-[10px] mt-[14px] text-[#071a2f] flex justify-center">
                Have an account yet?
                <a className="font-bold no-underline text-black "> <Link to="/login">Login</Link></a>
            </p>
        </div>
        </>
    )
}

export default Register