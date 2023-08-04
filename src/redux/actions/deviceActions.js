
import { FETCH_DEVICES_SUCCESS, FETCH_DEVICES_REQUEST, FETCH_DEVICES_FAILURE } from './types';
import axios from 'axios';

export const fetchDevicesRequest = () => ({
  type: FETCH_DEVICES_REQUEST,
});

export const fetchDevicesSuccess = (devices) => ({
  type: FETCH_DEVICES_SUCCESS,
  payload: devices,
});

export const fetchDevicesFailure = (error) => ({
  type: FETCH_DEVICES_FAILURE,
  payload: error,
});


export const assignDevice = (customerId, deviceId) => async (dispatch) => {
    try {
      const authToken = localStorage.getItem('authToken');
      const headers = {
        'Content-Type': 'application/json',
        'X-Authorization': `Bearer ${authToken}`,
        'Accept': '*/*',
      };
  
      const url = `https://localhost:1100/api/customer/${customerId}/device/${deviceId}/`;
      const response = await axios.post(url, {}, { headers });
  
      const data = response.data;
  
  
      return data;
    } catch (error) {
      throw error;
    }
  };