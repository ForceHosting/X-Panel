const User = require("../models/userModel");
const Contact = require("../models/contacts");
const bcrypt = require("bcrypt");
const ShortUniqueId = require("short-unique-id");
const uid = new ShortUniqueId({ length: 10 });
const express = require("express");
const app = express();
const socket = require("socket.io");
const { scopes } = require("../config.json");
const fetch = require('node-fetch')
const Client = require('discord-oauth2-api');


module.exports.getData = async (req, res, next) => {
  console.log(req.session.user)
    if(!req.session.user){
      return res.json({ status: false });
    }
    else{
      const userData = req.session.user
      return res.json({ status: true, user: userData });
    }
  };

  module.exports.login = async (req, res, next) => {
    try {
      const client = new Client({
        clientID: '995725017985851462',
        clientSecret: 'ohxgr0MYx-6r28edKrxclgcmeMIgatpd',
        scopes: ['identify', 'guilds'],
        redirectURI: 'http://localhost:5000/api/auth/callback'
    });
    let userToken = client.getAccessToken(req.query.code).then(token => 
      client.getUser(token.accessToken).then(user =>{ 
        
          const newUser = User.create({
            username: user.username,
            email: user.email,
            discordId: user.id,
            pteroId: 'ptero_'+Math.random(),
            credits: '0',
            modLevel: 'Customer'
          })
          req.session.user = user;
          console.log(req.session.user)
          res.redirect(process.env.AUTH_REDIRECT_PROXY)
      }));
    

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
    console.log(user);
    return res.json(user);
  }catch(ex) {
    next(ex);
  }
}

module.exports.addContact = async (req, res, next) => {
  try{
    const { fromId, id } = req.body;
    const findUserName = await User.find({ id }).select([
      "username",
    ]);
    const contact = await Contact.create({
      userFrom: fromId,
      userTo: id,
      userName: findUserName,
    });
    return res.json({ status: true, contact });
  }catch(ex){
    next(ex);
  }
};

module.exports.register = async (req, res, next) => {
  try {
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
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
      quickId: userUid,
      modLevel: "Normal User",
    });
    delete user.password;
    return res.json({ status: true, user });
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

module.exports.setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;
    const userData = await User.findByIdAndUpdate(
      userId,
      {
        isAvatarImageSet: true,
        avatarImage,
      },
      { new: true }
    );
    return res.json({
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage,
    });
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

module.exports.modName = async (req, res, next) => {
  try {
    const bannedUid = uid()
    const user = await User.findById({_id: req.params.id}).select([
      "_id",
      "modLevel"
    ]);
    if(user.modLevel !== 'Normal User'){
      return res.json({ error: "You can't ban another staff.", status: false});
    }
    const userData = await User.findByIdAndUpdate(req.params.id, { username: '[Moderated Username '+bannedUid+']', modLevel: 'Normal User' });
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
