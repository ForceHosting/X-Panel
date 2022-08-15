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
  
  router.post("/paypal/new", newPayPalPayment);
  
  module.exports = router;
  