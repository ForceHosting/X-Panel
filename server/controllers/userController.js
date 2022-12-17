const User = require("../models/userModel");
const Servers = require("../models/servers");
const bcrypt = require("bcrypt");
const ShortUniqueId = require("short-unique-id");
const uid = new ShortUniqueId({ length: 10 });
const { makeid, getIP, sendWelcome } = require('../functions')
const { userLogin, userRegister, sendErrorCode } = require('../bot/index');
const fetch = require('node-fetch');
const {pteroKey, jwtToken} = require('../config.json');
const noRegister = false;
const jwt = require('jsonwebtoken')

module.exports.getData = async (req, res, next) => {
  try {
    const bearerHeader = req.headers['authorization'];
    const jwtVerify = jwt.verify(bearerHeader,jwtToken)
    let userData = await User.findById(jwtVerify._id).select([
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
    ]);
    return res.json(userData)
  } catch(ex){
    next(ex)
  }
};

  module.exports.login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email: email });
      if (!user)
        return res.json({ msg: "Incorrect Email or Password", status: false });
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid)
        return res.json({ msg: "Incorrect Email or Password", status: false });
        const ip = req.headers['x-forwarded-for'];
        const checkIP = await User.find({ lastIP: ip }).count();
        if(checkIP > 0)
          return res.json({ msg: "Another account is already using that IP address. Please contact support.", status: false });
        const userData = await User.findOne({ email }).select([
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
          "linkId"
        ]);
      const token = jwt.sign(
        {
          _id: userData._id,
          username: userData.username,
          email: userData.email,
          pteroId: userData.pteroId,
          pteroPwd: userData.Pwd,
          credits: userData.credits,
          availMem: userData.availMem,
          availDisk: userData.availDisk,
          availCPU: userData.availCPU,
          availSlots: userData.availSlots,
          role: userData.role,
          linkId: userData.linkId
        },
        `${jwtToken}`
      )
      userLogin(user.username)
      return res.json({ status: true, user: token });
    } catch (ex) {
      next(ex);
    }
  };

module.exports.getUserLevel = async (req, res, next) => {
  try{
    const id = req.body;
    const user = await User.findById({_id: req.params.id}).select([
      "_id",
      "modLevel"
    ]);
    return res.json(user);
  }catch(ex) {
    next(ex);
  }
};

module.exports.register = async (req, res, next) => {
  try {
    if(noRegister == true){
      return res.json({ msg: "Registration will be enabled soon!", status: false})
    }else{
      const userUid = uid()
    const { username, email, password } = req.body;
    console.log(req.body)
    const ip = req.headers['x-forwarded-for'];
    const ipInfo = await fetch('http://api.db-ip.com/v2/free/'+req.headers['x-forwarded-for'], { method: 'GET' })
    .then(res => res.json())
    .catch(error => console.error(error));
    if (username == '[Banned]')
      return res.json({ msg: "Sorry, you can't use that username. Please try a different one.", status: false });
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck)
      return res.json({ msg: "Username already used", status: false });
    const emailCheck = await User.findOne({ email });
    if (emailCheck)
      return res.json({ msg: "Email already used", status: false });
    const checkIP = await User.find({ lastIP: ip }).count();
    if(checkIP > 0)
      return res.json({ msg: "Another account is already using that IP address. Please contact support.", status: false });
    const hashedPassword = await bcrypt.hash(password, 10);
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
        email: email,
        first_name: 'Force Host',
        last_name: 'Registered User',
        password: pteroPass,
      })
    });
    const pteroData = await pteroReq.json();
    if(pteroReq.status != 201){
      const errorCode = makeid(5)
      sendErrorCode(errorCode, 'Pterodactyl account creation issue')
      return res.json({ msg: `There was an issue with creating your account. Please contact support. Err code: ${errorCode}`, status: false});
    }
    const newLinkId = makeid(10)
    const pterodactylUid = pteroData.attributes.id;
    const user = await User.create({
      uid: userUid,
      username: username,
      email: email,
      lastIP: ip,
      pteroUserId: pteroIdu,
      pteroId: pterodactylUid,
      pteroPwd: encryptedPteroPass,
      credits: 0,
      password: hashedPassword,
      role: "Customer",
      linkId: newLinkId,
      countryCode: ipInfo.countryCode,
    });
    const userData = await User.findOne({ email }).select([
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
      "linkId"
    ]);
    const token = jwt.sign(
      {
        _id: userData._id,
        username: userData.username,
        email: userData.email,
        pteroId: userData.pteroId,
        pteroPwd: userData.Pwd,
        credits: userData.credits,
        availMem: userData.availMem,
        availDisk: userData.availDisk,
        availCPU: userData.availCPU,
        availSlots: userData.availSlots,
        role: userData.role,
        linkId: userData.linkId
      },
      `${jwtToken}`
    )
    console.log(token)
    userRegister(user.username)
    sendWelcome(userData.email)
    return res.json({ status: true, user: token });
    }
  } catch (ex) {
    next(ex);
  }
};

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      "username",
      "avatarImage",
      "modLevel",
      "quickId",
      "_id",
    ]);
    return res.json(users);
  } catch (ex) {
    next(ex);
  }
};

module.exports.banUser = async (req, res, next) => {
  try {
    const bannedUid = uid()
    if (!req.params.id) return res.json({ msg: "User id is required " });
    const user = await User.findById({_id: req.params.id}).select([
      "_id",
      "modLevel"
    ]);
    if(user.modLevel == 'Administrator'){
      return res.json({ error: "You can't ban another admin.", status: false});
    }
    onlineUsers.delete(req.params.id);
    const userData = await User.findByIdAndUpdate(req.params.id, { username: '[Banned User '+bannedUid+']', modLevel: 'Banned' });
    return res.status(200).send();
  } catch (ex) {
    next(ex);
  }
};

module.exports.getUName = async (req, res, next) => {
  try {
    const bannedUid = uid()
    const user = await User.findById({_id: req.params.id}).select([
      "_id",
      "username"
    ]);
    return res.json(user);
  } catch (ex) {
    next(ex);
  }
};

module.exports.logOut = (req, res, next) => {
  try {
    if (!req.params.id) return res.json({ msg: "User id is required " });
    onlineUsers.delete(req.params.id);
    return res.status(200).send();
  } catch (ex) {
    next(ex);
  }
};

module.exports.generateAccLink = async (req, res, next) => {
  try{
    const {accountId} = req.body;
    const newLinkId = makeid(10)
    let userData = await User.findByIdAndUpdate(accountId, {'linkId': newLinkId });
    return res.json(newLinkId)
  }catch(ex){
    next(ex);
  }
}