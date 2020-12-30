import { IMPORT_STATE } from "./types";

const initialState = {
  hand: [],
  players: [],
  cardOnTop: null,
  currentColor: "",
  currentValue: "",
  turn: "",
};

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case IMPORT_STATE: {
      return action.payload;
    }
    default:
      return state;
  }
};
export default gameReducer;
