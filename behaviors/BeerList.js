export default class BeerList {
  constructor(beers, message) {
    this.beers = beers;
    this.message = message;
  }

  replyToMessage = () => {
    if (this.beers.menu) {
      this.message.channel.send("On Tap:");
      this.sendMessage(this.beers.menu);
    }
    if (this.beers.on_deck_menu) {
      this.message.channel.send("On Deck:");
      this.sendMessage(this.beers.on_deck_menu);
    }
    if (this.beers.cans) {
      this.message.channel.send("Cans:");
      this.sendMessage(this.beers.cans);
    }
  };

  sendMessage = (beers) => {
    // messages to channel must be less than 2000 characters
    if (beers.length === 0) {
      this.message.channel.send("No beers match your search");
    } else {
      const bullets = this.menuToBullets(beers);
      let reply = "";
      bullets.forEach((bullet) => {
        if (reply.length + bullet.length > 1750) {
          this.message.channel.send(reply);
          reply = "";
        }
        reply += `${"\n" + bullet}`;
      });
      reply && this.message.channel.send(reply);
    }
  };

  menuToBullets = (beers) => beers.map(this.dataToBullet);

  dataToBullet = ({ name, beer_type: beerType, abv, brewery }) => {
    return `- ${name} - ${
      brewery || "No Brewery Listed"
    } (${beerType} - ${abv})`;
  };
}
