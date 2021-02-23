import React from "react";
import Card from "./Card";
const Stack = ({ card }) => {
  return (
    <div className="stack">
      <Card card={card} />
    </div>
  );
};

export default Stack;
