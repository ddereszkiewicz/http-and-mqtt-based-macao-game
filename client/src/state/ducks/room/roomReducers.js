import {
  JOIN_ROOM,
  CREATE_ROOM,
  ADD_PLAYER,
  JOIN_ROOM_AS_SPECT,
  ADD_SPECT,
  LEAVE_ROOM,
} from "./types";
const initialState = {
  id: "",
  joined: false,
  creator: false,
  players: [],
  isPlayer: true,
  spectators: [],
};

const roomReducer = (state = initialState, action) => {
  switch (action.type) {
    case LEAVE_ROOM: {
      return initialState;
    }
    case JOIN_ROOM: {
      return { ...state, id: action.payload.id, joined: true };
    }
    case CREATE_ROOM: {
      return { ...state, id: action.payload.id, joined: true, creator: true };
    }
    case JOIN_ROOM_AS_SPECT: {
      return { ...state, id: action.payload.id, joined: true, isPlayer: false };
    }
    case ADD_PLAYER: {
      return { ...state, players: action.payload };
    }
    case ADD_SPECT: {
      return { ...state, spectators: action.payload };
    }
    default:
      return state;
  }
};
export default roomReducer;
