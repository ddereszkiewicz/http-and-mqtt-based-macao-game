class Stack {
  constructor() {
    this.deck;
    this.stack = [];
    this.cardOnTop;
    this.currentColor;
    this.currentValue;
  }

  putCards(cards) {
    console.log("working");
    cards.forEach(card => this.putOnTop(card));
  }
  putOnTop(card) {
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
