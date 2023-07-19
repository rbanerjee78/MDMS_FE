// src/redux/reducers/authReducer.js
import { LOGIN_SUCCESS, LOGIN_FAILURE } from "../actions/types";

const initialState = {
  authToken: null,
  refreshToken: null,
  loginResponse: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        authToken: action.payload.authToken,
        refreshToken: action.payload.refreshToken,
        loginResponse: true,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        authToken: null,
        refreshToken: null,
        loginResponse: false,
      };
    default:
      return state;
  }
};

export default authReducer;
