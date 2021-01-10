import {
  ADD_PLAYER,
  ADD_SPECT,
  CREATE_ROOM,
  JOIN_ROOM,
  JOIN_ROOM_AS_SPECT,
} from "./types";
const axios = require("axios");
export const joinRoom = (userId, roomId, client) => async dispatch => {
  try {
    const response = await axios.post("http://localhost:5000/join-room", {
      userId: userId,
      roomId: roomId,
    });
    response.data.status
      ? dispatch({ type: JOIN_ROOM, payload: { id: parseInt(roomId) } })
      : alert(response.data.message);
    await client.subscribe(`room/${roomId}`);
    await client.subscribe(`game-state/${userId}`);
    await client.subscribe(`chat/${roomId}`);
  } catch (error) {
    console.log(error);
    alert(error);
  }
};
export const joinRoomAsSpect = (userId, roomId, client) => async dispatch => {
  console.log("helo");
  try {
    const response = await axios.post("http://localhost:5000/join-view", {
      userId: userId,
      roomId: roomId,
    });
    console.log(response.data);
    response.data.status
      ? dispatch({
          type: JOIN_ROOM_AS_SPECT,
          payload: { id: parseInt(roomId) },
        })
      : alert(response.data.message);

    await client.subscribe(`room/${roomId}`);
    await client.subscribe(`spectate/${roomId}`);
    await client.subscribe(`chat/${roomId}`);
  } catch (error) {
    console.log(error);
    alert(error);
  }
};

export const createRoom = (userId, client) => async dispatch => {
  try {
    const response = await axios.post("http://localhost:5000/create-room", {
      id: userId,
    });
    dispatch({
      type: CREATE_ROOM,
      payload: { id: parseInt(response.data.roomId) },
    });

    await client.subscribe(`room/${parseInt(response.data.roomId)}`);
    await client.subscribe(`game-state/${userId}`);
    await client.subscribe(`chat/${parseInt(response.data.roomId)}`);
  } catch (error) {
    console.log(error);
    alert(error);
  }
};

export const addPlayer = playerNames => ({
  type: ADD_PLAYER,
  payload: playerNames,
});

export const addSpect = spectNames => ({
  type: ADD_SPECT,
  payload: spectNames,
});
