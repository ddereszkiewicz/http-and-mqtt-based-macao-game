import { JOIN_ROOM, CREATE_ROOM, ADD_PLAYER } from "./types";
const initialState = {
  id: "",
  joined: false,
  creator: false,
  players: [],
};

const roomReducer = (state = initialState, action) => {
  switch (action.type) {
    case JOIN_ROOM: {
      return { ...state, id: action.payload.id, joined: true };
    }
    case CREATE_ROOM: {
      return { ...state, id: action.payload.id, joined: true, creator: true };
    }
    case ADD_PLAYER: {
      return { ...state, players: action.payload };
    }
    default:
      return state;
  }
};
export default roomReducer;
