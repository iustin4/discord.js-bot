require('dotenv').config();
const {
    Client,
    Collection
} = require('discord.js');
const fs = require('fs');

const client = new Client({
    disableMentions: 'everyone'
});
client.commands = new Collection();

client.login(process.env.TOKEN);

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log(`Logged in as ${client.user.username}!`);
    client.user.setActivity(`${process.env.PREFIX}help`, {
        type: 'WATCHING'
    });
});

client.on('message', message => {
    const prefix = process.env.PREFIX;

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    const cmd = client.commands.get(command);
    if (!cmd) return;

    try {
        client.commands.get(command).run(client, message, args);
    } catch (err) {
        return message.channel.send('There was an error trying to execute that command! 😵');
    }
});