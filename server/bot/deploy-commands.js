const { SlashCommandBuilder, Routes } = require('discord.js');
const { ContextMenuCommandBuilder, ApplicationCommandType } = require('discord.js');
const { REST } = require('@discordjs/rest');
const clientId = '895694315492343832'
const guildId = '783416129908899860'
const { token } = require("../config.json");
const data1 = new ContextMenuCommandBuilder()
	.setName('Give coins to user')
	.setType(ApplicationCommandType.User)

const data2 = new SlashCommandBuilder()
	.setName('resources')
	.setDescription('Replies with your input!')
const data3 = new SlashCommandBuilder()
.setName('acclink')
.setDescription('Link your client area account to Discord!')
.addStringOption((option) => option.setName('code')
                 .setDescription('The unique code generated in the client area')
				 .setRequired(true));
      
const commands = [
	data1, data2, data3
]
	.map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(token);


(async () => {
	try {
		console.log('Started refreshing application (/) commands.');

		await rest.put(
			Routes.applicationCommands(clientId),
			{ body: commands },
		);

		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();