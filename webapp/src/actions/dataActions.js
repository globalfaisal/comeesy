import comeesyAPI from '../api/comeesy';
import { dataTypes } from './types';

export const fetchPosts = () => dispatch => {
  comeesyAPI
    .get('/posts')
    .then(response => {
      dispatch({
        type: dataTypes.FETCH_POSTS,
        payload: response.data,
      });
    })
    .catch(error => {
      console.error('Error', error);
    });
};
