const Chat = require("./chat/Chat");
const Game = require("./game/Game");
class Room {
  constructor(id, players = [], mqttHandler) {
    this.id = id;
    this.players = players;
    this.mqttHandler = mqttHandler;
    this.chat = new Chat(this.mqttHandler, id);
    this.game;
    this.publishState();
    this.spectators = [];
  }
  publishPrivateMessage(message, destinationId) {
    this.chat.publishPrivateMessage(message, destinationId);
  }
  removePlayer(player) {
    if (this.players.find(p => p.id == player.id)) {
      this.players = this.players.filter(p => p.id != player.id);
      if (this.game) {
        this.game.removePlayer(player);
      }
    } else if (this.spectators.find(p => p.id == player.id)) {
      this.spectators = this.spectators.filter(p => p.id != player.id);
      if (this.game) {
        this.game.removeSpect(player);
      }
    } else {
      throw new Error("Player not in the game");
    }

    this.publishState();
  }
  addSpect(viewer) {
    if (this.game) {
      this.game.addSpect(viewer);
    }
    this.spectators.push(viewer);
    this.publishState();
  }
  startGame() {
    this.game = new Game(
      this.players,
      this.spectators,
      this.id,
      this.mqttHandler,
      this
    );
    this.game.start();
  }
  reset() {
    this.game = null;
  }
  addPlayer(player) {
    if (!this.game) {
      if (this.players.length < 4) {
        this.players.push(player);
        this.publishState();
      } else {
        throw new Error("Room is full");
      }
    } else {
      throw new Error("Game already started");
    }
  }
  publishState() {
    setTimeout(() => {
      this.mqttHandler.publish(
        `room/${this.id}`,
        JSON.stringify({
          players: this.players.map(player => ({
            name: player.name,
            id: player.id,
          })),
          spectators: this.spectators.map(spect => ({
            name: spect.name,
            id: spect.id,
          })),
        })
      );
    }, 2000);
  }

  publishMessage(message) {
    this.chat.publishMessage(message);
  }
}

module.exports = Room;
