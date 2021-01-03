import React from "react";
import PlayerName from "./PlayerName";
const WaitingScreen = ({ room }) => {
  const playersNames = room.players.map(player => (
    <PlayerName key={player.id} name={player.name} />
  ));

  return (
    <div className="waitingScreen">
      <p>waiting players:</p>
      <div className="playerNames">{playersNames}</div>
    </div>
  );
};

export default WaitingScreen;
