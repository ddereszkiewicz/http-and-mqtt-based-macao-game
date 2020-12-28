import user from "./ducks/user/userreducers";
import { configureStore } from "@reduxjs/toolkit";
import room from "./ducks/room/roomReducers";

import chat from "./ducks/chat/chatReducers";
export default configureStore({
  reducer: {
    user,
    room,
    chat,
  },
});
