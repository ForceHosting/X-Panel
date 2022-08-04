const {
    addToQueue
  } = require("../controllers/serverController");
  
  const router = require("express").Router();
  
  router.post("/create", addToQueue);
  
  module.exports = router;
  