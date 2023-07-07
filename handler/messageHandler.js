import BeerService from "../requests/BeerService.js";
import BeerList from "../behaviors/BeerList.js";

const prefix = "!";
// all prompts to discord bot must start with an "!".
// the format for a discord prompt is !<action> <payload>
const messageHandler = (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  const { actionType, payload } = messageToAction(message);
  switch (actionType) {
    case "beers": {
      BeerService.getBeers(payload).then((beers) =>
        new BeerList(beers, message).replyToMessage()
      );
      break;
    }
    case "drafts": {
      BeerService.getDrafts(payload).then((beers) =>
        new BeerList(beers, message).replyToMessage()
      );
      break;
    }
    case "cans": {
      BeerService.getCans(payload).then((beers) =>
        new BeerList(beers, message).replyToMessage()
      );
      break;
    }
  }
};

const messageToAction = (message) => {
  const [actionType, payload = ""] = message.content.slice(1).split(" ");
  return { actionType, payload };
};

export default messageHandler;
