/* twitter.js
twitter関係を扱う
*/

const Twitter = require('twitter');

let client;

const init = () => {
  client = new Twitter({
    consumer_key: process.env.CM_TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.CM_TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.CM_TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.CM_TWITTER_ACCESS_SECRET,
  });
};

// tweetを投稿する
const postText = (text) => {
  client.post('statuses/update', { status: text }, (err) => {
    if (err) {
      console.log(err);
    }
  });
};

module.exports = {
  new: init,
  tweet: postText,
};
