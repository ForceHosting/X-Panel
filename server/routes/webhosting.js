const {
    createWeb, getWeb
} = require("../controllers/webhostingController");
  
  const router = require("express").Router();

  router.post('/create', createWeb);
  router.get('/get/:userId', getWeb);





module.exports = router;