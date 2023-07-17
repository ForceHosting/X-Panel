const User = require("../models/userModel");
const Server = require("../models/servers");
const Web = require("../models/webhostingModel");
const Tickets = require("../models/ticketModel");
const ShortUniqueId = require("short-unique-id");
const { makeid, getIP, sendWelcome, sendVerify } = require('../functions')
const { userLogin, userRegister, sendErrorCode } = require('../bot/index');
const jwt = require('jsonwebtoken')
const { CLIENT_ID, CLIENT_SECRET, CLIENT_REDIRECT_URI } = require('../config')
const {pteroKey, JFRToken, authUrl, successUrl, jwtToken} = require('../config.json');
const axios = require('axios');
const queryString = require('querystring');
const fetch = require('node-fetch');
const JFR = require('../models/jfrModel');
const { response } = require("express");

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