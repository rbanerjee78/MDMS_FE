// src/redux/reducers/index.js
import { combineReducers } from "redux";
import authReducer from "./authReducer";
import dashboardReducer from './dashboardReducer';
import devicesProfilesReducer from "./deviceProfilesReducer";


const rootReducer = combineReducers({
  auth: authReducer,
  dashboard: dashboardReducer,
  deviceprofiles:devicesProfilesReducer
  
});

export default rootReducer;
