import comeesyAPI from '../api/comeesy';
import { userTypes } from './types';
import history from '../utils/history/history';
import isTokenExpired from '../utils/helpers/token_validator';

import { setErrors, clearErrors, loadingUI } from './UIActions';

export const login = formData => dispatch => {
  dispatch(loadingUI());

  const userData = {
    email: formData.email || '',
    password: formData.password || '',
  };

  // Make loging request
  comeesyAPI
    .post('/auth/login', userData)
    .then(res => {
      const token = `Bearer ${res.data.token}`;
      // Save id token to local storage
      localStorage.setItem('token', token);
      dispatch(getUserOwnData(token));
      dispatch(clearErrors());
      history.push('/');
    })
    .catch(err => {
      console.error(err);
      dispatch(setErrors({ form: err.response.data }));
    });
};

export const logout = () => dispatch => {
  // Logout user
  comeesyAPI
    .get('/auth/logout')
    .then(res => {
      // Clear token and unauthenticate user
      window.localStorage.removeItem('token');
      dispatch({ type: userTypes.SET_UNAUTHENTICATED });
      dispatch(clearErrors());
      history.push('/');
    })
    .catch(err => {
      console.error(err);
    });
};

export const signup = formData => dispatch => {
  dispatch(loadingUI());

  const userData = {
    name: formData.name || '',
    username: formData.username || '',
    email: formData.email || '',
    password: formData.password || '',
    confirmPassword: formData.confirmPassword || '',
  };

  // Make signup request
  comeesyAPI
    .post('/auth/signup', userData)
    .then(res => {
      const token = `Bearer ${res.data.token}`;
      // Save id token to local storage
      localStorage.setItem('token', token);
      dispatch(getUserOwnData(token));
      dispatch(clearErrors());
      history.push('/');
    })
    .catch(err => {
      console.error(err);
      dispatch(setErrors({ form: err.response.data }));
    });
};

export const getUserOwnData = () => dispatch => {
  const { token } = window.localStorage;
  console.log(isTokenExpired(token));
  if (isTokenExpired(token)) return dispatch(logout());

  dispatch({ type: userTypes.LOADING_USER });
  comeesyAPI
    .get('/user', { headers: { Authorization: token } })
    .then(res => {
      dispatch({ type: userTypes.SET_USER, payload: res.data });
      dispatch({ type: userTypes.SET_AUTHENTICATED });
    })
    .catch(err => {
      console.error(err);
    });
};
