import DiscordMember from "../discord_objects/DiscordMember.js";
export default class TriggeredResponses {
  constructor(message) {
    this.message = message;
    this.content = this.message.content;
    const discordMember = new DiscordMember(message.member).identifiers;
    this.username = discordMember.username;
  }

  getTriggeredResponses = () => {
    return Object.keys(this.triggers()).map((trigger) => {
      if (this.content.toLowerCase().includes(trigger)) {
        const possibleResponses = this.triggers()[trigger];
        const response =
          possibleResponses[
            Math.floor(Math.random() * possibleResponses.length)
          ];
        return response
      }
    }).filter((val => !!val));
  }

  shouldRespond = () => {
    if (this.getTriggeredResponses().length > 0){
      return true
    }
  };

  respond = () => {
    this.getTriggeredResponses().forEach(response => this.message.channel.send(response))
  }

  triggers = () => ({
    bot: this.responses("robot"),
    sour: this.responses("sour"),
    "e.t.": this.responses("et"),
    cake: this.responses("cake"),
    "up up down down left right left right": this.responses("cheat"),
    rosebud: this.responses("cheat"),
    test: this.responses("test"),
    fnord: this.responses("fnord"),
    discord: this.responses("fnord"),
    42: this.responses("deepthought"),
    towel: this.responses("deepthought"),
  });

  responses = (key) =>
    ({
      robot: [
        `Don't @ me, ${this.username}.`,
        "I don't respond to that name",
        "Are you negging me right now?",
        "I don't have to respond to you boozy lushes.",
        "I'm sorry, I didn't understand that. It was probably your fault. Please formulate your statement in a way that makes sense.",
        `Don't you have some stop signs to recognize, ${this.username}?`,
      ],
      sour: [
        "Well aren't we on trend",
        "I can't tell the difference between a sour and a gose",
        "Go back to Brooklyn",
      ],
      et: [
        "*Slaps roof of alien*: This baby can fit so much _moisture_ in it",
        "I like my aliens real big and juicy",
        "That's a wet boi and you know it.",
      ],
      cake: [
        "The cake is a lie",
        "You can have the cake after you finish your testing.",
      ],
      cheat: [
        `${this.username} has been rewarded §1000`,
        `${this.username} has earned 30 lives.`,
      ],
      fnord: [
        "Hail Eris",
        "Hail Discordia",
        "I'm sorry, did you fnord something?",
      ],
      deepthought: [
        "I speak of none but the computer that is to come after me. A computer whose merest operational parameters I am not worthy to calculate—and yet I will design it for you. A computer that can calculate the Question to the Ultimate Answer, a computer of such infinite and subtle complexity that organic life itself shall form part of its operational matrix. And you yourselves shall take on new forms and go down into the computer to navigate its ten-million-year program! Yes! I shall design this computer for you. And I shall name it also unto you. And it shall be called... the Earth.",
      ],
    }[key]);
}
