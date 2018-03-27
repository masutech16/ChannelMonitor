const Discord = require('discord.js');
const client = new Discord.Client();
const Twitter = require('twitter');
const express = require('express');
const app = express();
const utils = require('./utils')


// discord
// Token等の取得
const shintyokuID = "306805850184351744";
const testID = "393626765853065219";
const token = process.env.CM_DISCORD_TOKEN;
const members = [];

client.login(token);
client.on('ready', () => {
    console.log('I am ready');
});

client.on('voiceStateUpdate', (oldMember, newMember) => {
    const formatedDate = utils.formatDate();
    if(newMember.voiceChannelID === shintyokuID) {
        if(isIn(newMember.id)) return;
        const text = newMember.displayName + "さんが入室しました\n" + formatedDate;
        tweet(text);
        members.push({id: newMember.id, name: newMember.displayName});
         console.log("in:"+ newMember.displayName);      
    } else if(oldMember.voiceChannelID === shintyokuID) {
        const text = oldMember.displayName + "さんが退室しました\n"+ formatedDate;
        tweet(text);
        deleteMember(oldMember.id);
        console.log("out:"+ oldMember.displayName);
    }
});

// function
const isIn = (id) => {
    for(let i = 0; i < members.length; i++) {
        if(members[i].id === id) {
            return true;
        }
    }
    return false;
}

const deleteMember = (id) => {
    for(let i = 0; i < members.length; i++) {
        if(members[i].id === id) {
            members.splice(i, 1);
            return;
        }
    }
}


// Twitter
const twClient = new Twitter({
    consumer_key: process.env.CM_TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.CM_TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.CM_TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.CM_TWITTER_ACCESS_SECRET
});


// function
const tweet = (text) => {
    twClient.post("statuses/update", {status: text}, (err, tweet, res) => {
        console.log("tweet: "+ text);
        if(err) {
            console.log(err);
        }
    });
}


// express
// クラッシュ対策のためにrootでアクセスを受け付ける
app.get("/", (req, res) => {
    res.send("This is a channel monitor bot page");
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('listening on ' + port);
})

