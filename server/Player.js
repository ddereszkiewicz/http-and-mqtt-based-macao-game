const { v4 } = require("uuid");

class Player {
  constructor(name, id = v4()) {
    this.name = name;
    this.id = id;
    this.left;
    this.right;
    this.hand = [];
    this.game;
    this.waitingTours = 0;
  }
  wait(power) {
    this.waitingTours = power;
  }
  findCard(color, value) {
    const result = this.hand.find(
      card => card.color == color && card.value == value
    );
    if (result) {
      return result;
    } else {
      throw new Error("Card not in the deck");
    }
  }

  takeCard() {
    this.game.takeCard(this.id);
  }
  removeCard(card) {
    this.hand = this.hand.filter(c => c.id != card.id);
  }
  putCard(color, value) {
    const card = this.findCard(color, value);

    this.game.putCard(card, this.id);
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
  setGame(game) {
    this.game = game;
  }
}

module.exports = Player;
