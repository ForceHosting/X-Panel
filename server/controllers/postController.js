const User = require("../models/userModel");
const Posts = require("../models/userPostModel");
var Filter = require('bad-words'),
    filter = new Filter({ placeHolder: 'x'});

module.exports.getUserProfile = async (req, res, next) => {
    try{
        console.log("getUserDetails")
        const id = req.params.id;
        const userDetails = await User.findById(id).select([
            'isRocket',
            'aboutMe',
            'role',
            'username',
            'profilePicture',
            'company',
            'compRole',
            'profileCover'
        ]);
        const posted = await Posts.find({ postedBy: id })
        return res.status(200).json({userDetails, posted});
    }catch(ex){
        next(ex);
    }
}

module.exports.createNewPost = async (req, res, next) => {
    try{
        const {postContents, userId} = req.body;
        const filteredPost = filter.clean(postContents)
        const newPost = await Posts.create({
            postedBy: userId,
            postedOn: Date.now()/1000,
            postContent: filteredPost,
            postLikes: 0,
        })
        return res.status(200)
    }catch(ex){
        next(ex);
    }
}