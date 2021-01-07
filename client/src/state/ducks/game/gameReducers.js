import { IMPORT_STATE, SELECT_CARD, SWITCH_MODE } from "./types";

const initialState = {
  hand: [],
  players: [],
  cardOnTop: null,
  currentColor: "",
  currentValue: "",
  turn: "",
  selected: null,
};

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case IMPORT_STATE: {
      return { ...state, ...action.payload, selected: null };
    }
    case SELECT_CARD: {
      return { ...state, selected: action.payload };
    }
    default:
      return state;
  }
};
export default gameReducer;
