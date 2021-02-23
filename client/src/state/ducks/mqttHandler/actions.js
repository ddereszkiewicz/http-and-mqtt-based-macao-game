import { addMessage } from "../chat/actions";
import { importState } from "../game/actions";
import { addPlayer } from "../room/actions";
const MQTT = require("async-mqtt");

export const addMqttClient = (idRoom, idUser) => dispatch => {
  const client = MQTT.connect("ws://10.45.3.36:8000/mqtt");
  const setUp = async () => {
    console.log("connected");
    try {
      await client.subscribe(`chat/${idRoom}`);
      await client.subscribe(`game-state/${idUser}`);
      await client.subscribe(`room/${idRoom}`);
    } catch (error) {
      console.log(error);
    }
  };
  client.on("connect", setUp);
  client.on("message", (topic, message) => {
    switch (topic) {
      case `chat/${idRoom}`: {
        dispatch(addMessage(JSON.parse(message.toString())));
        break;
      }
      case `game-state/${idUser}`: {
        dispatch(importState(JSON.parse(message.toString())));
        break;
      }
      case `room/${idRoom}`: {
        dispatch(addPlayer(JSON.parse(message.toString())));
        break;
      }
      default:
    }
  });
};
