const { IMPORT_SPECTATOR } = require("./types");

const initialState = {
  players: [],
  cardOnTop: null,
  currentColor: "",
  currentValue: "",
  turn: "",
  winner: "",
};

const spectatorReducer = (state = initialState, action) => {
  switch (action.type) {
    case IMPORT_SPECTATOR: {
      return action.payload;
    }
    default:
      return state;
  }
};
export default spectatorReducer;
