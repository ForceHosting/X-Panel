const User = require("../models/userModel");
const Queue = require("../models/serverQueue");
const { makeid } = require('../functions')


module.exports.addToQueue = async (req, res, next) => {
    try {
        const { userUid, name, location, software, memory, disk, cpu } = req.body;
        const user = await User.findOne({ userUid });
        console.log(req.body)
        const server = await Queue.create({
            serverName: name,
            serverSoftware: software,
            serverNode: location,
            serverMemory: memory,
            serverCPU: cpu,
            serverDisk: disk,
            serverOwner: userUid
          });
          delete user.password
        return res.json({ added: true, server });
      } catch (ex) {
        next(ex);
      }
  };
