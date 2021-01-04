const Card = require("./Card");
const Action = require("../Action");
class TakingCard extends Card {
  constructor(color, value, power, direction) {
    super(color, value);

    this.power = power;
    this.direction = direction;
    this.action = new Action("takeCards", power);
  }
}
module.exports = { TakingCard };
