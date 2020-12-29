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
  }
  startGame() {
    this.game = new Game(this.players, this.mqttHandler);
    this.game.start();
  }
  addPlayer(player) {
    this.players.push(player);
  }

  publishMessage(message) {
    this.chat.publishMessage(message);
  }
}

module.exports = Room;
