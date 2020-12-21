class Chat {
  constructor(mqttHandler, id) {
    this.messages = [];
    this.mqttHandler = mqttHandler;
    this.id = id;
  }
  publishMessage(message) {
    this.messages += message;
    this.mqttHandler.publish(
      `chat/${this.id}`,
      `${message.author}:${message.text}`
    );
  }
}
module.exports = Chat;
