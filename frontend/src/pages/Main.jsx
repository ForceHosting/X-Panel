import React, { useEffect, useState, useRef } from "react";
import Stats from 'components/Stats';
import Nav from 'components/Nav';
import { useNavigate } from "react-router-dom";

export default function Main() {

    const [userInfo, setInfo] = useState(undefined);

    const navigate = useNavigate();
    useEffect(() => {
        (async function() {
          
      if (!localStorage.getItem(process.env.USER_KEY)) {
        navigate("/login");
      } else {
        setInfo(
          await JSON.parse(
            localStorage.getItem(process.env.USER_KEY)
          )
        );
      }
    })();
    }, [navigate]);

    return (
        <>
        <Nav/>
        <main class="container mx-w-6xl mx-auto py-4">
            
        <div class="flex flex-col space-y-8">
            <Stats />
            <div class="grid grid-cols-1 md:grid-cols-5 items-start px-4 xl:p-0 gap-y-4 md:gap-6">
                <div class="col-start-1 col-end-5">
                    <h2 class="text-xs md:text-sm text-gray-300 font-bold tracking-wide">Summary Transactions</h2>
                </div>
                <div class="col-span-2 bg-gray-600 p-6 rounded-xl border border-gray-600 flex flex-col space-y-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 flex justify-between items-center">
                        <div class="p-4 cursor-pointer border">
                            <span class="text-xs text-gray-300 font-semibold">Daily</span>
                            <h2 class="text-gray-100 font-bold tracking-wider">$ 27.80</h2>
                        </div>
                        <div class="p-4 cursor-pointer border">
                            <span class="text-xs text-gray-300 font-semibold">Weekly</span>
                            <h2 class="text-gray-100 font-bold tracking-wider">$ 192.92</h2>
                        </div>
                        <div class="p-4 cursor-pointer border">
                            <span class="text-xs text-gray-300 font-semibold">Monthly</span>
                            <h2 class="text-gray-100 font-bold tracking-wider">$ 501.10</h2>
                        </div>
                    </div>
                    <canvas id="myChart"></canvas>
                </div>
                <div class="col-span-3 bg-gray-600 p-6 rounded-xl border border-gray-600 flex flex-col space-y-6">
                    <div class="flex justify-between items-center">
                        <h2 class="text-sm text-gray-300 font-bold tracking-wide">Latest Transactions</h2>
                        <a href="#"
                            class="px-4 py-2 text-xs bg-blue-100 text-blue-500 rounded uppercase tracking-wider font-semibold hover:bg-blue-300">More</a>
                    </div>
                    <ul class="divide-y-2 divide-gray-100 overflow-x-auto w-full">
                    <li class="py-3 flex justify-between text-sm text-gray-500 font-semibold">
                            <p class="px-4 text-gray-300 font-semibold">Today</p>
                            <p class="px-4 text-gray-100">McDonald</p>
                            <p class="px-4 text-gray-100 tracking-wider">Cash</p>
                            <p class="px-4 text-blue-400">Food</p>
                            <p class="md:text-base text-gray-100 flex items-center gap-2">
                                16.90
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M19 9l-7 7-7-7" />
                                </svg>
                            </p>
                        </li>
                        <li class="py-3 flex justify-between text-sm text-gray-500 font-semibold">
                            <p class="px-4 text-gray-300 font-semibold">Today</p>
                            <p class="px-4 text-gray-100">McDonald</p>
                            <p class="px-4 text-gray-100 tracking-wider">Cash</p>
                            <p class="px-4 text-blue-400">Food</p>
                            <p class="md:text-base text-gray-100 flex items-center gap-2">
                                16.90
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M19 9l-7 7-7-7" />
                                </svg>
                            </p>
                        </li>
                        <li class="py-3 flex justify-between text-sm text-gray-500 font-semibold">
                            <p class="px-4 text-gray-300 font-semibold">Today</p>
                            <p class="px-4 text-gray-100">McDonald</p>
                            <p class="px-4 text-gray-100 tracking-wider">Cash</p>
                            <p class="px-4 text-blue-400">Food</p>
                            <p class="md:text-base text-gray-100 flex items-center gap-2">
                                16.90
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M19 9l-7 7-7-7" />
                                </svg>
                            </p>
                        </li>
                        <li class="py-3 flex justify-between text-sm text-gray-500 font-semibold">
                            <p class="px-4 text-gray-300 font-semibold">Today</p>
                            <p class="px-4 text-gray-100">McDonald</p>
                            <p class="px-4 text-gray-100 tracking-wider">Cash</p>
                            <p class="px-4 text-blue-400">Food</p>
                            <p class="md:text-base text-gray-100 flex items-center gap-2">
                                16.90
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M19 9l-7 7-7-7" />
                                </svg>
                            </p>
                        </li>
                        <li class="py-3 flex justify-between text-sm text-gray-500 font-semibold">
                            <p class="px-4 text-gray-300 font-semibold">Today</p>
                            <p class="px-4 text-gray-100">McDonald</p>
                            <p class="px-4 text-gray-100 tracking-wider">Cash</p>
                            <p class="px-4 text-blue-400">Food</p>
                            <p class="md:text-base text-gray-100 flex items-center gap-2">
                                16.90
                                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M19 9l-7 7-7-7" />
                                </svg>
                            </p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </main>
    </>
    )
}