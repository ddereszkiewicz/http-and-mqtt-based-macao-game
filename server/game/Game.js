const Deck = require("./deck/Deck");
const Stack = require("./Stack");
class Game {
  constructor(players, mqttHandler) {
    this.players = players;
    this.mqttHandler = mqttHandler;
    this.turn = this.players[0];
    this.stack = new Stack();
    this.deck = new Deck(this.stack);
    this.running = true;
  }
  nextTurn(direction) {
    direction == "left" ? (this.turn = this.turn.left) : this.turn.right;
  }
  sendState() {
    this.players.forEach(player => {
      const index = this.players.findIndex(p => p.id === player.id);
      const beforeEl = this.players.slice(0, index);

      const playerToSend = this.players
        .slice(index, this.players.length)
        .concat(beforeEl)
        .filter(p => p.id != player.id)
        .map(p => ({
          cardsCount: p.hand.length,
          name: p.name,
          id: p.id,
        }));
      const message = {
        players: playerToSend,
        hand: player.hand,
        cardOnTop: this.stack.cardOnTop,
        currentColor: this.stack.currentColor,
        currentValue: this.stack.currentValue,
        running: this.running,
        turn: this.turn.id,
      };
      console.log(message);
      const toSend = JSON.stringify(message);
      this.mqttHandler.publish(`game-state/${player.id}`, toSend);
    });
  }
  takeCard(idPlayer) {
    if (idPlayer == this.turn.id) {
      this.deck.giveCard(this.turn, 1);
      this.nextTurn("left");
      this.sendState();
    } else {
      throw new Error("It's not your turn");
    }
  }
  putCard(card, idPlayer) {
    if (idPlayer == this.turn.id) {
      this.stack.putOnTop(card);
      this.nextTurn("left");
      this.sendState();
    } else {
      throw new Error("It's not your turn");
    }
  }
  start() {
    this.players.forEach(player => player.setGame(this));
    this.deck.deal(this.players);

    this.players.reduce((el, next) => {
      el.setRight(next);
      next.setLeft(el);
      return next;
    });
    this.players[0].setLeft(this.players[this.players.length - 1]);
    this.players[this.players.length - 1].setRight(this.players[0]);
    this.sendState();
  }
}

module.exports = Game;
