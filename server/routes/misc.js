const {
    addRefToAcc
  } = require("../controllers/miscController");
  const router = require("express").Router();
  
  
  
  
  router.get("/ref", addRefToAcc);
  module.exports = router;