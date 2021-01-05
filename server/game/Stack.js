class Stack {
  constructor() {
    this.stack = [];
    this.cardOnTop;
    this.currentColor;
    this.currentValue;
  }
  putOnTop(card) {
    if (this.currentColor && this.currentValue) {
      if (
        card.color === this.currentColor ||
        card.value == this.currentValue ||
        card.value == "queen" ||
        this.currentValue == "queen"
      ) {
        this.stack.push(card);
        this.currentValue = card.value;
        this.currentColor = card.color;
        this.cardOnTop = card;
      } else {
        throw new Error("Card doesn't match the card on top  of the stack ");
      }
    } else if (this.currentValue) {
      if (card.value == this.currentValue) {
        this.stack.push(card);
        this.currentValue = card.value;
        this.currentColor = card.color;
        this.cardOnTop = card;
      } else {
        throw new Error("Card doesn't match the card on top  of the stack ");
      }
    } else if (this.currentColor) {
      if (card.color == this.currentColor) {
        this.stack.push(card);
        this.currentValue = card.value;
        this.currentColor = card.color;
        this.cardOnTop = card;
      } else {
        throw new Error("Card doesn't match the card on top  of the stack ");
      }
    } else {
      this.stack.push(card);
      this.currentValue = card.value;
      this.currentColor = card.color;
      this.cardOnTop = card;
    }
  }
}

module.exports = Stack;
