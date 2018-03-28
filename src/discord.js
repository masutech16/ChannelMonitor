/* discord.js
discord周りのことを管理します。
とりあえず在室している人とかもここで管理
*/

const discord = require('discord.js');
const member = require('./member');
// const utils = require('./utils');

const progressChannelId = '306805850184351744';

let client;

const init = () => {
  client = new discord.Client();
  // TODO: 環境変数の名前を変える
  client.login(process.env.CM_DISCORD_TOKEN);
  return client;
};

const isProgressChannel = channelId => channelId === progressChannelId;

const updateChannel = (oldMember, newMember) => {
  if (!isProgressChannel(newMember.voiceChannelId)) return;
  if (member.has(newMember.id)) {
    // tweet(`${newMember.displayName}さんが入室しました\n${utils.formatedDate}`);
    member.add(newMember);
  } else if (member.has(oldMember.id)) {
    // tweet(`${oldMember.displayName}さんが退室しました\n${formatedDate}`);
    member.remove(oldMember.id);
  }
};

module.exports = {
  new: init,
  update: updateChannel,
};
