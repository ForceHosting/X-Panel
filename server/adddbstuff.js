const mongoose = require("mongoose")
require("dotenv").config();
mongoose.connect("mongodb://localhost:27017/X-Panel?readPreference=primary&directConnection=true&ssl=false", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });
const user = require("./models/userModel")
const info = user.create({
    uid: "dksfj;askdjff",
    username: "test1",
    email: "lol@loll.com",
    lastIP: "127.0.0.1",
    pteroUserId: "ekf;ljsdfjasa;d",
    pteroId: ";efjsadlffsdafjk",
    pteroPwd: "kheeeskfasdkf'adhfs",
    credits: 10,
    password: "jfs;ddfklfj",
    role: "Customer",
    staffRank: "4",
    discordId: 722173687553458209
  });