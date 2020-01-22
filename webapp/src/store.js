import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import firebase from './firebase';

import rootReducer from './reducers';

const getFirebase = () => firebase;

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk.withExtraArgument(getFirebase)))
);
