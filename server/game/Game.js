const Deck = require("./deck/Deck");
const Stack = require("./Stack");
const Voting = require("./Voting");
const { ActionNone } = require("./Action");
class Game {
  constructor(players, spectators, roomId, mqttHandler, room) {
    this.players = players;
    this.mqttHandler = mqttHandler;
    this.turn = this.players[0];

    this.spectators = spectators;
    this.stack = new Stack();
    this.deck = new Deck(this.stack);
    this.roomId = roomId;
    this.running = true;
    this.winner = "";
    this.lastAction;
    this.lastActionPower;
    this.lastTurn;
    this.lastMoveType;
    this.voting;
    this.setAction(new ActionNone());
    this.stack.assignDeck(this.deck);
    this.room = room;
  }
  removeSpect(spect) {
    this.spectators = this.spectators.filter(s => s.id != spect.id);
    this.sendState();
  }
  checkForWin() {
    if (this.turn.hand.length === 0) {
      this.running = false;
      this.winner = { name: this.turn.name, id: this.turn.id };
      this.room.reset();
    }
  }
  addSpect(viewer) {
    this.spectators.push(viewer);
    setTimeout(() => this.sendState(), 1000);
  }
  nextTurn(direction) {
    this.lastTurn = this.turn;
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
  removePlayer(player) {
    if (this.turn.id === player.id) {
      this.nextTurn("left");
    }
    const left = player.left;
    const right = player.right;
    left.right = right;
    right.left = left;
    this.players = this.players.filter(p => p.id !== player.id);
    this.sendState();
  }
  vote(vote, id) {
    if (this.voting) {
      this.voting.vote(vote, id);
      if (this.voting.hasEverybodyVoted()) {
        const res = this.voting.checkIfValid();
        if (res) {
          console.log("undoing");
          this.undo();
        }
        this.voting = null;
      }
      this.sendState();
    } else {
      throw new Error("no voting at the moment");
    }
  }
  undo() {
    if (this.action.type == this.lastAction.type) {
      this.action.power = this.lastActionPower;
    } else {
      this.action = this.lastAction;
      this.action.power = this.lastActionPower;
    }

    if (this.lastMoveType == "put") {
      this.stack.undo(this.lastTurn);
    } else if (this.lastMoveType == "take") {
      this.deck.undo(this.lastTurn);
    }
    this.turn = this.lastTurn;
    this.sendState();
  }
  requestUndo(id) {
    if (
      this.lastTurn &&
      id == this.lastTurn.id &&
      this.lastTurn.id !== this.turn.id
    ) {
      this.voting = new Voting(this.players.length - 1);
      this.sendState();
    } else {
      throw new Error("You cannot undo now");
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

      winner: this.winner,
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
        winner: this.winner,
        voting: this.voting
          ? {
              name: this.lastTurn.name,
              id: this.lastTurn.id,
              playersWhoVoted: this.voting.playersWhoVoted,
            }
          : "",
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
    if (!this.voting) {
      if (idPlayer == this.turn.id) {
        this.lastAction = this.action;
        this.lastActionPower = this.action.power;
        this.action.giveCards(this.turn);
        if (this.action.type !== "demand") {
          this.setAction(new ActionNone());
        }
        if (this.turn.id == this.action.starter) {
          this.setAction(new ActionNone());
        }
        this.nextTurn("left");

        this.lastMoveType = "take";
        this.sendState();
      } else {
        throw new Error("It's not your turn");
      }
    } else {
      throw new Error("Voting in progress");
    }
  }
  setAction(action) {
    this.action = action;
    this.action.assign(this.deck, this.stack);
  }

  putCard(card, idPlayer) {
    if (!this.voting) {
      if (idPlayer == this.turn.id) {
        this.lastAction = this.action;
        this.lastActionPower = this.action.power;
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
        this.checkForWin();
        card.direction === "right"
          ? this.nextTurn("right")
          : this.nextTurn("left");

        this.lastMoveType = "put";
        this.sendState();
      } else {
        throw new Error("It's not your turn");
      }
    } else {
      throw new Error("Voting in progress");
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
