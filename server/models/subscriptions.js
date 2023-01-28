const mongoose = require("mongoose");
const {Types: {Long}} = mongoose;
const paymentsSechma = new mongoose.Schema({
    paymentUser: {
        type: String,
        required: true,
    },
    productType: {
        type: String,
        required: true
    },
    productPrice: {
        type: Number,
        required: true,
    },
    subscriptionId: {
        type: String,
        required: true,
    },
    orderId: {
        type: String,
        required: true,
    },
    nextPurchaseTime: {
        type: Long,
        required: true,
    }
});

module.exports = mongoose.model("Subscriptions", paymentsSechma);
