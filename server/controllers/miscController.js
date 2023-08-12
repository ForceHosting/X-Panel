const User = require("../models/userModel");
const Server = require("../models/servers");
const Web = require("../models/webhostingModel");
const Tickets = require("../models/ticketModel");
const jwt = require('jsonwebtoken')
const {jwtToken, encryptKey, MG_APP_ID, MG_TOKEN} = require('../config.json');
const JFR = require('../models/jfrModel');
const CryptoJS = require('crypto-js');
const mgapp = require('mewgemlink');
const myapp = new mgapp(MG_APP_ID, MG_TOKEN);


module.exports.addRefToAcc = async (req, res, next) => {
try{
  const {ref} = req.query;
  let refOwner = await User.findOne({refCode: ref}).select([
    "credits",
    "refCode",
    "refUse"
  ]);
  if(!refOwner){
    return res.redirect('https://my.forcehost.net/api/auth')
  }else{
    const newUses = refOwner.refUses + 1;
    const newCoins = refOwner.credits + 75;
    await User.findOneAndUpdate({refCode: ref},{refUses: newUses, credits: newCoins});
    req.session.ref = true;
    return res.redirect('https://my.forcehost.net/api/auth')
  }
}catch(ex){
  next(ex);
}
}
module.exports.getGoldJFRDiscord = async (req, res, next) => {
  try{
    const jfrData = await JFR.find({active: true, isGold: true});
    return res.json({jfrData,goldJFRData})
  }catch(ex){
    next(ex);
  }
  }


  module.exports.updateUserProfile = async (req, res, next) => {
    try {
      const bearerHeader = req.headers['authorization'];
      const jwtVerify = jwt.verify(bearerHeader,jwtToken)
      const { aboutMe, compRole, company, profileCover } = req.body
      const forceHostWords = [
        'forcehosting',
        'force host',
        'force hosting',
        'Force Hosting',
        'Force Host',
        'force',
        'host',
        'f0rce',
        'f0rse',
        'f0rc3',
        'h0st',
        'h0s7',
        'h0ste',
        'h0st3',
        'h0stz',
        '4orce',
        'f0rc3h0st',
        'h0stf0rce',
        'f0rceh0st',
        'f0rsehost',
        'h0stf0rse',
        'h0ste4orce',
        'h0st3f0rc3',
        'h0stz4orce',
        '4orceh0st',
        'f0rc3_h0st',
        'h0st_f0rce',
        'f0rce_h0st',
        'f0rse_host',
        'h0st_f0rse',
        'h0ste_4orce',
        'h0st3_f0rc3',
        'h0stz_4orce',
        '4orce_h0st',
        'f0rc3host',
        'h0stf0rce',
        'f0rceh0st',
        'f0rsehost',
        'h0stf0rse',
        'h0ste4orce',
        'h0st3f0rc3',
        'h0stz4orce',
        '4orceh0st',
        'force_host',
        'host_force',
        'forcehost',
        'hostforce',
        'fh',
        'forcehosting',
        'hosting',
        'host',
        'force'
      ];
      if(forceHostWords.indexOf(company.toLowerCase()) !== -1){
        return res.status(409).json({msg: 'You cannot save yourself as a FH employee.'})
      }
      const updateUser = await User.findByIdAndUpdate(jwtVerify._id,{aboutMe: aboutMe, company: company, compRole: compRole, profileCover: profileCover});
      return res.status(200).json({msg: 'Update ok'})
      
    }catch(ex){
      next(ex);
    }
  }



module.exports.getSiteStats = async (req, res, next) => {
try{
  const userCount = await User.find().count();
  const serverCount = await Server.find().count();
  const webCount = await Web.find().count();
  const ticketCount = await Tickets.find().count();
  return res.json({users: userCount, servers: serverCount, sites: webCount, tickets: ticketCount})
}catch(ex){
  next(ex);
}
}


module.exports.getAllUsers = async (req, res, next) => {
  try {
    const bearerHeader = req.headers['authorization'];
    const jwtVerify = jwt.verify(bearerHeader,jwtToken)
    let userRole = await User.findById(jwtVerify._id).select([
      "role",
    ]);
    const roles = ['sprt', 'mgmt', 'exec', 'fhfound', 'sysad'];
    const decryptedRole = CryptoJS.AES.decrypt(userRole.role, encryptKey).toString(CryptoJS.enc.Utf8);
    if(typeof roles !== 'undefined' && !roles.includes(decryptedRole)){
      return res.status(403).json({msg: 'You do not have proper permissions to access this data.'})
    }else{
      const showPerPage = 6;
  const currentPage = req.params.page;
  const allUsers = await User.aggregate([
    { $skip : showPerPage * currentPage},
    { $limit : showPerPage },
    { $unset: ['lastIP', 'password', 'pteroPwd', 'pteroId', 'pteroUserId', 'discordId']}
  ]);
      return res.json({allUsers})
    }
  }catch(ex){
    next(ex);
  }
}

module.exports.getUserDetails = async (req, res, next) => {
  try {
    const bearerHeader = req.headers['authorization'];
    const jwtVerify = jwt.verify(bearerHeader,jwtToken)
    let userRole = await User.findById(jwtVerify._id).select([
      "role",
    ]);
    const roles = ['mgmt', 'exec', 'fhfound', 'sysad'];
    const decryptedRole = CryptoJS.AES.decrypt(userRole.role, encryptKey).toString(CryptoJS.enc.Utf8);
    if(typeof roles !== 'undefined' && !roles.includes(decryptedRole)){
      return res.status(403).json({msg: 'You do not have proper permissions to access this data.'})
    }else{
      const userDetails = await User.findById(req.params.id).select([
        "_id",
        "uid",
        "username",
        "email",
        "pteroUserId",
        "pteroId",
        "pteroPwd",
        "credits",
        "availMem",
        "availDisk",
        "availCPU",
        "availSlots",
        "role",
        "linkId",
        "refCode",
        "profilePicture"
      ])
      return res.json({userDetails})
    }
  }catch(ex){
    next(ex);
  }
}

module.exports.updateUserDetails = async (req, res, next) => {
  try {
    const bearerHeader = req.headers['authorization'];
    const jwtVerify = jwt.verify(bearerHeader,jwtToken)
    let userRole = await User.findById(jwtVerify._id).select([
      "role",
    ]);
    const roles = ['mgmt', 'exec', 'fhfound', 'sysad'];
    const decryptedRole = CryptoJS.AES.decrypt(userRole.role, encryptKey).toString(CryptoJS.enc.Utf8);
    if(typeof roles !== 'undefined' && !roles.includes(decryptedRole)){
      return res.status(403).json({msg: 'You do not have proper permissions to access this data.'})
    }else{
      const {_id, availCPU, availDisk, availMem, availSlots, credits, isBanned, refCode} = req.body
     const updateUser = await User.findByIdAndUpdate(_id,{'availCPU': availCPU, 'availDisk': availDisk, 'availMem': availMem, 'availSlots': availSlots, 'credits': credits, 'isBanned': isBanned, 'refCode': refCode});
     res.status(200).json({msg: 'Updated!'});
    }
  }catch(ex){
    next(ex);
  }
}




/// All Servers
module.exports.getAllServers = async (req, res, next) => {
  try {
    const bearerHeader = req.headers['authorization'];
    const jwtVerify = jwt.verify(bearerHeader,jwtToken)
    let userRole = await User.findById(jwtVerify._id).select([
      "role",
    ]);
    const roles = ['sprt', 'mgmt', 'exec', 'fhfound', 'sysad'];
    const decryptedRole = CryptoJS.AES.decrypt(userRole.role, encryptKey).toString(CryptoJS.enc.Utf8);
    if(typeof roles !== 'undefined' && !roles.includes(decryptedRole)){
      return res.status(403).json({msg: 'You do not have proper permissions to access this data.'})
    }else{
      const showPerPage = 6;
  const currentPage = req.params.page;
  const allServers = await Server.aggregate([
    { $skip : showPerPage * currentPage},
    { $limit : showPerPage },
  ]);
      return res.json({allServers})
    }
  }catch(ex){
    next(ex);
  }
}

module.exports.getServerDetails = async (req, res, next) => {
  try {
    const bearerHeader = req.headers['authorization'];
    const jwtVerify = jwt.verify(bearerHeader,jwtToken)
    let userRole = await User.findById(jwtVerify._id).select([
      "role",
    ]);
    const roles = ['mgmt', 'exec', 'fhfound', 'sysad'];
    const decryptedRole = CryptoJS.AES.decrypt(userRole.role, encryptKey).toString(CryptoJS.enc.Utf8);
    if(typeof roles !== 'undefined' && !roles.includes(decryptedRole)){
      return res.status(403).json({msg: 'You do not have proper permissions to access this data.'})
    }else{
      const serverDetails = await Server.findById(req.params.id)
      return res.json({serverDetails})
    }
  }catch(ex){
    next(ex);
  }
}

module.exports.updateServerDetails = async (req, res, next) => {
  try {
    const bearerHeader = req.headers['authorization'];
    const jwtVerify = jwt.verify(bearerHeader,jwtToken)
    let userRole = await User.findById(jwtVerify._id).select([
      "role",
    ]);
    const roles = ['mgmt', 'exec', 'fhfound', 'sysad'];
    const decryptedRole = CryptoJS.AES.decrypt(userRole.role, encryptKey).toString(CryptoJS.enc.Utf8);
    if(typeof roles !== 'undefined' && !roles.includes(decryptedRole)){
      return res.status(403).json({msg: 'You do not have proper permissions to access this data.'})
    }else{
      const {_id, availCPU, availDisk, availMem, availSlots, credits, isBanned, refCode} = req.body
     const updateServer = await Server.findByIdAndUpdate(_id,{'availCPU': availCPU, 'availDisk': availDisk, 'availMem': availMem, 'availSlots': availSlots, 'credits': credits, 'isBanned': isBanned, 'refCode': refCode});
     res.status(200).json({msg: 'Updated!'});
    }
  }catch(ex){
    next(ex);
  }
}

