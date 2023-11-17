import PromptService from "../requests/promptService.js";

export default class PromptHandler {
  constructor(message) {
    this.message = message;
    this.content = this.message.content;
  }

  createPrompt = () => {
    const content = this.content.split("!create_prompt ")[1]
    const arr = content.split(":")
    const name = arr.shift()
    const prompt = arr.join(":")
    PromptService.createPrompt(name, prompt).then(res => {
      if (res.error) {
        this.message.channel.send(res.error)
      } else {
        this.message.channel.send(`Your new prompt ${res.name} has been created and is now the personality of the bot.`)
        this.message.channel.send(`For a list of personalities and instructions on changing personalities, type !list_personalities`)
      }
    })
  }

  listPersonalities = () => {
    PromptService.getPrompts().then(personalities => {
      const prefix = "The following personalities are in the database:"
      const message = personalities.sort((a, b) => a.id - b.id).map(personality => personality.name).join("\n")
      const suffix = "To set the bot to one of the personalities, write !set_personality PERSONALITY_NAME.\ni.e. if you see 'HORNY BATMAN', you can write '!set_personality HORNY BATMAN'"
      this.message.channel.send([prefix, message, suffix].join("\n"))
    })
  }

  setPersonality = () => {
    const content = this.content.split("!set_personality ")[1]
    PromptService.setPrompt(content).then(res => {
      if (res.error) {
        this.message.channel.send(res.error)
      } else {
        this.message.channel.send(`${res.name} is now the personality of the bot.`)
      }
    })
  }
}
