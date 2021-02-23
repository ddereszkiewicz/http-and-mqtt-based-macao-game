const { IMPORT_SPECTATOR } = require("./types");

export const importSpectatorState = state => ({
  type: IMPORT_SPECTATOR,
  payload: state,
});
