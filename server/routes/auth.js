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
const {
  initDiscordAuth,
  tokenDiscordAuth,
  getDiscordAuth
} = require("../controllers/discordController");
const router = require("express").Router();




router.post("/login", login);
router.get("/getData", getData);
router.post("/register", registerNew);
router.get("/allusers/:id", getAllUsers);
router.get("/logout/:id", logOut);
router.get('/getmodlevel/:id', getUserLevel);
router.get('/ban/:id', banUser);
router.post('/link/generate', generateAccLink);
router.post('/verify', verifyCodeRegister)
// --------------------------------
// --------------------------------
// DISCORD ROUTERS
// --------------------------------
// --------------------------------
router.get('/', initDiscordAuth)
router.get('/discord', tokenDiscordAuth);
router.get('/discord/data', getDiscordAuth)



module.exports = router;