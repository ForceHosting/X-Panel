import React, { useEffect, useState, useRef } from "react";
import Nav from 'components/Nav';
import { useNavigate, useParams } from "react-router-dom";
import { siteName } from "config";
import OpenTicket from 'components/Ticket/OpenTicket';
import TicketContainer from "components/Ticket/TicketContainer";
import { io } from "socket.io-client";
import { serverIP } from "config";

export default function Ticket(currentUser) {

    const socket = useRef();

    useEffect(()=>{
        document.title = siteName+ " - Ticket"
    })
    
    useEffect(() => {
        if (currentUser) {
          socket.current = io(serverIP);
          
        }
        if (socket.current) {
          socket.current.on("bannedUser", (data) => {
            console.log(data);
            if(data.msg){          
              localStorage.clear();
              localStorage.setItem(
                process.env.REACT_APP_BANNED_KEY,
                JSON.stringify(data)
              );
            }
          });
        }
      }, [currentUser, socket]);

    const params = useParams();
    const navigate = useNavigate();
    const [username, setUsername] = useState(undefined)
    const [currentTicket, setTicket] = useState(undefined)
    //const [userUid, setUid] = useState(undefined)



    useEffect(() => {
        setTicket(params.id);
        if(!params){
            navigate("/");
        }
        (async function() {
          
      if (!localStorage.getItem(process.env.USER_KEY)) {
        navigate("/login");
      } else {
        const data = await JSON.parse(localStorage.getItem(process.env.USER_KEY));
        setUsername(data.username)
        //setUid(data._id)
      }
    })();
    }, [navigate, params]);





    return (
        <>
        <Nav username={username} />
        <main className="container mx-w-6xl mx-auto py-4">
        
        <div className="main flex-1 flex flex-col bg-gray-600 rounded-lg m-2 pl-4 pt-2 pr-2 pb-2">

                        <div className="flex-1 flex h-56 max-h-[35rem]">
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
                            {currentTicket === undefined ? (
                                <OpenTicket />
                            ) : (
                                <TicketContainer ticketid={currentTicket} socket={socket} currentUser={currentUser} />
                            )}
                            
                            
                        </div>
                        
                        </div>
    </main>
    </>
    )
}