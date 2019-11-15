import comeesyAPI from '../api/comeesy';
import { userTypes } from './types';
import history from '../utils/history';
import { isTokenExpired } from '../utils/helperFns';

import {
  setError,
  clearError,
  loadingUI,
  loadingUIFinished,
} from './UIActions';

export const login = formData => dispatch => {
  const userData = {
    email: formData.email || '',
    password: formData.password || '',
  };

  dispatch(loadingUI());
  dispatch(clearError('auth'));
  // Make loging request
  comeesyAPI
    .post('/auth/login', userData)
    .then(res => {
      const token = `Bearer ${res.data.token}`;
      // Save id token to local storage
      localStorage.setItem('token', token);
      dispatch(getUserOwnData());
      dispatch(clearError('auth'));
      dispatch(loadingUIFinished());
      history.push('/');
    })
    .catch(err => {
      console.error(err);
      dispatch(setError({ type: 'auth', data: err.response.data }));
    });
};

export const logout = () => dispatch => {
  dispatch(loadingUI());

  // Logout user
  comeesyAPI
    .get('/auth/logout')
    .then(res => {
      // Clear token and unauthenticate user
      window.localStorage.removeItem('token');
      dispatch({ type: userTypes.SET_UNAUTHENTICATED });
      dispatch(loadingUIFinished());
      history.push('/');
    })
    .catch(err => {
      console.error(err);
    });
};

export const signup = formData => dispatch => {
  const userData = {
    name: formData.name || '',
    username: formData.username || '',
    email: formData.email || '',
    password: formData.password || '',
    confirmPassword: formData.confirmPassword || '',
  };

  dispatch(loadingUI());
  dispatch(clearError('auth'));
  // Make signup request
  comeesyAPI
    .post('/auth/signup', userData)
    .then(res => {
      const token = `Bearer ${res.data.token}`;
      // Save id token to local storage
      localStorage.setItem('token', token);
      dispatch(getUserOwnData());
      dispatch(clearError('auth'));
      dispatch(loadingUIFinished());

      history.push('/');
    })
    .catch(err => {
      console.error(err);
      dispatch(setError({ type: 'auth', data: err.response.data }));
    });
};

export const getUserOwnData = () => dispatch => {
  const { token } = window.localStorage;
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

export const updateUserProfile = data => dispatch => {
  const { token } = window.localStorage;
  if (isTokenExpired(token)) return dispatch(logout());

  dispatch(loadingUI());
  dispatch(clearError('settings'));

  comeesyAPI
    .post('/user/profile', data, {
      headers: { Authorization: token },
    })
    .then(res => {
      console.log(res.data);
      dispatch(getUserOwnData());
      dispatch(clearError('settings'));
      dispatch(loadingUIFinished());
    })
    .catch(err => {
      console.error(err);
      dispatch(setError({ type: 'settings', data: err.response.data }));
    });
};

export const updateUserCredentials = data => dispatch => {
  const { token } = window.localStorage;
  if (isTokenExpired(token)) return dispatch(logout());

  dispatch(loadingUI());
  dispatch(clearError('settings'));

  comeesyAPI
    .post('/user/credentials', data, {
      headers: { Authorization: token },
    })
    .then(res => {
      console.log(res.data);
      dispatch(getUserOwnData());
      dispatch(clearError('settings'));
      dispatch(loadingUIFinished());
    })
    .catch(err => {
      console.error(err);
      dispatch(setError({ type: 'settings', data: err.response.data }));
    });
};

export const uploadUserAvatar = file => dispatch => {
  const { token } = window.localStorage;
  if (isTokenExpired(token)) return dispatch(logout());

  dispatch({ type: userTypes.LOADING_USER });
  dispatch(clearError('upload'));

  const formData = new FormData();
  formData.append('file', file);

  comeesyAPI
    .post('/user/avatar', formData, {
      headers: { Authorization: token },
    })
    .then(res => {
      console.log(res.data);
      dispatch(getUserOwnData());
      dispatch(clearError('upload'));
    })
    .catch(err => {
      console.error(err.response.data);
      dispatch(setError({ type: 'upload', data: err.response.data }));
    });
};
