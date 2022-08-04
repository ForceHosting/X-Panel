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
  password: {
    type: String,
    required: true,
    min: 8,
  },
  pteroId: {
    type: String,
    required: true,
    unique: true,
    max: 20,
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
});

module.exports = mongoose.model("Users", userSchema);
