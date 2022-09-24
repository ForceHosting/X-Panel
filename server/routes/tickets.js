const { addMessage, getMessages, newTicket, getTicket } = require("../controllers/ticketController");
const router = require("express").Router();

router.post("/create/", newTicket);
router.post("/addmsg/", addMessage);
router.post("/getmsg/", getMessages);
router.get("/information/:id", getTicket);

module.exports = router;
