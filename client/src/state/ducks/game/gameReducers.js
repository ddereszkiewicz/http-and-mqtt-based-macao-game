import { IMPORT_STATE, LEAVE_GAME, SELECT_CARD } from "./types";

const initialState = {
  hand: [],
  players: [],
  cardOnTop: null,
  currentColor: "",
  currentValue: "",
  turn: "",
  selected: null,
  winner: "",
  voting: false,
};

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case LEAVE_GAME: {
      return initialState;
    }
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
