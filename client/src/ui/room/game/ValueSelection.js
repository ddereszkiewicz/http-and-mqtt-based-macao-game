import Card from "./Card";

const ValueSelection = ({ game, putCard, user }) => {
  const handleClick = value => {
    return () => putCard(user.id, game.selected, value);
  };
  return (
    <div className="selectionContainer Value">
      <h2>Pick a Value</h2>
      <div>
        <Card
          card={{ color: "hearts", value: "5" }}
          onClick={handleClick("5")}
        />
        <Card
          card={{ color: "hearts", value: "6" }}
          onClick={handleClick("6")}
        />
        <Card
          card={{ color: "hearts", value: "7" }}
          onClick={handleClick("7")}
        />
        <Card
          card={{ color: "hearts", value: "8" }}
          onClick={handleClick("8")}
        />
        <Card
          card={{ color: "hearts", value: "9" }}
          onClick={handleClick("9")}
        />
        <Card
          card={{ color: "hearts", value: "10" }}
          onClick={handleClick("10")}
        />
      </div>
    </div>
  );
};

export default ValueSelection;
