const Messages = require("../models/messageModel");
const Ticket = require("../models/ticketModel");
const User = require('../models/userModel');
const Filter = require("badwords-filter");
const { newTicketAlert } = require('../bot/index');


module.exports.getTicket = async (req, res, next) => {
  try{
    const ticketId = req.params.id;
    let ticketData = await Ticket.findOne({ ticketId }).select([
      "owner",
      "ticketReason",
      "severId",
      "ticketStatus"
    ]);
    return res.json({ ticketData })
  }catch(ex){
    next(ex)
  }
}

module.exports.newTicket = async (req, res, next) => {

  try {
    const { userUid, reason, sid } = req.body;
    const newTicket = await Ticket.create({
      owner: userUid,
      ticketReason: reason,
      serverId: sid,
      ticketStatus: "Open",
    });
    await Messages.create({
      ticketId: newTicket._id,
      message: { text: "Thank you for creating a ticket. One of our staff members will be with you shortly. To avoid wasting our staffs time, please let us know what your issue is." },
      users: ["6303d48ec8570a595d0606fa", newTicket._id],
      sender: "6303d48ec8570a595d0606fa",
      senderName: "System"
    });
    newTicketAlert(newTicket._id, reason);
    return res.json({status: true, newTicket})
  }catch(ex){
    next(ex);
  }

};


module.exports.getMessages = async (req, res, next) => {
  try {
    const { from, ticket } = req.body;

    const messages = await Messages.find({
      ticketId: ticket
    }).sort({ updatedAt: 1 });
    

    const projectedMessages = messages.map((msg) => {
      return {
        user: msg.senderName,
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text
      };
    });
    res.json(projectedMessages);
  } catch (ex) {
    next(ex);
  }
};

module.exports.addMessage = async (req, res, next) => {
  try {
    const filter = new Filter();
    const { from, ticket, message } = req.body;

    const user = await User.findById({_id: from}).select([
      "_id",
      "username"
    ]);

    const cleanedMessage = filter.clean(message);
    const data = await Messages.create({
      ticketId: ticket,
      message: { text: cleanedMessage },
      users: [from, ticket],
      sender: from,
      senderName: user.username
    });

    if (data) return res.json({ msg: "Message added successfully." });
    else return res.json({ msg: "Failed to add message to the database" });
  } catch (ex) {
    next(ex);
  }
};
