const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
 ownerId: {
    type: "string",
    required: true,
 },
 deploymentId: {
    type: "string",
    required: true,
 },
 serverId: {
    type: "string",
    required: true,
 },
 depName: {
    type: "string",
    required: true,
 },
 rDns: {
    type: "string",
    required: false,
 },
 serverPort: {
    type: "string",
    required: true,
 },
 licenseKey: {
    type: "string",
    required: true,
 },
 artificalOrigin: {
    type: "string",
    required: false,
 }
});

module.exports = mongoose.model("SaaS", userSchema);
