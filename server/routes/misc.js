const {
    addRefToAcc,
    getSiteStats,
  } = require("../controllers/miscController");
  const router = require("express").Router();
  
  
  
  
  router.get("/ref", addRefToAcc);
  router.get("/staff/stats", getSiteStats)
  module.exports = router;