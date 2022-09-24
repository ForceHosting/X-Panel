const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: true,
    unique: true,
    max: 50,
  },
  username: {
    type: String,
    required: true,
    min: 3,
    max: 20,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    max: 50,
  },
  lastIP: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    min: 8,
  },
  pteroUserId: {
    type: String,
  },
  pteroId: {
    type: Number,
    required: true
  },
  pteroPwd: {
    type: String,
    required: true,
  },
  credits: {
    type: String,
    required: true,
    default: 0,
  },
  availMem: {
    type: Number,
    required: true,
    default: 1024
  },
  availDisk: {
    type: Number,
    required: true,
    default: 10240
  },
  availCPU: {
    type: Number,
    required: true,
    default: 50
  },
  availSlots: {
    type: Number,
    required: true,
    default: 2
  },
  role: {
    type: String,
    required: true,
    default: "Customer",
  },
  linkId: {
    type: String,
    unique: true,
  },
  staffRank: {
    type: Number,
    required: true,
    default: 0
  },
  discordId: {
    type: Number,
    required: false,
  },
});

module.exports = mongoose.model("Users", userSchema);
