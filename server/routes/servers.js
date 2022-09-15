const {
    createServer,
    getServers,
    deleteServer
  } = require("../controllers/serverController");
  
  const router = require("express").Router();
  
  router.post("/create", createServer);
  router.get("/getServers/:id", getServers)
  router.get("/delete/:uid/:pid", deleteServer)
  
  module.exports = router;
  