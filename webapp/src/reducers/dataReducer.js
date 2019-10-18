import { dataTypes } from '../actions/types.js';

const INITIAL_STATE = {
  posts: [],
  user: {
    credentials: null,
    posts: [],
  },
  isLoading: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case dataTypes.SET_POSTS:
      return {
        ...state,
        posts: action.payload,
        isLoading: false,
      };
    case dataTypes.SET_USER_DATA:
      return {
        ...state,
        user: { ...state.user, ...action.payload },
        isLoading: false,
      };
    case dataTypes.LOADING_DATA:
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
};
