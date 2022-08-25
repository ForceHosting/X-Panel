const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  panelUser: {
    type: String,
    required: true,
    unique: true,
  },
  panelPwd: {
    type: String,
    required: true,
  },
  planType: {
    type: String,
    required: true,
  },
  planDomain: {
    type: String,
    required: true,
  },
  accountHolder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  }

});

module.exports = mongoose.model("Webhosting", userSchema);
