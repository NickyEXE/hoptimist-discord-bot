const Discord = require("discord.js");
require('dotenv').config();
const {GatewayIntentBits} = Discord

const client = new Discord.Client({intents: [GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent,]});

const dataToBullet = ({name, beer_type: beerType, abv, brewery}) => {
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
  return response["on_deck_menu"].map(dataToBullet).join("\n")
}


const prefix = "!beers"
client.on("messageCreate", (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  if (message.content.startsWith(prefix)) {
    fetch("https://hopto-scraper-1155c8982255.herokuapp.com/beers")
      .then(res => res.json())
      .then(res => reply(message, res))
  }
})

client.login(process.env.BOT_TOKEN);