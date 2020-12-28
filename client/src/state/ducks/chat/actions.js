import { ADD_MESSAGE } from "./types";
const axios = require("axios");
export const addMessage = message => {
  return { type: ADD_MESSAGE, payload: message };
};

export const sendMessage = async (author, text, roomId) => {
  try {
    await axios.post(`http://localhost:5000/${roomId}/chat`, {
      author: author,
      text: text,
    });
  } catch (error) {
    alert(error.message);
    console.log(error.message);
  }
};
