import React from "react";
const axios = require("axios");
const Voting = ({ game, user }) => {
  const handlebuttons = mes => {
    axios.post(`http://localhost:5000/${user.id}/vote`, { vote: mes });
  };
  return (
    <div className="voting">
      <div className="prompt">
        {game.voting.name} requested to undo, are you ok with it?
      </div>
      {!game.voting.playersWhoVoted.find(el => el == user.id) && (
        <div className="buttons">
          <button onClick={() => handlebuttons("yes")}> yes </button>
          <button onClick={() => handlebuttons("no")}> no </button>
        </div>
      )}
    </div>
  );
};

export default Voting;
