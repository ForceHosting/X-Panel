const Messages = require("../models/messageModel");
const Ticket = require("../models/ticketModel");
const Filter = require("badwords-filter");
const { newTicketAlert } = require('../bot/index')

module.exports.newTicket = async (req, res, next) => {

  try {
    const { userUid, reason, sid } = req.body;
    const newTicket = await Ticket.create({
      owner: userUid,
      ticketReason: reason,
      serverId: sid,
      ticketStatus: "Open",
    });
    newTicketAlert(newTicket._id, reason);
    return res.json({status: true, newTicket})
  }catch(ex){
    next(ex);
  }

};


module.exports.getMessages = async (req, res, next) => {
  try {
    const { from, to } = req.body;

    const messages = await Messages.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updatedAt: 1 });

    const projectedMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
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
    const { from, to, message } = req.body;
    const cleanedMessage = filter.clean(message);
    const data = await Messages.create({
      message: { text: cleanedMessage },
      users: [from, to],
      sender: from,
    });

    if (data) return res.json({ msg: "Message added successfully." });
    else return res.json({ msg: "Failed to add message to the database" });
  } catch (ex) {
    next(ex);
  }
};
