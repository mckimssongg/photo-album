import {
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_REQUEST,
} from "../constants/index";

const loginSuccess = (data) => {
  localStorage.setItem("dataSesion", JSON.stringify(data));
  return {
    type: LOGIN_SUCCESS,
    data: data,
  };
};

const loginFailure = (data) => {
  delete localStorage.dataSesion;
  return {
    type: LOGIN_FAILURE,
    data: data,
  };
};

export { loginSuccess, loginFailure };
