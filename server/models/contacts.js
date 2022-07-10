const mongoose = require("mongoose");

const contactsSechma = new mongoose.Schema({
    userFrom: {
        type: String,
        required: true,
    },
    userTo: {
        type: String, 
        require: true,
    },
    userName: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("Contacts", contactsSechma);
