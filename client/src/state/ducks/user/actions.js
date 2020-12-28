import { REGISTER } from "./types";
const axios = require("axios");

export const register = name => async dispatch => {
  try {
    const user = await axios.post(`http://localhost:5000/register`, {
      name: name,
    });

    dispatch({ type: REGISTER, payload: { name: name, id: user.data } });
  } catch (error) {
    console.log(error);
    alert(error);
  }
};
