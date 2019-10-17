import comeesyAPI from '../api/comeesy';
import { userTypes } from './types';
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
  const { token } = window.localStorage;
  if (!token) return null;
  comeesyAPI
    .get('/logout', { headers: { Authorization: token } })
    .then(res => {
      console.log(res.data.message);
      // Delete token from local storage
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
      dispatch(getUserOwnData(token));
      dispatch(clearErrors());
      history.push('/');
    })
    .catch(err => {
      console.error(err);
      dispatch(setErrors({ form: err.response.data }));
    });
};

export const getUserOwnData = token => dispatch => {
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
