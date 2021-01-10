import { IMPORT_STATE, SELECT_CARD, SWITCH_MODE } from "./types";
const axios = require("axios");
export const importState = state => ({
  type: IMPORT_STATE,
  payload: state,
});

export const startGame = async roomID => {
  try {
    await axios.post(`http://localhost:5000/${roomID}/start-game`);
  } catch (error) {
    console.log(error);
    alert(error);
  }
};

export const selectCard = payload => ({
  type: SELECT_CARD,
  payload: payload,
});


export const putCard = async (idUser, card, payload) => {
  try {
    const result = await axios.post(
      `http://localhost:5000/${idUser}/put-card`,
      {
        value: card.value,
        color: card.color,
        payload: payload,
      }
    );
    console.log(result.data);
    !result.data.status && alert(result.data.message);
  } catch (error) {
    console.log(error.message);
    alert(error.message);
  }
};

export const takeCard = async idUser => {
  try {
    const result = await axios.post(
      `http://localhost:5000/${idUser}/take-card`
    );
    !result.data.status && alert(result.data.message);
  } catch (error) {
    console.log(error);
    alert(error.message);
  }
};
