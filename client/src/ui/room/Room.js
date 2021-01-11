import React, { useEffect } from "react";

import Chat from "./chat/Chat";

import { startGame } from "../../state/ducks/game/actions";
import Game from "./game/Game";
import WaitingScreen from "./waiting_screen/WaitingScreen";
import SpectatorView from "./game/SpectatorView";
import { connect } from "react-redux";
import { leaveRoom } from "../../state/ducks/room/actions";
const Room = ({ room, user, game, client, leaveRoom }) => {
  const handleRoutes = () => {
    if (game.running) {
      return room.isPlayer ? (
        <Game game={game} user={user} />
      ) : (
        <SpectatorView game={game} />
      );
    } else if (room.creator) {
      return <button onClick={() => startGame(room.id)}>Start Game</button>;
    }
  };
  const handleLeave = () => {
    leaveRoom(user.id, room.id, client);
  };
  return (
    <div className="roomContainer">
      <button onClick={handleLeave} id="leaveButton">
        leave
      </button>
      <div className="roomId">room : {room.id}</div>
      <Chat user={user} room={room} />
      {handleRoutes()}
      {!game.running && <WaitingScreen room={room} />}
    </div>
  );
};

export default connect(null, { leaveRoom })(Room);
