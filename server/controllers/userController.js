const User = require("../models/userModel");
const Servers = require("../models/servers");
const bcrypt = require("bcrypt");
const ShortUniqueId = require("short-unique-id");
const uid = new ShortUniqueId({ length: 10 });
const { makeid } = require('../functions')
const { userLogin, userRegister } = require('../bot/index');


module.exports.getData = async (req, res, next) => {
  try {
    const userId = req.params.uid;
    const userData = await User.findOne({ userId })
    console.log(userData)
    delete userData.password;
    return res.json({ userData })
  } catch(ex){
    next(ex)
  }
};

  module.exports.login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user)
        return res.json({ msg: "Incorrect Email or Password", status: false });
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid)
        return res.json({ msg: "Incorrect Email or Password", status: false });
      delete user.password;
      userLogin(user.username)
      return res.json({ status: true, user });
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
    const pteroUID = makeid(10);
    var rawPteroPass = Buffer.from(makeid(15));
    var encryptedPteroPass = rawPteroPass.toString('base64');
    const user = await User.create({
      uid: userUid,
      username: username,
      email: email,
      pteroId: pteroUID,
      pteroPwd: encryptedPteroPass,
      credits: 0,
      password: hashedPassword,
      role: "Customer",
    });
    delete user.password;
    userRegister(user.username)
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
