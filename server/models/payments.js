const mongoose = require("mongoose");

const paymentsSechma = new mongoose.Schema({
    paymentUser: {
        type: String,
        required: true,
    },
    subscriptionId: {
        type: String,
        required: true
    },
    invoiceId: {
        type: String,
        required: true,
    },
    productName: {
        type: String,
        required: true,
    },
    productPrice: {
        type: String,
        required: true,
    },
    productDescription: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Payments", paymentsSechma);
