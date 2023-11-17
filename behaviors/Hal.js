import HalService from "../requests/halService.js";
import TriggeredResponses from "./TriggeredResponses.js";

export default class Hal {
  constructor(message) {
    this.message = message;
    this.content = this.message.content;
  }

  handle = () => {
    const shouldRespond = new TriggeredResponses(this.message).shouldRespond() && process.env.PREWRITTEN_MESSAGES != "TRUE"
    HalService.snarkyResponse(this.content, !!shouldRespond).then(res => {
      if (res.has_response) {
        this.message.channel.send(res.messages);
      } else {
        new TriggeredResponses(this.message).respond()
      }
    })
  }
}
