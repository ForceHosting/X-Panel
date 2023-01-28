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
    type: String,
    required: true,
  },
  paidPlan: {
    type: String,
    required: false,
  }
});

module.exports = mongoose.model("Webhosting", userSchema);
