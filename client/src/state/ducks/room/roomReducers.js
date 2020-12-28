import { JOIN_ROOM } from "./types";
const initialState = {
  id: "",
  joined: false,
};

const roomReducer = (state = initialState, action) => {
  switch (action.type) {
    case JOIN_ROOM: {
      return { ...state, id: action.payload.id, joined: true };
    }
    default:
      return state;
  }
};
export default roomReducer;
