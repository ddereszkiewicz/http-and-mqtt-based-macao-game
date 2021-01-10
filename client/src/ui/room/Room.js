import React from "react";

import Chat from "./chat/Chat";

import { startGame } from "../../state/ducks/game/actions";
import Game from "./game/Game";
import WaitingScreen from "./waiting_screen/WaitingScreen";
import SpectatorView from "./game/SpectatorView";
const Room = ({ room, user, game }) => {
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
  return (
    <div className="roomContainer">
      <div className="roomId">room : {room.id}</div>
      <Chat user={user} room={room} />
      {handleRoutes()}
      {!game.running && <WaitingScreen room={room} />}
    </div>
  );
};

export default Room;
