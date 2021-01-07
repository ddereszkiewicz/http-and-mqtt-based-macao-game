const EffectDisplay = ({ game }) => {
  return (
    <div className="effectDisplay">
      <div className="effectName">{game.effect.type}</div>
      <div className="effectPower">
        {game.effect.type !== "none" && "power:"} {game.effect.power}
      </div>
    </div>
  );
};

export default EffectDisplay;
