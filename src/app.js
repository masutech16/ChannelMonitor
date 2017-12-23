const Discord = require('discord.js');
const Twitter = require('twitter');
const client = new Discord.Client();

const shintyokuID = "306805850184351744";
const testID = "393626765853065219"

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
    if(newMember.voiceChannelID === shintyokuID) {
        const text = newMember.displayName + "さんが入室しました";
        tweet(text);
    } else if(oldMember.voiceChannelID === shintyokuID) {
        const text = oldMember.displayName + "さんが退室しました";
        tweet(text);
    }
});

client.login(token);

//function
const tweet = (text) => {
    twClient.post("statuses/update", {status: text}, (err, tweet, res) => {
        console.log("tweet: "+ text);
        if(err) {
            console.log(err);
        }
    });
}

