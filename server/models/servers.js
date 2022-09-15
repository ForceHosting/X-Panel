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
        type: String,
        required: true,
    },
    serverCPU: {
        type: String,
        required: true,
    },
    serverDisk: {
        type: String,
        required: true,
    },
    serverSuspended: {
        type: Boolean,
        required: true,
        default: false
    },
    serverOwner: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("Servers", serversSechma);
