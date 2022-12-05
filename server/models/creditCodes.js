const mongoose = require("mongoose");

const claimSchema = new mongoose.Schema({
    claimCode: {
        type: String,
        required: true,
    },
    claimAmount:{
        type: Number,
        required: true
    },
    uses:{
        type: Number,
        required: true
    },
    maxUses: {
        type: Number,
    }
});

module.exports = mongoose.model("Claim Codes", claimSchema);