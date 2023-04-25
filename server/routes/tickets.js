const { addMessage, getMessages, newTicket, getTicket, getList } = require("../controllers/ticketController");
const router = require("express").Router();

router.post("/create/", newTicket);
router.post("/addmsg/", addMessage);
router.post("/getmsg/", getMessages);
router.get("/information/:id", getTicket);
router.get("/list", getList);

module.exports = router;
