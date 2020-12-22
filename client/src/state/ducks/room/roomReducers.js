import { JOIN_ROOM } from "./types";
const initialState = {
  id: null,
};

const roomReducer = (state = initialState, action) => {
  switch (action.type) {
    case JOIN_ROOM: {
      return { ...state, id: action.payload.id };
    }
    default:
      return state;
  }
};
export default roomReducer;
