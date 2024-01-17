const User = require("../models/userModel");
const Queue = require("../models/serverQueue");
const Server = require("../models/servers");
const { pteroKey, jwtToken } = require('../config.json');
const { addedToQueue, createdServer, deletedServer, createdQueuedServer } = require("../bot");
const Node = require("../models/nodes");
const fetch = require('node-fetch');
const jwt = require('jsonwebtoken')

module.exports.updateServer = async (req,res,next) => {
  try{
    const bearerHeader = req.headers['authorization'];
    const jwtVerify = jwt.verify(bearerHeader,jwtToken)
    const userUid = jwtVerify._id;
    const userData = await User.findById(userUid);
    const { sid, memory, disk, cpu } = req.body;
    const serverData = await Server.findById(sid);
    const currentMem = userData.availMem + serverData.serverMemory
    const currentDisk = userData.availDisk + serverData.serverDisk
    const currentCpu = userData.availCPU + serverData.serverCPU

    const newUserMem = currentMem - memory;
    const newUserDisk = currentDisk - disk;
    const newUserCPU = currentCpu - cpu;
    if(memory < 500){
      return res.json({ added: false, msg: "You need to have more than 499mb of memory on a server."});
    }else if(disk < 1000){
      return res.json({ added: false, msg: "You need to have more than 1000mb of disk space on a server."});
    }else if(cpu < 25){
      return res.json({ added: false, msg: "You need to have more than 24% of CPU on a server."});
    }
    if(newUserMem < 0){
      return res.json({ added: false, msg: "You can't use more memory than your account has."})
    }else if(newUserDisk < 0){
      return res.json({ added: false, msg: "You can't use more disk space than your account has."})
    }else if(newUserCPU < 0){
      return res.json({ added: false, msg: "You can't use more CPU than your account has."})
    }
    const pteroInfoR = await fetch('https://control.forcehost.net/api/application/servers/'+serverData?.serverId, {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer `+pteroKey
      },
    })
    const pteroInfo = await pteroInfoR.json();
    if(pteroInfoR.status === 200){
      const pteroUpdateR = await fetch('https://control.forcehost.net/api/application/servers/'+serverData?.serverId+'/build', {
      method: 'patch',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer `+pteroKey
      },
      body: JSON.stringify({
        allocation: pteroInfo.attributes.allocation,
        memory: memory,
        swap: 0,
        disk: disk,
        io: 500,
        cpu: cpu,
        threads: null,
        feature_limits: {
          databases: 5,
          allocations: 1,
          backups: 10,
        }
      })
    })
    if(pteroUpdateR.status === 200){
      const newServerData = await Server.findByIdAndUpdate(sid, {serverMemory: memory, serverDisk: disk, serverCPU: cpu});
      const newUserData = await User.findByIdAndUpdate(userUid, {availMem: newUserMem, availDisk: newUserDisk, availCPU: newUserCPU});
      return res.status(200).json({newServerData, newUserData});
    }else{
        return res.status(400).json({msg: 'No update'})
    }
    }else{
      return res.status(400).json({msg: 'Pterodactyl err'})
    }
  }catch(ex){
    next(ex);
  }
}


module.exports.createServer = async (req, res, next) => {
  try {
    const bearerHeader = req.headers['authorization'];
    const jwtVerify = jwt.verify(bearerHeader,jwtToken)
    const userUid = jwtVerify._id;

    const { name, location, software, memory, disk, cpu, global } = req.body;
    const user = await User.findById(userUid);
    if(location == "" || location == null){

      return res.json({ added: false, msg: "You need to select a node first."});
    }else{
    if(software == "" || software == null){
      return res.json({added: false, msg: "Please select a server software."});
    }
    
    const getNodeStats = await Node.findOne({ PteroId: `${location}` });
    if(getNodeStats.nodeSlots <= 0){
      return res.json({ added: false, msg: "This node currently does not have any slots available."});
    }else{
        const newTotalMem = user.availMem - memory;
        const newTotalDisk = user.availDisk - disk;
        const newTotalCPU = user.availCPU - cpu;
        const newTotalSlots = user.availSlots - 1;

        const servers = await Server.find({ serverOwner: jwtVerify._id }).count();
        if(servers >= 5){
          return res.json({added:false,msg:"You can only have 5 servers to an account."});
        }
        else if(memory < 500){
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
        if(!eggData){
          return res.json({added: false, msg: "Fetching that software type had an issue."})
      }
        const userPtero = user.pteroId;
        const pteroCreate = await fetch('https://control.forcehost.net/api/application/servers', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer `+pteroKey
      },
      body: JSON.stringify({
        name: name,
        user: userPtero,
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
          VERSION: 'PM5',
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
        allocation:{
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
    if(!pteroData.attributes){
      return res.status(400).json({status: 500, added: false, msg: "Pterodactyl server creation error."})
    }
    if(pteroData.attributes.id){
      const pteroAllocs = await fetch('https://control.forcehost.net/api/application/nodes/'+location+'/allocations/?filter[server_id]='+pteroData.attributes.id+'', {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer `+pteroKey
      },
    })
    const pteroAlloc = await pteroAllocs.json();
      await User.findByIdAndUpdate(user._id, {'availMem': newTotalMem, 'availDisk': newTotalDisk, 'availCPU': newTotalCPU, 'availSlots': newTotalSlots});

      const server = await Server.create({
        serverName: name,
        serverId: pteroData.attributes.id,
        serverNode: location,
        serverMemory: memory,
        serverCPU: cpu,
        serverDisk: disk,
        serverSuspended: false,
        serverOwner: userUid,
        isGlobal: global,
        serverIP: pteroAlloc.data[0].attributes.alias+':'+pteroAlloc.data[0].attributes.port,
        serverRenewal: parseInt( Date.now() + 2.592e+9)
      });
      delete user.password
      const updatedSlots = getNodeStats.nodeSlots -1;
      await Node.findOneAndUpdate({'pteroId':location},{'nodeSlots': updatedSlots});
      createdServer(user.username, name, memory, cpu, disk, location, pteroData.attributes.id)
      return res.status(200).json({ status: 200, added: true, server})
    }else{
      return res.status(400).json({status: 500, added: false, msg: "Pterodactyl server creation error."})
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
      const bearerHeader = req.headers['authorization'];
      const jwtVerify = jwt.verify(bearerHeader,jwtToken)
      const userUid = jwtVerify._id;
  
      const { name, location, software, memory, disk, cpu, global } = req.body;
      console.log(global)
      const user = await User.findById(userUid);
      if(location == "" || location == null){
  
        return res.json({ added: false, msg: "You need to select a node first."});
      }else{
      if(software == "" || software == null){
        return res.json({added: false, msg: "Please select a server software."});
      }
      

          const newTotalMem = user.availMem - memory;
          const newTotalDisk = user.availDisk - disk;
          const newTotalCPU = user.availCPU - cpu;
          const newTotalSlots = user.availSlots - 1;
  
          const servers = await Server.find({ serverOwner: jwtVerify._id }).count();
          if(servers >= 5){
            return res.json({added:false,msg:"You can only have 5 servers to an account."});
          }
          else if(memory < 500){
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
          const userPtero = user.pteroId;
        await User.findByIdAndUpdate(user._id, {'availMem': newTotalMem, 'availDisk': newTotalDisk, 'availCPU': newTotalCPU, 'availSlots': newTotalSlots});
        const server = await Queue.create({
          serverName: name,
          serverNode: Number(location),
          serverMemory: memory,
          serverCPU: cpu,
          serverDisk: disk,
          serverSoftware: software,
          serverOwner: userUid,
          ownerDid: user.discordId,
          ownerPteroId: userPtero,
          isGlobal: global
        });
        delete user.password
        addedToQueue(user.username, name, memory, cpu, disk)
        return res.status(200).json({ status: 200, added: true, server})
        }}}
      } catch (ex) {
        next(ex);
      }
  };

module.exports.getServers = async (req, res, next) => {
  try {
    const bearerHeader = req.headers['authorization'];
    const jwtVerify = jwt.verify(bearerHeader, jwtToken);

    // Find all servers owned by the user
    const userServers = await Server.find({ serverOwner: jwtVerify._id });

    // Find all queue servers owned by the user
    const userQueuedServers = await Queue.find({ serverOwner: jwtVerify._id });

    // Find all queue servers in the same serverNode
    const allQueuedServers = await Queue.find();

    // Group all queuedServers by serverNode
    const groupedQueuedServers = allQueuedServers.reduce((acc, server) => {
      const node = server.serverNode;
      acc[node] = acc[node] || [];
      acc[node].push(server);
      return acc;
    }, {});

    // Map userQueuedServers with positions based on serverNode
    const userQueuedWithPositions = userQueuedServers.map((userQueuedServer) => {
      const node = userQueuedServer.serverNode;
      const group = groupedQueuedServers[node];

      const sortedGroup = group.sort((a, b) =>
        parseInt(a.serverNode, 10) - parseInt(b.serverNode, 10)
      );

      const totalInNodeQueue = sortedGroup.length;
      const position = sortedGroup.findIndex(server => server._id.equals(userQueuedServer._id)) + 1;

      return {
        ...userQueuedServer.toObject(),
        position: `${position}/${totalInNodeQueue}`,
      };
    });

    // Serialize the data including positions
    const responseData = { servers: userServers, queued: userQueuedWithPositions };
    return res.json(responseData);
  } catch (ex) {
    next(ex);
  }
};
  
  


  module.exports.renewServer = async (req, res, next) => {
    try{
      const bearerHeader = req.headers['authorization'];
      const jwtVerify = jwt.verify(bearerHeader,jwtToken)
      const userId = jwtVerify._id;
      const {server} = req.body;
      const serverData = await Server.findById(server);
      if(serverData.serverOwner === userId){
        const beforeExpire = Date.now() + 259200;
        const afterExpire = Date.now() + 259200;
const nextRenew = parseInt( Date.now() + 2.592e+9);



// Calculate the timestamp for 3 days ago in milliseconds
const threeDaysAgo = Date.now() - (3 * 24 * 60 * 60 * 1000);

// Check if the provided timestamp is within the 3-day period
if (serverData.serverRenewal >= threeDaysAgo && serverData.serverRenewal <= Date.now()) {
  await Server.findByIdAndUpdate(serverData._id, {'serverRenewal': nextRenew}); 
  return res.json({status: 200})
} else {
  return res.json({status: 401, msg: 'This server is not allowed to be renewed.'})
}
    }
  }catch(ex){
      next(ex)
    }
  }

  module.exports.deleteServer = async (req, res, next) => {
    try{
      const bearerHeader = req.headers['authorization'];
      const jwtVerify = jwt.verify(bearerHeader,jwtToken)
      const userId = jwtVerify._id;
      const {server} = req.body;
      const serverData = await Server.findById(server);
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
        await Server.deleteOne({ _id: server});
        await User.findByIdAndUpdate(userId, {'availMem': newTotalMem, 'availDisk': newTotalDisk, 'availCPU': newTotalCPU, 'availSlots': newTotalSlots});
        return res.json({status: 200})
      }else{
        return res.json({status: 401, msg: 'You do not have the permission to delete this server.'})
      }
    }catch(ex){
      next(ex)
    }
  }


  module.exports.getGlobalServers = async (req, res, next) => {
try{
  const showPerPage = 6;
  const currentPage = req.params.page;
  const globalServers = await Server.aggregate([
    { $match: {'isGlobal' : true}},
    { $skip : showPerPage * currentPage},
    { $limit : showPerPage }
  ]);
  return res.json({globalServers});
}catch(ex){
  next(ex)
}
  }



  const processQueueItem = async (queueItem) => {
    console.log(`\x1b[32m[INFO] Processing Server: ${queueItem.serverName}`);
      console.log(queueItem.serverNode)
    const nodeInfo = await Node.findOne({ pteroId: queueItem.serverNode });
      console.log(nodeInfo)
    const nodeSlots = nodeInfo.nodeSlots;
  
    if (nodeSlots <= 0) {
      console.log(`\x1b[31m[INFO] No slots available to create server ${queueItem.serverName}`);
      return;
    }
  
    try {
      const eggFind = await fetch(`https://control.forcehost.net/api/application/nests/5/eggs/${queueItem.serverSoftware}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${pteroKey}`,
        },
      });
  
      const eggData = await eggFind.json();
  
      if (!eggData) {
        console.log(`\x1b[31m[INFO] No egg data available for server ${queueItem.serverName}`);
        return;
      }
  
      const pteroCreate = await fetch('https://control.forcehost.net/api/application/servers', {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${pteroKey}`,
        },
        body: JSON.stringify({
          name: queueItem.serverName,
          user: queueItem.ownerPteroId,
          egg: queueItem.serverSoftware,
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
            VERSION: 'PM5',
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
            memory: queueItem.serverMemory,
            swap: 0,
            disk: queueItem.serverDisk,
            io: 500,
            cpu: queueItem.serverCPU,
          },
          feature_limits: {
            databases: 3,
            backups: 1,
          },
          allocation:{
            default: 0,
          },
          deploy: {
            locations: [queueItem.serverNode],
            dedicated_ip: false,
            port_range: [],
          }
        })
      })
  
      const pteroData = await pteroCreate.json();
        console.log(pteroData)
      if (!pteroData.attributes) {
        console.log(`\x1b[31m[INFO] No data back from Pterodactyl.`);
        return;
      }
  
      const pteroAllocs = await fetch(`https://control.forcehost.net/api/application/nodes/${queueItem.serverNode}/allocations/?filter[server_id]=${pteroData.attributes.id}`, {
        method: 'get',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${pteroKey}`,
        },
      });
  
      const pteroAlloc = await pteroAllocs.json();
  
      const server = await Server.create({
        serverName: queueItem.serverName,
        serverId: pteroData.attributes.id,
        serverNode: queueItem.serverNode,
        serverMemory: queueItem.serverMemory,
        serverCPU: queueItem.serverCPU,
        serverDisk: queueItem.serverDisk,
        serverSuspended: false,
        serverOwner: queueItem.serverOwner,
        isGlobal: queueItem.isGlobal,
        serverIP: pteroAlloc.data[0].attributes.alias+':'+pteroAlloc.data[0].attributes.port,
        serverRenewal: parseInt( Date.now() + 2.592e+9)
      });
  
      await Queue.deleteOne({ _id: queueItem._id });
      await Node.findOneAndUpdate({ pteroId: queueItem.serverNode }, { $inc: { nodeSlots: -1 } });
  
      createdQueuedServer(
        queueItem.ownerDid,
        queueItem.serverName,
        queueItem.serverMemory,
        queueItem.serverCPU,
        queueItem.serverDisk,
        queueItem.serverNode
      );
      return;
    } catch (error) {
      console.error(`\x1b[31m[ERROR] Error processing server ${queueItem.serverName}: ${error.message}`);
    }
  };
  
  const runServerQueue = async () => {
    setInterval(async () => {
      const queue = await Queue.find()
      for (let i = 0; i < queue.length; i++) {
        await processQueueItem(queue[i]);
      }
    }, 10000);
  };
  
  runServerQueue();