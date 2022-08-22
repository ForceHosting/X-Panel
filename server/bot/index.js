const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const { token } = require("../config.json");

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once('ready', () => {
    console.log("Bot is online, and ready!");
})
function userRegister(username){
    const newLoginEmbed = new EmbedBuilder()
	.setColor(0x0099FF)
	.setTitle('New Registeration')
	.setDescription(`${username} just created an account.`)
	.setTimestamp()
	.setFooter({ text: '©️ Force Host 2022', iconURL: 'https://media.discordapp.net/attachments/998356098165788672/1005994905253970050/force_png.png' });
    client.channels.cache.get('1006678000345026612').send({embeds: [newLoginEmbed]})
}
function userLogin(username){
    const newLoginEmbed = new EmbedBuilder()
	.setColor(0x0099FF)
	.setTitle('New Login')
	.setDescription(`${username} just logged in.`)
	.setTimestamp()
	.setFooter({ text: '©️ Force Host 2022', iconURL: 'https://media.discordapp.net/attachments/998356098165788672/1005994905253970050/force_png.png' });
    client.channels.cache.get('1006667890604388403').send({embeds: [newLoginEmbed]})
}
function sendErrorCode(code, message){
    const newLoginEmbed = new EmbedBuilder()
	.setColor(0x0099FF)
	.setTitle('New Error')
	.setDescription(`A new error has been thrown. Information below.`)
	.addFields(
		{ name: 'Error Code', value: `${code}`, inline:true},
		{ name: 'Message', value: `${message}`, inline:true},
	)
	.setTimestamp()
	.setFooter({ text: '©️ Force Host 2022', iconURL: 'https://media.discordapp.net/attachments/998356098165788672/1005994905253970050/force_png.png' });
    client.channels.cache.get('1011324472864808980').send({embeds: [newLoginEmbed]})
}
function newTicketAlert(ticketid, reason){
    const newTicketEmbed = new EmbedBuilder()
	.setColor(0x0099FF)
	.setTitle('New Ticket')
	.setDescription('A new ticket has been created.')
	.addFields(
		{ name: 'Reason', value: `${reason}`, inline: true },
		{ name: 'Case ID', value: `${ticketid}`, inline: true },
	)
	.setTimestamp()
	.setFooter({ text: '©️ Force Host 2022', iconURL: 'https://media.discordapp.net/attachments/998356098165788672/1005994905253970050/force_png.png' });
    client.channels.cache.get('1006669155929436180').send({embeds: [newTicketEmbed]})
}
function addedToQueue(username, servername, servermem, servercpu, serverdisk){
    const newLoginEmbed = new EmbedBuilder()
	.setColor(0x0099FF)
	.setTitle('New Server In Queue')
	.setDescription(`The user ${username} just added a server to the queue.`)
    .addFields(
        { name: 'Name', value: `${servername}`, inline: true},
        { name: 'Memory', value: `${servermem}`, inline: true},
        { name: 'CPU', value: `${servercpu}`, inline: true},
        { name: 'Disk', value: `${serverdisk}`, inline: true},
    )
	.setTimestamp()
	.setFooter({ text: '©️ Force Host 2022', iconURL: 'https://media.discordapp.net/attachments/998356098165788672/1005994905253970050/force_png.png' });
    client.channels.cache.get('1006679200159248414').send({embeds: [newLoginEmbed]})
}

client.login(token);
module.exports =  { userLogin, newTicketAlert, userRegister, addedToQueue, sendErrorCode };