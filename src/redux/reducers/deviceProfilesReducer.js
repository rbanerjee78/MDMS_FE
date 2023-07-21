// devicesProfilesReducer.js

import { SET_DEVICES, SET_LOADING, SET_ERROR, SET_DEVICE_AS_DEFAULT  } from "../actions/types";

const initialState = {
  devices: [],
  loading: false,
  error: null,
};

const devicesProfilesReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_DEVICES:
        return {
          ...state,
          devices: action.payload,
        };
      case SET_LOADING:
        return {
          ...state,
          loading: action.payload,
        };
      case SET_ERROR:
        return {
          ...state,
          error: action.payload,
        };
      case SET_DEVICE_AS_DEFAULT:
        const { payload } = action;
        return {
          ...state,
          devices: state.devices.map((device) =>
            device.id === payload.id ? { ...device, default: payload.default } : device
          ),
        };
      default:
        return state;
    }
  };
  

export default devicesProfilesReducer;
