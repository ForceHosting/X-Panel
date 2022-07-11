import { FaCoins } from "react-icons/fa";


export default function Stats() {
    return (
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 px-4 xl:p-0 gap-4 xl:gap-6">
                <div class="col-span-1 md:col-span-2 lg:col-span-4 flex justify-between">
                    <h2 class="text-xs md:text-sm text-gray-300 font-bold tracking-wide md:tracking-wider">
                        Your Statistics</h2>
                </div>
                <div class="bg-gray-600 p-6 rounded-xl border border-gray-600">
                    <div class="flex justify-between items-start">
                        <div class="flex flex-col">
                            <p class="text-xs text-gray-300 tracking-wide">Credits</p>
                            <h3 class="mt-1 text-lg text-blue-500 font-bold"></h3>
                            <span class="mt-4 text-xs text-gray-300"></span>
                        </div>
                        <div class="bg-blue-500 p-2 md:p-1 xl:p-2 rounded-md">
                            <FaCoins className="w-auto h-8 md:h-6 xl:h-8 object-cover"/>
                        </div>
                    </div>
                </div>
                <div class="bg-gray-600 p-6 rounded-xl border border-gray-600">
                    <div class="flex justify-between items-start">
                        <div class="flex flex-col">
                            <p class="text-xs text-gray-300 tracking-wide">Groceries</p>
                            <h3 class="mt-1 text-lg text-green-500 font-bold">$8,918</h3>
                            <span class="mt-4 text-xs text-gray-300">Last Transaction 3 Days ago</span>
                        </div>
                        <div class="bg-green-500 p-2 md:p-1 xl:p-2 rounded-md">
                            <img src="./assets/crocery.png" alt="icon" class="w-auto h-8 md:h-6 xl:h-8 object-cover"/>
                        </div>
                    </div>
                </div>
                <div class="bg-gray-600 p-6 rounded-xl border border-gray-600">
                    <div class="flex justify-between items-start">
                        <div class="flex flex-col">
                            <p class="text-xs text-gray-300 tracking-wide">Gaming</p>
                            <h3 class="mt-1 text-lg text-yellow-500 font-bold">$1,223</h3>
                            <span class="mt-4 text-xs text-gray-300">Last Transaction 4 Days ago</span>
                        </div>
                        <div class="bg-yellow-500 p-2 md:p-1 xl:p-2 rounded-md">
                            <img src="./assets/gaming.png" alt="icon" class="w-auto h-8 md:h-6 xl:h-8 object-cover"/>
                        </div>
                    </div>
                </div>
                <div class="bg-gray-600 p-6 rounded-xl border border-gray-600">
                    <div class="flex justify-between items-start">
                        <div class="flex flex-col">
                            <p class="text-xs text-gray-300 tracking-wide">Trip & Holiday</p>
                            <h3 class="mt-1 text-lg text-indigo-500 font-bold">$5,918</h3>
                            <span class="mt-4 text-xs text-gray-300">Last Transaction 1 Month ago</span>
                        </div>
                        <div class="bg-indigo-500 p-2 md:p-1 xl:p-2 rounded-md">
                            <img src="./assets/holiday.png" alt="icon" class="w-auto h-8 md:h-6 xl:h-8 object-cover"/>
                        </div>
                    </div>
                </div>
            </div>
    )
}