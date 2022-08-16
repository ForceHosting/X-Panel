const Messages = require("../models/messageModel");
const Ticket = require("../models/ticketModel");
const User = require('../models/userModel');
const Filter = require("badwords-filter");
const { newTicketAlert } = require('../bot/index');

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
      users: ["62fae95322b1e1358a0205b5", newTicket._id],
      sender: "62fae95322b1e1358a0205b5",
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
