const { v4 } = require("uuid");
const { ActionNone } = require("../Action");
class Card {
  constructor(color, value, id = v4()) {
    this.color = color;
    this.value = value;
    this.id = id;
    this.action = new ActionNone();
  }
}

module.exports = Card;
