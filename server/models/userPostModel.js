const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    postedOn: {
        type: String,
        required: true,
    },
    postContent: {
        type: String,
        required: true,
    },
    postLikes: {
        type: Number,
        required: true,
    },
    postComments: [{
        body: "string",
        by: mongoose.Schema.Types.ObjectId
    }]
});

module.exports = mongoose.model("user-posts", postSchema);