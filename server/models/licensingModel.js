const mongoose = require("mongoose");

const licenseSechma = new mongoose.Schema({
    licenseKey: {
        type: String,
        required: true,
    },
    licenseUsers: {
        type: Number,
        required: true,
    },
    licenseOwner: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("Licenses", licenseSechma);
