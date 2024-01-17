const {
    createServer,
    addToQueue,
    getServers,
    deleteServer,
    renewServer,
    getGlobalServers,
    updateServer
  } = require("../controllers/serverController");
  
  const router = require("express").Router();
  
  router.post("/create", addToQueue);
  router.patch("/update", updateServer);
  router.get("/getServers", getServers)
  router.post("/remove", deleteServer)
  router.post("/renew", renewServer)
  router.get("/global/:page", getGlobalServers)
  module.exports = router;
  