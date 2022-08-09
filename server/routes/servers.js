const {
    addToQueue,
    getServers
  } = require("../controllers/serverController");
  
  const router = require("express").Router();
  
  router.post("/create", addToQueue);
  router.get("/getServers/:id", getServers)
  
  module.exports = router;
  