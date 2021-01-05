const Deck = require("./deck/Deck");
const Stack = require("./Stack");
const { ActionNone } = require("./Action");
class Game {
  constructor(players, mqttHandler) {
    this.players = players;
    this.mqttHandler = mqttHandler;
    this.turn = this.players[0];
    this.stack = new Stack();
    this.deck = new Deck(this.stack);
    this.action = new ActionNone("none");
    this.running = true;
    this.action.assign(this.deck, this.stack);
  }
  nextTurn(direction) {
    direction == "left"
      ? (this.turn = this.turn.left)
      : (this.turn = this.turn.right);
    if (this.turn.waitingTours > 0) {
      this.turn.waitingTours -= 1;
      direction == "left"
        ? (this.turn = this.turn.left)
        : (this.turn = this.turn.right);
    }
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
        hand: player.hand.map(card => ({
          color: card.color,
          value: card.value,
        })),
        cardOnTop: {
          color: this.stack.currentColor,
          value: this.stack.currentValue,
        },
        currentColor: this.stack.currentColor,
        currentValue: this.stack.currentValue,
        running: this.running,
        turn: { id: this.turn.id, name: this.turn.name },
      };

      const toSend = JSON.stringify(message);
      this.mqttHandler.publish(`game-state/${player.id}`, toSend);
    });
  }
  takeCard(idPlayer) {
    if (idPlayer == this.turn.id) {
      this.action.giveCards(this.turn);
      this.action = new ActionNone("none");
      this.action.assign(this.deck, this.stack);
      this.nextTurn("left");
      this.sendState();
    } else {
      throw new Error("It's not your turn");
    }
  }
  putCard(card, idPlayer) {
    if (idPlayer == this.turn.id) {
      if (this.action.type == "none") {
        this.action = card.action;
        this.action.assign(this.deck, this.stack);
      }
      this.action.putCard(card);
      this.turn.removeCard(card);

      card.direction === "right"
        ? this.nextTurn("right")
        : this.nextTurn("left");

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
