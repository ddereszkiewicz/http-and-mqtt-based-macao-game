import Card from "./Card";

const Player = ({ user, game }) => {
  const hand = game.hand.map(card => (
    <Card card={card} key={card.color + card.value} />
  ));
  return (
    <div className="player">
      <div className="playersHand">{hand}</div>
    </div>
  );
};

export default Player;
