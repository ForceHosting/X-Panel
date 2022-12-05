const { SlashCommandBuilder, Routes } = require('discord.js');
const { ContextMenuCommandBuilder, ApplicationCommandType } = require('discord.js');
const { REST } = require('@discordjs/rest');
const clientId = '793633534803443743'
const guildId = '783416129908899860'
const { token } = require("../config.json");
const data1 = new ContextMenuCommandBuilder()
	.setName('Give coins to user')
	.setType(ApplicationCommandType.User)

const data2 = new SlashCommandBuilder()
	.setName('resources')
	.setDescription('Replies with your input!')
const data4 = new SlashCommandBuilder()
	.setName('bservers')
	.setDescription('Replies with how many servers the bot is in')
const data5 = new SlashCommandBuilder()
	.setName('servers')
	.setDescription('Replies with the servers you have')
const data3 = new SlashCommandBuilder()
.setName('acclink')
.setDescription('Link your client area account to Discord!')
.addStringOption((option) => option.setName('code')
                 .setDescription('The unique code generated in the client area')
				 .setRequired(true));
      
const commands = [
	data1, data2, data3, data4, data5
]
	.map(command => command.toJSON());

const announceCmd = new SlashCommandBuilder()
	.setName('announce')
	.setDescription('Announce something')
	.addStringOption((option)=> option.setName('title')
		.setDescription('The announcement title.')
		.setRequired(true)
	)
	.addStringOption((option)=> option.setName('description')
		.setDescription('The announcement description.')
		.setRequired(true)
	)


const updateCmd = new SlashCommandBuilder()
	.setName('update')
	.setDescription('Post an update')
	.addStringOption((option)=> option.setName('title')
		.setDescription('The update title.')
		.setRequired(true)
	)
	.addStringOption((option)=> option.setName('description')
		.setDescription('The update description.')
		.setRequired(true)
	)
const getLicense = new SlashCommandBuilder()
	.setName('genlicense')
	.setDescription('Creates an X-Panel license.')

const webhostingCommand = new SlashCommandBuilder()
	.setName('webhosting')
	.setDescription('Create a webhosting account.')
	.addStringOption((option)=> option.setName('domain')
		.setDescription('The domain you plan to use for your website. (i.e. forcehost.net)')
		.setRequired(true)
	)
const buyRam = new SlashCommandBuilder()
	.setName('buymemory')
	.setDescription("Purchase memory (ram) using Force Coins.")
	.addStringOption((option) => option.setName('amount')
		.setDescription('The amount of memory you plan to purchase in mb. No more than 2GB. Each gigabyte is 2,500 credits.')
		.setRequired(true)
	)
const buyCPU = new SlashCommandBuilder()
	.setName('buycpu')
	.setDescription("Purchase cpu (processing power) using Force Coins.")
	.addStringOption((option) => option.setName('amount')
		.setDescription('The amount of cpu you plan to purchase. No more than 100(%). Every 50% is 2,500 credits.')
		.setRequired(true)
	)
const buyDisk = new SlashCommandBuilder()
	.setName('buydisk')
	.setDescription("Purchase disk using Force Coins.")
	.addStringOption((option) => option.setName('amount')
		.setDescription('The amount of disk you plan to purchase. No more than 2GB. Each gigabyte is 1,500 credits.')
		.setRequired(true)
	)
const buySlots = new SlashCommandBuilder()
	.setName('buyslots')
	.setDescription("Purchase slots using Force Coins.")
	.addStringOption((option) => option.setName('amount')
		.setDescription('The amount of slots you plan to purchase. No more than 2. Each slot is 200 credits.')
		.setRequired(true)
	)
const getCredits = new SlashCommandBuilder()
	.setName('claim')
	.setDescription('Claim credits using claim codes.')
	.addStringOption((option) => option.setName('code')
		.setDescription('The code provided.')
		.setRequired(true)
	)
const forceCommands = [
	announceCmd, updateCmd, getLicense, webhostingCommand, buyRam, buyCPU, buyDisk, buySlots, getCredits
]





const rest = new REST({ version: '10' }).setToken(token);


(async () => {
	try {
		console.log('Started refreshing application (/) commands.');

		await rest.put(
			Routes.applicationCommands(clientId),
			{ body: commands },
		);

		await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: forceCommands },
		);

		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();