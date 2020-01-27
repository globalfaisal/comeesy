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

export const userAuthSuccess = idToken => dispatch => {
  storeToken(`Bearer ${idToken}`);
  dispatch(getUserOwnData());
  dispatch({
    type: userTypes.USER_AUTH_SUCCESS,
  });
};

export const userAuthFailed = error => ({
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

export const login = ({ email, password }) => (
  dispatch,
  getState,
  getFirebase
) =>
  new Promise((resolve, reject) => {
    dispatch(loadingUser());

    // Sign-in user in with email and password.
    const firebase = getFirebase();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(async ({ user }) => {
        // Get the user's ID token.
        const idToken = await user.getIdToken();
        dispatch(userAuthSuccess(idToken));
        if (history.location.pathname === '/auth/login') {
          history.push('/');
        }
        resolve();
      })
      .catch(err => {
        if (err.code === 'auth/user-not-found') {
          return dispatch(
            userAuthFailed({
              email:
                "This account doesn't exist. Enter different account or Create one",
            })
          );
        }

        if (err.code === 'auth/wrong-password') {
          return dispatch(
            userAuthFailed({ password: 'Wrong password. Please try again' })
          );
        }
        if (err.code === 'auth/user-disabled') {
          return dispatch(
            userAuthFailed({ account: 'The user account has been disabled.' })
          );
        }

        dispatch(userAuthFailed(null));
        reject(new Error('Something went wrong, please try again'));
      });
  });

export const signup = data => dispatch =>
  new Promise((resolve, reject) => {
    dispatch(loadingUser());

    comeesyAPI
      .post('/auth/signup', data)
      .then(() => {
        dispatch(login(data));
        if (history.location.pathname === '/auth/signup') {
          history.push('/');
        }
        resolve();
      })
      .catch(error => {
        console.error(error);
        if (error.response) dispatch(userAuthFailed(error.response.data));
        else {
          dispatch(userAuthFailed(null));
          reject(new Error('Something went wrong, please try again'));
        }
      });
  });

// Signout user.
export const logout = () => (dispatch, getState, getFirebase) =>
  new Promise((resolve, reject) => {
    dispatch(loadingUser());
    const firebase = getFirebase();
    firebase
      .auth()
      .signOut()
      .then(() => {
        clearToken();
        dispatch({ type: userTypes.LOGOUT });
        resolve();
      })
      .catch(error => {
        console.error(error);
        clearToken();
        dispatch({ type: userTypes.LOGOUT });
        history.push('/');
        reject();
      });
  });

export const getUserOwnData = () => dispatch =>
  new Promise(async (resolve, reject) => {
    try {
      const token = getStoredToken();

      dispatch(loadingUser());

      const response = await comeesyAPI.get('/user', {
        headers: { Authorization: token },
      });

      resolve(response.data);
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
      if (!hasAuthorization(dispatch)) {
        return dispatch(openModal(Login));
      }

      dispatch(loadingUser());

      const response = await comeesyAPI.post('/user/details', data, {
        headers: { Authorization: token },
      });

      resolve(response.data);
      dispatch(updateUserDataSuccess());
      dispatch(getUserOwnData());
    } catch (error) {
      console.error(error);
      if (error.response) {
        dispatch(updateUserDataFailed(error.response.data));
      } else reject(new Error('Something went wrong. Please try again'));
    }
  });

export const updateUserCredentials = data => dispatch =>
  new Promise(async (resolve, reject) => {
    try {
      const token = getStoredToken();
      if (!hasAuthorization(dispatch)) {
        return dispatch(openModal(Login));
      }

      dispatch(loadingUser());

      const response = await comeesyAPI.post('/user/credentials', data, {
        headers: { Authorization: token },
      });
      resolve(response.data);
      dispatch(updateUserDataSuccess());
      dispatch(getUserOwnData());
    } catch (error) {
      console.error(error);
      if (error.response) {
        dispatch(updateUserDataFailed(error.response.data));
        reject(error.response.data);
      } else reject(new Error('Something went wrong. Please try again'));
    }
  });

export const uploadUserAvatar = formData => dispatch =>
  new Promise(async (resolve, reject) => {
    try {
      const token = getStoredToken();
      if (!hasAuthorization(dispatch)) {
        return dispatch(openModal(Login));
      }

      dispatch(loadingUser());

      const response = await comeesyAPI.post('/user/avatar', formData, {
        headers: { Authorization: token },
      });

      resolve(response.data);
      dispatch(updateUserDataSuccess());
      dispatch(getUserOwnData());
    } catch (error) {
      console.error(error.response);
      if (error.response) {
        dispatch(updateUserDataFailed(error.response.data));
        reject(error.response.data);
      } else reject(new Error('Something went wrong. Please try again'));
    }
  });

export const markNotificationsRead = notificationIds => dispatch =>
  new Promise(async (resolve, reject) => {
    try {
      const token = getStoredToken();
      if (!hasAuthorization(dispatch)) {
        return dispatch(openModal(Login));
      }

      const response = await comeesyAPI.post(
        '/notifications/markRead',
        notificationIds,
        {
          headers: { Authorization: token },
        }
      );

      dispatch({
        type: userTypes.MARK_NOTIFICATIONS_READ,
        payload: response.data,
      });

      resolve();
    } catch (error) {
      console.error(error);
      reject();
    }
  });

export const hasAuthorization = dispatch => {
  const token = getStoredToken();
  if (!token || !validateToken(token)) {
    if (dispatch) dispatch(logout());
    return false;
  }
  return true;
};
