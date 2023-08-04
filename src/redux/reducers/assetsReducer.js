// assetsReducer.js

import { FETCH_ASSETS_SUCCESS, DELETE_ASSET_SUCCESS } from '../actions/types';

const initialState = {
  assets: [],
};

const assetsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ASSETS_SUCCESS:
      return {
        ...state,
        assets: action.payload,
      };
    case DELETE_ASSET_SUCCESS:
      return {
        ...state,
        assets: state.assets.filter((asset) => asset.id.id !== action.payload),
      };
    default:
      return state;
  }
};

export default assetsReducer;
