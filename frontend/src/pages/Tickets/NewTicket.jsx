import React, { useEffect, useState } from "react";
import Nav from 'components/Nav';
import { useNavigate } from "react-router-dom";
import { siteName } from "config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { createCase } from "utils/APIRoutes";

export default function NewTicket(currentUser, socket) {

    useEffect(()=>{
        document.title = siteName+ " - New Ticket"
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
        reason: "",
        sid: "",
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
        const { reason, sid } = values;
          
          const { data } = await axios.post(createCase, {
            userUid,
            reason,
            sid,
          });
          if (data.added === false) {
            toast.error(data.msg, toastOptions);
          }
          if (data.status === true) {
            toast.success("Ticket created. You will be redirected to it shortly.")
            setTimeout(() => { navigate("/support/"+data.newTicket._id) }, 8000);
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
                                <div className="px-4 py-5 bg-gray-600 sm:p-6">
                                    <div className="grid grid-cols-6 gap-6">
                                    <div className="col-span-6 sm:col-span-6">
                                            <label htmlFor="first-name" className="block text-sm font-medium text-gray-300">Ticket Reason</label>
                                            <input type="text" name="reason" onChange={(e) => handleChange(e)} id="first-name" className="mt-1 block w-full py-2 px-3 border  rounded-md border-gray-700 text-white bg-gray-700 shadow-sm focus:outline-none sm:text-sm" />
                                        </div>
                                        <div className="col-span-6 sm:col-span-6">
                                            <label htmlFor="first-name" className="block text-sm font-medium text-gray-300">Server ID (If Applicable)</label>
                                            <input type="text" name="sid" onChange={(e) => handleChange(e)} id="first-name" className="mt-1 block w-full py-2 px-3 border  rounded-md border-gray-700 text-white bg-gray-700 shadow-sm focus:outline-none sm:text-sm" />
                                        </div>
                                    </div>
                                </div>
                                <div className="px-4 py-3 bg-gray-600 text-right sm:px-6">
                                    <button type="submit" name="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                        Get Help!
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