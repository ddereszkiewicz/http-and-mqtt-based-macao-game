import { REGISTER } from "./types";
const initialState = {
  name: "",
  logged: false,
  id: "",
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER: {
      return { name: action.payload.name, logged: true, id: action.payload.id };
    }
    default:
      return state;
  }
};
export default userReducer;
