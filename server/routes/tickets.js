const { addMessage, getMessages, newTicket } = require("../controllers/ticketController");
const router = require("express").Router();

router.post("/create/", newTicket);
router.post("/addmsg/", addMessage);
router.post("/getmsg/", getMessages);

module.exports = router;
