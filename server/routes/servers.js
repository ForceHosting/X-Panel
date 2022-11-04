const {
    createServer,
    getServers,
    deleteServer
  } = require("../controllers/serverController");
  
  const router = require("express").Router();
  
  router.post("/create", createServer);
  router.get("/getServers", getServers)
  router.post("/remove", deleteServer)
  
  module.exports = router;
  