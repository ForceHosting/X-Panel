const mongoose = require("mongoose");

const paymentsSechma = new mongoose.Schema({
    paymentUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    productBought: {
        type: String,
        required: true,
    },
    productPrice: {
        type: Number,
        required: true,
    },
    transactionId: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("Payments", paymentsSechma);
