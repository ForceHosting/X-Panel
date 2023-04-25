const mongoose = require("mongoose");

const claimsSchema = new mongoose.Schema({
    guildId: {
        type: String,
        required: true,
    },
    claimAmount:{
        type: Number,
        required: true
    },
    uses:{
        type: String,
        required: true
    },
});

module.exports = mongoose.model("JFR", claimsSchema);