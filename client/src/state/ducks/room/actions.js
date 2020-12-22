import { JOIN_ROOM } from "./types";
const axios = require("axios");
export const joinRoom = (userId, roomId) => async dispatch => {
  try {
    const response = await axios.post("http://localhost:5000/join-room", {
      userId: userId,
      roomId: roomId,
    });
    response &&
      dispatch({ type: JOIN_ROOM, payload: { id: parseInt(roomId) } });
  } catch (error) {
    console.log(error);
    alert(error);
  }
};

export const createRoom = userId => async dispatch => {
  try {
    const response = await axios.post("http://localhost:5000/create-room", {
      id: userId,
    });
    dispatch({
      type: JOIN_ROOM,
      payload: { id: parseInt(response.data.roomId) },
    });
  } catch (error) {
    console.log(error);
    alert(error);
  }
};
