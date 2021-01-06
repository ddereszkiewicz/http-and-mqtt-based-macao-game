const Card = require("./Card");
const { TakingCard, WaitingCard, DemandCard } = require("./ActionCards");
const getRandomInt = require("../../functions");
class Deck {
  constructor(stack) {
    this.cards = [
      new TakingCard("hearts", "2", 2, "left"),
      new TakingCard("hearts", "3", 3, "left"),
      new WaitingCard("hearts", "4"),
      new Card("hearts", "5"),
      new Card("hearts", "6"),
      new Card("hearts", "7"),
      new Card("hearts", "8"),
      new Card("hearts", "9"),
      new Card("hearts", "10"),
      new DemandCard("hearts", "jack"),
      new Card("hearts", "queen"),
      new TakingCard("hearts", "king", 5, "left"),
      new Card("hearts", "ace"),
      new TakingCard("spades", "2", 2, "left"),
      new TakingCard("spades", "3", 3, "left"),
      new WaitingCard("spades", "4"),
      new Card("spades", "5"),
      new Card("spades", "6"),
      new Card("spades", "7"),
      new Card("spades", "8"),
      new Card("spades", "9"),
      new Card("spades", "10"),
      new DemandCard("spades", "jack"),
      new Card("spades", "queen"),
      new TakingCard("spades", "king", 5, "right"),
      new Card("spades", "ace"),
      new TakingCard("diamonds", "2", 2, "left"),
      new TakingCard("diamonds", "3", 3, "left"),
      new WaitingCard("diamonds", "4"),
      new Card("diamonds", "5"),
      new Card("diamonds", "6"),
      new Card("diamonds", "7"),
      new Card("diamonds", "8"),
      new Card("diamonds", "9"),
      new Card("diamonds", "10"),
      new DemandCard("diamonds", "jack"),
      new Card("diamonds", "queen"),
      new Card("diamonds", "king"),
      new Card("diamonds", "ace"),
      new TakingCard("clubs", "2", 2, "left"),
      new TakingCard("clubs", "3", 3, "left"),
      new WaitingCard("clubs", "4"),
      new Card("clubs", "5"),
      new Card("clubs", "6"),
      new Card("clubs", "7"),
      new Card("clubs", "8"),
      new Card("clubs", "9"),
      new Card("clubs", "10"),
      new DemandCard("clubs", "jack"),
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
    const random = getRandomInt(0, this.cards.length);
    const card = this.cards[random];
    this.cards.splice(random, 1);
    return card;
  }

  putFirstCard() {
    const random = this.getRandomCard();
    this.stack.putOnTop(random);
  }

  giveCard(player, number) {
    if (this.cards.length >= number) {
      for (let i = 0; i < number; i++) {
        const card = this.getRandomCard();
        player.addCardToHand(card);
      }
    } else {
      throw new Error("Deck is empty");
    }
  }
  addCard(card) {
    this.cards.push(card);
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
