import comeesyAPI from '../api/comeesy';
import history from '../utils/history';
import { userTypes } from './types';
import { openModal, closeModal } from './UIActions';
import Login from '../pages/Login/Login';

import {
  storeToken,
  clearToken,
  getStoredToken,
  validateToken,
} from '../utils/helperFns';

const loadingUser = () => ({
  type: userTypes.LOADING_USER,
});

const userAuthSuccess = () => ({
  type: userTypes.USER_AUTH_SUCCESS,
});
const userAuthFailed = error => ({
  type: userTypes.USER_AUTH_FAILED,
  payload: error,
});

const updateUserDataSuccess = () => ({
  type: userTypes.UPDATE_USER_DATA_SUCCESS,
});

const updateUserDataFailed = error => ({
  type: userTypes.UPDATE_USER_DATA_FAILED,
  payload: error,
});

export const login = data => dispatch =>
  new Promise((resolve, reject) => {
    dispatch(loadingUser());

    comeesyAPI
      .post('/auth/login', data)
      .then(res => {
        resolve();
        const idToken = `Bearer ${res.data.idToken}`;
        storeToken(idToken);
        dispatch(userAuthSuccess());
        dispatch(getUserOwnData());
        dispatch(closeModal());
        if (history.location.pathname === '/auth/login') {
          history.push('/');
        }
      })
      .catch(error => {
        console.error(error.response);
        dispatch(userAuthFailed(error.response.data));
        if (error.response) reject(error.response.data);
        else reject(new Error('Something went wrong'));
      });
  });

export const signup = data => dispatch =>
  new Promise((resolve, reject) => {
    dispatch(loadingUser());

    comeesyAPI
      .post('/auth/signup', data)
      .then(res => {
        resolve();
        const idToken = `Bearer ${res.data.idToken}`;
        storeToken(idToken);
        dispatch(userAuthSuccess());
        dispatch(getUserOwnData());
        if (history.location.pathname === '/auth/login') {
          history.push('/');
        }
      })
      .catch(error => {
        console.error(error);
        dispatch(userAuthFailed(error.response.data));
        if (error.response) reject(error.response.data);
        else reject(new Error('Something went wrong'));
      });
  });

export const logout = () => dispatch =>
  new Promise((resolve, reject) => {
    dispatch(loadingUser());
    comeesyAPI
      .get('/auth/logout')
      .then(res => {
        resolve();
        clearToken();
        dispatch({ type: userTypes.LOGOUT });
        dispatch(openModal(Login));
      })
      .catch(error => {
        console.error(error);
        clearToken();
        dispatch({ type: userTypes.LOGOUT });
        history.push('/');
        if (error.response) reject(error.response.data);
        else reject(new Error('Something went wrong'));
      });
  });

export const getUserOwnData = () => dispatch =>
  new Promise(async (resolve, reject) => {
    try {
      const token = getStoredToken();
      await checkUserAuthorization(dispatch);

      dispatch(loadingUser());

      const response = await comeesyAPI.get('/user', {
        headers: { Authorization: token },
      });

      resolve(response.data);
      dispatch(userAuthSuccess());
      dispatch({
        type: userTypes.GET_USER_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      console.error(error);
      dispatch({
        type: userTypes.GET_USER_FAILED,
        payload: error.response,
      });
      if (error.response) reject(error.response.data);
    }
  });

export const updateUserDetails = data => dispatch =>
  new Promise(async (resolve, reject) => {
    try {
      const token = getStoredToken();
      await checkUserAuthorization(dispatch);

      dispatch(loadingUser());

      const response = await comeesyAPI.post('/user/details', data, {
        headers: { Authorization: token },
      });

      resolve(response.data);
      dispatch(updateUserDataSuccess());
      dispatch(getUserOwnData());
    } catch (error) {
      console.error(error);
      dispatch(updateUserDataFailed(error.response.data));
      if (error.response) reject(error.response.data);
      else reject(new Error('Something went wrong'));
    }
  });

export const updateUserCredentials = data => dispatch =>
  new Promise(async (resolve, reject) => {
    try {
      const token = getStoredToken();
      await checkUserAuthorization(dispatch);

      dispatch(loadingUser());

      const response = await comeesyAPI.post('/user/credentials', data, {
        headers: { Authorization: token },
      });
      resolve(response.data);
      dispatch(updateUserDataSuccess());
      dispatch(getUserOwnData());
    } catch (error) {
      console.error(error);
      dispatch(updateUserDataFailed(error.response.data));
      if (error.response) reject(error.response.data);
      else reject(new Error('Something went wrong'));
    }
  });

export const uploadUserAvatar = formData => dispatch =>
  new Promise(async (resolve, reject) => {
    try {
      const token = getStoredToken();
      await checkUserAuthorization(dispatch);

      dispatch(loadingUser());

      const response = await comeesyAPI.post('/user/avatar', formData, {
        headers: { Authorization: token },
      });

      resolve(response.data);
      dispatch(updateUserDataSuccess());
      dispatch(getUserOwnData());
    } catch (error) {
      console.error(error.response);
      dispatch(updateUserDataFailed(error.response.data));
      if (error.response) reject(error.response.data);
      else reject(new Error('Something went wrong'));
    }
  });

export const checkUserAuthorization = dispatch =>
  new Promise((resolve, reject) => {
    const token = getStoredToken();
    if (!token || !validateToken(token)) {
      dispatch(logout());
      throw new Error('Authorization failed. You need to login again.');
    }
    resolve();
  });
