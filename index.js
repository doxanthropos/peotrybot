const Mastodon = require('mastodon-api');
const tokens = require('./tokens.js');
var message;
console.log("Bot starting!");

const M = new Mastodon({
  client_key: tokens.myTokens.client_key,
  client_secret: tokens.myTokens.client_secret,
  access_token: tokens.myTokens.access_token,
  timeout_ms: 60 * 1000,
  api_url: 'https://botsin.space/api/v1/',
})
function toot(){
  const meaning = 42;
  const guess = Math.floor(Math.random() * 100);
  if(guess === meaning){
    message = `Is the meaning of life ${guess}? Yes it is.`;
    clearInterval(intervalID);
  } else {
    message = `Is the meaning of life ${guess}? No. Sadly not.`;
  }
  const params = {
    status: message
  }

  M.post('statuses', params, (error, data) => {
    if(error){
      console.error(error);
    } else {
      console.log(`ID: ${data.id} \nTimestamp: ${data.created_at}`);
      console.log(data.content);
    }
  });
}

toot();
const intervalID = setInterval(toot, 60 * 60 * 1000);


