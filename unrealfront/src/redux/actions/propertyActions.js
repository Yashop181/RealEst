import axios from 'axios';
import { GET_PROPERTIES, ADD_PROPERTY } from './types';

export const getProperties = () => async (dispatch) => {
  try {
    const res = await axios.get('http://localhost:5000/api/properties');
    dispatch({ type: GET_PROPERTIES, payload: res.data });
  } catch (err) {
    console.error(err);
  }
};

export const addProperty = (formData) => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    console.log("Retrieved Token:", token); // Debugging log
    if (!token) {
      throw new Error('No token found');
    }

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data', // Set content type for form data
        'x-auth-token': token, // Include the token in the headers
      },
    };

    const res = await axios.post('http://localhost:5000/api/properties', formData, config);
    dispatch({ type: ADD_PROPERTY, payload: res.data });
  } catch (err) {
    console.error('Error adding property:', err); // Improved error logging
  }
};
