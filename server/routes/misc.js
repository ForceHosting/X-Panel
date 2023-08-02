const {
    addRefToAcc,
    getSiteStats,
    getAllUsers,
    getUserDetails,
    updateUserDetails,
    getAllServers,
    getServerDetails,
    updateServerDetails,
  } = require("../controllers/miscController");
  const router = require("express").Router();
  
  
  router.get("/ref", addRefToAcc);
  router.get("/staff/stats", getSiteStats)
  router.get("/staff/users/:page", getAllUsers)
  router.get("/staff/user/:id", getUserDetails)
  router.post("/staff/user/update", updateUserDetails)

  router.get("/staff/servers/:page", getAllServers)
  router.get("/staff/server/:id", getServerDetails)
  router.post("/staff/server/update", updateServerDetails)
  module.exports = router;