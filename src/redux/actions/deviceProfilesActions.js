import { SET_DEVICES, SET_LOADING, SET_ERROR, SET_DEVICE_AS_DEFAULT } from "./types";
import axios from 'axios';


export const setDevices = (devices) => {
  return {
    type: SET_DEVICES,
    payload: devices,
  };
};

export const setLoading = (isLoading) => {
  return {
    type: SET_LOADING,
    payload: isLoading,
  };
};

export const setError = (error) => {
  return {
    type: SET_ERROR,
    payload: error,
  };
};

export const getDevices = (authToken) => {
    return (dispatch) => {
      dispatch(setLoading(true)); // Dispatch the setLoading action to set loading to true before the API call
  
      axios
        .get(`https://localhost:1100/api/deviceProfiles?pageSize=5&page=0`, {
          headers: {
            Accept: 'application/json',
            'X-Authorization': `Bearer ${authToken}`,
          },
        })
        .then((response) => {
          if (response.data.data && response.data.data.length > 0) {
          
            dispatch(setDevices(response.data.data)); // Dispatch the setDevices action to update the Redux state with fetched devices
          } else {
            console.log('No devices found');
          }
          dispatch(setLoading(false)); // Dispatch the setLoading action to set loading to false after the API call
        })
        .catch((error) => {
          dispatch(setError(error)); // Dispatch the setError action to store the error in the Redux state
          dispatch(setLoading(false)); // Dispatch the setLoading action to set loading to false in case of an error
        });
    };
  };

  export const setDeviceAsDefault = (deviceid, authToken) => async (dispatch) => {
    try {
      const response = await fetch(`https://localhost:1100/api/deviceProfile/${deviceid}/default`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': `Bearer ${authToken}`  
        }
      });
  
      if (response.ok) {
        // Dispatch the action to update the state in the reducer
        dispatch({
          type: SET_DEVICE_AS_DEFAULT,
          payload: { id: deviceid, default: true } // Include deviceid and default: true in the payload
        });
      } else {
        console.log('Error setting device as default');
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  