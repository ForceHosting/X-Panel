const {CronJob} = require('cron')
const fetch = require('node-fetch');
const { pteroKey, jwtToken } = require('./config.json');
const { renewWarn, renewStaff, renewSuspend } = require("./bot");
const Server = require("./models/servers");
const User = require("./models/userModel");


setInterval(async function() {
    const allServers = await Server.find();
    const currentTime = new Date();
    const threeDaysInMillis = 3 * 24 * 60 * 60 * 1000; // 3 days in milliseconds
    
    for (const server of allServers) {
        const renewTime = new Date(server.serverRenewal);
        const timeDifference = renewTime - currentTime;

        if (timeDifference < 0) {
            const owner = await User.findById(server.serverOwner);
            
            if (timeDifference < -threeDaysInMillis) {
                // Only suspend if the renewal date has passed by more than 3 days
                const pteroCreate = await fetch('https://control.forcehost.net/api/application/servers/'+server.serverId+'/suspend', {
                    method: 'post',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: `Bearer `+pteroKey
                    },
                });
                console.log(server.serverName);
                await Server.findByIdAndUpdate(server._id, {'serverStatus': 'Suspended'});
                renewSuspend(`<@${owner.discordId}>`);
            } else {
                // RenewWarn and RenewStaff logic for renewal within 3 days
                renewWarn(`<@${owner.discordId}>`, server.serverName, Math.round(server.serverRenewal / 1000));
                renewStaff(`<@${owner.discordId}>`, server.serverName);
            }
        } else {
            // RenewTime is ahead of the current time, update the renewal date
            const nextRenew = new Date(currentTime.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 days in milliseconds
            await Server.findByIdAndUpdate(server._id, {'serverRenewal': nextRenew});
        }
    }
}, 4.32e+7);
