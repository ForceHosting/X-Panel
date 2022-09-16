import React, { useEffect, useState } from "react";
import Nav from 'components/Nav';
import { useNavigate } from "react-router-dom";
import { siteName } from "config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { addToQueueRoute } from "utils/APIRoutes";

export default function CreateServer(currentUser, socket) {

    useEffect(()=>{
        document.title = siteName+ " - Create Server"
    })

    const navigate = useNavigate();
    const [username, setUsername] = useState(undefined)
    const [userUid, setUid] = useState(undefined)

    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      };

    const [values, setValues] = useState({
        uid: "",
        name: "",
        location: "",
        software: "",
        memory: "",
        cpu: "",
        disk: "",
      });

    useEffect(() => {
        (async function() {
          
      if (!localStorage.getItem(process.env.USER_KEY)) {
        navigate("/login");
      } else {
        const data = await JSON.parse(localStorage.getItem(process.env.USER_KEY));
        setUsername(data.username)
        setUid(data._id)
      }
    })();
    }, [navigate]);



const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { name, location, software, memory, cpu, disk } = values;
          const { data } = await axios.post(addToQueueRoute, {
            userUid,
            name,
            location,
            software,
            memory,
            disk,
            cpu,
          });
          console.log(data)
          if (data.added === false) {
            toast.error(data.msg, toastOptions);
          }
          if (data.added === true) {
            toast.success("Server created!", toastOptions)
            setTimeout(() => { navigate("/") }, 8000);
          }
      };


    return (
        <>
        <Nav username={username} />
        <main className="container mx-w-6xl mx-auto py-4">
        <div className="w-full xl:w-full mb-12 xl:mb-0 px-4 mx-auto mt-24">
        <div className="mt-10 sm:mt-0">
                <div className="grid grid-cols-6 gap-4">

                    <div className="mt-5 md:mt-0 md:col-start-3 col-span-2">
                        <form action="" onSubmit={(event) => handleSubmit(event)}>
                            <div className="shadow overflow-hidden sm:rounded-md">
                                <div className="px-4 py-5 bg-gray-700 sm:p-6">
                                    <div className="grid grid-cols-6 gap-6">
                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="first-name" className="block text-sm font-medium text-gray-300">Server Name</label>
                                            <input type="text" name="name" onChange={(e) => handleChange(e)} id="first-name" className="mt-1 block w-full py-2 px-3 border  rounded-md border-gray-300 text-white bg-gray-700 shadow-sm focus:outline-none sm:text-sm" />
                                        </div>
                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="location" className="block text-sm font-medium text-gray-300">Server Location</label>
                                            <select id="location" required onChange={(e) => handleChange(e)} name="location" className="mt-1 block w-full py-2 px-3 border  rounded-md border-gray-300 text-white bg-gray-700 shadow-sm focus:outline-none sm:text-sm">
                                                <option value="0">Please select a location</option>
                                                <option value="1">Stormbreaker (Germany)</option>
                                                <option value="2">Curiosity (Germany)</option>
                                                <option value="5">Omega (Germany)</option>
                                                <option value="3">Optimus (United States)</option>
                                                <option value="4">Odin (United States)</option>
                                            </select>
                                        </div>
                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="location" className="block text-sm font-medium text-gray-300">Server Software</label>
                                            <select id="location" name="software" onChange={(e) => handleChange(e)} className="mt-1 block w-full py-2 px-3 border  rounded-md shadow-sm focus:outline-none border-gray-300 text-white bg-gray-700 sm:text-sm">
                                                <option value="1">PaperMC</option>
                                                <option value="2">Forge</option>
                                                <option value="3">Bungeecord</option>
                                                <option value="4" disabled>Teamspeak3 (Coming Soon!)</option>
                                                <option value="5">Mumble</option>
                                                <option value="6">Python</option>
                                                <option value="22">NodeJS</option>
                                                <option value="8">LavaLink</option>
                                            </select>
                                        </div>
                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="last-name" className="block text-sm font-medium text-gray-300">Server Memory</label>
                                            <input type="number" name="memory" onChange={(e) => handleChange(e)} id="last-name" className="mt-1 block w-full py-2 px-3 border  rounded-md border-gray-300 text-white bg-gray-700 shadow-sm focus:outline-none sm:text-sm"/>
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="email-address" className="block text-sm font-medium text-gray-300">Server CPU</label>
                                            <input type="number" name="cpu" onChange={(e) => handleChange(e)} id="email-address" className="mt-1 block w-full py-2 px-3 border  rounded-md border-gray-300 text-white bg-gray-700 shadow-sm focus:outline-none sm:text-sm"/>
                                        </div>
                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="email-address" className="block text-sm font-medium text-gray-300">Server Disk</label>
                                            <input type="number" name="disk" onChange={(e) => handleChange(e)} id="email-address" className="mt-1 block w-full py-2 px-3 border  rounded-md border-gray-300 text-white bg-gray-700 shadow-sm focus:outline-none sm:text-sm"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="px-4 py-3 bg-gray-700 text-right sm:px-6">
                                    <button type="reset" name="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-400 hover:bg-yelredlow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                                        Reset
                                    </button>
                                    <button type="submit" name="submit" className="ml-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                        Create Server
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

      </div>
    </main>
    <ToastContainer/>
    </>
    )
}