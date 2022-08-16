import { useEffect, useState, useRef } from "react";
import { getTicketMessageRoute, sendTicketMessageRoute } from 'utils/APIRoutes';
import { IoMdSend } from 'react-icons/io';
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
var Filter = require('bad-words'),
    filter = new Filter();
export default function TicketContainer({ticketid, socket, currentUser}) {

    const [messages, setMessages] = useState([]);
    const scrollRef = useRef();
    const [msg, setMsg] = useState("");
    const [arrivalMessage, setArrivalMessage] = useState(null);

    useEffect(() => {
        (async function() {
            socket.current.emit("add-user", currentUser._id, ticketid);
        const data = await JSON.parse(
          localStorage.getItem(process.env.USER_KEY)
        );
        const response = await axios.post(getTicketMessageRoute, {
          from: data._id,
          ticket: ticketid,
        });
        setMessages(response.data);
      })();
      }, [socket, ticketid, currentUser]);

      const handleSendMsg = async (msg) => {
        setMsg("");
        
        var cleaned = filter.clean(msg);
        const data = await JSON.parse(
          localStorage.getItem(process.env.USER_KEY)
        );
        const socketSend = socket.current.emit("send-ticket-msg", {
          ticket: ticketid,
          from: data._id,
          cleaned,
        });
        console.log(socketSend)
        await axios.post(sendTicketMessageRoute, {
          from: data._id,
          ticket: ticketid,
          message: cleaned,
        });
    
        const msgs = [...messages];
        msgs.push({ fromSelf: true, message: cleaned });
        setMessages(msgs);
      };

      useEffect(() => {
        if (socket.current) {
          socket.current.on("msg-recieve", (data) => {
            console.log(data)
            setArrivalMessage({ fromSelf: false, message: data.msg });
          });
        }
      }, [socket]);
      useEffect(() => {
        arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
      }, [arrivalMessage]);
    
      useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
      }, [messages]);


    return (
        <div className="chat-area flex-1 flex flex-col">
                                <div className="flex-3">
                                    <h2 className="text-xl py-1 mb-8 border-b-2 border-gray-200 text-gray-200">Opened Ticket: <b>{ticketid}</b></h2>
                                </div>
                                <div className="messages flex-1 overflow-auto">
                                    {messages.map((message) => {
                                        return (
                                            (message.fromSelf ?
                                                <div className="message me mb-4 flex text-left">
                                                <div className="flex-1 px-2">
                                                    <div className="inline-block bg-blue-600 rounded-full p-2 px-6 text-white">
                                                        <span>{message.message}</span>
                                                    </div>
                                                    <div className="pr-4 text-right"><small className="text-gray-300">You • June 23</small></div>
                                                </div>
                                            </div>
                                            : 
                                            <div className="message mb-4 flex" ref={scrollRef} key={uuidv4()}>
                                            <div className="flex-1 px-2">
                                                <div className="inline-block bg-gray-300 rounded-full p-2 px-6 text-gray-700">
                                                    <span>{message.message}</span>
                                                </div>
                                                <div className="pl-4"><small className="text-gray-300">{message.user} • June 22</small></div>
                                            </div>
                                        </div>
                                            )
                                           
                                    
                                        )
                                    })}
                                </div>
                                <form action="" onSubmit={(event) => handleSendMsg(event)} >
                                <div className="flex-2 pt-4 pb-10">
                                    <div className="write bg-white shadow flex rounded-lg h-auto bg-gray-500">
                                        
                                        <div className="flex-1">
                                            <textarea onChange={(e) => setMsg(e.target.value)}
          value={msg} maxLength="250" name="message" className="text-white w-full block outline-none py-4 px-4 bg-transparent" rows="1" placeholder="Type a message..." autoFocus></textarea>
                                        </div>
                                        <div className="flex-2 w-auto p-2 flex content-center items-center">
                                            <div className="flex-1">
                                                <button type="submit" className="bg-blue-400 w-10 h-10 rounded-full inline-block">
                                                    <IoMdSend className="inline-block align-text-bottom"/>
                                                </button>
                                                
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                                </form>
                            </div>
    )
}