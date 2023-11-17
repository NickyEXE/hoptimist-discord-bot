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
      }
    })
  }
}
