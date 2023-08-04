// src/redux/reducers/index.js
import { combineReducers } from "redux";
import authReducer from "./authReducer";
import dashboardReducer from './dashboardReducer';
import devicesProfilesReducer from "./deviceProfilesReducer";
import assetsReducer from './assetsReducer'; 
import userReducer from './userReducer'; 
import deviceReducer from './deviceReducer';



const rootReducer = combineReducers({
  auth: authReducer,
  dashboard: dashboardReducer,
  deviceprofiles:devicesProfilesReducer,
  assets : assetsReducer,
  users: userReducer,
  devices: deviceReducer,
  
});

export default rootReducer;
