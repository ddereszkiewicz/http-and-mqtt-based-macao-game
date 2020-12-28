import { ADD_MQTT_CLIENT } from "./types";
import { addMessage } from "../chat/actions";
const MQTT = require("async-mqtt");

export const addMqttClient = id => dispatch => {
  const client = MQTT.connect("ws://10.45.3.36:8000/mqtt");
  const setUp = async () => {
    console.log("connected");
    try {
      await client.subscribe(`chat/${id}`);
    } catch (error) {
      console.log(error);
    }
  };
  client.on("connect", setUp);
  client.on("message", (topic, message) => {
    switch (topic) {
      case `chat/${id}`: {
        const [author, text] = message.toString().split(":");

        dispatch(addMessage({ author, text }));
        break;
      }
      default:
    }
  });
};