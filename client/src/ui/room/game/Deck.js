import React from "react";
import { takeCard } from "../../../state/ducks/game/actions";
import BackCard from "./BackCard";
const Deck = ({ user }) => {
  return (
    <div className="deck" onClick={() => takeCard(user.id)}>
      <BackCard />
    </div>
  );
};

export default Deck;
