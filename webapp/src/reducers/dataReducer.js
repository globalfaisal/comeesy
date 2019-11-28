import { dataTypes } from '../actions/types.js';

const INITIAL_STATE = {
  posts: [],
  user: null,
  error: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case dataTypes.SET_POSTS:
      return {
        ...state,
        posts: action.payload,
      };
    case dataTypes.SET_PROFILE:
      return {
        ...state,
        user: { ...state.user, ...action.payload },
      };

    default:
      return state;
  }
};
