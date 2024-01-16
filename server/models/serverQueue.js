const mongoose = require("mongoose");

const serversSechma = new mongoose.Schema({
    serverName: {
        type: String,
        required: true,
    },
    serverNode: {
        type: Number,
        required: true,
    },
    serverMemory: {
        type: Number,
        required: true,
    },
    serverCPU: {
        type: Number,
        required: true,
    },
    serverDisk: {
        type: Number,
        required: true,
    },
    serverSoftware: {
        type: String,
        required: true,
    },
    serverOwner: {
        type: String,
        required: true,
    },
    serverDid: {
        type: Number,
        required: true,
    },
    ownerPteroId: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("ServerQueue", serversSechma);
