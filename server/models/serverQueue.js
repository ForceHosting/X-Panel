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
    ownerDid: {
        type: String,
        required: true,
    },
    ownerPteroId: {
        type: Number,
        required: true
    },
    isGlobal: {
        type: Boolean,
        required: false,
        default: false,
    },
});

module.exports = mongoose.model("ServerQueue", serversSechma);
