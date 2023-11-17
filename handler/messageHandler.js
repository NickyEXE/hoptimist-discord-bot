import BeerService from "../requests/beerService.js";
import BeerList from "../behaviors/BeerList.js";
import MentionedUserActions from "../behaviors/MentionedUserActions.js";
import TriggeredResponses from "../behaviors/TriggeredResponses.js";
import PromptHandler from "../behaviors/PromptHandler.js";
import Hal from "../behaviors/Hal.js";

const prefix = "!";
// all prompts to discord bot must start with an "!".
// the format for a discord prompt is !<action> <payload>
const messageHandler = (message) => {
  if (message.author.bot) return;
  new Hal(message).handle();
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
    case "cancel": {
      new MentionedUserActions(message).cancel();
      break;
    }
    case "cancellation_status": {
      new MentionedUserActions(message).getCancelStatus();
      break;
    }
    case "cancellation_leaderboard": {
      new MentionedUserActions(message).getLeaderboard();
      break;
    }
    case "uncancel": {
      new MentionedUserActions(message).selfCancel();
      break;
    }
    case "create_prompt": {
      new PromptHandler(message).createPrompt();
      break;
    }
    case "list_personalities": {
      new PromptHandler(message).listPersonalities();
      break;
    }
    case "set_personality": {
      new PromptHandler(message).setPersonality();
      break;
    }
  }
};

const messageToAction = (message) => {
  const [actionType, payload = ""] = message.content.slice(1).split(" ");
  return { actionType, payload };
};

export default messageHandler;
