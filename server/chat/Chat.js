class Chat {
  constructor(mqttHandler, id) {
    this.messages = [];
    this.mqttHandler = mqttHandler;
    this.id = id;
  }
  publishMessage(message) {
    this.messages += message;
    this.mqttHandler.publish(`chat/${this.id}`, JSON.stringify(message));
  }
}
module.exports = Chat;
