const User = require("../models/userModel");
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
module.exports.initDiscordAuth = async (req, res, next) => {
try{
    res.redirect(authUrl)
}catch(ex){
  next(ex);
}
}

module.exports.tokenDiscordAuth = async (req, res, next) => {
try{
    const {code} = req.query;
    const accessToken = await axios.post('https://discordapp.com/api/oauth2/token', queryString.stringify({
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET,
        'grant_type': 'authorization_code',
        'code': code,
        'redirect_uri': CLIENT_REDIRECT_URI,
        'scope': 'identify email guilds guilds.join'
    }), {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    const tokenResponseData = await axios.get('https://discordapp.com/api/users/@me',{
        headers: {
            Authorization: `${accessToken.data.token_type} ${accessToken.data.access_token}`,
        }
    })
    const profile = await tokenResponseData.data;
    await fetch(
        `https://discord.com/api/guilds/783416129908899860/members/${profile.id}`,
        {
            method: 'PUT',
            body: JSON.stringify({
                access_token: `${accessToken.data.access_token}`,
            }),
            headers: {
                "Authorization": `Bot ${JFRToken}`,
                "Content-Type": "application/json"
            }
        }
    );

    const user = await User.findOne({discordId: profile.id});
        if(user){
            await user.updateOne({
                username: `${profile.username}`,
                email: profile.email,
            });
            req.session.user = user;
            return res.redirect(successUrl);
        }else{
    const pteroIdu = makeid(10);
    const pteroPass = makeid(15)
    var rawPteroPass = Buffer.from(pteroPass);
    var encryptedPteroPass = rawPteroPass.toString('base64');
    const pteroReq = await fetch('https://control.forcehost.net/api/application/users', {
      method: 'post',
      headers: {
        "Accept": "application/json",
        'Content-Type': 'application/json',
        Authorization: `Bearer `+pteroKey
      },
      body: JSON.stringify({
        username: pteroIdu,
        email: profile.email,
        first_name: 'Force Host',
        last_name: 'Registered User',
        password: pteroPass,
      })
    });
    const pteroData = await pteroReq.json();
    if(pteroReq.status === 201 || pteroReq.status === 200){
      const newLinkId = makeid(10)
      const pterodactylUid = pteroData.attributes.id;
      const newUser = await User.create({
        uid: profile.id,
        username: `${profile.username}`,
        email: profile.email,
        pteroUserId: pteroIdu,
        pteroId: pterodactylUid,
        pteroPwd: encryptedPteroPass,
        credits: 700,
        availMem: 2048,
        availDisk: 15360,
        availCPU: 60,
        availSlots: 3,
        role: "Customer",
        linkId: newLinkId,
        discordId: profile.id
      });
      userRegister(`<@${profile.id}>`)
      sendWelcome(newUser.email)
      req.session.user = newUser;
            return res.redirect(successUrl);
    }else{
      const pteroRequest = await fetch('https://control.forcehost.net/api/application/users/?filter[email]='+profile.email+'', {
        method: 'GET',
        headers: {
          "Accept": "application/json",
          'Content-Type': 'application/json',
          Authorization: `Bearer `+pteroKey
        },
      });
      const pteroUser = await pteroRequest.json();
      if(pteroRequest.status !== 200){
        const errorCode = makeid(5)
        sendErrorCode(errorCode, 'Pterodactyl account creation issues. No email found, but registered (?)')
        done(null)
      }else{
      const newLinkId = makeid(10)
      const nuid = new ShortUniqueId({ length: 20 });
        const newUser = await User.create({
          uid: profile.id,
          username: `${profile.username}`,
          email: profile.email,
          pteroUserId: pteroIdu,
          pteroId: pteroUser.data[0].attributes.id,
          pteroPwd: encryptedPteroPass,
          credits: 700,
          availMem: 2048,
          availDisk: 15360,
          availCPU: 60,
          availSlots: 3,
          role: "Customer",
          linkId: newLinkId,
          discordId: profile.id
        });
        userRegister(`<@${profile.id}>`)
        sendWelcome(newUser.email)
        req.session.user = newUser;
            return res.redirect(successUrl);
      }
    }
}
}catch(ex){
    next(ex);
}}

module.exports.getDiscordAuth = async (req, res, next) => {
    try{
        const user = req.session.user;
  const userUpdating = await User.findOne({discordId: user.discordId});
  if(userUpdating){
    const ip = req.headers['x-forwarded-for'];
    const checkIP = await User.find({ lastIP: ip }).count();
    const newMax = checkIP +1;
    if(newMax > 1){
      return res.json({ msg: "Another account is already using that IP address. Please contact support.", status: false });}
      await userUpdating.updateOne({
        lastIP: ip,
      });
  }

  const token = jwt.sign(
    {
      _id: user._id,
      username: user.username,
      email: user.email,
      pteroId: user.pteroId,
      pteroPwd: user.Pwd,
      credits: user.credits,
      availMem: user.availMem,
      availDisk: user.availDisk,
      availCPU: user.availCPU,
      availSlots: user.availSlots,
      role: user.role,
      linkId: user.linkId,
      discordId: user.discordId,
    },
    `${jwtToken}`
  )
  userLogin(`<@${user.uid}>`)
  return res.send(token)
    }catch(ex){
        next(ex);
    }
}

module.exports.getJFRDiscord = async (req, res, next) => {
try{
  const jfrData = await JFR.find({active: true});
  return res.json({jfrData})
}catch(ex){
  next(ex);
}
}