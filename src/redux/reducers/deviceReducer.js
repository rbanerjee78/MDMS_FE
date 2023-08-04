// deviceReducer.js

const initialState = {
    devices: [],
    loading: false,
    error: null,
  };
  
  const deviceReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_DEVICES_REQUEST':
        return {
          ...state,
          loading: true,
        };
      case 'FETCH_DEVICES_SUCCESS':
        return {
          ...state,
          loading: false,
          devices: action.payload,
          error: null,
        };
      case 'FETCH_DEVICES_FAILURE':
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default deviceReducer;
  