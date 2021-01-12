import { IMPORT_STATE, SELECT_CARD, UNSELECT_CARD } from "./types";
const axios = require("axios");
export const importState = state => {
  console.log(state.winner);
  if (state.winner) {
    alert(`The winner is ${state.winner.name}`);
  }

  return {
    type: IMPORT_STATE,
    payload: state,
  };
};

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

export const putCard = (idUser, card, payload) => async dispatch => {
  console.log("work");
  try {
    const result = await axios.post(
      `http://localhost:5000/${idUser}/put-card`,
      {
        value: card.value,
        color: card.color,
        payload: payload,
      }
    );

    if (!result.data.status) {
      alert(result.data.message);
      dispatch({ type: UNSELECT_CARD });
    }
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
