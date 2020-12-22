import user from "./ducks/user/userreducers";
import { configureStore } from "@reduxjs/toolkit";
import room from "./ducks/room/roomReducers";
export default configureStore({
  reducer: {
    user,
    room,
  },
});
