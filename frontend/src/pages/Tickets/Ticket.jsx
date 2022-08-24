import React, { useEffect, useState, useRef } from "react";
import Nav from 'components/Nav';
import { useNavigate, useParams } from "react-router-dom";
import { siteName } from "config";
import OpenTicket from 'components/Ticket/OpenTicket';
import TicketContainer from "components/Ticket/TicketContainer";
import { io } from "socket.io-client";
import { serverIP } from "config";
import axios from "axios";
import { getTicketInformationRoute, getUserDataRoute } from "utils/APIRoutes";

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
    //const [userUid, setUid] = useState(undefined

    useEffect(() => {
        (async function() {
            const data = await JSON.parse(localStorage.getItem(process.env.USER_KEY));
            const userData = await axios.get(`${getUserDataRoute}/${data._id}`);
            const ticketInformation = await axios.get(`${getTicketInformationRoute}/${params.id}`);
            if(ticketInformation.data.ticketData.owner === data._id){
            }else{
                if(userData.data.userData.role === "Staff"){
                }else{
                    navigate("/")
                }
            }

        })();
    }, [navigate, params])

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
        
        <div className="main flex-1 flex flex-col bg-gray-700 rounded-lg m-2 pl-4 pt-2 pr-2 pb-2">

        <div className="flex-1 flex h-56 max-h-[35rem]">
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