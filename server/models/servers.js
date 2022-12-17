const mongoose = require("mongoose");

const serversSechma = new mongoose.Schema({
    serverName: {
        type: String,
        required: true,
    },
    serverId: {
        type: String, 
        require: true,
    },
    serverNode: {
        type: String,
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
    serverStatus: {
        type: String,
        required: true,
        default: "Active"
    },
    serverOwner: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("Servers", serversSechma);
