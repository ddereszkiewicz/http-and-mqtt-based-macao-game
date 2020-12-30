const Card = require("./Card");
const getRandomInt = require("../../functions");
class Deck {
  constructor(stack) {
    this.cards = [
      new Card("hearts", "2"),
      new Card("hearts", "3"),
      new Card("hearts", "4"),
      new Card("hearts", "5"),
      new Card("hearts", "6"),
      new Card("hearts", "7"),
      new Card("hearts", "8"),
      new Card("hearts", "9"),
      new Card("hearts", "10"),
      new Card("hearts", "jack"),
      new Card("hearts", "queen"),
      new Card("hearts", "king"),
      new Card("hearts", "ace"),
      new Card("spades", "2"),
      new Card("spades", "3"),
      new Card("spades", "4"),
      new Card("spades", "5"),
      new Card("spades", "6"),
      new Card("spades", "7"),
      new Card("spades", "8"),
      new Card("spades", "9"),
      new Card("spades", "10"),
      new Card("spades", "jack"),
      new Card("spades", "queen"),
      new Card("spades", "king"),
      new Card("spades", "ace"),
      new Card("diamonds", "2"),
      new Card("diamonds", "3"),
      new Card("diamonds", "4"),
      new Card("diamonds", "5"),
      new Card("diamonds", "6"),
      new Card("diamonds", "7"),
      new Card("diamonds", "8"),
      new Card("diamonds", "9"),
      new Card("diamonds", "10"),
      new Card("diamonds", "jack"),
      new Card("diamonds", "queen"),
      new Card("diamonds", "king"),
      new Card("diamonds", "ace"),
      new Card("clubs", "2"),
      new Card("clubs", "3"),
      new Card("clubs", "4"),
      new Card("clubs", "5"),
      new Card("clubs", "6"),
      new Card("clubs", "7"),
      new Card("clubs", "8"),
      new Card("clubs", "9"),
      new Card("clubs", "10"),
      new Card("clubs", "jack"),
      new Card("clubs", "queen"),
      new Card("clubs", "king"),
      new Card("clubs", "ace"),
    ];
    this.stack = stack;
  }
  tass() {
    const cardsFromStack = this.stack.reTass();
    this.cards = [...this.cards, ...cardsFromStack];
  }
  getRandomCard() {
    const random = getRandomInt(0, this.cards.length - 1);
    const card = this.cards[random];
    this.cards.splice(random, 1);
    return card;
  }

  putFirstCard() {
    const random = this.getRandomCard();
    this.stack.putOnTop(random);
  }

  giveCard(player, number) {
    for (let i = 0; i < number; i++) {
      const card = this.getRandomCard();
      player.addCardToHand(card);
    }
  }

  deal(players) {
    this.putFirstCard();
    players.forEach(player => {
      const newHand = [];
      for (let i = 0; i < 5; i++) {
        const card = this.getRandomCard();
        newHand.push(card);
      }
      player.setHand(newHand);
    });
  }
}

module.exports = Deck;