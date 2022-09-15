const mongoose = require("mongoose");

const serversSechma = new mongoose.Schema({
    nodeName: {
        type: String,
        required: true,
    },
    pteroId: {
        type: String,
        required: true,
    },
    nodeSlots: {
        type: Number,
        required: true,
    }
});

module.exports = mongoose.model("Nodes", serversSechma);
