import comeesyAPI from '../api/comeesy';
import { dataTypes } from './types';
import { loadingUI, loadingUIFinished } from './UIActions';

export const getPosts = () => dispatch =>
  new Promise(async (resolve, reject) => {
    dispatch(loadingUI());
    comeesyAPI
      .get('/posts')
      .then(response => {
        resolve();
        dispatch({
          type: dataTypes.SET_POSTS,
          payload: response.data,
        });
        dispatch(loadingUIFinished());
      })
      .catch(error => {
        console.error(error);
        dispatch(loadingUIFinished());
        reject(error.response.data);
      });
  });

export const getProfile = username => dispatch =>
  new Promise(async (resolve, reject) => {
    dispatch(loadingUI());
    comeesyAPI
      .get(`/user/${username}`)
      .then(res => {
        dispatch({
          type: dataTypes.SET_PROFILE,
          payload: res.data,
        });
        dispatch(loadingUIFinished());
      })
      .catch(error => {
        console.error(error);
        dispatch(loadingUIFinished());
        reject(error.response.data);
      });
  });
