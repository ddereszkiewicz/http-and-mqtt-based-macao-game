const mqtt = require("async-mqtt");
class MqttHandler {
  constructor() {
    this.mqttClient = null;
    this.host = "tcp://10.45.3.36:1883";
  }
  connect() {
    try {
      this.mqttClient = mqtt.connect(this.host);
      this.mqttClient.on("connect", () => {
        console.log("connected to mqtt");
      });
    } catch (error) {
      console.log(error);
    }
  }
  publish(topic, message) {
    try {
      this.mqttClient.publish(topic, message);
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = MqttHandler;
