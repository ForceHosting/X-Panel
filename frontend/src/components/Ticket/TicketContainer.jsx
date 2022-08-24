import { useEffect, useState, useRef } from "react";
import { getTicketMessageRoute, sendTicketMessageRoute } from 'utils/APIRoutes';
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
export default function TicketContainer({ticketid, socket, currentUser}) {

    const [messages, setMessages] = useState([]);
    const scrollRef = useRef();
    const [msg, setMsg] = useState("");
    const [arrivalMessage, setArrivalMessage] = useState(null);

    useEffect(() => {
        (async function() {
        const data = await JSON.parse(
          localStorage.getItem(process.env.USER_KEY)
        );
        socket.current.emit("add-user", data._id, ticketid);
        const response = await axios.post(getTicketMessageRoute, {
          from: data._id,
          ticket: ticketid,
        });
        setMessages(response.data);
      })();
      }, [socket, ticketid, currentUser]);

      const handleSendMsg = async (event) => {
        event.preventDefault();
        console.log(event)
        const data = await JSON.parse(
          localStorage.getItem(process.env.USER_KEY)
        );
        const socketSend = socket.current.emit("send-ticket-msg", {
          ticket: ticketid,
          from: data._id,
          fromUser: data.username,
          msg,
        });
        console.log(socketSend)
        await axios.post(sendTicketMessageRoute, {
          from: data._id,
          ticket: ticketid,
          message: msg,
        });
        const msgs = [...messages];
        msgs.push({ fromSelf: true, message: msg });
        setMessages(msgs);
        setMsg("");
      };

      useEffect(() => {
        if (socket.current) {
          socket.current.on("msg-recieve", (data) => {
            console.log(data)
            setArrivalMessage({ fromSelf: false, message: data.msg, user: data.user });
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
                                              <div ref={scrollRef} key={uuidv4()} className="message me mb-4 flex text-right">
                                              <div className="flex-1 px-2">
                                                  <div className="inline-block bg-blue-600 rounded-full p-2 px-6 text-white">
                                                      <span>{message.message}</span>
                                                  </div>
                                                  <div className="pr-4"><small className="text-gray-300">You • June 23</small></div>
                                              </div>
                                          </div>
                                            : 
                                            <div ref={scrollRef} key={uuidv4()} className="message mb-4 flex">
                                            <div className="flex-1 px-2">
                                                <div className="inline-block bg-gray-400 rounded-full p-2 px-6 text-gray-700">
                                                    <span>{message.message}</span>
                                                </div>
                                                <div className="pl-4"><small className="text-gray-300">{message.user} • June 22</small></div>
                                            </div>
                                        </div>
                                            )
                                           
                                    
                                        )
                                    })}
                                </div>
                                <div className="flex-2 pt-4 pb-10">
                                <form action="" onSubmit={(event) => handleSendMsg(event)}>
                                    <div className="write bg-gray-600 shadow flex rounded-lg">
                                    
                                        <div className="flex-1">
                                            <input type="text" value={msg} onChange={(e) => setMsg(e.target.value)} id="msg" name="message" className="text-gray-200 w-full block outline-none py-4 px-4 bg-transparent" rows="1" placeholder="Type a message..." autoFocus/>
                                        </div>
                                        <div className="flex-2 w-32 p-2 flex content-center items-center">
                                            <div className="flex-1 text-center">
                                                <span className="text-white hover:text-gray-200">
                                                    <span className="inline-block align-text-bottom">
                                                        <svg fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path></svg>
                                                    </span>
                                                </span>
                                            </div>
                                            <div className="flex-1">
                                                <button className="bg-blue-400 w-10 h-10 rounded-full inline-block">
                                                    <span className="inline-block align-text-bottom">
                                                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" className="w-4 h-4 text-white"><path d="M5 13l4 4L19 7"></path></svg>
                                                    </span>
                                                </button>
                                            </div>
                                        </div>
                                        
                                    </div>
                                    </form>
                                </div>
                                
                            </div>
    )
}