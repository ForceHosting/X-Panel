import {BrowserRouter, Routes, Route} from 'react-router-dom';
import React, { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import { serverIP } from 'config';
import Login from "./pages/Login";
import Main from "./pages/Main";
import NotFound from 'pages/NotFound';
import Register from 'pages/Register';
import CreateServer from 'pages/CreateServer';
import NewTicket from 'pages/Tickets/NewTicket';
import Payment from 'pages/Payment';
import Account from 'pages/Account';
import Ticket from 'pages/Tickets/Ticket';


function App() {
  const socket = useRef();
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    (async function() {
    const data = await JSON.parse(localStorage.getItem(process.env.USER_KEY));
    setCurrentUser(data);

})();
}, []);

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

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Main socket={socket} currentUser={currentUser} />} />
        <Route path="/server/create" element={<CreateServer socket={socket} currentUser={currentUser} />} />
        <Route path="/support" element={<NewTicket socket={socket} currentUser={currentUser} />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/account" element={<Account socket={socket} currentUser={currentUser} />} />
        <Route path="/support/:id" element={<Ticket socket={socket} currentUser={currentUser} />} />
        <Route path="*" element={<NotFound />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
