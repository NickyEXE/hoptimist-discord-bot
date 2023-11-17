const COMMANDS = [
  { name: "!beers", description: "Gives you a list of all beers available at Hoptimist" },
  { name: "!drafts", description: "Gives you a list of all beers on draft at Hoptimist" },
  { name: "!cans", description: "Gives you a list of all cans at Hoptimist" },
  { name: "!cancel", description: "Calling !cancel <@user> will cancel them and include their cancellation on the cancellation leaderboard.\n Make sure to tag the user you're cancelling using the @ sign. ie. !cancel @BillyVee" },
  { name: "!cancellation_status", description: "Calling !cancellation_status <@user> will tell you how cancelled they are. Make sure to tag them. ie. !cancellation_status @BillyVee" },
  { name: "!cancellation_leaderboard", description: "Provides the ranking of the most cancelled Hoptomatons" },
  { name: "!list_personalities", description: "Provides a list of all available personalities for the Hoptimist-Beers Discord bot." },
  { name: "!set_personality", description: "Calling !set_personality <Personality Name> will change the personality of the bot. The names can be found by calling !list_personalities" },
  { name: "!create_prompt", description: "Creates a new personality for the Discord Bot and sets it to use that personality. You must call this with this format: !create_prompt THE NAME OF YOUR NEW PERSONALITY: THE DESCRIPTION OF YOUR NEW PERSONALITY. \n ie. !create_prompt DISILLUSIONED ASH KETCHUM: You are a 36 year old Ash Ketchum who no longer sees any joy in Pokemon training, due to various traumas from being a Pokemon trainer.\n We add some juice to these prompts once you create them to limit their responses to four or so sentences and make sure they don't complain that they're being used wrong." },
  { name: "!help", description: "See this list." }
]


export default class Help {
  constructor(message) {
    this.message = message;
    this.content = this.message.content;
  }

  help = () => {
    const prefix = "The following commands are available to hopto-bot:\n"
    const commands = COMMANDS.map(command => `${command.name}: ${command.description}`).join("\n\n")
    this.message.channel.send([prefix, commands].join("\n"));
  }
}
