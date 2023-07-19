import { LOGIN_SUCCESS, LOGIN_FAILURE } from "./types";

export const loginSuccess = (authToken, refreshToken) => ({
  type: LOGIN_SUCCESS,
  payload: { authToken, refreshToken },
});

export const loginFailure = () => ({
  type: LOGIN_FAILURE,
});

