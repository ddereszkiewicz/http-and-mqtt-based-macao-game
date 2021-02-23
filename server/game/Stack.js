class Stack {
  constructor() {
    this.deck;
    this.stack = [];
    this.lastCardOnTop;
    this.lastColor;
    this.lastValue;
    this.cardOnTop;
    this.currentColor;
    this.currentValue;
  }
  undo(player) {
    player.addCardToHand(this.cardOnTop);
    this.deck.removeCard(this.lastCardOnTop);
    this.cardOnTop = this.lastCardOnTop;
    this.currentColor = this.lastColor;
    this.currentValue = this.lastValue;
  }
  putCards(cards) {
    console.log("working");
    cards.forEach(card => this.putOnTop(card));
  }
  putOnTop(card) {
    this.lastColor = this.currentColor;
    this.lastValue = this.currentValue;
    this.lastCardOnTop = this.cardOnTop;
    this.cardOnTop && this.deck.addCard(this.cardOnTop);
    this.stack.push(card);
    this.currentValue = card.value;
    this.currentColor = card.color;
    this.cardOnTop = card;
  }
  assignDeck(deck) {
    this.deck = deck;
  }
}

module.exports = Stack;
