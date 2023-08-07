import dotenv from "dotenv";
import { GatewayIntentBits, Client } from "discord.js";
import messageHandler from "./handler/messageHandler.js";

dotenv.config();
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});
client.login(process.env.BOT_TOKEN).then(() => {
  client.on("messageCreate", messageHandler);
});
