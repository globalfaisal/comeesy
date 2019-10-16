import { dataTypes } from '../actions/types.js';

const INITIAL_STATE = {
  posts: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case dataTypes.SET_POSTS:
      return { ...state, posts: action.payload };
    default:
      return state;
  }
};
