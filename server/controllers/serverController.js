const User = require("../models/userModel");
const Queue = require("../models/serverQueue");
const Server = require("../models/servers");
const { pteroKey } = require('../config.json');
const { addedToQueue, createdServer, deletedServer } = require("../bot");
const Node = require("../models/nodes");
const fetch = require('node-fetch');

module.exports.createServer = async (req, res, next) => {
  try {
    const { userUid, name, location, software, memory, disk, cpu } = req.body;
    const user = await User.findOne({ userUid });
    if(location == ""){
      return res.json({ added: false, msg: "You need to select a node first."});
    }else{
    if(software == ""){
      return res.json({added: false, msg: "Please select a server software."});
    }
    const getNodeStats = await Node.findOne({ pteroId: location }).select([
      "nodeSlots"
    ]);
    if(getNodeStats.nodeSlots <= 0){
      return res.json({ added: false, msg: "This node currently does not have any slots available."});
    }else{
        const newTotalMem = user.availMem - memory;
        const newTotalDisk = user.availDisk - disk;
        const newTotalCPU = user.availCPU - cpu;
        const newTotalSlots = user.availSlots - 1;
        if(memory < 500){
          return res.json({ added: false, msg: "You need to have more than 499mb of memory on a server."});
        }else if(disk < 1000){
          return res.json({ added: false, msg: "You need to have more than 1000mb of disk space on a server."});
        }else if(cpu < 25){
          return res.json({ added: false, msg: "You need to have more than 24% of CPU on a server."});
        }else{
        if(newTotalMem < 0){
          return res.json({ added: false, msg: "You can't use more memory than your account has."})
        }else if(newTotalDisk < 0){
          return res.json({ added: false, msg: "You can't use more disk space than your account has."})
        }else if(newTotalCPU < 0){
          return res.json({ added: false, msg: "You can't use more CPU than your account has."})
        }else if(newTotalSlots < 0){
          return res.json({ added: false, msg: "You can't use more slots than your account has."})
        }else{

        const eggFind = await fetch('https://control.forcehost.net/api/application/nests/5/eggs/'+software, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${pteroKey}`
          }
        })
        const eggData = await eggFind.json();
        const pteroCreate = await fetch('https://control.forcehost.net/api/application/servers', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer `+pteroKey
      },
      body: JSON.stringify({
        name: name,
        user: user.pteroId,
        egg: software,
        docker_image: eggData.attributes.docker_image,
        startup: eggData.attributes.startup,
        environment: {
          BUNGEE_VERSION: "latest",
          SERVER_JARFILE: 'server.jar',
          BUILD_NUMBER: 'latest',
          MC_VERSION: 'latest',
          BUILD_TYPE: 'recommended',
          SPONGE_VERSION: '1.12.2-7.3.0',
          VANILLA_VERSION: 'latest',
          MINECRAFT_VERSION: 'latest',
          BEDROCK_VERSION: 'latest',
          LD_LIBRARY_PATH: '.',
          GAMEMODE: 'survival',
          CHEATS: 'false',
          DIFFICULTY: 'normal',
          SERVERNAME: 'Bedrock By Force Host',
          NUKKIT_VERSION: 'latest',
          PMMP_VERSION: 'latest',
          USER_UPLOAD: 0,
          AUTO_UPDATE: 0,
          TS_VERSION: 'latest',
          FILE_TRANSFER: '30033',
          MAX_USERS: '25',
          MUMBLE_VERSION: 'latest',
          BOT_JS_FILE: 'index.js',
          BOT_PY_FILE: 'index.py',
          REQUIREMENTS_FILE: 'requirements.txt',
        },
        limits: {
          memory: memory,
          swap: 0,
          disk: disk,
          io: 500,
          cpu: cpu,
        },
        feature_limits: {
          databases: 3,
          backups: 1,
        },
        allocation: {
          default: 0,
        },
        deploy: {
          locations: [location],
          dedicated_ip: false,
          port_range: [],
        }
      })
    })
    const pteroData = await pteroCreate.json();
    console.log(pteroData)
    if(pteroData.attributes.id){
      await User.findByIdAndUpdate(user._id, {'availMem': newTotalMem, 'availDisk': newTotalDisk, 'availCPU': newTotalCPU, 'availSlots': newTotalSlots});
      const server = await Server.create({
        serverName: name,
        serverId: pteroData.attributes.id,
        serverNode: location,
        serverMemory: memory,
        serverCPU: cpu,
        serverDisk: disk,
        serverSuspended: false,
        serverOwner: userUid
      });
      delete user.password
      const updatedSlots = getNodeStats.nodeSlots -1;
      await Node.findOneAndUpdate({'pteroId':location},{'nodeSlots': updatedSlots});
      createdServer(user.username, name, memory, cpu, disk, location, pteroData.attributes.id)
      return res.json({ status: 200, added: true, server})
    }else{
      return res.json({status: 500, added: false, msg: "Pterodactyl server creation error."})
    }
      }
    }
  }
}
  } catch(ex) {
    next(ex)
  }
}

module.exports.addToQueue = async (req, res, next) => {
    try {
        const { userUid, name, location, software, memory, disk, cpu } = req.body;
        const user = await User.findOne({ userUid });
        const newTotalMem = user.availMem - memory;
        const newTotalDisk = user.availDisk - disk;
        const newTotalCPU = user.availCPU - cpu;
        const newTotalSlots = user.availSlots - 1;
        if(newTotalMem < 0){
          return res.json({ added: false, msg: "You can't use more memory than your account has."})
        }else if(newTotalDisk < 0){
          return res.json({ added: false, msg: "You can't use more disk space than your account has."})
        }else if(newTotalCPU < 0){
          return res.json({ added: false, msg: "You can't use more CPU than your account has."})
        }else if(newTotalSlots < 0){
          return res.json({ added: false, msg: "You can't use more slots than your account has."})
        }else{
        await User.findByIdAndUpdate(user._id, {'availMem': newTotalMem, 'availDisk': newTotalDisk, 'availCPU': newTotalCPU, 'availSlots': newTotalSlots});
        const server = await Queue.create({
            serverName: name,
            serverSoftware: software,
            serverNode: location,
            serverMemory: memory,
            serverCPU: cpu,
            serverDisk: disk,
            serverOwner: userUid
          });
          delete user.password
          addedToQueue(user.username, name, memory, cpu, disk)
        return res.json({ added: true, server });
      }
      } catch (ex) {
        next(ex);
      }
  };

  module.exports.getServers = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const servers = await Server.find({ serverOwner: userId })
        return res.json({ servers });
      } catch (ex) {
        next(ex);
      }
  };

  module.exports.deleteServer = async (req, res, next) => {
    try{
      const userId = req.params.uid;
      const serverId = req.params.pid;
      const serverData = await Server.findById(serverId);
      if(serverData.serverOwner === userId){
        await fetch('https://control.forcehost.net/api/application/servers/'+serverData.serverId, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer `+pteroKey
      },
    })

        const userData = await User.findById(userId).select([
          "availMem",
          "availDisk",
          "availCPU",
          "availSlots",
          "username"
        ])
        const newTotalMem = userData.availMem + serverData.serverMemory;
        const newTotalDisk = userData.availDisk + serverData.serverDisk;
        const newTotalCPU = userData.availCPU + serverData.serverCPU;
        const newTotalSlots = userData.availSlots + 1;
        deletedServer(userData.username, serverData.serverMemory, serverData.serverCPU, serverData.serverDisk, serverData.serverNode)
        await Server.deleteOne({ _id: serverId});
        await User.findByIdAndUpdate(userId, {'availMem': newTotalMem, 'availDisk': newTotalDisk, 'availCPU': newTotalCPU, 'availSlots': newTotalSlots});
        return res.json({status: 200, msg: 'Server deleted successfully.'})
      }else{
        return res.json({status: 401, msg: 'You do not have the permission to delete this server.'})
      }
    }catch(ex){
      next(ex)
    }
  }