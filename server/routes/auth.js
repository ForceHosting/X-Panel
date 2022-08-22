const {
  login,
  register,
  getAllUsers,
  logOut,
  getData,
  getUserLevel,
  banUser,
  modName,
  getUName,
} = require("../controllers/userController");

const router = require("express").Router();

router.post("/login", login);
router.get("/getData/:id", getData);
router.post("/register", register);
router.get("/allusers/:id", getAllUsers);
router.get("/logout/:id", logOut);
router.get('/getmodlevel/:id', getUserLevel),
router.get('/ban/:id', banUser);

module.exports = router;
