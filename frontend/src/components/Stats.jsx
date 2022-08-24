import { FaMicrochip, FaMemory, FaHdd, FaServer } from "react-icons/fa";


export default function Stats({ memory, cpu, disk, slots }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 px-4 xl:p-0 gap-4 xl:gap-6">
                <div className="col-span-1 md:col-span-2 lg:col-span-4 flex justify-between">
                    <h2 className="text-xs md:text-sm text-gray-300 font-bold tracking-wide md:tracking-wider">
                        Your Statistics</h2>
                </div>
                <div className="bg-gray-700 p-6 rounded-xl border border-gray-700">
                    <div className="flex justify-between items-start">
                        <div className="flex flex-col">
                            <p className="text-xs text-gray-300 tracking-wide">Memory</p>
                            <h3 className="mt-1 text-lg text-blue-500 font-bold">{memory}<small>mb</small></h3>
                        </div>
                        <div className="bg-blue-500 p-2 md:p-1 xl:p-2 rounded-md">
                            <FaMemory className="w-auto h-8 md:h-6 xl:h-8 object-cover"/>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-700 p-6 rounded-xl border border-gray-700">
                    <div className="flex justify-between items-start">
                        <div className="flex flex-col">
                            <p className="text-xs text-gray-300 tracking-wide">CPU</p>
                            <h3 className="mt-1 text-lg text-green-500 font-bold">{cpu}<small>%</small></h3>
                        </div>
                        <div className="bg-green-500 p-2 md:p-1 xl:p-2 rounded-md">
                            <FaMicrochip className="w-auto h-8 md:h-6 xl:h-8 object-cover"/>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-700 p-6 rounded-xl border border-gray-700">
                    <div className="flex justify-between items-start">
                        <div className="flex flex-col">
                            <p className="text-xs text-gray-300 tracking-wide">Disk Space</p>
                            <h3 className="mt-1 text-lg text-yellow-500 font-bold">{disk}<small>mb</small></h3>
                        </div>
                        <div className="bg-yellow-500 p-2 md:p-1 xl:p-2 rounded-md">
                        <FaHdd className="w-auto h-8 md:h-6 xl:h-8 object-cover"/>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-700 p-6 rounded-xl border border-gray-700">
                    <div className="flex justify-between items-start">
                        <div className="flex flex-col">
                            <p className="text-xs text-gray-300 tracking-wide">Server Slots</p>
                            <h3 className="mt-1 text-lg text-indigo-500 font-bold">{slots}</h3>
                        </div>
                        <div className="bg-indigo-500 p-2 md:p-1 xl:p-2 rounded-md">
                        <FaServer className="w-auto h-8 md:h-6 xl:h-8 object-cover"/>
                        </div>
                    </div>
                </div>
            </div>
    )
}