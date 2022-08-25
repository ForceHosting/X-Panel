const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const serverRoutes = require('./routes/servers');
const ticketRoutes = require("./routes/tickets");
const paymentRoutes = require("./routes/payments");
const webhostingRoutes = require('./routes/webhosting');
const app = express();
const {sessionSecrets} = require("./config.json")
const session = require("express-session")
const socket = require("socket.io");
require("dotenv").config();
var cookieParser = require('cookie-parser')

var MemoryStore = session.MemoryStore

app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(session({
  secret: sessionSecrets,
  resave: true,
  saveUninitialized: false,
  name:'X-Panel_INFO',
  store: new MemoryStore(),
  cookie:{
      expires:1000000,
  },
}))

mongoose.connect(process.env.MONGOURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use("/api/auth", authRoutes);
app.use("/api/server", serverRoutes);
app.use("/api/ticket", ticketRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/webhosting", webhostingRoutes);

const server = app.listen(process.env.PORT, () =>
  console.log(`Server started on ${process.env.PORT}`)
);
const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

global.onlineUsers = new Map();
global.openTickets = new Map();
io.on("connection", (socketdata) => {
  global.chatSocket = socketdata;
  socketdata.on("add-user", (userId, ticketid) => {
    onlineUsers.set(userId, ticketid);
    socketdata.join(ticketid)
  });
  socketdata.on("banUser", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socketdata.to(sendUserSocket).emit("bannedUser", { msg: 'You\'ve been banned.', from: 'System' });
    }
  });
  socketdata.on("send-ticket-msg", (data) => {
      console.log(data)
      socketdata.to(data.ticket).emit("msg-recieve", { msg: data.msg, user: data.fromUser });
  });
});
