const Discord = require('discord.js');
const client = new Discord.Client();

// Tokenの取得
const token = process.env.DISCORD_TOKEN;

client.on('ready', () => {
    console.log('I am ready');
});

client.on('voiceStateUpdate', (oldMember, newMember) => {
    console.log(newMember.displayName);
});

client.login(token);