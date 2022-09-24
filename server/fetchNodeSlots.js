const nodes = require("./models/nodes");
module.exports.findNodeSlots = function findNodeSlots(nodeName, callback) 
{
    nodes.findOne({ nodeName: nodeName }, (err, node) => {
        if (err) {
        console.log(err);
        } else {
        const slots = node.nodeSlots;
        }
    });
}

// EXAMPLE:
    // const { findNodeSlots } = require("./fetchNodeSlots.js");
    // const nodeName = "node1";
    // let slots = findNodeSlots(nodeName)
    // console.log(slots);