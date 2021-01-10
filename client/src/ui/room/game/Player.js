import { connect } from "react-redux";
import ColorSelection from "./ColorSelection";
import { putCard, selectCard } from "../../../state/ducks/game/actions";
import Card from "./Card";
import DifferentColorDisplay from "./DifferentColorDisplay";
import ValueSelection from "./ValueSelection";
import EffectDisplay from "./EffectDisplay";
const axios = require("axios");
const Player = ({ user, game, onSelectCard }) => {
  const selectCard = card => {
    if (
      game.currentValue === card.value ||
      game.currentColor === card.color ||
      game.cardOnTop.value === "queen"
    ) {
      onSelectCard(card);
    } else {
      alert("Card doesn't match the card on the top of the stack");
    }
  };
  const requestUndo = () => {
    axios
      .post(`http://localhost:5000/${user.id}/undo`)
      .then(({ data }) => !data.status && alert(data.message))
      .catch(e => alert(e.message));
  };

  const handleClick = card => {
    if (!game.selected) {
      return card.value === "jack" || card.value === "ace"
        ? () => selectCard(card)
        : () => putCard(user.id, card);
    } else {
      return () => alert("Wybierz dalszą akcję");
    }
  };
  const hand = game.hand.map(card => (
    <Card
      card={card}
      key={card.color + card.value}
      onClick={
        user.id == game.turn.id
          ? handleClick(card)
          : () => alert("Wait for your turn")
      }
    />
  ));
  return (
    <div className={"player" + (game.turn.id == user.id ? " active" : "")}>
      <div className="playersHand">{hand}</div>
      {game.selected && game.selected.value === "ace" && (
        <ColorSelection game={game} putCard={putCard} user={user} />
      )}
      {game.selected && game.selected.value === "jack" && (
        <ValueSelection game={game} putCard={putCard} user={user} />
      )}
      <div className="playerName">{user.name}</div>
      <div className="leftSideContainer">
        <button onClick={requestUndo}>Request Undo</button>
        {game.cardOnTop.color != game.currentColor ? (
          <DifferentColorDisplay game={game} />
        ) : (
          <EffectDisplay game={game} />
        )}
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    onSelectCard: card => dispatch(selectCard(card)),
  };
};

export default connect(null, mapDispatchToProps)(Player);
