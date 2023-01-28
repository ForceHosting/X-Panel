const mongoose = require("mongoose");
const {Types: {Long}} = mongoose;

const ticketSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  expires: {
    type: Long,
  },
  hashPass: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("Verify Codes", ticketSchema);
