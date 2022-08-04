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
        type: String,
        required: true,
        default: "Not Suspended"
    },
    serverOwner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
});

module.exports = mongoose.model("Servers", serversSechma);
