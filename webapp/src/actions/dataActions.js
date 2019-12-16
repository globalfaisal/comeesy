import comeesyAPI from '../api/comeesy';
import { dataTypes } from './types';
import { hasAuthorization } from './userActions';
import { getStoredToken } from '../utils/helperFns';
import { openModal } from './UIActions';
import Login from '../pages/Login/Login';

export const loadingData = () => ({ type: dataTypes.LOADING_DATA });

export const getPosts = () => dispatch =>
  new Promise(async (resolve, reject) => {
    dispatch(loadingData());
    comeesyAPI
      .get('/posts')
      .then(response => {
        resolve();
        dispatch({
          type: dataTypes.SET_POSTS,
          payload: response.data,
        });
      })
      .catch(error => {
        console.error(error);
        dispatch({
          type: dataTypes.SET_POSTS,
          payload: [],
        });
        if (error.response) reject(error.response.data);
        else reject(new Error('Something went wrong'));
      });
  });

export const getPost = postId => dispatch =>
  new Promise(async (resolve, reject) => {
    dispatch(loadingData());
    comeesyAPI
      .get(`/post/${postId}`)
      .then(response => {
        resolve();
        dispatch({
          type: dataTypes.SET_POST,
          payload: response.data,
        });
      })
      .catch(error => {
        console.error(error);
        dispatch({ type: dataTypes.SET_POST, payload: null });
        reject(new Error('Something went wrong'));
      });
  });

export const like = postId => dispatch =>
  new Promise(async (resolve, reject) => {
    try {
      const token = getStoredToken();
      if (!hasAuthorization(dispatch)) {
        return dispatch(openModal(Login));
      }

      const response = await comeesyAPI.post(`/post/${postId}/like`, null, {
        headers: { Authorization: token },
      });

      dispatch({
        type: dataTypes.LIKE_POST,
        payload: response.data,
      });

      resolve();
    } catch (error) {
      console.error(error);
      reject();
    }
  });

export const unlike = postId => dispatch =>
  new Promise(async (resolve, reject) => {
    try {
      const token = getStoredToken();
      if (!hasAuthorization(dispatch)) {
        return dispatch(openModal(Login));
      }

      const response = await comeesyAPI.post(`/post/${postId}/unlike`, null, {
        headers: { Authorization: token },
      });

      dispatch({
        type: dataTypes.UNLIKE_POST,
        payload: response.data,
      });

      resolve();
    } catch (error) {
      console.error(error);
      reject();
    }
  });

export const getProfile = username => dispatch =>
  new Promise(async (resolve, reject) => {
    dispatch(loadingData());
    comeesyAPI
      .get(`/user/${username}`)
      .then(res => {
        dispatch({
          type: dataTypes.SET_PROFILE,
          payload: res.data,
        });
      })
      .catch(error => {
        console.error(error);
        dispatch({
          type: dataTypes.SET_PROFILE,
          payload: null,
        });
        reject(new Error('Something went wrong'));
      });
  });
  
export const submitComment = (postId, body) => dispatch =>
  new Promise(async (resolve, reject) => {
    try {
      const token = getStoredToken();
      if (!hasAuthorization(dispatch)) {
        return dispatch(openModal(Login));
      }

      const response = await comeesyAPI.post(
        `/post/${postId}/comment`,
        { body },
        {
          headers: { Authorization: token },
        }
      );
    } catch (error) {
      console.error(error);
      reject(new Error('Something went wrong. Please try again'));
    }
  });
