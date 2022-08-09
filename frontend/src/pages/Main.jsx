import React, { useEffect, useState } from "react";
import Stats from 'components/Stats';
import Nav from 'components/Nav';
import { useNavigate } from "react-router-dom";
import { siteName } from "config";
import axios from "axios";
import { getUserDataRoute, getServersRoute } from "utils/APIRoutes";

export default function Main(currentUser, socket) {

    useEffect(()=>{
        document.title = siteName+ " - Home"
    })

    const navigate = useNavigate();
    const [username, setUsername] = useState(undefined)
    const [userMem, setMemory] = useState(undefined)
    const [userCPU, setCPU] = useState(undefined)
    const [userDisk, setDisk] = useState(undefined)
    const [userSlots, setSlots] = useState(undefined)
    const [userServers, setServers] = useState([])

    useEffect(() => {
        (async function() {
          
      if (!localStorage.getItem(process.env.USER_KEY)) {
        navigate("/login");
      } else {
        const data = await JSON.parse(localStorage.getItem(process.env.USER_KEY));
        //console.log(data)
        setUsername(data.username)
        const userStats = await axios.get(`${getUserDataRoute}/${data.uid}`);
        setMemory(userStats.data.userData.availMem)
        setCPU(userStats.data.userData.availCPU)
        setDisk(userStats.data.userData.availDisk)
        setSlots(userStats.data.userData.availSlots)
      }
    })();
    }, [navigate]);


    useEffect(() => {
      (async function() {
        try {
          const uData = await JSON.parse(localStorage.getItem(process.env.USER_KEY));
          const data = await axios.get(`${getServersRoute}/${uData._id}`);
              console.log(data.data.servers)
              setServers(data.data.servers);
            
            } catch (err) {
              console.error(err.message);
            }
      })();
    })

    return (
        <>
        <Nav username={username} />
        <Stats memory={userMem} cpu={userCPU} disk={userDisk} slots={userSlots} />
        <main className="container mx-w-6xl mx-auto py-4">
        <div class="w-full xl:w-full mb-12 xl:mb-0 px-4 mx-auto mt-24">
        <div class="relative flex flex-col min-w-0 break-words bg-gray-600 w-full mb-6 shadow-lg rounded ">
          <div class="rounded-t mb-0 px-4 py-3 border-0">
            <div class="flex flex-wrap items-center">
              <div class="relative w-full px-1 max-w-full flex-grow flex-1">
                <h3 class="font-semibold text-base  text-white">Your Servers</h3>
              </div>
              
            </div>
          </div>

          <div class="block w-full overflow-x-auto">
            <table class="items-center bg-transparent w-full border-collapse ">
              <thead>
                <tr>
                  <th class=" text-white px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Server Name
                  </th>
                  <th class=" text-white px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Server Memory
                  </th>
                  <th class=" text-white px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Server CPU
                  </th>
                  <th class=" text-white px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Server Disk
                  </th>
                  <th class=" text-white px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Next Renew
                  </th>
                  <th class=" text-white px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Actions </th>
                </tr>
              </thead>

              <tbody>
              {userServers.map((server) => {
      return (
        <>
  <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-white">{server.serverName}</td>
  <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-white">{server.serverMemory}mb</td>
  <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-white">{server.serverCPU}%</td>
  <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-white">{server.serverDisk}mb</td>
  <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-white">In Queue</td>
  <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-white">Soon!</td>
  </>
      );
    })}
              
              </tbody>

            </table>
          </div>
        </div>
      </div>
    </main>
    </>
    )
}