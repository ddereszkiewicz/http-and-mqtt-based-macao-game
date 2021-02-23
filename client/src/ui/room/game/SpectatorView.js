import React from "react";
import Deck from "./Deck";
import DifferentColorDisplay from "./DifferentColorDisplay";
import EffectDisplay from "./EffectDisplay";
import Opponent from "./Opponent";
import Player from "./Player";
import Stack from "./Stack";
const SpectatorView = ({ game }) => {
  const playerBottom = game.players[0];
  const rest = game.players.filter(player => player.id !== playerBottom.id);
  rest.reverse();
  const opponents = rest.map(player => (
    <Opponent player={player} game={game} key={player.id} />
  ));
  return (
    <div className="gameContainer">
      <div className="opponentsContainer">{opponents}</div>
      <div className="center">
        <Stack card={game.cardOnTop} />
        <Deck game={game} user={""} />
      </div>
      <div
        className={
          "bottomPlayer" + (game.turn.id == playerBottom.id ? " active" : "")
        }
      >
        <Opponent player={playerBottom} game={game} />

        {game.cardOnTop.color != game.currentColor ? (
          <DifferentColorDisplay game={game} />
        ) : (
          <EffectDisplay game={game} />
        )}
      </div>
    </div>
  );
};

export default SpectatorView;
