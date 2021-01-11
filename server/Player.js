class Player {
  constructor(name, id) {
    this.name = name;
    this.id = id;
    this.left;
    this.right;
    this.hand = [];
    this.prevHand = this.hand;
    this.game;
    this.waitingTours = 0;
  }
  vote(vote) {
    this.game.vote(vote, this.id);
  }
  requestUndo() {
    this.game.requestUndo(this.id);
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
  removeCards(cards) {
    cards.forEach(card => this.removeCard(card));
  }
  putCard(color, value, payload) {
    const card = this.findCard(color, value);

    if (card.value == "jack") {
      if (
        payload !== "3" &&
        payload !== "2" &&
        payload !== "king" &&
        payload !== "4" &&
        payload !== "ace" &&
        payload !== "jack"
      ) {
        card.action.power = payload;
        card.action.starter = this.id;
      } else {
        throw new Error("You cannot demand action cards");
      }
    }
    if (card.value == "ace") {
      card.newColor = payload;
    }
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
