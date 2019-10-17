import { dataTypes } from '../actions/types.js';

const INITIAL_STATE = {
  feed: {
    posts: [],
  },
  profile: {
    user: null,
    posts: [],
    likes: [],
  },
  isLoading: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case dataTypes.SET_POSTS:
      return {
        ...state,
        feed: { ...state.feed, posts: action.payload },
        isLoading: false,
      };
    case dataTypes.SET_PROFILE:
      return {
        ...state,
        profile: {
          ...state.profile,
          user: action.payload.credentials,
          posts: action.payload.posts,
          likes: action.payload.likes,
        },
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
