import { dataTypes } from '../actions/types.js';

const INITIAL_STATE = {
  posts: [],
  profile: {
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
    case dataTypes.SET_PROFILE_DATA:
      return {
        ...state,
        profile: { ...state.profile, ...action.payload },
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
