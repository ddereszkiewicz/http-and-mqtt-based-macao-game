import React, { useEffect } from "react";
import { connect } from "react-redux";
import Chat from "./chat/Chat";
import { addMqttClient } from "../state/ducks/mqttHandler/actions";
const Room = ({ room, addMqttClient }) => {
  useEffect(() => {
    addMqttClient(room.id);
  });
  return (
    <div className="roomContainer">
      <Chat />
    </div>
  );
};

const mapStateToProps = state => ({
  room: state.room,
});
export default connect(mapStateToProps, { addMqttClient })(Room);
