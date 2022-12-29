const { Client, GatewayIntentBits, EmbedBuilder, ActivityType } = require('discord.js');
const { JFRToken } = require("../config.json");
const loggedJFR = require('../models/jfrLoggedModel');
const JFR = require('../models/jfrModel');
const userModel = require('../models/userModel');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers] });
client.once('ready', () => {
    console.log("JFR is online and searching for members...");
	
	setInterval(
		async () => {
			var statusArray = [
				`with users credits`,
			]
			var randomNumber = Math.floor(Math.random()*statusArray.length);
			client.user.setActivity(statusArray[randomNumber], { type: ActivityType.Playing });
		}, 10000
	)

})

client.on("guildMemberAdd", async member => {

const invites = await member.guild.invites.fetch();
if(!invites){return;}

const jfrLogs = client.channels.cache.get('1057025130196373524');
  const invite = invites.find((inv) => inv.code)
  const results = await JFR.find({inviteCode: invite.code}).count();
  //if(!results){ return;}
  if(results > 0){
	const checkIfClaimed = await loggedJFR.find({claimCode: invite.code, userClaimed: member.user.id}).count();
	//if(!checkIfClaimed) { return;}
	if(checkIfClaimed > 0){
		const inviteUsed = new EmbedBuilder()
		.setColor(0x0099FF)
		.setTitle('JFR Already Claimed')
		.setDescription(`The user ${member.user.tag} (${member.user.id}) has already claimed the server ${invite.guild.name}. No resources were given.`)
		.setTimestamp()
		.setFooter({ text: '©️ Force Host 2022', iconURL: 'https://media.discordapp.net/attachments/998356098165788672/1005994905253970050/force_png.png' });
		jfrLogs.send({ embeds: [inviteUsed]})
	}else{
		const user = await userModel.findOne({discordId: member.user.id});
		console.log(user)
		const jfrRe = await JFR.findOne({inviteCode: invite.code});
		const newCredits = user.credits + jfrRe.claimAmount;
		await userModel.findOneAndUpdate({ discordId: member.user.id}, { credits: newCredits });

		await loggedJFR.create({
			claimCode: invite.code,
			userClaimed: member.user.id,
		})
		const jfrLogEmbed = new EmbedBuilder()
		.setColor(0x0099FF)
		.setTitle('JFR Claimed')
		.addFields(
			{ name: 'User', value: `${member.user.tag}`, inline: true },
			{ name: 'Invite', value: `${invite.code}`, inline: true},
			{ name: 'Invite Uses', value: `${invite.uses}`, inline: true})
		.setTimestamp()
		.setFooter({ text: '©️ Force Host 2022', iconURL: 'https://media.discordapp.net/attachments/998356098165788672/1005994905253970050/force_png.png' });
jfrLogs.send({ embeds: [jfrLogEmbed]})	
	}
  }
	

	

});

client.on('guildCreate', guild => {
	const newEmbed = new EmbedBuilder()
			.setTitle('New Guild')
			.setDescription(`The bot has now joined \`${guild.name}\`. Guild has \`${guild.memberCount}\` members.`)
			.setTimestamp()
			.setFooter({ text: '©️ Force Host 2022', iconURL: 'https://media.discordapp.net/attachments/998356098165788672/1005994905253970050/force_png.png' });
	client.channels.cache.get('1041066838341189723').send({embeds: [newEmbed]})
})

client.on('guildDelete', guild => {
	const newEmbed = new EmbedBuilder()
			.setTitle('Left Guild')
			.setDescription(`The bot has now left \`${guild.name}\`. Guild has \`${guild.memberCount}\` members.`)
			.setTimestamp()
			.setFooter({ text: '©️ Force Host 2022', iconURL: 'https://media.discordapp.net/attachments/998356098165788672/1005994905253970050/force_png.png' });
	client.channels.cache.get('1041066863792246794').send({embeds: [newEmbed]})
})

client.login(JFRToken);