const {
  login,
  registerNew,
  getAllUsers,
  logOut,
  getData,
  getUserLevel,
  banUser,
  generateAccLink,
  verifyCodeRegister
} = require("../controllers/userController");
const passport = require('passport');
const User = require('../models/userModel');

const router = require("express").Router();
const jwt = require('jsonwebtoken');
const {jwtToken} = require('../config.json');
const { userLogin } = require('../bot/index');
router.post("/login", login);
router.get("/getData", getData);
router.post("/register", registerNew);
router.get("/allusers/:id", getAllUsers);
router.get("/logout/:id", logOut);
router.get('/getmodlevel/:id', getUserLevel);
router.get('/ban/:id', banUser);
router.post('/link/generate', generateAccLink);
router.post('/verify', verifyCodeRegister)


router.get('/', passport.authenticate('discord'));
router.get('/redirect', passport.authenticate('discord', { 
    failureRedirect: '/forbidden',
    successRedirect: '/auth/authorizing'
}));
router.get('/discord/data',  async (req, res)=>{
  const user = req.user;
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
  userLogin(`<@${user.discordId}>`)
  return res.send(token)
})

module.exports = router;