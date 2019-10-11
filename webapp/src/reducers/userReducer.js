import _ from 'lodash';
import { userTypes } from '../actions/types';

const INITIAL_STATE = {
  isAuthenticated: false,
  credentials: null,
  likes: [],
  notifications: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case userTypes.SET_AUTHENTICATED:
      return { ...state, isAuthenticated: true };
    case userTypes.SET_UNAUTHENTICATED:
      return INITIAL_STATE;
    case userTypes.SET_USER:
      return { ...state, isAuthenticated: true, ...action.payload };

    default:
      return state;
  }
};
