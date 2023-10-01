const {
    createServer,
    getServers,
    deleteServer,
    renewServer,
    getGlobalServers,
  } = require("../controllers/serverController");
  
  const router = require("express").Router();
  
  router.post("/create", createServer);
  router.get("/getServers", getServers)
  router.post("/remove", deleteServer)
  router.post("/renew", renewServer)
  router.get("/global/:page", getGlobalServers)
  module.exports = router;
  