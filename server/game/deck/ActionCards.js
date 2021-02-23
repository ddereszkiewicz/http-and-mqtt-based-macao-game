const Card = require("./Card");
const { ActionTake, ActionWait, ActionDemand } = require("../Action");

class TakingCard extends Card {
  constructor(color, value, power, direction) {
    super(color, value);

    this.power = power;
    this.direction = direction;
    this.action = new ActionTake(power);
  }
}

class WaitingCard extends Card {
  constructor(color, value) {
    super(color, value);

    this.power = 1;
    this.direction = "left";
    this.action = new ActionWait();
  }
}

class DemandCard extends Card {
  constructor(color, value) {
    super(color, value);
    this.direction = "left";
    this.demandedValue;
    this.starter;
    this.action = new ActionDemand();
  }
}

module.exports = { TakingCard, WaitingCard, DemandCard };
