import axios from 'axios';
import { LOGIN_SUCCESS, LOGIN_FAIL, REGISTER_SUCCESS, REGISTER_FAIL } from './types';

export const login = (formData) => async (dispatch) => {
  try {
    const res = await axios.post('http://localhost:5000/api/auth/login', formData);
    const { token } = res.data;
    localStorage.setItem('token', token); // Store token in localStorage
    dispatch({ type: LOGIN_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({ type: LOGIN_FAIL });
  }
};

export const register = (formData) => async (dispatch) => {
  try {
    const res = await axios.post('http://localhost:5000/api/auth/register', formData);
    const { token } = res.data;
    localStorage.setItem('token', token); // Store token in localStorage
    dispatch({ type: REGISTER_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({ type: REGISTER_FAIL });
  }
};
