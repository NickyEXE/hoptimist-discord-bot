const Discord = require("discord.js");
require('dotenv').config();
const { GatewayIntentBits } = Discord

const client = new Discord.Client({
  intents: [GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent,]
});

const dataToBullet = ({ name, beer_type: beerType, abv, brewery }) => {
  return `- ${name} - ${brewery || "No Brewery Listed"} (${beerType} - ${abv})`
}

const reply = (message, res) => {
  message.channel.send("On Tap:")
  message.channel.send(menuFromResponse(res))
  message.channel.send("On Deck:")
  message.channel.send(onDeckFromResponse(res))
}

const menuFromResponse = (response) => {
  return response.menu.map(dataToBullet).join("\n")
}

const onDeckFromResponse = (response) => {
  return response.on_deck_menu.map(dataToBullet).join("\n")
}

// creates a json blob with either all the beers or a json blob with only specific types of beers.
function createBeerBlob(menu, wantedBeerType) {
  var onTapBeers = []
  var onDeckBeers = []
  for (let beer in menu.menu) {
    var beerType = menu.menu[beer].beer_type
    if (beerType.toLowerCase().includes(wantedBeerType)) {
      onTapBeers.push(menu.menu[beer])
    }
  }

  var onTapMenu = {}
  onTapMenu["menu"] = onTapBeers

  for (let beer in menu.on_deck_menu) {
    var beerType = menu.on_deck_menu[beer].beer_type
    if (beerType.toLowerCase().includes(wantedBeerType)) {
      onDeckBeers.push(menu.on_deck_menu[beer])
    }
  }

  onTapMenu["on_deck_menu"] = onDeckBeers
  return onTapMenu
}

const prefix = "!beers"
client.on("messageCreate", (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  if (message.content == prefix) {
    fetch("https://hopto-scraper-1155c8982255.herokuapp.com/beers")
      .then(res => res.json())
      .then(res => reply(message, res))
  } else if (message.content.startsWith(prefix + " ")) {
    var beerType = message.content.split("!beers ")[1];
    var fullBeerMenu = fetch("https://hopto-scraper-1155c8982255.herokuapp.com/beers").json()
    var newBeerMenu = createBeerBlob(fullBeerMenu, beerType)
    reply(message, newBeerMenu)
  }
})

client.login(process.env.BOT_TOKEN);
