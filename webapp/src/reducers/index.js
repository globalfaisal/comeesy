/* -- libs -- */
import { combineReducers } from 'redux';

/* -- reducers -- */
import postsReducer from './postsReducer';

export default combineReducers({
  posts: postsReducer,
});
