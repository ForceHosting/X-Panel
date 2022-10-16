const {
    getLicense
  } = require("../controllers/license");
  
  const router = require("express").Router();
  
  router.post("/get/:id", getLicense);
  
  module.exports = router;
  