const Card = require("./Card");
const { ActionTake, ActionWait } = require("../Action");

class TakingCard extends Card {
  constructor(color, value, power, direction) {
    super(color, value);

    this.power = power;
    this.direction = direction;
    this.action = new ActionTake("takeCards");
  }
}

class WaitingCard extends Card {
  constructor(color, value, power) {
    super(color, value);

    this.power = power;
    this.direction = "left";
    this.action = new ActionWait("wait");
  }
}

module.exports = { TakingCard, WaitingCard };
