const { v4 } = require("uuid");

class Player {
  constructor(name, id = v4()) {
    this.name = name;
    this.id = id;
    this.left;
    this.right;
    this.hand = [];
  }
  setLeft(left) {
    this.left = left;
  }
  setRight(right) {
    this.right = right;
  }

  setHand(hand) {
    this.hand = hand;
  }
  addCardToHand(card) {
    this.hand.push(card);
  }
}

module.exports = Player;
