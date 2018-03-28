const express = require('express');
const discord = require('./src/discord');

const client = discord.new();
const app = express();

// discordのハンドラ
client.on('ready', () => {
  console.log('Start channelMonitor bot');
});
client.on('voiceStateUpdate', discord.update);

// express
// クラッシュ対策のためにrootでアクセスを受け付ける
app.get('/express', (req, res) => {
  res.send('This is a channel monitor bot page');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});

