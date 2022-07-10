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
  password: {
    type: String,
    required: true,
    min: 8,
  },
  quickId: {
    type: String,
    required: true,
    unique: true,
    max: 20,
  },
  isAvatarImageSet: {
    type: Boolean,
    default: false,
  },
  modLevel: {
    type: String,
    required: true,
    default: "Normal User",
  },
  avatarImage: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("Users", userSchema);
