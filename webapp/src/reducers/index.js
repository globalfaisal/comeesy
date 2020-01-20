/* -- libs -- */
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';
import { combineReducers } from 'redux';

/* -- reducers -- */
import userReducer from './userReducer';
import dataReducer from './dataReducer';
import UIReducer from './UIReducer';

export default combineReducers({
  user: userReducer,
  data: dataReducer,
  UI: UIReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
});
