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
  earningCoins,
  earningLeaderboard,
  purchaseResources
} = require("../controllers/userController");
const {
  initDiscordAuth,
  tokenDiscordAuth,
  getDiscordAuth,
  getJFRDiscord,
  linkMewGem
} = require("../controllers/discordController");
const router = require("express").Router();


// --------------------------------
// --------------------------------
// BASIC ROUTES
// --------------------------------
// --------------------------------

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
router.get('/leaderboard', earningLeaderboard)
router.post('/resources', purchaseResources)


// --------------------------------
// --------------------------------
// DISCORD ROUTES
// --------------------------------
// --------------------------------

router.get('/', initDiscordAuth)
router.get('/discord', tokenDiscordAuth);
router.get('/discord/data', getDiscordAuth)
router.get('/discord/jfr/servers/list', getJFRDiscord)


// --------------------------------
// --------------------------------
// MEWGEM ROUTES
// --------------------------------
// --------------------------------

router.get('/mewgem', linkMewGem)

module.exports = router;