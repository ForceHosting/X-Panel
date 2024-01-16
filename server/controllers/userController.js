const User = require("../models/userModel");
const Servers = require("../models/servers");
const bcrypt = require("bcrypt");
const ShortUniqueId = require("short-unique-id");
const uid = new ShortUniqueId({ length: 10 });
const { makeid, getIP, sendWelcome, sendVerify } = require('../functions')
const { userLogin, userRegister, sendErrorCode, NewEarn } = require('../bot/index');
const fetch = require('node-fetch');
const {pteroKey, jwtToken, encryptKey} = require('../config.json');
const noRegister = false;
const jwt = require('jsonwebtoken')
const Verify = require('../models/verifyCodes')
const CryptoJS = require('crypto-js');


module.exports.newEarn = async (req, res, next) => {
try{
  const bearerHeader = req.headers['authorization'];
  const jwtVerify = jwt.verify(bearerHeader,jwtToken)
  const userUid = jwtVerify._id;
}catch(ex){
  next(ex);
}
}

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
      "refCode",
      "refUses"
    ]);
    if(!userData.refCode){
      const randomRefId = makeid(5)
      await User.findByIdAndUpdate(jwtVerify._id,{'refCode': randomRefId, 'refUse': 0})
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
        "refCode",
        "refUse"
      ]);
    }else{
    return res.json(userData)
  }
  } catch(ex){
    next(ex)
  }
};

  module.exports.login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email: email });
      if (!user)
        return res.status(409).json({ msg: "Incorrect Email or Password", status: false });
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid)
        return res.status(409).json({ msg: "Incorrect Email or Password", status: false });
        const ip = req.headers['x-forwarded-for'];
        const checkIP = await User.find({ lastIP: ip }).count();
        if(checkIP > 1)
          return res.status(426).json({ msg: "Another account is already using that IP address. Please contact support.", status: false });
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

module.exports.registerNew = async (req, res, next) => {
try{
res.status(503).json({msg: "Registration is done via Discord. Please try that instead."})
}catch(ex) {
next(ex);
}
}

module.exports.earningCoins = async (req, res, next) => {
try{
  if(req.get('referer') !== 'http://localhost:3000/'){
    return res.status(401).json({msg:'whomp whomp'});
  }
  const bearerHeader = req.headers['authorization'];
  const jwtVerify = jwt.verify(bearerHeader,jwtToken)
  const userUid = jwtVerify._id;
  const userData = await User.findById(userUid).select([
    'credits',
    'role',
    'lastEarn',
    'discordId',
    'tempEarnRate',
    'tempEarnRateExp'
  ])
  const secondsDifference = (Date.now() - userData.lastEarn) / 1000;
  console.log(secondsDifference)
  if (secondsDifference >= 0) {
    console.log("At least 60 seconds have passed.");

  const decryptedRole = CryptoJS.AES.decrypt(userData.role, encryptKey).toString(CryptoJS.enc.Utf8);
  if(!userData.tempEarnRateExp) {
    await User.findByIdAndUpdate(userUid, {tempEarnRate: 0});
  }
  if (!userData.tempEarnRateExp || Date.now() > userData.tempEarnRateExp) {
    if("Customer" === userData.role){
      const newCredits = userData.credits + 0.25;
      await User.findByIdAndUpdate(userUid, {credits: newCredits, lastEarn: Date.now()});
      NewEarn(userData.discordId, newCredits, Date.now())
      return res.status(200).json({msg: 'Added one coin!', coins: newCredits});
    }else if("rt1" === decryptedRole){
      const newCredits = userData.credits + 0.5;
      await User.findByIdAndUpdate(userUid, {credits: newCredits, lastEarn: Date.now()});

      NewEarn(userData.discordId, newCredits, Date.now())
      return res.status(200).json({msg: 'Added one coin!', coins: newCredits});
    }else if("rt2" === decryptedRole){
      const newCredits = userData.credits + 0.75;
      await User.findByIdAndUpdate(userUid, {credits: newCredits, lastEarn: Date.now()});

      NewEarn(userData.discordId, newCredits, Date.now())
      return res.status(200).json({msg: 'Added one coin!', coins: newCredits});
    }
    else if("rt3" === decryptedRole){
      const newCredits = userData.credits + 1.00;
      await User.findByIdAndUpdate(userUid, {credits: newCredits, lastEarn: Date.now()});
      NewEarn(userData.discordId, newCredits, Date.now())
      return res.status(200).json({msg: 'Added one coin!', coins: newCredits});
    }
    else if("rpleg" === decryptedRole){
      const newCredits = userData.credits + 1.25;
      await User.findByIdAndUpdate(userUid, {credits: newCredits, lastEarn: Date.now()});
      NewEarn(userData.discordId, newCredits, Date.now())
      return res.status(200).json({msg: 'Added one coin!', coins: newCredits});
    }
    else if("sprt" === decryptedRole){
      const newCredits = userData.credits + 0.5;
      await User.findByIdAndUpdate(userUid, {credits: newCredits, lastEarn: Date.now()});
      NewEarn(userData.discordId, newCredits, Date.now())
      return res.status(200).json({msg: 'Added one coin!', coins: newCredits});
    }
    else if("mgmt" === decryptedRole){
      const newCredits = userData.credits + 0.5;
      await User.findByIdAndUpdate(userUid, {credits: newCredits, lastEarn: Date.now()});
      NewEarn(userData.discordId, newCredits, Date.now())
      return res.status(200).json({msg: 'Added one coin!', coins: newCredits});
    }
    else if("exec" === decryptedRole){
      const newCredits = userData.credits + 0.5;
      await User.findByIdAndUpdate(userUid, {credits: newCredits, lastEarn: Date.now()});
      NewEarn(userData.discordId, newCredits, Date.now())
      return res.status(200).json({msg: 'Added one coin!', coins: newCredits});
    }
    else if("fhfound" === decryptedRole){
      const newCredits = userData.credits + 0.5;
      await User.findByIdAndUpdate(userUid, {credits: newCredits, lastEarn: Date.now()});
      NewEarn(userData.discordId, newCredits, Date.now())
      return res.status(200).json({msg: 'Added one coin!', coins: newCredits});
    }
    else if("sysad" === decryptedRole){
      const newCredits = userData.credits + 0.5;
      await User.findByIdAndUpdate(userUid, {credits: newCredits, lastEarn: Date.now()});
      NewEarn(userData.discordId, newCredits, Date.now())
      return res.status(200).json({msg: 'Added one coin!', coins: newCredits});
    }else{
      return res.status(500).json({msg: 'Could not find role in database.'})
    }
  }else{
    const newCredits = userData.credits + userData.tempEarnRate;
    await User.findByIdAndUpdate(userUid, {credits: newCredits, lastEarn: Date.now()});
    NewEarn(userData.discordId, newCredits, Date.now())
    return res.status(200).json({msg: 'Added '+userData.tempEarnRate+' coin(s)!', coins: newCredits});
  }
  
} else {
  return res.status(400).json({ msg: 'Nice try bozo the clown, wait your 60 seconds and try again', secondsDifference });
}
}catch(ex) {
  next(ex);
}
}

module.exports.earningLeaderboard = async (req, res, next) => {
  try{
    const pipeline = [
      {
        $addFields: {
          coinsNumeric: { $toDouble: "$credits" } // Convert credits to a numeric type
        }
      },
      {
        $sort: { coinsNumeric: -1 }
      },
      {
        $limit: 10
      },
      {
        $project: {
          _id: 0, // Exclude the _id field
          username: 1,
          credits: 1,
          isRocket: 1,
          company: 1
        }
      }
    ];
    
    const top10 = await User.aggregate(pipeline);
    return res.status(200).json({top10})
  }catch(ex){
    next(ex);
  }
}

module.exports.register = async (req, res, next) => {
  try {
    if(noRegister == true){
      return res.json({ msg: "Registration will be enabled soon!", status: false})
    }else{
      const userUid = uid()
    const { username, email, password } = req.body;
    if (username == '[Banned]')
      return res.json({ msg: "Sorry, you can't use that username. Please try a different one.", status: false });
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck)
      return res.json({ msg: "Username already used", status: false });
    const emailCheck = await User.findOne({ email });
    if (emailCheck)
      return res.json({ msg: "Email already used", status: false });
    const hashedPassword = await bcrypt.hash(password, 10);
    const pteroIdu = makeid(10);
    const pteroPass = makeid(15)
    var rawPteroPass = Buffer.from(pteroPass);
    var encryptedPteroPass = rawPteroPass.toString('base64');

    const pteroReq = await fetch('https://control.forcehost.net/api/application/users', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer `+pteroKey
      },
      body: JSON.stringify({
        username: pteroIdu,
        email: email,
        first_name: 'Force Host',
        last_name: 'Registered User',
        password: pteroPass
      })
    });
    const pteroData = await pteroReq.json();
    if(pteroReq.status === 201 || pteroReq.status === 200){
      const newLinkId = makeid(10)
    const pterodactylUid = pteroData.attributes.id;
    const user = await User.create({
      uid: userUid,
      username: username,
      email: email,
      pteroUserId: pteroIdu,
      pteroId: pterodactylUid,
      pteroPwd: encryptedPteroPass,
      credits: 0,
      password: hashedPassword,
      role: "Customer",
      linkId: newLinkId,
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
    userRegister(user.username)
    sendWelcome(userData.email)
    return res.json({ status: true, user: token });
      
    }else{
      const pteroRequest = await fetch('https://control.forcehost.net/api/application/users/?filter[email]='+email+'', {
        method: 'get',
        headers: {
          "Accept": "application/json",
          'Content-Type': 'application/json',
          Authorization: `Bearer `+pteroKey
        },
      });
      if(pteroRequest.status !== 200){
        const errorCode = makeid(5)
      sendErrorCode(errorCode, 'Pterodactyl account creation issue')
      return res.json({ msg: `There was an issue with creating your account. Please contact support. Err code: ${errorCode}`, status: false});
      }else{
        const verifyCode = makeid(6);
        Verify.create({
          email: email,
          code: verifyCode,
          expires: Math.floor(Date.now() / 1000) + 600,
          hashPass: hashedPassword,
          username: username,
        })
        //sendVerify(email,verifyCode);
        return res.json({status: 201})
      }

      
    }
    
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

module.exports.verifyCodeRegister = async (req, res, next) => {
  try {
    const {verifyCode} = req.body;
    const checkVerify = await Verify.findOne({'code':verifyCode});
    if(!checkVerify){
      return res.json({status: 500, payload: 'Unable to find verification code.'});
    }else{
      const email = checkVerify.email;
      const username = checkVerify.username;
      const hashedPassword = checkVerify.hashPass;
    const pteroRequest = await fetch('https://control.forcehost.net/api/application/users/?filter[email]='+email+'', {
        method: 'get',
        headers: {
          "Accept": "application/json",
          'Content-Type': 'application/json',
          Authorization: `Bearer `+pteroKey
        },
      });
      const pterodData = await pteroRequest.json();

      if(pteroRequest.status != 200){

      }else{

    const userUuid = uid()
        const newLinkId = makeid(10)
        const newPteroPass = makeid(15)
    var newRawPteroPass = Buffer.from(newPteroPass);
    var newEncryptedPteroPass = newRawPteroPass.toString('base64');
    const changeRequest = await fetch("https://control.forcehost.net/api/application/users/"+JSON.stringify(pterodData.data[0].attributes.id), {
  "method": "PATCH",
  "headers": {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "Authorization": "Bearer "+pteroKey,
  },
  body: JSON.stringify({
    username: pterodData.data[0].attributes.username,
    email: pterodData.data[0].attributes.email,
    first_name: 'Force Host',
    last_name: 'Registered User',
    password: newPteroPass,
  })
})
        
        const chngReg = await changeRequest.json();
        if(changeRequest.status != 200){
          const errorCode = makeid(5)
      sendErrorCode(errorCode, 'Pterodactyl account creation issue. Could not update password.')
      return res.json({ msg: `There was an issue with creating your account. Please contact support. Err code: ${errorCode}`, status: false});
        }
        const user = await User.create({
          uid: userUuid,
          username: username,
          email: email,
          pteroUserId: pterodData.data[0].attributes.username,
          pteroId: pterodData.data[0].attributes.id,
          pteroPwd: newEncryptedPteroPass,
          credits: 500,
          availMem: 0,
          availDisk: 0,
          availCPU: 0,
          availSlots: 0,
          password: hashedPassword,
          role: "Customer",
          linkId: newLinkId,
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
        userRegister(user.username)
        sendWelcome(userData.email)
        return res.json({ status: true, user: token });
      }}
  }catch(ex){
    next(ex);
  }
}

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

module.exports.purchaseResources = async (req, res, next) => {
  try {
    const bearerHeader = req.headers['authorization'];
    const jwtVerify = jwt.verify(bearerHeader,jwtToken)
    const userUid = jwtVerify._id;
    const userData = await User.findById(userUid)
    const {itemId} = req.body;

    if(itemId === 1){
      const newCoins = userData.credits - 2500;
      console.log(newCoins)
      if(newCoins < 0){
        return res.status(400).json({msg:'You do not have enough coins to purchase that.'})
      }else{
        const newRam = userData.availMem + 1024;
        const userD = await User.findByIdAndUpdate(userUid, {availMem: newRam, credits: newCoins})
        return res.status(200).json({msg: 'Purchase successful!'})
      }
    }else if(itemId === 2){
      const newCoins = userData.credits - 1500;
      if(newCoins < 0){
        return res.status(400).json({msg:'You do not have enough coins to purchase that.'})
      }else{
        const newDisk = userData.availDisk + 1024;
        const userD = await User.findByIdAndUpdate(userUid, {availDisk: newDisk, credits: newCoins})
        return res.status(200).json({msg: 'Purchase successful!'})
      }
    }else if(itemId === 3){
      const newCoins = userData.credits - 2500;
      if(newCoins < 0){
        return res.status(400).json({msg:'You do not have enough coins to purchase that.'})
      }else{
        const newCPU = userData.availCPU + 50;
        const userD = await User.findByIdAndUpdate(userUid, {availCPU: newCPU, credits: newCoins})
        return res.status(200).json({msg: 'Purchase successful!'})
      }
    }else if(itemId === 4){
      const newCoins = userData.credits - 200;
      if(newCoins < 0){
        return res.status(400).json({msg:'You do not have enough coins to purchase that.'})
      }else{
        const newSlots = userData.availSlots + 1024;
        const userD = await User.findByIdAndUpdate(userUid, {availSlots: newSlots, credits: newCoins})
        return res.status(200).json({msg: 'Purchase successful!'})
      }
    }else{
      return res.status(400).json({msg: 'There was an error trying to purchase item: [NO ITEM DEFINED]'})
    }
  }catch (ex) {
    next(ex);
  }
}