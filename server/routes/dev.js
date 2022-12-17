const {
    getPosts,
    getPost,
  } = require("../controllers/dev");
  
  const router = require("express").Router();
  
  router.get("/posts/all", getPosts);
  router.get("/post/:id", getPost);
  
  module.exports = router;
  