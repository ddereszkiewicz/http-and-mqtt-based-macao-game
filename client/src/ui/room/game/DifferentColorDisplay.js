import Card from "./Card";

const DifferentColorDisplay = ({ game }) => {
  return (
    <div className="effectDisplay">
      <div className="effectName">current color:</div>
      <div className="effectPower">
        <Card card={{ value: "ace", color: game.currentColor }} />
      </div>
    </div>
  );
};

export default DifferentColorDisplay;
