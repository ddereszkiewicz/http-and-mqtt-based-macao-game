import React from "react";

import hearts_2 from "../../../cards/2H.png";
import hearts_3 from "../../../cards/3H.png";
import hearts_4 from "../../../cards/4H.png";
import hearts_5 from "../../../cards/5H.png";
import hearts_6 from "../../../cards/6H.png";
import hearts_7 from "../../../cards/7H.png";
import hearts_8 from "../../../cards/8H.png";
import hearts_9 from "../../../cards/9H.png";
import hearts_10 from "../../../cards/10H.png";
import hearts_jack from "../../../cards/JH.png";
import hearts_queen from "../../../cards/QH.png";
import hearts_king from "../../../cards/KH.png";
import hearts_ace from "../../../cards/AH.png";
import spades_2 from "../../../cards/2S.png";
import spades_3 from "../../../cards/3S.png";
import spades_4 from "../../../cards/4S.png";
import spades_5 from "../../../cards/5S.png";
import spades_6 from "../../../cards/6S.png";
import spades_7 from "../../../cards/7S.png";
import spades_8 from "../../../cards/8S.png";
import spades_9 from "../../../cards/9S.png";
import spades_10 from "../../../cards/10S.png";
import spades_jack from "../../../cards/JS.png";
import spades_queen from "../../../cards/QS.png";
import spades_king from "../../../cards/KS.png";
import spades_ace from "../../../cards/AS.png";
import clubs_2 from "../../../cards/2C.png";
import clubs_3 from "../../../cards/3C.png";
import clubs_4 from "../../../cards/4C.png";
import clubs_5 from "../../../cards/5C.png";
import clubs_6 from "../../../cards/6C.png";
import clubs_7 from "../../../cards/7C.png";
import clubs_8 from "../../../cards/8C.png";
import clubs_9 from "../../../cards/9C.png";
import clubs_10 from "../../../cards/10C.png";
import clubs_jack from "../../../cards/JC.png";
import clubs_queen from "../../../cards/QC.png";
import clubs_king from "../../../cards/KC.png";
import clubs_ace from "../../../cards/AC.png";
import diamonds_2 from "../../../cards/2D.png";
import diamonds_3 from "../../../cards/3D.png";
import diamonds_4 from "../../../cards/4D.png";
import diamonds_5 from "../../../cards/5D.png";
import diamonds_6 from "../../../cards/6D.png";
import diamonds_7 from "../../../cards/7D.png";
import diamonds_8 from "../../../cards/8D.png";
import diamonds_9 from "../../../cards/9D.png";
import diamonds_10 from "../../../cards/10D.png";
import diamonds_jack from "../../../cards/JD.png";
import diamonds_queen from "../../../cards/QD.png";
import diamonds_king from "../../../cards/KD.png";
import diamonds_ace from "../../../cards/AD.png";

const allCards = {
  hearts_2,
  hearts_3,
  hearts_4,
  hearts_5,
  hearts_6,
  hearts_7,
  hearts_8,
  hearts_9,
  hearts_10,
  hearts_jack,
  hearts_queen,
  hearts_king,
  hearts_ace,
  clubs_2,
  clubs_3,
  clubs_4,
  clubs_5,
  clubs_6,
  clubs_7,
  clubs_8,
  clubs_9,
  clubs_10,
  clubs_jack,
  clubs_queen,
  clubs_king,
  clubs_ace,
  spades_2,
  spades_3,
  spades_4,
  spades_5,
  spades_6,
  spades_7,
  spades_8,
  spades_9,
  spades_10,
  spades_jack,
  spades_queen,
  spades_king,
  spades_ace,
  diamonds_2,
  diamonds_3,
  diamonds_4,
  diamonds_5,
  diamonds_6,
  diamonds_7,
  diamonds_8,
  diamonds_9,
  diamonds_10,
  diamonds_jack,
  diamonds_queen,
  diamonds_king,
  diamonds_ace,
};
const Card = ({ card, onClick }) => {
  const cardName = `${card.color}_${card.value}`;
  const cardImg = allCards[cardName];
  return (
    <div className="card" onClick={onClick}>
      <img src={cardImg} alt="cardImg" />
    </div>
  );
};

export default Card;
