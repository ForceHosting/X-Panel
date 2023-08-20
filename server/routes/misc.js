const {
    addRefToAcc,
    getSiteStats,
    getAllUsers,
    getUserDetails,
    updateUserDetails,
    getAllServers,
    getServerDetails,
    updateServerDetails,
    updateUserProfile
  } = require("../controllers/miscController");
  const router = require("express").Router();
  
  router.get("/ref", addRefToAcc);
  router.post("/user/update", updateUserProfile)

  router.get("/staff/stats", getSiteStats)
  router.get("/staff/users/:page", getAllUsers)
  router.get("/staff/user/:id", getUserDetails)
  router.post("/staff/user/update", updateUserDetails)

  router.get("/staff/servers/:page", getAllServers)
  router.get("/staff/server/:id", getServerDetails)
  router.post("/staff/server/update", updateServerDetails)



  const {
    getUserProfile,
    createNewPost
  } = require("../controllers/postController");

  
router.get("/poster/:id", getUserProfile);
router.post("/post/new", createNewPost)


////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////// X-Panel Deployment //////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////


const {
  deployNewXP
} = require('../controllers/saasController');


router.post("/xpanel/deploy", deployNewXP)


  module.exports = router;