const Discord = require('discord.js');
const Twitter = require('twitter');
const client = new Discord.Client();

// Token等の取得
const token = process.env.CM_DISCORD_TOKEN;
var twClient = new Twitter({
    consumer_key: process.env.CM_TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.CM_TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.CM_TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.CM_TWITTER_ACCESS_SECRET
});

client.on('ready', () => {
    console.log('I am ready');
});

client.on('voiceStateUpdate', (oldMember, newMember) => {
    const text = newMember.displayName + "さんが入室しました";
    twClient.post("statuses/update", {status: text}, (err, tweet, res) => {
        console.log("tweet: "+text);
    })
    console.log(newMember.displayName);
});

client.login(token);