const {
    list
  } = require("../controllers/ProductController");
  
  const router = require("express").Router();
  
  router.get("/list", list);
  
  module.exports = router;
  