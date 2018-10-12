const Mastodon = require('mastodon-api');
const tokens = require('./tokens.js');

console.log("Bot starting!");

const M = new Mastodon({
  client_key: tokens.myTokens.client_key,
  client_secret: tokens.myTokens.client_secret,
  access_token: tokens.myTokens.access_token,
  timeout_ms: 60 * 1000,
  api_url: 'https://botsin.space/api/v1/',
})

const params = {
  status: "Hello World!"
}

M.post('statuses', params, (error, data) => {
  if(error){
    console.error(error);
  } else {
    console.log(data);
  }
});

