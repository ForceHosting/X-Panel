const {
    getLicense,
  } = require("../controllers/licenseController");
  
  const router = require("express").Router();
  
  router.get("/get", getLicense);
  
  module.exports = router;
  