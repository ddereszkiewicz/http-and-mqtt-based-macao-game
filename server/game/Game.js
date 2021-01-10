const Deck = require("./deck/Deck");
const Stack = require("./Stack");
const { ActionNone } = require("./Action");
class Game {
  constructor(players, spectators, roomId, mqttHandler) {
    this.players = players;
    this.mqttHandler = mqttHandler;
    this.turn = this.players[0];
    this.spectators = spectators;
    this.stack = new Stack();
    this.deck = new Deck(this.stack);
    this.roomId = roomId;
    this.running = true;
    this.setAction(new ActionNone());
    this.stack.assignDeck(this.deck);
  }
  addSpect(viewer) {
    this.spectators.push(viewer);
    setTimeout(() => this.sendState(), 1000);
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

  sendViewState() {
    const playerToSend = this.players.map(p => ({
      cardsCount: p.hand.length,
      name: p.name,
      id: p.id,
    }));
    const viewers = this.spectators.map(viewer => ({
      name: viewer.name,
      id: viewer.id,
    }));
    const message = {
      viewers: viewers,
      players: playerToSend,
      cardOnTop: {
        color: this.stack.cardOnTop.color,
        value: this.stack.cardOnTop.value,
      },
      currentColor: this.stack.currentColor,
      currentValue: this.stack.currentValue,
      running: this.running,
      effect: { type: this.action.type, power: this.action.power },
      turn: { id: this.turn.id, name: this.turn.name },
    };
    this.mqttHandler.publish(
      `spectate/${this.roomId}`,
      JSON.stringify(message)
    );
  }
  sendState() {
    const viewers = this.spectators.map(viewer => ({
      name: viewer.name,
      id: viewer.id,
    }));
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
        viewers: viewers,
        players: playerToSend,
        hand: player.hand.map(card => ({
          color: card.color,
          value: card.value,
        })),
        cardOnTop: {
          color: this.stack.cardOnTop.color,
          value: this.stack.cardOnTop.value,
        },
        currentColor: this.stack.currentColor,
        currentValue: this.stack.currentValue,
        running: this.running,
        effect: { type: this.action.type, power: this.action.power },
        turn: { id: this.turn.id, name: this.turn.name },
      };

      const toSend = JSON.stringify(message);
      this.mqttHandler.publish(`game-state/${player.id}`, toSend);
      this.sendViewState();
    });
  }
  takeCard(idPlayer) {
    if (idPlayer == this.turn.id) {
      this.action.giveCards(this.turn);
      if (this.action.type !== "demand") {
        this.setAction(new ActionNone());
      }
      if (this.turn.id == this.action.starter) {
        this.setAction(new ActionNone());
      }
      this.nextTurn("left");
      this.sendState();
    } else {
      throw new Error("It's not your turn");
    }
  }
  setAction(action) {
    const prevAction = this.action;
    this.action = action;
    this.action.assign(this.deck, this.stack);
    return prevAction;
  }

  putCard(card, idPlayer) {
    if (idPlayer == this.turn.id) {
      this.action.putCard(card, this.turn);

      if (this.turn.id == this.action.starter) {
        this.setAction(new ActionNone());
      }
      if (this.action.type == "none") {
        this.setAction(card.action);
      }
      if (card.value == "ace") {
        this.stack.currentColor = card.newColor;
      }

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
