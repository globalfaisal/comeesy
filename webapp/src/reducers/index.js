/* -- libs -- */
import { combineReducers } from 'redux';

/* -- reducers -- */
import postsReducer from './postsReducer';
import layoutReducer from './layoutReducer';

export default combineReducers({
  posts: postsReducer,
  layout: layoutReducer,
});
