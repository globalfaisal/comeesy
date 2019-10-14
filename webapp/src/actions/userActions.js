import comeesyAPI from '../api/comeesy';
import { userTypes, uiTypes } from './types';
import history from '../utils/history/history';

import { setErrors, clearErrors, loadingUI } from './UIActions';

export const login = formData => dispatch => {
  dispatch(loadingUI());

  const userData = {
    email: formData.email || '',
    password: formData.password || '',
  };

  // Make loging request
  comeesyAPI
    .post('/login', userData)
    .then(res => {
      const token = `Bearer ${res.data.token}`;
      // Save id token to local storage
      localStorage.setItem('token', token);
      dispatch(getUserData(token));
      dispatch(clearErrors());
      history.push('/');
    })
    .catch(err => {
      console.error(err);
      dispatch(setErrors({ form: err.response.data }));
    });
};

export const signup = formData => dispatch => {
  dispatch({ type: uiTypes.LOADING_UI });

  const userData = {
    email: formData.email || '',
    password: formData.password || '',
    confirmPassword: formData.confirmPassword || '',
    username: formData.username || '',
    firstname: formData.firstname || '',
    lastname: formData.lastname || '',
  };

  // Make signup request
  comeesyAPI
    .post('/signup', userData)
    .then(res => {
      const token = `Bearer ${res.data.token}`;
      // Save id token to local storage
      localStorage.setItem('token', token);
      dispatch(getUserData(token));
      dispatch(clearErrors());
      history.push('/');
    })
    .catch(err => {
      console.error(err);
      dispatch(setErrors({ form: err.response.data }));
    });
};

export const getUserData = token => dispatch => {
  comeesyAPI
    .get('/user', { headers: { Authorization: token } })
    .then(res => {
      dispatch({ type: userTypes.SET_USER, payload: res.data });
    })
    .catch(err => {
      console.error(err);
    });
};

export const logout = () => dispatch => {
  // Delete token from local storage
  window.localStorage.removeItem('token');
  dispatch({ type: userTypes.SET_UNAUTHENTICATED });
  history.push('/auth/login');
};
