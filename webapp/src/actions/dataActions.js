import comeesyAPI from '../api/comeesy';
import { dataTypes } from './types';

export const getPosts = () => dispatch => {
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
