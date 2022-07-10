const {
  login,
  register,
  getAllUsers,
  setAvatar,
  logOut,
  addContact,
  getUserLevel,
  banUser,
  modName,
  getUName,
} = require("../controllers/userController");

const router = require("express").Router();

router.post("/login", login);
router.post("/register", register);
router.get("/allusers/:id", getAllUsers);
router.get("/logout/:id", logOut);
router.get('/getmodlevel/:id', getUserLevel),
router.get('/ban/:id', banUser);
router.get('/modname/:id', modName);
router.get('/getusername/:id', getUName);

module.exports = router;
