const User = require('../models/userModel');
const { pteroKey, jwtToken } = require('../config.json');
const XPanel = require('../models/xpanelModel');
const { v4: uuidv4 } = require('uuid');
const { makeid } = require('../functions')
const jwt = require('jsonwebtoken')
const fetch = require('node-fetch');




module.exports.deployNewXP = async (req, res, next) => {

    try{
        const bearerHeader = req.headers['authorization'];
        const jwtVerify = jwt.verify(bearerHeader,jwtToken)
        const userUid = jwtVerify._id;
        const user = await User.findById(userUid);


        const {name, token, ptero, license, cid, csec, domain, currentLocation, mongoUsr, mongoPwd, mongoIp} = req.body;
        const location = currentLocation;
        if(name == "" || name == null){
            return res.json({added: false, msg: "Please enter a name."});
        }
        if(token == "" || token == null){
            return res.json({added: false, msg: "Please enter a discord bot token."});
        }
        if(ptero == "" || ptero == null){
            return res.json({added: false, msg: "Please enter a Pterodactyl Application API token."});
        }
        if(license == "" || license == null){
            return res.json({added: false, msg: "Please enter an X-Panel license key."});
        }
        if(cid == "" || cid == null){
            return res.json({added: false, msg: "Please enter a Discord Client ID."});
        }
        if(csec == "" || csec == null){
            return res.json({added: false, msg: "Please enter a Discord client secret."});
        }
        if(currentLocation == "" || currentLocation == null){
            return res.json({added: false, msg: "Please enter a name."});
        }
        if(mongoUsr == "" || mongoUsr == null){
            return res.json({added: false, msg: "Please enter a MongoDB connection string."});
        }
        if(mongoPwd == "" || mongoPwd == null){
            return res.json({added: false, msg: "Please enter a MongoDB connection string."});
        }
        if(mongoIp == "" || mongoIp == null){
            return res.json({added: false, msg: "Please enter a MongoDB connection string."});
        }
        const eggFind = await fetch('https://control.forcehost.net/api/application/nests/5/eggs/30', {
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
        const userPtero = jwtVerify.pteroId;
        const rDns = makeid(15)
        if(domain){
            var authUrl = `https://discord.com/api/oauth2/authorize?client_id=${cid}&redirect_uri=https://${domain}/api/auth/discord&response_type=code&scope=identify%20guilds%20email%20guilds.join`
            var clientRed = `https://${domain}/api/auth/discord`
            var successUrl = `https://${domain}/auth/authorizing`
        }else{
            var authUrl = `https://discord.com/api/oauth2/authorize?client_id=${cid}&redirect_uri=https://${rDns}.lylax.xyz/api/auth/discord&response_type=code&scope=identify%20guilds%20email%20guilds.join`
            var clientRed = `https://${rDns}.lylax.xyz/api/auth/discord`
            var successUrl = `https://${rDns}.lylax.xyz/auth/authorizing`
        }
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
        egg: '30',
        docker_image: eggData.attributes.docker_image,
        startup: eggData.attributes.startup,
        environment: {
          TOKEN: token,
          SESSION_SEC: makeid(20),
          PTERO_KEY: ptero,
          CLIENT_ID: cid,
          CLIENT_SECRET: csec,
          CLIENT_REDIRECT: clientRed,
          AUTH_URL: authUrl,
          SUCCESS: successUrl,
          ENCRYPT_KEY: makeid(32),
          BANNED_URL: `https://${rDns}.lylax.xyz/banned`,
          ORIGIN: rDns,
          MONGO_USR: mongoUsr,
          MONGO_PWD: mongoPwd,
          MONGO_IP: `mongodb://${mongoIp}`,
          JWT_TOKEN: makeid(25),
          LICENSE_KEY: license,

        },
        limits: {
          memory: 524,
          swap: 0,
          disk: 5120,
          io: 500,
          cpu: 65,
        },
        feature_limits: {
          databases: 0,
          backups: 5,
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
    console.log(pteroData)
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

      const server = await XPanel.create({
        ownerId: userUid,
        deploymentId: uuidv4(),
        serverId: pteroData.attributes.id,
        depName: name,
        rDns: `https://${rDns}.lylax.xyz`,
        serverPort: pteroAlloc.data[0].attributes.port,
        licenseKey: license,
        artificialOrigin: domain
      });
      return res.status(200).json({ status: 200, added: true, server})
    }else{
      return res.status(400).json({status: 500, added: false, msg: "Pterodactyl server creation error."})
    }
          
          

    }catch(ex){
        next(ex);
    }

}