import React from "react";
import Navbar from "./Navbar";
import { Mail, Phone, MapPin, Send } from "lucide-react";

const Contact = () => {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-200 py-16 px-6">

        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="text-center mb-14">
            <h1 className="text-5xl font-black text-[#071a2f]">
              Let's <span className="text-teal-500">Connect</span>
            </h1>

            <p className="mt-4 text-gray-600 text-lg">
              We are here to help you with your shopping experience.
            </p>
          </div>



          <div className="grid lg:grid-cols-2 gap-10">


            {/* Left Side */}
            <div className="bg-[#071a2f] rounded-3xl p-10 text-white shadow-2xl relative overflow-hidden">


              <div className="absolute w-72 h-72 bg-teal-500/20 rounded-full -top-20 -right-20"></div>


              <h2 className="text-4xl font-bold mb-5">
                Bazeen
                <span className="text-teal-400">
                  Store
                </span>
              </h2>


              <p className="text-gray-300 leading-relaxed mb-10">
                Have questions about products, orders or payments?
                Our team is always ready to assist you.
              </p>



              <div className="space-y-6">


                <div className="flex items-center gap-5">
                  <div className="bg-teal-500 p-4 rounded-2xl">
                    <Mail size={25}/>
                  </div>

                  <div>
                    <h3 className="font-bold">
                      Email
                    </h3>

                    <p className="text-gray-300">
                      support@bazeenstore.com
                    </p>
                  </div>
                </div>




                <div className="flex items-center gap-5">
                  <div className="bg-teal-500 p-4 rounded-2xl">
                    <Phone size={25}/>
                  </div>

                  <div>
                    <h3 className="font-bold">
                      Phone
                    </h3>

                    <p className="text-gray-300">
                      +92 300 1234567
                    </p>
                  </div>
                </div>




                <div className="flex items-center gap-5">
                  <div className="bg-teal-500 p-4 rounded-2xl">
                    <MapPin size={25}/>
                  </div>

                  <div>
                    <h3 className="font-bold">
                      Location
                    </h3>

                    <p className="text-gray-300">
                      Karachi, Pakistan
                    </p>
                  </div>
                </div>


              </div>


            </div>





            {/* Form */}
            <div className="bg-white rounded-3xl shadow-2xl p-10">


              <h2 className="text-3xl font-bold text-[#071a2f] mb-8">
                Send Us A Message
              </h2>


              <form className="space-y-5">


                <div className="grid md:grid-cols-2 gap-5">

                  <input
                    type="text"
                    placeholder="First Name"
                    className="p-4 rounded-xl bg-slate-100 outline-none focus:ring-2 focus:ring-teal-500"
                  />


                  <input
                    type="text"
                    placeholder="Last Name"
                    className="p-4 rounded-xl bg-slate-100 outline-none focus:ring-2 focus:ring-teal-500"
                  />

                </div>



                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full p-4 rounded-xl bg-slate-100 outline-none focus:ring-2 focus:ring-teal-500"
                />



                <input
                  type="text"
                  placeholder="Subject"
                  className="w-full p-4 rounded-xl bg-slate-100 outline-none focus:ring-2 focus:ring-teal-500"
                />



                <textarea
                  rows="5"
                  placeholder="Write your message..."
                  className="w-full p-4 rounded-xl bg-slate-100 outline-none focus:ring-2 focus:ring-teal-500"
                ></textarea>




                <button
                  className="w-full flex items-center justify-center gap-3
                  py-4 rounded-xl text-white font-bold text-lg
                  bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500
                  hover:scale-[1.02] transition"
                >
                  <Send size={20}/>
                  Send Message
                </button>


              </form>


            </div>


          </div>


        </div>


      </div>


      <footer className="bg-[#071a2f] text-gray-300 py-6 text-center">
        © 2026 Bazeen Store. All rights reserved.
      </footer>

    </>
  );
};

export default Contact;