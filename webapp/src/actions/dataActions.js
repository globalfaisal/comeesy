import comeesyAPI from '../api/comeesy';
import history from '../utils/history';
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
        dispatch({
          type: dataTypes.SET_POSTS,
          payload: response.data,
        });
      })
      .catch(error => {
        console.log(error);
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
        dispatch({
          type: dataTypes.SET_POST,
          payload: response.data,
        });
      })
      .catch(error => {
        console.log(error);
        dispatch({ type: dataTypes.SET_POST, payload: null });
        reject(new Error('Something went wrong'));
      });
  });
export const getCommentReplies = (postId, commentId) => dispatch =>
  new Promise(async (resolve, reject) => {
    dispatch(loadingData());
    comeesyAPI
      .get(`/post/${postId}/comment/${commentId}/replies`)
      .then(response => {
        dispatch({
          type: dataTypes.SET_COMMENT_REPLIES,
          payload: { postId, replies: response.data },
        });
        resolve(/* GET COMMENT REPLIES SUCCESSFULLY */);
      })
      .catch(error => {
        console.log(error);
        dispatch({ type: dataTypes.SET_COMMENT_REPLIES, payload: null });
        reject(new Error('Something went wrong'));
      });
  });

export const deletePost = postId => dispatch =>
  new Promise(async (resolve, reject) => {
    try {
      const token = getStoredToken();
      if (!hasAuthorization(dispatch)) {
        return dispatch(openModal(Login));
      }

      const response = await comeesyAPI.delete(`/post/${postId}`, {
        headers: { Authorization: token },
      });
      dispatch({
        type: dataTypes.DELETE_POST,
        payload: { postId }, // Deleted post ID
      });
      // Redirect to home
      const { location } = history;
      if (location.pathname === `/post/${postId}`) history.push('/');
      resolve(response.data);
    } catch (error) {
      console.log(error);
      reject(new Error('Something went wrong. Please try again'));
    }
  });

export const deleteComment = (postId, commentId) => dispatch =>
  new Promise(async (resolve, reject) => {
    try {
      const token = getStoredToken();
      if (!hasAuthorization(dispatch)) {
        return dispatch(openModal(Login));
      }

      const response = await comeesyAPI.delete(
        `/post/${postId}/comment/${commentId}`,
        {
          headers: { Authorization: token },
        }
      );
      dispatch({
        type: dataTypes.DELETE_COMMENT,
        payload: { post: response.data, commentId },
      });
      resolve({ message: 'Comment deleted successfully' });
    } catch (error) {
      console.log(error);
      reject(new Error('Something went wrong. Please try again'));
    }
  });

export const deleteCommentReply = (postId, commentId, replyId) => dispatch =>
  new Promise(async (resolve, reject) => {
    try {
      const token = getStoredToken();
      if (!hasAuthorization(dispatch)) {
        return dispatch(openModal(Login));
      }

      const response = await comeesyAPI.delete(
        `/post/${postId}/comment/${commentId}/reply/${replyId}`,
        {
          headers: { Authorization: token },
        }
      );
      dispatch({
        type: dataTypes.DELETE_COMMENT_REPLY,
        payload: { comment: response.data, replyId },
      });
      resolve({ message: 'Comment reply deleted successfully' });
    } catch (error) {
      console.log(error);
      reject(new Error('Something went wrong. Please try again'));
    }
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
    } catch (error) {
      console.log(error);
      if (error.response) reject(error.response.data);
      else reject(new Error('Something went wrong. Please try again'));
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
    } catch (error) {
      console.log(error);
      reject(new Error('Something went wrong. Please try again'));
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
        console.log(error);
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
      dispatch(getPost(response.data.postId));
    } catch (error) {
      console.log(error);
      if (error.response.data) reject(error.response.data);
      else reject(new Error('Something went wrong. Please try again'));
    }
  });
export const submitCommentReply = (postId, commentId, body) => dispatch =>
  new Promise(async (resolve, reject) => {
    try {
      const token = getStoredToken();
      if (!hasAuthorization(dispatch)) {
        return dispatch(openModal(Login));
      }

      const response = await comeesyAPI.post(
        `/post/${postId}/comment/${commentId}/reply`,
        { body },
        {
          headers: { Authorization: token },
        }
      );
      dispatch(getCommentReplies(postId, commentId));
      dispatch({
        type: dataTypes.SUBMIT_COMMENT_REPLY,
        payload: { postId, commentId },
      });
      resolve();
    } catch (error) {
      console.log(error);
      reject(new Error('Something went wrong. Please try again'));
    }
  });
