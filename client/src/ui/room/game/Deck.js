import React from "react";
import { takeCard } from "../../../state/ducks/game/actions";
import BackCard from "./BackCard";
const Deck = ({ user, game }) => {
  return (
    <div
      className="deck"
      onClick={
        game.turn.id == user.id
          ? () => takeCard(user.id)
          : () => alert("Wait for your turn")
      }
    >
      <BackCard />
    </div>
  );
};

export default Deck;
