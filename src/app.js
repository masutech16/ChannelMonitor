const Discord = require('discord.js');
const client = new Discord.Client();

const Twitter = require('twitter');

const express = require('express');
const app = express();

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
    const formatedDate = formatDate();
    if(newMember.voiceChannelID === shintyokuID) {
        const text = newMember.displayName + "さんが入室しました\n" + formatedDate;
        tweet(text);
    } else if(oldMember.voiceChannelID === shintyokuID) {
        const text = oldMember.displayName + "さんが退室しました\n"+ formatedDate;
        tweet(text);
    }
});

// クラッシュ対策のためにrootでアクセスを受け付ける
app.get("/", (req, res) => {
    res.send("This is a channel monitor bot page");
})

client.login(token);
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('listening on ' + port);
})

//function
const tweet = (text) => {
    twClient.post("statuses/update", {status: text}, (err, tweet, res) => {
        console.log("tweet: "+ text);
        if(err) {
            console.log(err);
        }
    });
}

const formatDate = () => {
    date = new Date();
    date.setTime(date.getTime() + 32400000);
    return date.getHours() +":"+ date.getMinutes() +":"+ date.getSeconds();
}

