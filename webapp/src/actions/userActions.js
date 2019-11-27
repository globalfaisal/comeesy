import comeesyAPI from '../api/comeesy';
import { userTypes } from './types';
import history from '../utils/history';
import {
  storeToken,
  clearToken,
  getStoredToken,
  validateToken,
} from '../utils/helperFns';

const userLoading = () => ({
  type: userTypes.USER_LOADING,
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
    dispatch(userLoading());

    comeesyAPI
      .post('/auth/login', data)
      .then(res => {
        resolve();
        const idToken = `Bearer ${res.data.idToken}`;
        storeToken(idToken);
        dispatch(userAuthSuccess());
        dispatch(getUserOwnData());
        history.push('/');
      })
      .catch(err => {
        console.error(err.response);
        dispatch(userAuthFailed(err.response.data));
        reject(err.response);
      });
  });

export const signup = data => dispatch =>
  new Promise((resolve, reject) => {
    dispatch(userLoading());

    comeesyAPI
      .post('/auth/signup', data)
      .then(res => {
        resolve();
        const idToken = `Bearer ${res.data.idToken}`;
        storeToken(idToken);
        dispatch(userAuthSuccess());
        dispatch(getUserOwnData());
        history.push('/');
      })
      .catch(err => {
        console.error(err);
        dispatch(userAuthFailed(err.response.data));
        reject(err.response);
      });
  });

export const logout = () => dispatch =>
  new Promise((resolve, reject) => {
    dispatch(userLoading());
    comeesyAPI
      .get('/auth/logout')
      .then(res => {
        resolve();
        clearToken();
        dispatch({ type: userTypes.LOGOUT });
        history.push('/');
      })
      .catch(err => {
        console.error(err);
        clearToken();
        dispatch({ type: userTypes.LOGOUT });
        history.push('/');
        reject(err.response);
      });
  });

export const getUserOwnData = () => dispatch =>
  new Promise(async (resolve, reject) => {
    try {
      const token = getStoredToken();
      await checkUserAuthorization(dispatch);

      dispatch(userLoading());

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
      // only throw errors from http request
      if (error.response) reject(error.response);
    }
  });

export const updateUserDetails = data => dispatch =>
  new Promise(async (resolve, reject) => {
    try {
      const token = getStoredToken();
      await checkUserAuthorization(dispatch);

      dispatch(userLoading());

      const response = await comeesyAPI.post('/user/details', data, {
        headers: { Authorization: token },
      });

      resolve(response.data);
      dispatch(updateUserDataSuccess());
      dispatch(getUserOwnData());
    } catch (error) {
      console.error(error);
      dispatch(updateUserDataFailed(error.response.data));
      reject(error.response);
    }
  });

export const updateUserCredentials = data => dispatch =>
  new Promise(async (resolve, reject) => {
    try {
      const token = getStoredToken();
      await checkUserAuthorization(dispatch);

      dispatch(userLoading());

      const response = await comeesyAPI.post('/user/credentials', data, {
        headers: { Authorization: token },
      });
      resolve(response.data);
      dispatch(updateUserDataSuccess());
      dispatch(getUserOwnData());
    } catch (error) {
      console.error(error);
      dispatch(updateUserDataFailed(error.response.data));
      reject(error.response);
    }
  });

export const uploadUserAvatar = formData => dispatch =>
  new Promise(async (resolve, reject) => {
    try {
      const token = getStoredToken();
      await checkUserAuthorization(dispatch);

      dispatch(userLoading());

      const response = await comeesyAPI.post('/user/avatar', formData, {
        headers: { Authorization: token },
      });

      resolve(response.data);
      dispatch(updateUserDataSuccess());
      dispatch(getUserOwnData());
    } catch (error) {
      console.error(error.response);
      dispatch(updateUserDataFailed(error.response.data));
      reject(error.response.data);
    }
  });

const checkUserAuthorization = dispatch =>
  new Promise((resolve, reject) => {
    const token = getStoredToken();
    if (!token || !validateToken(token)) {
      dispatch(logout());
      throw new Error('Authorization failed. You need to login again.');
    }
    resolve();
  });
