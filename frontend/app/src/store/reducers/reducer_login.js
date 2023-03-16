import { LOGIN_SUCCESS, LOGIN_FAILURE } from "../constants/index";

const initialState = {
  user: {},
  error: null,
};

function reducer_login(state = initialState, action) {
  if (action.type === LOGIN_SUCCESS) {
    console.log("reducer_login", action.data);
    return {
      ...state,
      user: action.data.user,
      error: null,
    };
  }
  if (action.type === LOGIN_FAILURE) {
    return {
      ...state,
      user: {},
      error: true,
    };
  }
  return state;
}

export default reducer_login;
