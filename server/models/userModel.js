const mongoose = require("mongoose");
require('mongoose-long')(mongoose);

const {Types: {Long}} = mongoose;

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
  profilePicture: {
    type: String,
    required: true,
    default: 'https://cdn.discordapp.com/attachments/768247396374544425/1136389322904440904/Force_Host_-_Mascot_no_bg-removebg.png',
  },
  lastIP: {
    type: String,
  },
  password: {
    type: String,
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
    type: Number,
    required: true,
    default: 0.00,
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
    type: Long,
  },
  countryCode: {
    type: String,
    required: false,
  },
  refCode: {
    type: String,
    required: true,
  },
  refUse: {
    type: Number,
    required: true,
    default: 0,
  },
  aboutMe: {
    type: String,
    required: true,
    default: "No bio yet."
  },
  isRocket: {
    type: Boolean,
    required: true,
    default: false
  },
  profileCover: {
    type: String,
    required: true, 
    default: "https://phoenixnap.com/kb/wp-content/uploads/2023/02/data-center-example.jpg"
  },
  compRole: {
    type: String,
    required: false,
  },
  company: {
    type: String,
    required: false,
    default: "No registered company available"
  },
  isBanned: {
    type: Boolean,
    default: false
  },
  lastEarn: {
    type: Number,
  },
  tempEarnRate: {
    type: Number,
    default: 0,
  },
  tempEarnRateExp: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model("Users", userSchema);
