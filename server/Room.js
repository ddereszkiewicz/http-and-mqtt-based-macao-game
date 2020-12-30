const { v4 } = require("uuid");
const MqttHandler = require("./MqttHandler");
const Chat = require("./chat/Chat");
const Game = require("./game/Game");
class Room {
  constructor(id, players = []) {
    this.id = id;
    this.players = players;
    this.mqttHandler = new MqttHandler(id);
    this.mqttHandler.connect();
    this.chat = new Chat(this.mqttHandler, id);
    this.game;
    this.publishState();
  }
  startGame() {
    this.game = new Game(this.players, this.mqttHandler);
    this.game.start();
  }
  addPlayer(player) {
    if (!this.game) {
      if (this.players.length <= 4) {
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
        JSON.stringify(
          this.players.map(player => ({ name: player.name, id: player.id }))
        )
      );
    }, 1000);
  }

  publishMessage(message) {
    this.chat.publishMessage(message);
  }
}

module.exports = Room;
