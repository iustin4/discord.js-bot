const {
    MessageEmbed
} = require('discord.js');

module.exports = {
    name: 'ping',
    description: 'Ping Discord for the latency!',
    run: async (client, message, args) => {
        let msg = await message.channel.send('Pinging...');
        let latency = msg.createdTimestamp - message.createdTimestamp;
        let api = client.ws.ping;
        const embed = new MessageEmbed()
            .setAuthor('Pong! 🏓')
            .addField('Latency :hourglass:', `${latency}ms`)
            .addField('API :heartbeat:', `${api}ms`)
            .setFooter(client.user.username, cilent.user.displayAvatarURL());
        msg.delete();
        message.channel.send(embed);
    }
}