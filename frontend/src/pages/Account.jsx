import React, { useEffect, useState } from "react";
import Nav from 'components/Nav';
import { useNavigate } from "react-router-dom";
import { siteName } from "config";
import MinecraftBackground from 'assets/minecraft-img.jpg';
import axios from "axios";
import {Buffer} from 'buffer';
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
    const [email, setEmail] = useState(undefined)
    const [showModal, setShowModal] = useState(false)
    const [discordLink, setLinkId] = useState(undefined)


    useEffect(() => {
        (async function() {
          
      if (!localStorage.getItem(process.env.USER_KEY)) {
        navigate("/login");
      } else {
        const data = await JSON.parse(localStorage.getItem(process.env.USER_KEY));
        let base64ToString = Buffer.from(data.pteroPwd, "base64").toString();
        setUsername(data.username)
        setEmail(data.email)
        setPteroUser(data.pteroUserId)
        setPteroPwd(base64ToString)
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

      <div class="w-full p-6 mx-auto">
        <div class="flex flex-wrap -mx-3">
          <div class="w-full max-w-full px-3 shrink-0 md:w-8/12 md:flex-0">
            <div class="relative flex flex-col min-w-0 break-words bg-gray-700 border-0 shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
              <div class="border-black/12.5 rounded-t-2xl border-b-0 border-solid p-6 pb-0">
                <div class="flex items-center">
                  <p class="mb-0 text-xl dark:text-white/80">Edit Profile</p>
                  <button type="button" class="inline-block px-8 py-2 mb-4 ml-auto font-bold leading-normal text-center text-white align-middle transition-all ease-in bg-blue-500 border-0 rounded-lg shadow-md cursor-pointer text-size-xs tracking-tight-rem hover:shadow-xs hover:-translate-y-px active:opacity-85">Save Information</button>
                </div>
              </div>
              <div class="flex-auto p-6">
                <p class="leading-normal uppercase text-white opacity-60 text-size-sm">User Information</p>
                <div class="flex flex-wrap -mx-3">
                  <div class="w-full max-w-full px-3 shrink-0 md:w-6/12 md:flex-0">
                    <div class="mb-4">
                      <label for="username" class="inline-block mb-2 ml-1 font-bold text-size-xs text-white/80">Username</label>
                      <input type="text" name="username" value={username} class="focus:shadow-primary-outline bg-gray-600 dark:text-white text-size-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-clip-padding px-3 py-2 font-normal text-white outline-none transition-all placeholder:text-white focus:border-blue-500 focus:outline-none" />
                    </div>
                  </div>
                  <div class="w-full max-w-full px-3 shrink-0 md:w-6/12 md:flex-0">
                    <div class="mb-4">
                      <label for="email" class="inline-block mb-2 ml-1 font-bold text-size-xs text-white/80">Email address</label>
                      <input type="email" name="email" value={email} class="focus:shadow-primary-outline dark:bg-slate-850 text-size-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-gray-600 bg-clip-padding px-3 py-2 font-normal text-white outline-none transition-all placeholder:text-white focus:border-blue-500 focus:outline-none" />
                    </div>
                  </div>
                </div>
                <hr class="h-px mx-0 my-4 bg-transparent border-0 opacity-25 bg-gradient-to-r from-transparent via-black/40 to-transparent dark:bg-gradient-to-r dark:from-transparent dark:via-white dark:to-transparent " />
                
                <p class="leading-normal uppercase dark:text-white dark:opacity-60 text-size-sm">Panel Information</p>
                <div class="flex flex-wrap -mx-3">
                  <div class="w-full max-w-full px-3 shrink-0 md:w-6/12 md:flex-0">
                    <div class="mb-4">
                      <label for="city" class="inline-block mb-2 ml-1 font-bold text-size-xs text-slate-700 dark:text-white/80">Panel Username</label>
                      <button className="focus:shadow-primary-outline text-white text-size-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-gray-600 bg-clip-padding px-3 py-2 font-normal outline-none transition-all placeholder:text-white focus:border-blue-500 focus:outline-none" onClick={() => navigator.clipboard.writeText(pteroUser)}>{pteroUser}</button>
                    </div>
                  </div>
                  <div class="w-full max-w-full px-3 shrink-0 md:w-6/12 md:flex-0">
                    <div class="mb-4">
                      <label for="postal code" class="inline-block mb-2 ml-1 font-bold text-size-xs text-slate-700 dark:text-white/80">Panel Password</label>
                      <button className="focus:shadow-primary-outline text-white text-size-sm leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-gray-600 bg-clip-padding px-3 py-2 font-normal outline-none transition-all placeholder:text-white focus:border-blue-500 focus:outline-none" onClick={() => navigator.clipboard.writeText(pteroPwd)}>************</button>
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="w-full max-w-full px-3 mt-6 shrink-0 md:w-4/12 md:flex-0 md:mt-0">
            <div class="relative flex flex-col min-w-0 break-words bg-gray-700 border-0 shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
              <img class="w-full rounded-t-2xl" src={MinecraftBackground} alt="background"/>

              <div class="border-black/12.5 rounded-t-2xl p-6 text-center pt-0 pb-6 lg:pt-2 lg:pb-4">
                <h2 class="text-white font-bold text-lg text-center">Discord Account</h2>
                <p class="mt-1 pl-7 text-lg md:text-md text-gray-50 font-light leading-tight max-w-sm">Want to view your resources, manage your account, and even look at the queue from Discord? If so just press the link account button below and a unique code will be generated.</p>
              </div>

              <div class="flex flex-auto items-center p-6 pt-0">
              <button onClick={(event) => handleGenerate(event)}
                            class="bg-blue-600 px-4 py-3 rounded-lg text-white text-xs tracking-wider font-semibold mx-auto hover:bg-blue-600 hover:text-white">
                            Generate Code
                        </button>
              </div>
            </div>
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
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full outline-none focus:outline-none bg-gray-700">
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