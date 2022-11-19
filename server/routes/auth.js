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
    successRedirect: '/dashboard'
}));

module.exports = router;
