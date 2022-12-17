const {
  login,
  register,
  getAllUsers,
  logOut,
  getData,
  getUserLevel,
  banUser,
  generateAccLink
} = require("../controllers/userController");
const passport = require('passport');

const router = require("express").Router();
const jwt = require('jsonwebtoken');
const {jwtToken} = require('../config.json');
const { userLogin } = require('../bot/index');
router.post("/login", login);
router.get("/getData", getData);
router.post("/register", register);
router.get("/allusers/:id", getAllUsers);
router.get("/logout/:id", logOut);
router.get('/getmodlevel/:id', getUserLevel);
router.get('/ban/:id', banUser);
router.post('/link/generate', generateAccLink);
router.get('/', passport.authenticate('discord'));
router.get('/redirect', passport.authenticate('discord', { 
    failureRedirect: '/forbidden',
    successRedirect: '/auth/authorizing'
}));
router.get('/discord/data', (req, res)=>{
  const user = req.user;
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
