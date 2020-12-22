const { v4 } = require("uuid");
const MqttHandler = require("./MqttHandler");
const Chat = require("./chat/Chat");
class Room {
  constructor(id, players = []) {
    this.id = id;
    this.players = players;
    this.mqttHandler = new MqttHandler(id);
    this.mqttHandler.connect();
    this.chat = new Chat(this.mqttHandler, id);
  }

  addPlayer(player) {
    this.players.push(player);
  }

  publishMessage(message) {
    this.chat.publishMessage(message);
  }
}

module.exports = Room;
