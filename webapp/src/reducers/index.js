/* -- libs -- */
import { combineReducers } from 'redux';

/* -- reducers -- */
import authReducer from './authReducer';
import postsReducer from './postsReducer';

export default combineReducers({
  auth: authReducer,
  posts: postsReducer,
});
