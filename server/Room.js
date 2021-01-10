const Chat = require("./chat/Chat");
const Game = require("./game/Game");
class Room {
  constructor(id, players = [], mqttHandler) {
    this.id = id;
    this.players = players;
    this.mqttHandler = mqttHandler;
    this.mqttHandler.connect();
    this.chat = new Chat(this.mqttHandler, id);
    this.game;
    this.publishState();
    this.spectators = [];
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
      this.mqttHandler
    );
    this.game.start();
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
