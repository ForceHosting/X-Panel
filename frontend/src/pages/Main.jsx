import React, { useEffect, useState } from "react";
import Stats from 'components/Stats';
import Nav from 'components/Nav';
import { useNavigate } from "react-router-dom";
import { siteName } from "config";
import axios from "axios";
import { getUserDataRoute, getServersRoute, deleteServerRoute } from "utils/APIRoutes";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from 'react-router-dom';

export default function Main(currentUser, socket) {

    useEffect(()=>{
        document.title = siteName+ " - Home"
    })

    const toastOptions = {
      position: "bottom-right",
      autoClose: 8000,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
    };

    const navigate = useNavigate();
    const [username, setUsername] = useState(undefined)
    const [userMem, setMemory] = useState(undefined)
    const [userCPU, setCPU] = useState(undefined)
    const [userDisk, setDisk] = useState(undefined)
    const [userSlots, setSlots] = useState(undefined)
    const [userServers, setServers] = useState([])
    const [ranOnce, setRanOnce] = useState(false);

    useEffect(() => {
        (async function() {
          
      if (!localStorage.getItem(process.env.USER_KEY)) {
        navigate("/login");
      } else {
        const data = await JSON.parse(localStorage.getItem(process.env.USER_KEY));
        //console.log(data)
        setUsername(data.username)
        const userStats = await axios.get(`${getUserDataRoute}/${data._id}`);
        setMemory(userStats.data.userData.availMem)
        setCPU(userStats.data.userData.availCPU)
        setDisk(userStats.data.userData.availDisk)
        setSlots(userStats.data.userData.availSlots)
      }
    })();
    }, [navigate]);


    
    useEffect(() => { 
setInterval(()=>{
  (async function() {
  const uData = await JSON.parse(localStorage.getItem(process.env.USER_KEY));
          const data = await axios.get(`${getServersRoute}/${uData._id}`);
              setServers(data.data.servers);
              
            })();
}, 60000)
    })
    
    useEffect(() => {
      if(ranOnce === false){ 
        (async function() {
        const uData = await JSON.parse(localStorage.getItem(process.env.USER_KEY));
                const data = await axios.get(`${getServersRoute}/${uData._id}`);
                    setServers(data.data.servers);
                    setRanOnce(true)
                  })();
                }

          })

const deleteServer = async (event,server) => {
  const data = await JSON.parse(localStorage.getItem(process.env.USER_KEY));
  console.log(data._id)
  console.log(server._id)
  const getDeleteData = await axios.get(`${deleteServerRoute}/${data._id}/${server._id}`);
  console.log(getDeleteData)
  if(getDeleteData.status === 200){
    toast.success('Server deleted successfully.', toastOptions)
  }else{
    toast.error(getDeleteData.msg, toastOptions)
  }
}
      
    return (
        <>
        <Nav username={username} />
        <main className="container mx-w-6xl mx-auto py-4">
        <Stats memory={userMem} cpu={userCPU} disk={userDisk} slots={userSlots} />
        <div className="w-full xl:w-full mb-12 xl:mb-0 px-4 mx-auto mt-24">
        <div className="relative flex flex-col min-w-0 break-words bg-gray-700 w-full mb-6 shadow-lg rounded ">
          <div className="rounded-t mb-0 px-4 py-3 border-0">
            <div className="flex flex-wrap items-center">
              <div className="relative w-full px-1 max-w-full flex-grow flex-1">
                <h3 className="font-semibold text-base  text-white">Your Servers</h3>
                <p className="text-left text-white">Don't have any servers? Create one <Link className="text-blue-500" to="/server/create">here!</Link></p>
              </div>
              
            </div>
          </div>

          <div className="block w-full overflow-x-auto">
            <table className="items-center bg-transparent w-full border-collapse mb-10">
              <thead>
                <tr>
                  <th className=" text-white px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Server Name
                  </th>
                  <th className=" text-white px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Server Memory
                  </th>
                  <th className=" text-white px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Server CPU
                  </th>
                  <th className=" text-white px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Server Disk
                  </th>
                  <th className=" text-white px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Next Renew
                  </th>
                  <th className=" text-white px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Actions </th>
                </tr>
              </thead>

              <tbody>
              {userServers.map((server) => {
      return (
        <tr key={uuidv4()}>
  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-white" key={uuidv4()}>{server.serverName}</td>
  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-white" key={uuidv4()}>{server.serverMemory}mb</td>
  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-white" key={uuidv4()}>{server.serverCPU}%</td>
  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-white" key={uuidv4()}>{server.serverDisk}mb</td>
  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-white" key={uuidv4()}>Soon!</td>
  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-white" key={uuidv4()}><button onClick={(event) => deleteServer(event, server)} className="bg-red-500 hover:bg-red-400 rounded py-2 px-4 text-md font-semibold">Delete</button></td>
  </tr>
      );
    })}
              
              </tbody>

            </table>
          </div>
        </div>
      </div>
    </main>
    <ToastContainer />
    </>
    )
}