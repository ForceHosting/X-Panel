const mongoose = require("mongoose");

const claimsSchema = new mongoose.Schema({
    guildId: {
        type: String,
        required: true,
    },
    guildName: {
        type: String,
        require: true,
    },
    guildBanner: {
        type: String,
        required: true,
    },
    guildIcon: {
        type: String,
        required: true,
    },
    guildInvite: {
        type: String,
        required: true,
    },
    claimAmount:{
        type: Number,
        required: true
    },
    active: {
        type: Boolean,
        required: true,
    },
    uses:{
        type: String,
        required: true
    },
});

module.exports = mongoose.model("JFR", claimsSchema);