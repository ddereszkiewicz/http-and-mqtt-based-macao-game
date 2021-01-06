class ActionNone {
  constructor() {
    this.type = "none";
    this.deck;
    this.stack;
  }
  putCard(card) {
    if (this.stack.currentColor && this.stack.currentValue) {
      if (
        card.color === this.stack.currentColor ||
        card.value == this.stack.currentValue ||
        card.value == "queen" ||
        this.stack.currentValue == "queen"
      ) {
        this.stack.putOnTop(card);
      } else {
        throw new Error("Card doesn't match the card on top  of the stack ");
      }
    } else {
      this.stack.putOnTop(card);
    }
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
  constructor(power) {
    super();
    this.type = "take";
    this.power = power;
    this.initialPower = power;
  }
  giveCards(player) {
    this.deck.giveCard(player, this.power);
    this.power = this.initialPower;
  }

  putCard(card) {
    if (card.action.type == this.type) {
      if (
        card.color === this.stack.currentColor ||
        card.value == this.stack.currentValue ||
        this.stack.currentValue == "queen"
      ) {
        this.stack.putOnTop(card);
      } else {
        throw new Error("Card doesn't match the card on top  of the stack ");
      }
    } else {
      throw new Error("You have to use Card with action 'Take'");
    }
    this.power += card.power;
  }
}

class ActionWait extends ActionTake {
  constructor() {
    super(1);
    this.type = "wait";
  }
  giveCards(player) {
    player.wait(this.power);
    this.deck.giveCard(player, 1);
    this.power = 0;
  }
}

class ActionDemand extends ActionNone {
  constructor() {
    super();
    this.power;
    this.starter;
    this.type = "demand";
  }
  putCard(card) {
    if (card.value == "jack") {
      this.starter = card.starter;
      this.power = card.demandedValue;
    }
    if (card.value == this.power || card.value == "jack") {
      this.stack.putOnTop(card);
    } else {
      throw new Error("Card doesn't match the demanded value ");
    }
  }
}

module.exports = { ActionNone, ActionTake, ActionWait, ActionDemand };
