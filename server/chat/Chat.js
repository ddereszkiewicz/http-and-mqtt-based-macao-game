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
  publishPrivateMessage(message, destinationId) {
    this.messages += message;
    this.mqttHandler.publish(
      `chat/${this.id}/${destinationId}`,
      JSON.stringify(message)
    );
  }
}
module.exports = Chat;
