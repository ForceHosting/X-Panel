const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const messageRoutes = require("./routes/messages");
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
app.use("/api/", messageRoutes);

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
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });
  socket.on("banUser", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("bannedUser", { msg: 'You\'ve been banned.', from: 'System' });
    }
  });
});
