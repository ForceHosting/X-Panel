const { Client, GatewayIntentBits, EmbedBuilder, ModalBuilder, ActivityType, TextInputBuilder, TextInputStyle, ActionRowBuilder, InteractionType } = require('discord.js');
const { token } = require("../config.json");
const User = require("../models/userModel");
const mongoose = require("mongoose")
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once('ready', () => {
    console.log("Bot is online, and ready!");
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
  client.user.setActivity('my users data burn', { type: ActivityType.Watching });

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

client.on('interactionCreate', async interaction => {
	console.log(interaction)
	if (!interaction.isChatInputCommand()) return;
	if (interaction.commandName === 'resources') {
        // Gives us 15 mins to get data instend of 5 seconds
		await interaction.reply({ content: 'Gathering your data. This will take up to 5 seconds.', ephemeral: true });
		userid = interaction.user.id;
		const userInfo = await User.findOne({ 'discordId': userid })
		if (userInfo) {
			const newEmbed = new EmbedBuilder()
			.setColor(0x0099FF)
			.setTitle('User resources!')
			.setDescription(`Your current resource information.`)
			.addFields(
				{ name: 'Credits', value: `${userInfo.credits}`, inline: true},
				{ name: 'Memory', value: `${userInfo.availMem}mb`, inline: true},
				{ name: 'CPU', value: `${userInfo.availCPU}%`, inline: true},
				{ name: 'Disk', value: `${userInfo.availDisk}mb`, inline: true},
				{ name: 'Slots', value: `${userInfo.availSlots}`, inline: true},
				{ name: 'Role', value: `${userInfo.role}`, inline: true}
			)
			.setTimestamp()
			.setFooter({ text: '©️ Force Host 2022', iconURL: 'https://media.discordapp.net/attachments/998356098165788672/1005994905253970050/force_png.png' });
		await interaction.editReply({ content: '', embeds: [newEmbed]})
			}
		else {
			const newEmbed = new EmbedBuilder()
			.setColor(0x0099FF)
			.setTitle('Error!')
			.setDescription(`You have not linked your discord account to your account on the panel. You can find how to do this on our wiki!`)
			.setTimestamp()
			.setFooter({ text: '©️ Force Host 2022', iconURL: 'https://media.discordapp.net/attachments/998356098165788672/1005994905253970050/force_png.png' });
			await interaction.editReply({ content: '', embeds: [newEmbed]})
		}
		  
	    
	}
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isUserContextMenuCommand()) return;
	if (interaction.commandName === 'Give coins to user') {
		const userid = interaction.user.id
		const userInfo = await User.findOne({ 'discordId': userid })
		console.log(userid)
		if (!userInfo) { 
			interaction.reply("Im sorry, but you can not use this command")
			return
		}
		 if (userInfo.staffRank >= 3) {
			if (User.findOne({ 'discordId': interaction.member.id })) {
			const modal = new ModalBuilder()
			.setCustomId('addcoin'+interaction.targetUser.id)
			.setTitle('Add coins to '+interaction.targetUser.username);

		// Add components to modal

		// Create the text input components
		const favoriteColorInput = new TextInputBuilder()
			.setCustomId('Coins')
		    // The label is the prompt the user sees for this input
			.setLabel("How many coins to add")
		    // Short means only a single line of text
			.setStyle(TextInputStyle.Short);


		// An action row only holds one text input,
		// so you need one action row per text input.
		const firstActionRow = new ActionRowBuilder().addComponents(favoriteColorInput);

		// Add inputs to the modal
		modal.addComponents(firstActionRow);

		// Show the modal to the user
		await interaction.showModal(modal)
			}
		else {
			const newEmbed = new EmbedBuilder()
			.setColor(0x0099FF)
			.setTitle('Error')
			.setDescription(`This user isnt linked to the panel, so you cant give them coins`)
			.setTimestamp()
			.setFooter({ text: '©️ Force Host 2022', iconURL: 'https://media.discordapp.net/attachments/998356098165788672/1005994905253970050/force_png.png' });
		await interaction.Reply({ content: '', embeds: [newEmbed]})
		}
			
		}
		else {
			interaction.reply("Im sorry, but you can not use this command")
		}
   } 
});

client.on('interactionCreate', async interaction => {
	if (interaction.type !== InteractionType.ModalSubmit) return;
	if (interaction.customId.includes("addcoin")) {
		const cointoadd = interaction.fields.getTextInputValue('Coins');
		if (isNaN(cointoadd)) {
			await interaction.reply({ content: 'That is not a number, please use a number next time.' });
			return;
		}
		const userInfo = await User.findOne({ 'discordId': interaction.user.id })
		const coinInfo = await User.findOne({ 'discordId': interaction.customId.replace("addcoin", "") })
		if (userInfo.staffRank >= 3) {
			newcoins = Number(cointoadd) + Number(coinInfo.credits)
			const filter = { 'discordId': Number(interaction.customId.replace("addcoin", "")) };
			const update = { credits : newcoins };
			let doc = await User.findOneAndUpdate(filter, update, {
				new: true
			  });
			interaction.reply("Coins added to "+interaction.customId.replace("addcoin", "")+", i think... they have "+ doc.credits+ " coins")	
			
		}
	}
})

client.login(token);
module.exports =  { userLogin, newTicketAlert, userRegister, addedToQueue, sendErrorCode };