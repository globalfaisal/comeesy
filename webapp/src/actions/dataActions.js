import comeesyAPI from '../api/comeesy';
import { dataTypes } from './types';

export const getPosts = () => dispatch => {
  dispatch({ type: dataTypes.LOADING_DATA });
  comeesyAPI
    .get('/posts')
    .then(response => {
      dispatch({
        type: dataTypes.SET_POSTS,
        payload: response.data,
      });
    })
    .catch(error => {
      console.error('Error', error);
    });
};

export const getUserData = username => dispatch => {
  dispatch({ type: dataTypes.LOADING_DATA });
  comeesyAPI
    .get(`/user/${username}`)
    .then(res => {
      dispatch({ type: dataTypes.SET_PROFILE, payload: res.data });
    })
    .catch(err => {
      console.error(err);
    });
};
