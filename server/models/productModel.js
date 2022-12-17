const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
    },
    productSKU: {
        type: String,
        required: true,
    },
    productDescription: {
        type: String,
        required: true,
    },
    productPrice: {
        type: Number,
        required: true,
    },
    productMemory: {
        type: Number,
        required: true,
    },
    productCPU: {
        type: Number,
        required: true,
    },
    productDisk: {
        type: Number,
        required: true,
    },
    productOldPrice: {
        type: Number,
    },
    productStatus: {
        type: String,
    },
    productCover: {
        type: String,
    }
});

module.exports = mongoose.model("Products", productsSchema);
