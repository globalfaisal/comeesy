/* -- libs -- */
import { combineReducers } from 'redux';

/* -- reducers -- */
import layoutReducer from './layoutReducer';

export default combineReducers({
  layout: layoutReducer,
});
