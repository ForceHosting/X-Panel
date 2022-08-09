const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  ticketReason: {
    type: String,
    required: true,
  },
  serverId: {
    type: String,
  },
  ticketStatus: {
    type: String,
    required: true,
    default: "Open"
  }
});

module.exports = mongoose.model("Tickets", ticketSchema);
