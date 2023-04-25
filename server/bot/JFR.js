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

const jfrLogs = client.channels.cache.get('1057025130196373524');

	const checkIfClaimed = await loggedJFR.find({guildId: member.guild.id, userClaimed: member.id}).count();
	//if(!checkIfClaimed) { return;}
	if(checkIfClaimed > 0){
		const inviteUsed = new EmbedBuilder()
		.setColor(0x0099FF)
		.setTitle('JFR Already Claimed')
		.setDescription(`The user ${member.user.tag} (${member.id}) has already claimed the server ${member.guild.name}. No resources were given.`)
		.setTimestamp()
		.setFooter({ text: '©️ Force Host 2022', iconURL: 'https://media.discordapp.net/attachments/998356098165788672/1005994905253970050/force_png.png' });
		jfrLogs.send({ embeds: [inviteUsed]})
	}else{
		const user = await userModel.findOne({discordId: member.id});
		const jfrRe = await JFR.findOne({guildId: member.guild.id});
		const newCredits = user.credits + jfrRe.claimAmount;
		await userModel.findOneAndUpdate({ discordId: member.id}, { credits: newCredits });

		await loggedJFR.create({
			guildId: member.guild.id,
			userClaimed: member.user.id,
		})
		const jfrLogEmbed = new EmbedBuilder()
		.setColor(0x0099FF)
		.setTitle('JFR Claimed')
		.addFields(
			{ name: 'User', value: `${member.user.tag}`, inline: true },
			{ name: 'Guild', value: `${member.guild.id} (${member.guild.name})`, inline: true})
		.setTimestamp()
		.setFooter({ text: '©️ Force Host 2022', iconURL: 'https://media.discordapp.net/attachments/998356098165788672/1005994905253970050/force_png.png' });
jfrLogs.send({ embeds: [jfrLogEmbed]})	

  }
	

	

});

client.on("guildMemberRemove", async member => {

	const jfrLogs = client.channels.cache.get('1057025130196373524');
	
		const checkIfClaimed = await loggedJFR.find({guildId: member.guild.id, userClaimed: member.id}).count();
		console.log(checkIfClaimed)
		if(checkIfClaimed > 0){
			const user = await userModel.findOne({discordId: member.id});
			const jfrRe = await JFR.findOne({guildId: member.guild.id});
			const newCredits = user.credits - jfrRe.claimAmount;
			await userModel.findOneAndUpdate({ discordId: member.id}, { credits: newCredits });
			await loggedJFR.deleteOne({guildId: member.guild.id, userClaimed: member.id})
			const inviteUsed = new EmbedBuilder()
			.setColor('DarkRed')
			.setTitle('JFR Claim Removed')
			.setDescription(`The user ${member.user.tag} \`(${member.id})\` has left the claimed server ${member.guild.name}. The resources were taken away.`)
			.setTimestamp()
			.setFooter({ text: '©️ Force Host 2022', iconURL: 'https://media.discordapp.net/attachments/998356098165788672/1005994905253970050/force_png.png' });
			jfrLogs.send({ embeds: [inviteUsed]})
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