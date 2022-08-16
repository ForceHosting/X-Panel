import React, { useEffect, useState } from "react";
import Nav from 'components/Nav';
import { useNavigate } from "react-router-dom";
import { siteName } from "config";
import RocketImg from 'assets/rocket.png';
export default function NewTicket(currentUser, socket) {

    useEffect(()=>{
        document.title = siteName+ " - Your Account"
    })

    const navigate = useNavigate();
    const [username, setUsername] = useState(undefined)
    //const [userUid, setUid] = useState(undefined)
    const [pteroUser, setPteroUser] = useState(undefined)
    const [pteroPwd, setPteroPwd] = useState(undefined)


    useEffect(() => {
        (async function() {
          
      if (!localStorage.getItem(process.env.USER_KEY)) {
        navigate("/login");
      } else {
        const data = await JSON.parse(localStorage.getItem(process.env.USER_KEY));
        console.log(data)
        setUsername(data.username)
        setPteroUser(data.pteroId)
        setPteroPwd(data.pteroPwd)
        //setUid(data._id)
      }
    })();
    }, [navigate]);




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
    </main>
    </>
    )
}