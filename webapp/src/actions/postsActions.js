import axios from 'axios';
import { postTypes } from './types';

export const fetchPosts = () => async dispatch => {
  try {
    const response = await axios.get('/posts');
    dispatch({
      type: postTypes.FETCH_POSTS,
      payload: response.data,
    });
  } catch (error) {
    console.error('Error', error);
  }
};
