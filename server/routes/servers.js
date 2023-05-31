const {
    createServer,
    getServers,
    deleteServer,
    getGlobalServers,
  } = require("../controllers/serverController");
  
  const router = require("express").Router();
  
  router.post("/create", createServer);
  router.get("/getServers", getServers)
  router.post("/remove", deleteServer)
  router.get("/global", getGlobalServers)
  module.exports = router;
  