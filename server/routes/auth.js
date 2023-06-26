const {
  login,
  registerNew,
  getAllUsers,
  logOut,
  getData,
  getUserLevel,
  banUser,
  generateAccLink,
  verifyCodeRegister,
  earningCoins
} = require("../controllers/userController");
const {
  initDiscordAuth,
  tokenDiscordAuth,
  getDiscordAuth,
  getJFRDiscord
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
router.get('/coins', earningCoins)
// --------------------------------
// --------------------------------
// DISCORD ROUTERS
// --------------------------------
// --------------------------------
router.get('/', initDiscordAuth)
router.get('/discord', tokenDiscordAuth);
router.get('/discord/data', getDiscordAuth)
router.get('/discord/jfr/servers/list', getJFRDiscord)


module.exports = router;