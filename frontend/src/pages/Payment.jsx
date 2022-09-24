import React, { useEffect, useState } from "react";
import Nav from 'components/Nav';
import { useNavigate } from "react-router-dom";
import { siteName } from "config";

export default function Payment() {

    useEffect(()=>{
        document.title = siteName+ " - Pay"
    })

    const navigate = useNavigate();
    const [username, setUsername] = useState(undefined)

    useEffect(() => {
        (async function() {
          
      if (!localStorage.getItem(process.env.USER_KEY)) {
        navigate("/login");
      } else {
        const data = await JSON.parse(localStorage.getItem(process.env.USER_KEY));
        setUsername(data.username)
      }
    })();
    }, [navigate]);
    return (
        <>



        <Nav username={username} />
        <main classNameName="container mx-w-6xl mx-auto py-4">
        <div className="min-h-screen bg-slate-900 overflow-auto">
  <div className="container mx-auto max-w-4xl">
    <div className="mt-10 text-center">
      <h1 className="text-4xl font-bold text-gray-200">Pricing plans</h1>
      <p className="text-lg mt-3 font-semibold text-gray-300">Every plan includes 10 day full-refund period.</p>
    </div>

    <hr className="mt-10" />
    <div className="flex space-x-10 pt-10">
    <div className="py-12">
      <div className="bg-white pt-4 rounded-xl space-y-6 overflow-hidden  transition-all duration-500 transform hover:-translate-y-6 hover:scale-105 shadow-xl hover:shadow-2xl cursor-pointer">
        <div className="px-8 flex justify-between items-center">
          <h4 className="text-xl font-bold text-gray-800">Iron Plan</h4>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          </div>
          <h1 className="text-4xl text-center font-bold">$3/mo</h1>
          <p className="px-4 text-center text-sm ">Iron is made for a small community or just for friends. This server is perfect for running a few plugins with no lag.</p>
          <ul className="text-center">
            <li><button className="font-semibold">6GB Memory</button></li>
            <li><button className="font-semibold">50GB SSD Storage</button></li>
            <li><button className="font-semibold">70% CPU</button></li>
          </ul>
          <div className="text-center bg-gray-200 ">
        <button className="inline-block my-6 font-bold text-gray-800">Purchase Now</button>
          </div>
      </div>
    </div>
    <div className="py-12">
      <div className="bg-white  pt-4 rounded-xl space-y-6 overflow-hidden transition-all duration-500 transform hover:-translate-y-6 -translate-y-2 scale-105 shadow-xl hover:shadow-2xl cursor-pointer">
        <div className="px-8 flex justify-between items-center">
          <h4 className="text-xl font-bold text-gray-800">Diamond Plan</h4>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"/>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </div>
          <h1 className="text-4xl text-center font-bold">$5/mo</h1>
          <p className="px-4 text-center text-sm ">Need a server for modded Minecraft? Diamond plan is made for you! With this plan you can easily run 200 mods all while having a lag-free experience.</p>
          <ul className="text-center">
            <li><button className="font-semibold">10GB Memory</button></li>
            <li><button className="font-semibold">75GB SSD Storage</button></li>
            <li><button className="font-semibold">90% CPU</button></li>
          </ul>
          <div className="text-center bg-pink-600 ">
        <button className="inline-block my-6 font-bold text-white">Purchase Now</button>
          </div>
      </div>
    </div>
    <div className="py-12">
      <div className="bg-white pt-4 rounded-xl space-y-6 overflow-hidden transition-all duration-500 transform hover:-translate-y-6 hover:scale-105 shadow-xl hover:shadow-2xl cursor-pointer">
        <div className="px-8 flex justify-between items-center">
          <h4 className="text-xl font-bold text-gray-800">Netherite Plan</h4>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h1 className="text-4xl text-center font-bold">$8.50/mo</h1>
          <p className="px-4 text-center text-sm ">Planning a server for a medium sized community? This plan is perfect for you! Netherite plan can easily handle 350+ mods.</p>
          <ul className="text-center">
            <li><button className="font-semibold">14GB Memory</button></li>
            <li><button className="font-semibold">120GB SSD Storage</button></li>
            <li><button className="font-semibold">150% CPU</button></li>
          </ul>
          <div className="text-center bg-gray-200 ">
        <button className="inline-block my-6 font-bold text-gray-800">Purchase Now</button>
          </div>
      </div>
    </div>
    </div>
  </div>
</div>
    </main>
    </>
    )
}