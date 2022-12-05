const Posts = require("../models/blogPostModel");
const User = require('../models/userModel');
const Filter = require("badwords-filter");

module.exports.getPosts = async (req, res, next) => {
  try{
    let devPosts = await Posts.find().select([
      "postedBy",
      "postedOn",
      "postImage",
      "postTitle",
      "postUid",
    ]);
    return res.json(devPosts)
  }catch(ex){
    next(ex)
  }
}

module.exports.getPost = async (req, res, next) => {
    try{
        const {id} = req.params;
      let postData = await Posts.find({ postUid: id }).select([
        "postedBy",
        "postedOn",
        "postImage",
        "postTitle",
        "postUid",
        "postContent"
      ]);
      console.log(id)
      return res.json(postData)
    }catch(ex){
      next(ex)
    }
  }