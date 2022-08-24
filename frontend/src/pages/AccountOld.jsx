//deprecated planned for removal on release

import React, { useEffect, useState } from "react";
import Nav from 'components/Nav';
import { useNavigate } from "react-router-dom";
import { siteName } from "config";
import RocketImg from 'assets/rocket.png';
import axios from "axios";
import { generateDiscordLinkIdRoute } from "utils/APIRoutes";

export default function Account(currentUser, socket) {

    useEffect(()=>{
        document.title = siteName+ " - Your Account"
    })

    const navigate = useNavigate();
    const [username, setUsername] = useState(undefined)
    //const [userUid, setUid] = useState(undefined)
    const [pteroUser, setPteroUser] = useState(undefined)
    const [pteroPwd, setPteroPwd] = useState(undefined)
    const [showModal, setShowModal] = useState(false)
    const [discordLink, setLinkId] = useState(undefined)


    useEffect(() => {
        (async function() {
          
      if (!localStorage.getItem(process.env.USER_KEY)) {
        navigate("/login");
      } else {
        const data = await JSON.parse(localStorage.getItem(process.env.USER_KEY));
        setUsername(data.username)
        setPteroUser(data.pteroId)
        setPteroPwd(data.pteroPwd)
        //setUid(data._id)
      }
    })();
    }, [navigate]);

    const handleGenerate = async (event) => {
        event.preventDefault()
        const data = await JSON.parse(localStorage.getItem(process.env.USER_KEY));
        const linkId = await axios.post(generateDiscordLinkIdRoute, {
            accountId: data._id
          });
          console.log(linkId.data)
        setLinkId(linkId.data)
        setShowModal(true)
    }


    return (
        <>
        <Nav username={username} />
        <main className="container mx-w-6xl mx-auto py-4">
        <div class="grid grid-cols-1 md:grid-cols-4 xl:grid-cols-5 px-4 xl:p-0 gap-y-4 md:gap-6">
                <div class="md:col-span-2 xl:col-span-3 bg-gray-600 p-6 rounded-2xl border border-gray-600">
                    <div class="flex flex-col space-y-6 md:h-full md:justify-between">
                        <div class="flex justify-between">
                            <span class="text-xs text-gray-300 font-semibold uppercase tracking-wider">
                                Your Account
                            </span>
                        </div>
                        <div class="flex gap-2 md:gap-4 justify-between items-center">
                            <div class="flex flex-col space-y-4">
                                <h2 class="text-gray-100 font-bold tracking-widest leading-tight">Your Information</h2>
                                <div class="flex items-center gap-4">
                                    <ul>
                                    <li>
                                    
                                    <p class="text-lg text-gray-100 tracking-wider">Control Panel Username: {pteroUser}</p>
                                    </li>
                                    <li className="tooltip">
                                    <p class="text-lg text-gray-100 tracking-wider">Control Panel Password: {""}
                                     <button onClick={() => navigator.clipboard.writeText(pteroPwd)}>************</button></p>
                                    </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="flex gap-2 md:gap-4">
                            <a href="/asdf"
                                class="bg-blue-600 px-5 py-3 w-full text-center md:w-auto rounded-lg text-white text-xs tracking-wider font-semibold hover:bg-blue-800">
                                Regenerate Password (Soon)
                            </a>
                            <a href="/asdf"
                                class="bg-red-600 px-5 py-3 w-full text-center md:w-auto rounded-lg text-white text-xs tracking-wider font-semibold hover:bg-red-700 hover:text-white">
                                Delete Account
                            </a>
                        </div>
                    </div>
                </div>
                <div
                    class="col-span-2 p-6 rounded-2xl bg-gradient-to-r from-purple-800 to-blue-800 flex flex-col justify-between">
                    <div class="flex flex-col">
                        <h2 class="text-white font-bold text-lg">Rocket Program</h2>
                        <p class="mt-1 text-md md:text-md text-gray-50 font-light leading-tight max-w-sm">
                            Need more resources? Want to support us? Become a rocket user today! Rocket users get improved resources and access to beta features before anyone else does!
                        </p>
                    </div>
                    <div class="flex justify-between items-end">
                        <a href="https://discord.gg/AfDrKWcDM6" rel="noreferrer" target="_blank"
                            class="bg-blue-600 px-4 py-3 rounded-lg text-white text-xs tracking-wider font-semibold hover:bg-blue-600 hover:text-white">
                            Learn More
                        </a>
                        <img src={RocketImg} alt="calendar" class="w-auto h-24 object-cover"/>
                    </div>
                </div>

            </div>
            <div class="grid grid-cols-1 md:grid-cols-4 xl:grid-cols-5 p-4 xl:p-0 gap-y-4 md:gap-6 mt-5">
                <div class="col-span-2 p-6 rounded-2xl bg-gradient-to-r from-green-800 to-cyan-800 flex flex-col justify-between">
                    <div class="flex flex-col">
                        <h2 class="text-white font-bold text-lg">Discord Account</h2>
                        <p class="mt-1 text-md md:text-md text-gray-50 font-light leading-tight max-w-sm">Want to view your resources, manage your account, and even look at the queue from Discord? If so just press the link account button below and a unique code will be generated.</p>
                    </div>
                    <div class="flex justify-between items-end mt-4">
                        <button onClick={(event) => handleGenerate(event)}
                            class="bg-blue-600 px-4 py-3 rounded-lg text-white text-xs tracking-wider font-semibold hover:bg-blue-600 hover:text-white">
                            Generate Code
                        </button>
                    </div>
                </div>

            </div>
    </main>
    {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full outline-none focus:outline-none bg-slate-700">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold text-white">
                    How to Link
                  </h3>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-lg leading-relaxed text-white">
                    To link your account to Discord, please run the following command in one of our channels.
                  </p>
                  <code className="text-lg leading-relaxed rounded bg-slate-800 text-red-600 text-bold">
                       /acclink {discordLink}
                    </code>
                    <p className="my-4 text-lg leading-relaxed text-white">
                        Once you've ran this command, you're all set! You can run commands such as <code className="text-lg leading-relaxed rounded bg-slate-800 text-red-600 text-bold">
                       /resources
                    </code> to view your current resources.
                    </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
    )
}