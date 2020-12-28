const Deck = require("./deck/Deck");

class Game {
  constructor(players, mqttHandler) {
    this.deck = new Deck();
    this.players = players;
    this.mqttHandler = mqttHandler;
  }
  start() {
    this.deck.deal(this.players);
    this.players.reduce((el, next) => {
      el.setRight(next);
      next.setLeft(el);
    });
    this.players[0].setLeft(this.players[this.players.length - 1]);
    this.players[this.players.length - 1].setRight(this.players[0]);
  }
}

module.exports = Game;
