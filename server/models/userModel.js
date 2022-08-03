const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
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
  discordId: {
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
  credits: {
    type: String,
    required: true,
    default: 0,
  },
  modLevel: {
    type: String,
    required: true,
    default: "Normal User",
  },
});

module.exports = mongoose.model("Users", userSchema);
