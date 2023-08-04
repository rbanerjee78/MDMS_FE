import axios from 'axios';
import { FETCH_USERS_SUCCESS, DELETE_USER_SUCCESS, UPDATE_USER_SUCCESS, UPDATE_USER_FAILURE, UPDATE_USER_FIELD } from './types';


export const fetchUsersSuccess = (users) => ({
    type: FETCH_USERS_SUCCESS,
    payload: users,
  });
  
  export const deleteUserSuccess = (userId) => ({
    type: DELETE_USER_SUCCESS,
    payload: userId,
  });
  
  
  export const fetchUsers = () => async (dispatch) => {
    try {
      const authToken = localStorage.getItem('authToken');
      const config = {
        headers: {
          Accept: '*/*',
          'X-Authorization': `Bearer ${authToken}`,
        },
        params: {
          pageSize: 10,
          page: 0,
        },
      };
      const response = await axios.get('https://localhost:1100/api/customers', config);
      dispatch(fetchUsersSuccess(response.data.data));
      console.log(response.data)
    } catch (error) {
      console.error(error.response.status, error.response.data.message);
    }
  };
  
  export const deleteUser = (userId) => async (dispatch) => {
    // Delete user and dispatch the DELETE_USER_SUCCESS action
    try {
      const authToken = localStorage.getItem('authToken');
      const headers = {
        'Content-Type': 'application/json',
        'X-Authorization': `Bearer ${authToken}`,
      };
      const response = await fetch(`https://localhost:1100/api/customer/${userId.id}`, {
        method: 'DELETE',
        headers: headers,
        body: JSON.stringify({ id: userId.id }),
      });
  
      if (response.ok) {
        dispatch(deleteUserSuccess(userId.id));
        console.log('user deleted successfully');
      } else {
        throw new Error('Failed to delete user');
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  export const updateUserField = (field, value) => ({
  type: UPDATE_USER_FIELD,
  payload: { field, value },
});
  

  export const updateUser = (userId, userCity, userState, userCountry, userTitle, userZip, userAddress) => {
    return async (dispatch) => {
      try {
        // Make the API call to update the user on the server
        const authToken = localStorage.getItem('authToken');
        const response = await axios.put(
          `https://localhost:1100/api/customer`,
          {
            id: userId,
            title: userTitle,
            city: userCity,
            state: userState,
            country: userCountry,
            zip: userZip,
            address: userAddress,
            tenantId: {
              entityType: 'TENANT',
              id: '08fd5e60-c400-11ed-b62c-7d8052ad39cf',
            },
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'X-Authorization': `Bearer ${authToken}`,
            },
          }
        );
  
        dispatch({
          type: UPDATE_USER_SUCCESS,
          payload: response.data, 
        });
      } catch (error) {
        console.error(error);
       
        dispatch({
          type: UPDATE_USER_FAILURE,
          payload: error.message, 
        });
      }
    };
  };