import { IMPORT_STATE } from "./types";
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
  }
};
