const { v4 } = require("uuid");
class Card {
  constructor(color, value, id = v4()) {
    this.color = color;
    this.value = value;
    this.id = id;
  }
}

module.exports = Card;
