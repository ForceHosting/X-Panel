//planned for future implementation

export default function TicketList() {
    return (
        <div className="sidebar hidden lg:flex w-1/3 flex-2 flex-col pr-6">
                            <div className="search flex-2 pb-6 px-2">
                                    <input type="text" className="outline-none py-2 block w-full bg-transparent border-b-2 border-gray-200 text-white" placeholder="Search for ticket" />
                                </div>
                                <div className="flex-1 h-full overflow-auto px-2">
                                    <div className="entry cursor-pointer transform hover:scale-105 duration-300 transition-transform bg-gray-500 mb-4 rounded p-4 flex shadow-md">
                                        <div className="flex-1 px-2">
                                            <div className="truncate w-32"><span className="text-gray-200">The MG</span></div>
                                            <div><small className="text-gray-300">Reason: Ticket system isn't working</small></div>
                                        </div>
                                        <div className="flex-2 text-right">
                                            <div><small className="text-gray-300">Opened On: September 1</small></div>
                                        </div>
                                    </div>
                                    <div className="entry cursor-pointer transform hover:scale-105 duration-300 transition-transform bg-gray-500 mb-4 rounded p-4 flex shadow-md">
                                        <div className="flex-1 px-2">
                                            <div className="truncate w-32"><span className="text-gray-200">Doerak2001</span></div>
                                            <div><small className="text-gray-300">Reason: Can't create server</small></div>
                                        </div>
                                        <div className="flex-2 text-right">
                                            <div><small className="text-gray-300">Opened On: July 15</small></div>
                                        </div>
                                    </div>
                                    <div className="entry cursor-pointer transform hover:scale-105 duration-300 transition-transform bg-gray-500 mb-4 rounded p-4 flex shadow-md border-l-4 border-red-500">
                                        <div className="flex-1 px-2">
                                            <div className="truncate w-32"><span className="text-gray-200">Nagol12344</span></div>
                                            <div><small className="text-gray-300">Reason: Login says I'm banned but I'm not</small></div>
                                        </div>
                                        <div className="flex-2 text-right">
                                            <div><small className="text-gray-300">Opened On: June 22</small></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
    )
}