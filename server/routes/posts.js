const {
    getUserProfile,
    createNewPost
  } = require("../controllers/postController");
  const router = require("express").Router();
  
router.get("/poster/:id", getUserProfile);
router.post("/post/new", createNewPost)
  module.exports = router;