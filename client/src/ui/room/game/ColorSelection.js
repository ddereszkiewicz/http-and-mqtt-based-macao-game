import Card from "./Card";

const ColorSelection = ({ game, putCard, user }) => {
  const handleClick = color => {
    return () => putCard(user.id, game.selected, color);
  };
  return (
    <div className="selectionContainer Color">
      <h2>Pick a Color</h2>
      <div>
        <Card
          card={{ color: "hearts", value: "ace" }}
          onClick={handleClick("hearts")}
        />
        <Card
          card={{ color: "spades", value: "ace" }}
          onClick={handleClick("spades")}
        />
        <Card
          card={{ color: "diamonds", value: "ace" }}
          onClick={handleClick("diamonds")}
        />
        <Card
          card={{ color: "clubs", value: "ace" }}
          onClick={handleClick("clubs")}
        />
      </div>
    </div>
  );
};

export default ColorSelection;
