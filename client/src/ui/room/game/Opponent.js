import React from "react";
import BackCard from "./BackCard";
const Opponent = ({ player, game }) => {
  const cards = () => {
    const result = [];
    for (let i = 0; i < player.cardsCount; i++) {
      result.push(<BackCard key={i} />);
    }
    return result;
  };

  return (
    <div className={"opponent" + (game.turn.id === player.id ? " active" : "")}>
      <div className="name">{player.name}</div>
      <div className="cards">{cards()}</div>
    </div>
  );
};

export default Opponent;
