import axios from 'axios';

import { postTypes } from './types';
import variables from '../config/config';

const BASE_URL = variables.BASE_API_URL;

export const fetchPosts = () => async dispatch => {
  try {
    const response = await axios.get(`${BASE_URL}/posts`);
    dispatch({
      type: postTypes.FETCH_POSTS,
      payload: response.data,
    });
  } catch (error) {
    console.error('Error', error);
  }
};
