const { Client, GatewayIntentBits, EmbedBuilder, ModalBuilder, ActivityType, TextInputBuilder, TextInputStyle, ActionRowBuilder, InteractionType, Embed, ButtonBuilder, ButtonStyle } = require('discord.js');
const { token, directAdminAuth } = require("../config.json");
const mongoose = require("mongoose")
const User = require("../models/userModel");
const Server = require("../models/servers");
const Web = require("../models/webhostingModel");
const License = require('../models/licenseModel');
const Credits = require('../models/creditCodes');
const creditClaims = require('../models/creditClaims');
const { makeid, makeWebUser } = require('../functions');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const fetch = require('node-fetch');
client.once('ready', () => {
    console.log("Bot is online, and ready!");
	
	setInterval(
		async () => {
				const users = await User.find().count();
				const servers = await Server.find().count();
				const web = await Web.find().count();
				const dServers = await client.guilds.cache.size;
				const usersChannel = client.guilds.cache.get('783416129908899860').channels.cache.get('1020537846542635079');
				usersChannel.setName(`✨ ${users} users!`)
				const serversChannel = client.guilds.cache.get('783416129908899860').channels.cache.get('1020539431670780027');
				serversChannel.setName(`✨ ${servers} servers!`)
				const webChannel = client.guilds.cache.get('783416129908899860').channels.cache.get('1020538820925603850');
				webChannel.setName(`✨ ${web} websites!`)
			var statusArray = [
				`my.forcehost.net`,
				`What is DAv2?`,
				`When will the host be up?`,
				`Happy Hosting`,
				`Sept 23`,
				`where is the client panel?`,
				`If FH made an onlyfans, would you buy?`,
				`with ${users} users`,
				`on ${servers} servers`,
				`on ${web} webistes`,
				`in ${dServers} Discords`
			]
			var randomNumber = Math.floor(Math.random()*statusArray.length);
			client.user.setActivity(statusArray[randomNumber], { type: ActivityType.Playing });
		}, 10000
	)

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
function newWebUser(username, domain){
    const newLoginEmbed = new EmbedBuilder()
	.setColor(0x0099FF)
	.setTitle('New Web Hosting Account')
	.setDescription(`${username} just created a free webhosting account. Domain: \`${domain}\``)
	.setTimestamp()
	.setFooter({ text: '©️ Force Host 2022', iconURL: 'https://media.discordapp.net/attachments/998356098165788672/1005994905253970050/force_png.png' });
    client.channels.cache.get('1012424743347040256').send({embeds: [newLoginEmbed]})
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

function createdServer(username, servername, servermem, servercpu, serverdisk, node, pteroId){
    const newLoginEmbed = new EmbedBuilder()
	.setColor(0x0099FF)
	.setTitle('New Server Created')
	.setDescription(`The user ${username} just created their server.`)
    .addFields(
        { name: 'Name', value: `${servername}`, inline: true},
        { name: 'Memory', value: `${servermem}`, inline: true},
        { name: 'CPU', value: `${servercpu}`, inline: true},
        { name: 'Disk', value: `${serverdisk}`, inline: true},
		{ name: 'Node', value: `${node}`, inline: true},
		{ name: 'Pterodactyl ID', value: `${pteroId}`, inline: true}
    )
	.setTimestamp()
	.setFooter({ text: '©️ Force Host 2022', iconURL: 'https://media.discordapp.net/attachments/998356098165788672/1005994905253970050/force_png.png' });
    client.channels.cache.get('1008535854760857601').send({embeds: [newLoginEmbed]})
}

function deletedServer(username, servermem, servercpu, serverdisk, node){
    const newLoginEmbed = new EmbedBuilder()
	.setColor('DarkRed')
	.setTitle('Server Deleted')
	.setDescription(`The user ${username} just deleted their server.`)
    .addFields(
        { name: 'Memory', value: `${servermem}`, inline: true},
        { name: 'CPU', value: `${servercpu}`, inline: true},
        { name: 'Disk', value: `${serverdisk}`, inline: true},
		{ name: 'Node', value: `${node}`, inline: true},
    )
	.setTimestamp()
	.setFooter({ text: '©️ Force Host 2022', iconURL: 'https://media.discordapp.net/attachments/998356098165788672/1005994905253970050/force_png.png' });
    client.channels.cache.get('1008535854760857601').send({embeds: [newLoginEmbed]})
}

function Addedcoins(giver,accepter,coins){
    const newTicketEmbed = new EmbedBuilder()
	.setColor(0x0099FF)
	.setTitle('Coins added')
	.setDescription('A user got coins!')
	.addFields(
		{ name: 'Giver', value: `<@${giver}>`, inline: true },
		{ name: 'Accepter', value: `<@${accepter}>`, inline: true},
		{ name: 'Coins given', value: `${coins}`, inline: true})
	.setTimestamp()
	.setFooter({ text: '©️ Force Host 2022', iconURL: 'https://media.discordapp.net/attachments/998356098165788672/1005994905253970050/force_png.png' });
    client.channels.cache.get('1011765385588121760').send({embeds: [newTicketEmbed]})
}

client.on('interactionCreate', async interaction => {

	if (!interaction.isChatInputCommand()) return;
	if (interaction.commandName === 'acclink') {
        // Gives us 15 mins to get data instend of 5 seconds
		await interaction.reply({ content: 'Linking your account. This make take a few seconds.', ephemeral: true });
		const linkId = interaction.options.getString('code');
		userid = interaction.user.id;
		const longId = await User.findOne({ 'linkId': linkId })
		if(!longId){
			const newEmbed = new EmbedBuilder()
			.setColor(0x0099FF)
			.setTitle('Error!')
			.setDescription(`An error occured. Please contact support.`)
			.setTimestamp()
			.setFooter({ text: '©️ Force Host 2022', iconURL: 'https://media.discordapp.net/attachments/998356098165788672/1005994905253970050/force_png.png' });
			await interaction.editReply({ content: '', embeds: [newEmbed]})
		}else{
		const userInfo = await User.findByIdAndUpdate(longId._id, {'discordId': userid});
		if (linkId && userInfo) {
			const newEmbed = new EmbedBuilder()
			.setColor(0x0099FF)
			.setTitle('Account Linked!')
			.setDescription(`Your account is now linked! You can now run commands to view your resources, servers, etc.`)
			.setTimestamp()
			.setFooter({ text: '©️ Force Host 2022', iconURL: 'https://media.discordapp.net/attachments/998356098165788672/1005994905253970050/force_png.png' });
		await interaction.editReply({ content: '', embeds: [newEmbed]})
			}else {
			const newEmbed = new EmbedBuilder()
			.setColor(0x0099FF)
			.setTitle('Error!')
			.setDescription(`An error occured. Please contact support.`)
			.setTimestamp()
			.setFooter({ text: '©️ Force Host 2022', iconURL: 'https://media.discordapp.net/attachments/998356098165788672/1005994905253970050/force_png.png' });
			await interaction.editReply({ content: '', embeds: [newEmbed]})
		}
	}
	}
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
			}else {
			const newEmbed = new EmbedBuilder()
			.setColor(0x0099FF)
			.setTitle('Error!')
			.setDescription(`It seems you don't have your account linked to Discord! You can link your account by running \`/acclink\`. That command will give you a special code to put into the \`Your Account\` page on the client area.`)
			.setTimestamp()
			.setFooter({ text: '©️ Force Host 2022', iconURL: 'https://media.discordapp.net/attachments/998356098165788672/1005994905253970050/force_png.png' });
			await interaction.editReply({ content: '', embeds: [newEmbed]})
		}
		  
	    
	}
	if (interaction.commandName === 'bservers') {
		await interaction.reply({ content: 'Gathering server data. This will take up to 5 seconds.', ephemeral: true });
			const newEmbed = new EmbedBuilder()
			.setColor(0x0099FF)
			.setTitle('Servers')
			.setDescription(`\`Force Host\` is currently in ${client.guilds.cache.size} servers.`)
			.setTimestamp()
			.setFooter({ text: '©️ Force Host 2022', iconURL: 'https://media.discordapp.net/attachments/998356098165788672/1005994905253970050/force_png.png' });
			await interaction.editReply({ content: '', embeds: [newEmbed]})  
	}


	if(interaction.commandName === 'buymemory'){
		await interaction.reply({ content: 'Gathering your account data. This make take a minute.', ephemeral: true});
		userDid = interaction.user.id;
		const userInfo = await User.findOne({'discordId': userDid})
		if(!userInfo){
			const newEmbed = new EmbedBuilder()
			.setColor(0x0099FF)
			.setTitle('Error!')
			.setDescription(`It seems you don't have your account linked to Discord! You can link your account by running \`/acclink\`. That command will give you a special code to put into the \`Your Account\` page on the client area.`)
			.setTimestamp()
			.setFooter({ text: '©️ Force Host 2022', iconURL: 'https://media.discordapp.net/attachments/998356098165788672/1005994905253970050/force_png.png' });
			await interaction.editReply({ content: '', embeds: [newEmbed]})
		}else{
			const userCredits = parseInt(userInfo.credits);
			const getPurchaseAmount = parseInt(interaction.options.getString('amount'));
			const price = parseInt(getPurchaseAmount * 2.5);
			const creditMath = parseInt(userCredits - price);
			if(creditMath < 0){
				const deniedEmbed = new EmbedBuilder()
					.setColor(0x0099FF)
					.setTitle('Purchase Denied')
					.setDescription('The purchase was denied because you do not have enough credits.')
				await interaction.editReply({ content: '', embeds: [deniedEmbed]})
			}else{
			const updatedMem = parseInt(userInfo.availMem + getPurchaseAmount)
			await User.findByIdAndUpdate(userInfo._id,{ availMem: updatedMem })
			await User.findByIdAndUpdate(userInfo._id,{ credits: creditMath})
			const boughtEmbed = new EmbedBuilder()
				.setTitle('Memory Bought!')
				.setDescription(`You purchased ${getPurchaseAmount}mb of memory for $${price} credits!`)
				.setAuthor({name: interaction.user.username, iconURL: interaction.user.displayAvatarURL()})
			
			await interaction.editReply({ content: '', embeds: [boughtEmbed]})
			const purchaseEmbed = new EmbedBuilder()
				.setTitle('Memory Purchased!')
				.setColor('Green')
				.setDescription(`<@${interaction.user.id}> purchased ${getPurchaseAmount}mb of memory for $${price} credits!`)
				.setAuthor({name: interaction.user.username, iconURL: interaction.user.displayAvatarURL()})
			client.channels.cache.get('1049085267891454012').send({embeds: [purchaseEmbed]})
			}
		}
	}
	if(interaction.commandName === 'buycpu'){
		await interaction.reply({ content: 'Gathering your account data. This make take a minute.', ephemeral: true});
		userDid = interaction.user.id;
		const userInfo = await User.findOne({'discordId': userDid})
		if(!userInfo){
			const newEmbed = new EmbedBuilder()
			.setColor(0x0099FF)
			.setTitle('Error!')
			.setDescription(`It seems you don't have your account linked to Discord! You can link your account by running \`/acclink\`. That command will give you a special code to put into the \`Your Account\` page on the client area.`)
			.setTimestamp()
			.setFooter({ text: '©️ Force Host 2022', iconURL: 'https://media.discordapp.net/attachments/998356098165788672/1005994905253970050/force_png.png' });
			await interaction.editReply({ content: '', embeds: [newEmbed]})
		}else{
			const userCredits = parseInt(userInfo.credits);
			const getPurchaseAmount = parseInt(interaction.options.getString('amount'));
			const price = parseInt(getPurchaseAmount * 50);
			const creditMath = parseInt(userCredits - price);
			if(creditMath < 0){
				const deniedEmbed = new EmbedBuilder()
					.setColor(0x0099FF)
					.setTitle('Purchase Denied')
					.setDescription('The purchase was denied because you do not have enough credits.')
				await interaction.editReply({ content: '', embeds: [deniedEmbed]})
			}else{
			const updateCPU = parseInt(userInfo.availCPU + getPurchaseAmount)
			await User.findByIdAndUpdate(userInfo._id,{ availCPU: updateCPU })
			await User.findByIdAndUpdate(userInfo._id,{ credits: creditMath})
			const boughtEmbed = new EmbedBuilder()
				.setTitle('CPU Bought!')
				.setDescription(`You purchased ${getPurchaseAmount}% of cpu for $${price} credits!`)
				.setAuthor({name: interaction.user.username, iconURL: interaction.user.displayAvatarURL()})
			
			await interaction.editReply({ content: '', embeds: [boughtEmbed]})
			const purchaseEmbed = new EmbedBuilder()
				.setTitle('CPU Purchased!')
				.setColor('Green')
				.setDescription(`<@${interaction.user.id}> purchased ${getPurchaseAmount}% more CPU for $${price} credits!`)
				.setAuthor({name: interaction.user.username, iconURL: interaction.user.displayAvatarURL()})
			client.channels.cache.get('1049085267891454012').send({embeds: [purchaseEmbed]})
			}
		}
	}


	if(interaction.commandName === 'buydisk'){
		await interaction.reply({ content: 'Gathering your account data. This make take a minute.', ephemeral: true});
		userDid = interaction.user.id;
		const userInfo = await User.findOne({'discordId': userDid})
		if(!userInfo){
			const newEmbed = new EmbedBuilder()
			.setColor(0x0099FF)
			.setTitle('Error!')
			.setDescription(`It seems you don't have your account linked to Discord! You can link your account by running \`/acclink\`. That command will give you a special code to put into the \`Your Account\` page on the client area.`)
			.setTimestamp()
			.setFooter({ text: '©️ Force Host 2022', iconURL: 'https://media.discordapp.net/attachments/998356098165788672/1005994905253970050/force_png.png' });
			await interaction.editReply({ content: '', embeds: [newEmbed]})
		}else{
			const userCredits = parseInt(userInfo.credits);
			const getPurchaseAmount = parseInt(interaction.options.getString('amount'));
			const price = parseInt(getPurchaseAmount * 2.5);
			const creditMath = parseInt(userCredits - price);
			if(creditMath < 0){
				const deniedEmbed = new EmbedBuilder()
					.setColor(0x0099FF)
					.setTitle('Purchase Denied')
					.setDescription('The purchase was denied because you do not have enough credits.')
				await interaction.editReply({ content: '', embeds: [deniedEmbed]})
			}else{
			const updateDisk = parseInt(userInfo.availDisk + getPurchaseAmount)
			await User.findByIdAndUpdate(userInfo._id,{ availDisk: updateDisk })
			await User.findByIdAndUpdate(userInfo._id,{ credits: creditMath})
			const boughtEmbed = new EmbedBuilder()
				.setTitle('Disk Bought!')
				.setDescription(`You purchased ${getPurchaseAmount}mb of disk for $${price} credits!`)
				.setAuthor({name: interaction.user.username, iconURL: interaction.user.displayAvatarURL()})
			
			await interaction.editReply({ content: '', embeds: [boughtEmbed]})
			const purchaseEmbed = new EmbedBuilder()
				.setTitle('Disk Purchased!')
				.setColor('Green')
				.setDescription(`<@${interaction.user.id}> purchased ${getPurchaseAmount}mb more disk for $${price} credits!`)
				.setAuthor({name: interaction.user.username, iconURL: interaction.user.displayAvatarURL()})
			client.channels.cache.get('1049085267891454012').send({embeds: [purchaseEmbed]})
			}
		}
	}

	if(interaction.commandName === 'buyslots'){
		await interaction.reply({ content: 'Gathering your account data. This make take a minute.', ephemeral: true});
		userDid = interaction.user.id;
		const userInfo = await User.findOne({'discordId': userDid})
		if(!userInfo){
			const newEmbed = new EmbedBuilder()
			.setColor(0x0099FF)
			.setTitle('Error!')
			.setDescription(`It seems you don't have your account linked to Discord! You can link your account by running \`/acclink\`. That command will give you a special code to put into the \`Your Account\` page on the client area.`)
			.setTimestamp()
			.setFooter({ text: '©️ Force Host 2022', iconURL: 'https://media.discordapp.net/attachments/998356098165788672/1005994905253970050/force_png.png' });
			await interaction.editReply({ content: '', embeds: [newEmbed]})
		}else{
			const userCredits = parseInt(userInfo.credits);
			const getPurchaseAmount = parseInt(interaction.options.getString('amount'));
			const price = parseInt(getPurchaseAmount * 200);
			const creditMath = parseInt(userCredits - price);
			if(creditMath < 0){
				const deniedEmbed = new EmbedBuilder()
					.setColor(0x0099FF)
					.setTitle('Purchase Denied')
					.setDescription('The purchase was denied because you do not have enough credits.')
				await interaction.editReply({ content: '', embeds: [deniedEmbed]})
			}else{
			const updateSlots = parseInt(userInfo.availSlots + getPurchaseAmount)
			await User.findByIdAndUpdate(userInfo._id,{ availSlots: updateSlots })
			await User.findByIdAndUpdate(userInfo._id,{ credits: creditMath})
			const boughtEmbed = new EmbedBuilder()
				.setTitle('Slots Bought!')
				.setDescription(`You purchased ${getPurchaseAmount} more slots for $${price} credits!`)
				.setAuthor({name: interaction.user.username, iconURL: interaction.user.displayAvatarURL()})
			
			await interaction.editReply({ content: '', embeds: [boughtEmbed]})
			const purchaseEmbed = new EmbedBuilder()
				.setTitle('Slots Purchased!')
				.setColor('Green')
				.setDescription(`<@${interaction.user.id}> purchased ${getPurchaseAmount} more slots for $${price} credits!`)
				.setAuthor({name: interaction.user.username, iconURL: interaction.user.displayAvatarURL()})
			client.channels.cache.get('1049085267891454012').send({embeds: [purchaseEmbed]})
			}
		}
	}
	
	if(interaction.commandName === 'claim'){
		await interaction.reply({ content: 'Gathering your account data. This make take a minute.', ephemeral: true});
		userDid = interaction.user.id;
		const userInfo = await User.findOne({'discordId': userDid})
		if(!userInfo){
			const newEmbed = new EmbedBuilder()
			.setColor('Red')
			.setTitle('Error!')
			.setDescription(`It seems you don't have your account linked to Discord! You can link your account by running \`/acclink\`. That command will give you a special code to put into the \`Your Account\` page on the client area.`)
			.setTimestamp()
			.setFooter({ text: '©️ Force Host 2022', iconURL: 'https://media.discordapp.net/attachments/998356098165788672/1005994905253970050/force_png.png' });
			await interaction.editReply({ content: '', embeds: [newEmbed]})
		}else{
			const code = interaction.options.getString('code');
			const getCreditCode = await Credits.findOne({ 'claimCode': code });
			
			if(!getCreditCode){
				const newEmbed = new EmbedBuilder()
			.setColor('Red')
			.setTitle('Error!')
			.setDescription(`That code was not found in the database. Please try again later, or contact a system administrator.`)
			.setTimestamp()
			.setFooter({ text: '©️ Force Host 2022', iconURL: 'https://media.discordapp.net/attachments/998356098165788672/1005994905253970050/force_png.png' });
			await interaction.editReply({ content: '', embeds: [newEmbed]})

			}else{
				if(getCreditCode.uses >= getCreditCode.maxUses){
					const newEmbed = new EmbedBuilder()
					.setColor('Red')
					.setTitle('Error!')
					.setDescription(`That code has already exeeded the maximum claims. Please try again later, or contact a system administrator.`)
					.setTimestamp()
					.setFooter({ text: '©️ Force Host 2022', iconURL: 'https://media.discordapp.net/attachments/998356098165788672/1005994905253970050/force_png.png' });
					await interaction.editReply({ content: '', embeds: [newEmbed]})
				}
				const findIfUsed = await creditClaims.find({ 'claimCode': code, 'userClaimed': userInfo._id}).count();
				if(findIfUsed == 0){
					const userCredits = userInfo.credits;
					const addCredits = userCredits + getCreditCode.claimAmount;
					const newUses = getCreditCode.uses + 1;
					await User.findByIdAndUpdate(userInfo._id, {credits: addCredits});
					await Credits.findByIdAndUpdate(getCreditCode._id, {uses: newUses})
					await creditClaims.create({
						claimCode: code,
						claimAmount: getCreditCode.claimAmount,
						userClaimed: userInfo._id,
					});
					const newEmbed = new EmbedBuilder()
			.setColor(0x0099FF)
			.setTitle('Success!')
			.setDescription(`You have successfully claimed the code ${code}! You now have ${addCredits} credits!`)
			.setTimestamp()
			.setFooter({ text: '©️ Force Host 2022', iconURL: 'https://media.discordapp.net/attachments/998356098165788672/1005994905253970050/force_png.png' });
			interaction.editReply({ content: '', embeds: [newEmbed]});
			const purchaseEmbed = new EmbedBuilder()
				.setTitle('Code Claimed!')
				.setColor('Green')
				.setDescription(`<@${interaction.user.id}> claimed a code for ${getCreditCode.claimAmount} credits!`)
				.setAuthor({name: interaction.user.username, iconURL: interaction.user.displayAvatarURL()})
			client.channels.cache.get('1049111319829291058').send({embeds: [purchaseEmbed]})
				}else{
					const newEmbed = new EmbedBuilder()
					.setColor('Red')
					.setTitle('Error!')
					.setDescription(`You've already claimed that code. Please try again later, or contact a system administrator.`)
					.setTimestamp()
					.setFooter({ text: '©️ Force Host 2022', iconURL: 'https://media.discordapp.net/attachments/998356098165788672/1005994905253970050/force_png.png' });
					await interaction.editReply({ content: '', embeds: [newEmbed]})
				}
			}
			}
		}


	if (interaction.commandName === 'webhosting') {
		await interaction.reply({ content: 'Generating your account. This make take a minute. If it takes longer than 10 minutes, please contact support.', ephemeral: true });
		userDid = interaction.user.id;
		const userInfo = await User.findOne({ 'discordId': userDid })	
		if(!userInfo){
			const newEmbed = new EmbedBuilder()
			.setColor(0x0099FF)
			.setTitle('Error!')
			.setDescription(`It seems you don't have your account linked to Discord! You can link your account by running \`/acclink\`. That command will give you a special code to put into the \`Your Account\` page on the client area.`)
			.setTimestamp()
			.setFooter({ text: '©️ Force Host 2022', iconURL: 'https://media.discordapp.net/attachments/998356098165788672/1005994905253970050/force_png.png' });
			await interaction.editReply({ content: '', embeds: [newEmbed]})
		}
		const domain = interaction.options.getString('domain');
			const randomUsername = makeWebUser(15);
            const newRandomPass = makeid(15)
            var newRandomPassBuffer = Buffer.from(newRandomPass);
            var encryptedPass = newRandomPassBuffer.toString('base64');
            const webData = await fetch(`https://web.forcehost.net:2222/CMD_API_ACCOUNT_USER?action=create&add=Submit&username=${randomUsername}&email=${userInfo.email}&passwd=${newRandomPass}&passwd2=${newRandomPass}&domain=${domain}&package=free&ip=181.214.41.250&notify=yes`, {
      headers: {
        'Content-Type': 'text/plain',
        'Authorization': `Basic ${directAdminAuth}`
      },
    });
	const data = await webData.text()
	const regex = 'error=0'
	if(data.includes(regex) === true){
        Web.create({
            panelUser: randomUsername,
            panelPwd: encryptedPass,
            planType: 'Free',
            planDomain: domain,
            accountHolder: userInfo._id,
        })
        newWebUser(userInfo.username, domain)
			const newEmbed = new EmbedBuilder()
			.setColor(0x0099FF)
			.setTitle('Account Generated 🥳')
			.setDescription(`Please store the details below somewhere secure. Once you clear this message, they will be gone forever.`)
			.addFields({name: 'Account Username', value: `||${randomUsername}||`})
			.addFields({name: 'Accont Password', value: `||${newRandomPass}||`})
			.addFields({name: 'Dashboard', value: 'web.forcehost.net:2222'})
			.setTimestamp()
			.setFooter({ text: '©️ Force Host 2022', iconURL: 'https://media.discordapp.net/attachments/998356098165788672/1005994905253970050/force_png.png' });
			await interaction.editReply({ content: '', embeds: [newEmbed], ephemeral: true})  
	}else{
		newWebUser(userInfo.username, domain)
			const newEmbed = new EmbedBuilder()
			.setColor(0x0099FF)
			.setTitle('Generation Error')
			.setDescription(`There was an error generating your account. Please contact support. Err Code: \n\n\`${data}\``)
			.setTimestamp()
			.setFooter({ text: '©️ Force Host 2022', iconURL: 'https://media.discordapp.net/attachments/998356098165788672/1005994905253970050/force_png.png' });
			await interaction.editReply({ content: '', embeds: [newEmbed], ephemeral: true})  
	}}
	if (interaction.commandName === 'servers') {
		await interaction.reply({ content: 'This command is still under development.', ephemeral: true });
	}
	if(interaction.commandName === 'announce'){
		const hasAnnouncePerm = interaction.member.roles.cache.some(r => r.id === '797952995806543902');
		if(hasAnnouncePerm === true){
			const title = interaction.options.getString('title');
			const description = interaction.options.getString('description');
			const newAnnouncementEmbed = new EmbedBuilder()
				.setTitle(title+" 📢")
				.setDescription(`${description} \n\nHapiest Hosting,\n~ The Force Team\n*Hosting Tomorrow for The Worlds Today*`)
				.setTimestamp()
				.setFooter({ text: '©️ Force Host 2022', iconURL: 'https://media.discordapp.net/attachments/998356098165788672/1005994905253970050/force_png.png' })
				.setAuthor({name: interaction.user.username, iconURL: interaction.user.displayAvatarURL()})
			client.channels.cache.get('797953387534483476').send({embeds: [newAnnouncementEmbed]})
			await interaction.reply({content: 'Announcement sent!', ephemeral: true});
		}else {
			await interaction.reply({content: 'You have improper information.', ephemeral: true});
		}
	}
	if(interaction.commandName === 'update'){
		const hasAnnouncePerm = interaction.member.roles.cache.some(r => r.id === '797952995806543902');
		if(hasAnnouncePerm === true){
			const title = interaction.options.getString('title');
			const description = interaction.options.getString('description');
			const newAnnouncementEmbed = new EmbedBuilder()
				.setTitle(title+" ⬆️")
				.setDescription(`${description} \n\nHapiest Hosting,\n~ The Force Team\n*Hosting Tomorrow for The Worlds Today*`)
				.setTimestamp()
				.setFooter({ text: '©️ Force Host 2022', iconURL: 'https://media.discordapp.net/attachments/998356098165788672/1005994905253970050/force_png.png' })
				.setAuthor({name: interaction.user.username, iconURL: interaction.user.displayAvatarURL()})
			client.channels.cache.get('916572067619557407').send({embeds: [newAnnouncementEmbed]})
			await interaction.reply({content: 'Announcement sent!', ephemeral: true});
		}else {
			await interaction.reply({content: 'You have improper information.', ephemeral: true});
		}
	}
	if(interaction.commandName === 'genlicense'){
		await interaction.reply({ content: 'Spinning up your license. Please allow us several seconds to generate the key.', ephemeral: true });
		userid = interaction.user.id;
		const userInfo = await User.findOne({ 'discordId': userid })
		if (userInfo) {
			const totalLicenses = await License.find({ 'licenseOwner': userInfo._id}).count()
			if(totalLicenses >= 2){
				const newEmbed = new EmbedBuilder()
			.setColor(0x0099FF)
			.setTitle('Error!')
			.setDescription(`Sorry, it seems you have two valid licenses at the moment. If you need another license key, please contact support.`)
			.setTimestamp()
			.setFooter({ text: '©️ Force Host 2022', iconURL: 'https://media.discordapp.net/attachments/998356098165788672/1005994905253970050/force_png.png' });
			await interaction.editReply({ content: '', embeds: [newEmbed]})
			}else{
			const generatedLicenseKey = makeid(20)
			const createLicense = await License.create({
				licenseId: `XPNLSECR.`+generatedLicenseKey,
				licenseOwner: userInfo._id,
				licenseValid: true
			})
			if(createLicense){
			const newEmbed = new EmbedBuilder()
				.setColor(0x0099FF)
				.setTitle('New License!')
				.setDescription(`Please copy the license key somewhere safe!`)
				.addFields(
					{ name: 'License Key', value: `||${createLicense.licenseId}||`, inline: true},
					{ name: 'License State', value: `${createLicense.licenseValid}`, inline: true},
				)
				.setTimestamp()
				.setFooter({ text: '©️ Force Host 2022', iconURL: 'https://media.discordapp.net/attachments/998356098165788672/1005994905253970050/force_png.png' });
			await interaction.editReply({ content: '', embeds: [newEmbed]})
			}else{
				const newEmbed = new EmbedBuilder()
			.setColor(0x0099FF)
			.setTitle('Error!')
			.setDescription(`Something went wrong. Please try again later.`)
			.setTimestamp()
			.setFooter({ text: '©️ Force Host 2022', iconURL: 'https://media.discordapp.net/attachments/998356098165788672/1005994905253970050/force_png.png' });
			await interaction.editReply({ content: '', embeds: [newEmbed]})
			}}
			
			}else {
			const newEmbed = new EmbedBuilder()
			.setColor(0x0099FF)
			.setTitle('Error!')
			.setDescription(`It seems you don't have your account linked to Discord! You can link your account by running \`/acclink\`. That command will give you a special code to put into the \`Your Account\` page on the client area.`)
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
		const coinInfo = await User.findOne({ 'discordId': interaction.targetUser.id })
		if (!userInfo) { 
			interaction.reply("Im sorry, but you can not use this command")
			return
		}
		 if (userInfo.staffRank >= 3) {
			if (!coinInfo) {
				const newEmbed = new EmbedBuilder()
				.setColor(0x0099FF)
				.setTitle('Error')
				.setDescription(`This user isnt linked to the panel, so you cant give them coins`)
				.setTimestamp()
				.setFooter({ text: '©️ Force Host 2022', iconURL: 'https://media.discordapp.net/attachments/998356098165788672/1005994905253970050/force_png.png' });
			await interaction.Reply({ content: '', embeds: [newEmbed]})	
			}
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
   } 
);

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
			  Addedcoins(interaction.user.id, interaction.customId.replace("addcoin", ""), cointoadd)
			interaction.reply("Coins added to "+interaction.customId.replace("addcoin", "")+", i think... they have "+ doc.credits+ " coins")	
			
		}
	}
})

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

client.login(token);
module.exports =  { userLogin, newTicketAlert, userRegister, addedToQueue, sendErrorCode, newWebUser, createdServer, deletedServer };
