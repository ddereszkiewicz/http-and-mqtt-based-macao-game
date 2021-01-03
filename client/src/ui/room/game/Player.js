import { useReducer } from "react";
import { putCard } from "../../../state/ducks/game/actions";
import Card from "./Card";

const Player = ({ user, game }) => {
  const hand = game.hand.map(card => (
    <Card
      card={card}
      key={card.color + card.value}
      onClick={() => putCard(user.id, card)}
    />
  ));
  return (
    <div className={"player" + (game.turn.id == user.id ? " active" : "")}>
      <div className="playersHand">{hand}</div>
      <div className="playerName">{user.name}</div>
    </div>
  );
};

export default Player;
