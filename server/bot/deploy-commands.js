const { SlashCommandBuilder, Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');
const clientId = 895694315492343832
const guildId = 783416129908899860
const { token } = require("../config.json");

const commands = [
	new SlashCommandBuilder().setName('resources').setDescription('Replies with your Resources!'),
]
	.map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(token);


(async () => {
	try {
		console.log('Started refreshing application (/) commands.');

		await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();