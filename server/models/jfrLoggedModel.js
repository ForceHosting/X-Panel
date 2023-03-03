const mongoose = require("mongoose");

const claimsSchema = new mongoose.Schema({
    guildId: {
        type: String,
        required: true,
    },
    userClaimed:{
        type: String,
        required: true
    },
});

module.exports = mongoose.model("Claimed JFR", claimsSchema);