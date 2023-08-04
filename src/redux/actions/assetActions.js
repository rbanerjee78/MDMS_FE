// actions.js

import axios from 'axios';
import { FETCH_ASSETS_SUCCESS, DELETE_ASSET_SUCCESS } from './types';

export const fetchAssets = () => async (dispatch) => {
  try {
    const authToken = localStorage.getItem('authToken');

    const response = await axios.get('https://localhost:1100/GetAllAssetDetails', {
      headers: {
        'Authorization': `Bearer ${authToken}`,
      },
    });

    dispatch({
      type: FETCH_ASSETS_SUCCESS,
      payload: response.data.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteAsset = (id) => async (dispatch) => {
  try {
    const authToken = localStorage.getItem('authToken');

    await axios.delete('https://localhost:1100/DeleteAssetDetail', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
      data: { id: id },
    });

    dispatch({
      type: DELETE_ASSET_SUCCESS,
      payload: id,
    });
  } catch (error) {
    console.error(error.message);
  }
};
