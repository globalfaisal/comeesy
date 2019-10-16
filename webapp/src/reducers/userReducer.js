import _ from 'lodash';
import { userTypes } from '../actions/types';

const INITIAL_STATE = {
  /* data */
  credentials: null,
  likes: [],
  notifications: [],
  /* custom */
  isAuthenticated: false,
  isLoading: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case userTypes.SET_AUTHENTICATED:
      return { ...state, isAuthenticated: true };
    case userTypes.SET_UNAUTHENTICATED:
      return INITIAL_STATE;
    case userTypes.SET_USER:
      return {
        isAuthenticated: true,
        isLoading: false,
        ...action.payload,
      };
    case userTypes.LOADING_USER:
      return { ...state, isLoading: true };

    default:
      return state;
  }
};
