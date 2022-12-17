const mongoose = require("mongoose");

const devPostSchema = new mongoose.Schema({
    postedBy: {
        type: String,
        required: true,
    },
    postedOn: {
        type: String,
        required: true,
    },
    postTitle:{
        type: String,
        required: true
    },
    postUid:{
        type: String,
        required: true
    },
    postContent: {
        type: String,
        required: true,
    },
    postImage: {
        type: String,
        required: true,
    },
    postCover: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("devPosts", devPostSchema);
