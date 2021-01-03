import React from "react";
import Opponent from "./Opponent";
import Player from "./Player";
import Stack from "./Stack";
import Deck from "./Deck";
const Game = ({ game, user }) => {
  const opponents = game.players.map(player => (
    <Opponent player={player} game={game} key={player.id} />
  ));
  opponents.reverse();
  return (
    <div className="gameContainer">
      <div className="opponentsContainer">{opponents}</div>
      <div className="center">
        <Stack card={game.cardOnTop} />
        <Deck user={user} />
      </div>
      <Player game={game} user={user} />
    </div>
  );
};

export default Game;
