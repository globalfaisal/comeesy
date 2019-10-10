import axios from 'axios';

import { userTypes } from './types';
import variables from '../config/config';

import history from '../utils/history/history';

const BASE_URL = variables.BASE_API_URL;

const authStart = () => ({ type: userTypes.AUTH_START });
const authSuccess = token => ({
  type: userTypes.AUTH_SUCCESS,
  payload: { token },
});
const authFailure = errors => ({
  type: userTypes.AUTH_FAILURE,
  payload: { errors },
});

export const resetAuthFormErrors = () => ({
  type: userTypes.RESET_AUTH_FORM_ERRORS,
});

export const login = ({ email = '', password = '' }) => dispatch => {
  dispatch(authStart());

  const userData = { email, password };

  // send user data
  axios
    .post(`${BASE_URL}/login`, userData)
    .then(response => {
      const { token } = response.data;
      localStorage.setItem('token', `Bearer ${token}`);
      dispatch(authSuccess(token));
      history.push('/');
    })
    .catch(error => {
      dispatch(authFailure(error.response.data.errors));
    });
};

export const signup = formData => dispatch => {
  dispatch(authStart());

  // send user data
  const userData = {
    email: formData.email || '',
    password: formData.password || '',
    confirmPassword: formData.confirmPassword || '',
    username: formData.username || '',
    firstname: formData.firstname || '',
    lastname: formData.lastname || '',
  };

  // send user data
  axios
    .post(`${BASE_URL}/signup`, userData)
    .then(response => {
      const { token } = response.data;
      localStorage.setItem('token', `Bearer ${token}`);
      dispatch(authSuccess(token));
      history.push('/');
    })
    .catch(error => {
      dispatch(authFailure(error.response.data.errors));
    });
};
