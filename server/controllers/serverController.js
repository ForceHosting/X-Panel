const User = require("../models/userModel");
const Queue = require("../models/serverQueue");
const { makeid } = require('../functions');
const { addedToQueue } = require("../bot");


module.exports.addToQueue = async (req, res, next) => {
    try {
        const { userUid, name, location, software, memory, disk, cpu } = req.body;
        const user = await User.findOne({ userUid });
        const newTotalMem = user.availMem - memory;
        const newTotalDisk = user.availDisk - disk;
        const newTotalCPU = user.availCPU - cpu;
        const newTotalSlots = user.availSlots - 1;
        if(newTotalMem < 0){
          return res.json({ added: false, msg: "You can't use more memory than your account has."})
        }else if(newTotalDisk < 0){
          return res.json({ added: false, msg: "You can't use more disk space than your account has."})
        }else if(newTotalCPU < 0){
          return res.json({ added: false, msg: "You can't use more CPU than your account has."})
        }else if(newTotalSlots < 0){
          return res.json({ added: false, msg: "You can't use more slots than your account has."})
        }else{
        await User.findByIdAndUpdate(user._id, {'availMem': newTotalMem, 'availDisk': newTotalDisk, 'availCPU': newTotalCPU, 'availSlots': newTotalSlots});
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
          addedToQueue(user.username, name, memory, cpu, disk)
        return res.json({ added: true, server });
      }
      } catch (ex) {
        next(ex);
      }
  };

  module.exports.getServers = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const servers = await Queue.find({ serverOwner: userId })
        return res.json({ servers });
      } catch (ex) {
        next(ex);
      }
  };
