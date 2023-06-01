/**
 * Discord bot that sends a welcome message with an image when a new member joins a server
 * @module index
 */

require('dotenv/config');
const { Client, GatewayIntentBits,IntentsBitField } = require("discord.js");
const WelcomeCard = require("./WelcomeCard");
const { Configuration, OpenAIApi } = require('openai');

/**
 * The Discord client used to listen to events and interact with the Discord API
 * @type {Client}
 */
const client = new Client({
	intents: [
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.DirectMessageReactions,
		GatewayIntentBits.DirectMessageTyping,
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
	]
});

/**
 * Listen for the guildMemberAdd event and send a welcome message with an image
 * @param {GuildMember} member - The member who joined the server
 * @return {Promise<void>}
 */
client.on("guildMemberAdd", async (member) => {
	if (member.user.bot) return;

	// Get the welcome channel and check if it's a text channel
	const welcomeChannel = member.guild.channels.cache.get("1099912133413720205");
	if (!welcomeChannel || !welcomeChannel.isTextBased()) return;

	// Create a new WelcomeCard and set its properties
	const welcomeCard = new WelcomeCard();
	welcomeCard
		.setAvatarUrl(member.user.avatarURL({ extension: "png", size: 1024 }))
		.setMemberCount(member.guild.memberCount)
		.setTag(member.user.tag);

	// Draw the welcome image and create a new Discord attachment from the buffer
	const attachment = await welcomeCard.draw();

	try {
		// Send the welcome message with the image attachment
		welcomeChannel.send({ content: `:wave: Hello ${member}, Welcome to ${member.guild.name}`, files: [attachment] });
	} catch (error) {
		console.error(error);
	}
});

/**
 * Listen for the ready event and log in the console when the bot is ready
 * @return {void}
 */
client.on("ready", () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

/**
 * Listen for the messageCreate event and handle commands
 * @param {Message} message - The message received by the bot
 * @return {Promise<void>}
 */
client.on("messageCreate", async (message) => {
	if (message.author.bot) return;

	// Set the bot's command prefix
	const prefix = "!";

	// Check if the message starts with the prefix and is not a mention of the bot
	if (!message.content.startsWith(prefix) || message.mentions.members?.has(client.user.id)) return;

	// Split the message into the command and its arguments
	const [command, ...args] = message.content.replace(prefix, "").split(/ /);

	// Handle the "@mention" command
	if (command === "<@1099623542997389472>") {
		message.reply("Hey!");
	}
});

// Chat-GPT
const configuration = new Configuration({
    apiKey: process.env.API_KEY,
})
 
const openai = new OpenAIApi(configuration);

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;
    if(message.channel.id !== process.env.CHANNEL_ID) return;
    if (message.content.startsWith('-')) return;

    let conversationLog = [{ role: 'system', content: 'You are a friendly chatbot.' }];

    await message.channel.sendTyping();

    let prevMessages = await message.channel.messages.fetch({ limit: 15 });
    prevMessages.reverse();

    prevMessages.forEach((msg) => {
        if (message.content.startsWith('-')) return;
        if (msg.author.id !== client.user.id && message.author.bot) return;
        if (msg.author.id !== message.author.id) return;

        conversationLog.push({
            role: 'user',
            content: msg.content,
        });
    });
    
    const result = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: conversationLog,
    })

    message.reply(result.data.choices[0].message);
});

// Log in to the Discord API using the bot token
client.login(process.env.TOKEN);
