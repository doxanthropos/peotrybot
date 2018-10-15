const Mastodon = require('mastodon-api');
const tokens = require('./tokens.js');
var message;
console.log("Bot starting!");

function createPeom(){
  var toot = "";
  var repetition = "";

  toot = sentence() + "\n" + sentence();
  function sentence(){

    /* Lists of words to use */
    const articles = ["the", "a"];
    const nouns = ["bird", "flower", "rose", "moon", "star", "ball", "butterfly"];
    const verbs = ["fluffs", "paints", "encircles", "enjoys", "helps", "moves", "feels", "touches", "mourns", "asks"];
    const adjectives = ["fluffy", "red", "rosé", "violett", "blue", "white", "purple", "soft", "hard", "boring", "exciting", "pittoresk"];
    const prepositions = ["to", "from", "on", "about"];
    const names = ["Olaf", "Björn", "Isa", "Ada", "Holm", "Helga", "Ylaine"];

    /* the actual sentence */
    return capitalizeFirstLetter(`${np()} ${vp()}.`);

    /* context free grammar of a simple english sentence */
    function np(){
      let nounp = "";
      if(repetition!=""){
        nounp = repetition;
        repetition = "";
      } else {
        nounp = oneOf([`${oneOf(names)}`,`${article()} ${adj()}${noun()}`]);
      }

      return nounp;
    }

    function vp(){
      if(repetition==""){
        repetition = np();
      }
      return `${verb()} ${prep()}${repetition}`;
    }

    function article(){
      return oneOf(articles);
    }

    function noun(){
      return oneOf(nouns);
    }

    function verb(){
      return oneOf(verbs);
    }

    function prep(){
      if(Math.random()>0.7){
        return `${oneOf(prepositions)} `;
      } else {
        return "";
      }
    }
    function adj(){
      if(Math.random()>0.7){
        return `${oneOf(adjectives)} `;
      } else {
        return "";
      }
    }

    /* helper functions */
    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    function oneOf(words){
      let length = words.length;
      return words[Math.floor(Math.random() * length)];
    }
  }

  return toot;
}

const M = new Mastodon({
  client_key: tokens.myTokens.client_key,
  client_secret: tokens.myTokens.client_secret,
  access_token: tokens.myTokens.access_token,
  timeout_ms: 60 * 1000,
  api_url: 'https://botsin.space/api/v1/',
})
function toot(){
  message = createPeom();
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


