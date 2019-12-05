import comeesyAPI from '../api/comeesy';
import { dataTypes } from './types';
import { checkUserAuthorization } from './userActions';
import { getStoredToken } from '../utils/helperFns';

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

export const like = postId => dispatch =>
  new Promise(async (resolve, reject) => {
    try {
      const token = getStoredToken();
      await checkUserAuthorization(dispatch);

      // dispatch(loadingUI());

      const response = await comeesyAPI.post(`/post/${postId}/like`, null, {
        headers: { Authorization: token },
      });

      dispatch({
        type: dataTypes.LIKE_POST,
        payload: response.data,
      });

      resolve();
      // dispatch(loadingUIFinished());
    } catch (error) {
      console.error(error);
      // dispatch(loadingUIFinished());
      reject();
    }
  });

export const unlike = postId => dispatch =>
  new Promise(async (resolve, reject) => {
    try {
      const token = getStoredToken();
      await checkUserAuthorization(dispatch);

      // dispatch(loadingUI());

      const response = await comeesyAPI.post(`/post/${postId}/unlike`, null, {
        headers: { Authorization: token },
      });

      dispatch({
        type: dataTypes.UNLIKE_POST,
        payload: response.data,
      });

      resolve();
      // dispatch(loadingUIFinished());
    } catch (error) {
      console.error(error);
      // dispatch(loadingUIFinished());
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
