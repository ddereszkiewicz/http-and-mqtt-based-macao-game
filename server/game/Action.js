class ActionNone {
  constructor(type) {
    this.type = type;
    this.deck;
    this.stack;
  }
  putCard(card) {
    this.deck.addCard(this.stack.cardOnTop);
    this.stack.putOnTop(card);
  }
  giveCards(player) {
    this.deck.giveCard(player, 1);
  }
  assign(deck, stack) {
    this.deck = deck;
    this.stack = stack;
  }
}

class ActionTake extends ActionNone {
  constructor(type) {
    super(type);
    this.power = 0;
  }
  giveCards(player) {
    this.deck.giveCard(player, this.power);
  }

  putCard(card) {
    console.log("actionTake");
    if (card.action.type == this.type) {
      this.power += card.power;
      this.deck.addCard(this.stack.cardOnTop);
      this.stack.putOnTop(card);
    } else {
      throw new Error("You have to use action Card");
    }
  }
}

class ActionWait extends ActionTake {
  constructor(type) {
    super(type);
  }
  giveCards(player) {
    player.wait(this.power);
    this.deck.giveCard(player, 1);
  }
}
module.exports = { ActionNone, ActionTake, ActionWait };
