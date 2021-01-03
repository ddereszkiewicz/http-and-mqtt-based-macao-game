import React, { useEffect } from "react";
import { connect } from "react-redux";
import Chat from "./chat/Chat";
import { addMqttClient } from "../../state/ducks/mqttHandler/actions";
import { startGame } from "../../state/ducks/game/actions";
import Game from "./game/Game";
import WaitingScreen from "./waiting_screen/WaitingScreen";
const Room = ({ room, user, addMqttClient, game }) => {
  useEffect(() => {
    addMqttClient(room.id, user.id);
  }, [addMqttClient, room.id, user.id]);

  const handleRoutes = () => {
    if (game.running) {
      return <Game game={game} user={user} />;
    } else if (room.creator) {
      return <button onClick={() => startGame(room.id)}>Start Game</button>;
    }
  };
  return (
    <div className="roomContainer">
      <div className="roomId">room : {room.id}</div>
      <Chat user={user} room={room} />
      {handleRoutes()}
      {!game.running && <WaitingScreen room={room} />}
    </div>
  );
};

const mapStateToProps = state => ({
  room: state.room,
  user: state.user,
  game: state.game,
});
export default connect(mapStateToProps, { addMqttClient })(Room);
