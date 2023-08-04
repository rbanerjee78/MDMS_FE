// src/redux/reducers/userReducer.js
import { FETCH_USERS_SUCCESS, DELETE_USER_SUCCESS, UPDATE_USER_SUCCESS, UPDATE_USER_FAILURE, UPDATE_USER_FIELD } from '../actions/types';

const initialState = {
  users: [],
  userById: {},
  loading: false,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
      };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        users: state.users.filter((user) => user.id.id !== action.payload),
      };

    case UPDATE_USER_SUCCESS:
      const updatedUsers = state.users.map((user) =>
        user.id.id === action.payload.id ? action.payload : user
      );
      return {
        ...state,
        users: updatedUsers,
        loading: false,
        error: null,
      };
    case UPDATE_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_USER_FIELD:
      return {
        ...state,
        userById: {
          ...state.userById,
          [action.payload.field]: action.payload.value,
        },
      };

    default:
      return state;
  }
};

export default userReducer;
