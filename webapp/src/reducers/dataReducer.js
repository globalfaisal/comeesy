import _ from 'lodash';
import { dataTypes } from '../actions/types.js';

const INITIAL_STATE = {
  posts: null,
  profile: null,
  error: null,
  loading: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case dataTypes.SET_POSTS:
      return {
        ...state,
        posts: _.mapKeys(action.payload, 'postId'),
        loading: false,
      };
    case dataTypes.SET_POST:
      if (!action.payload) return { ...state, loading: false };
      return {
        ...state,
        posts: { ...state.posts, [action.payload.postId]: action.payload },
        loading: false,
      };
    case dataTypes.SUBMIT_COMMENT:
      if (!action.payload) return { ...state, loading: false };
      return {
        ...state,
        loading: false,
        posts: {
          ...state.posts,
          [action.payload.postId]: {
            ...state.posts[action.payload.postId],
            comments: [action.payload, ...state.posts.comments],
          },
        },
      };
    case dataTypes.LIKE_POST:
    case dataTypes.UNLIKE_POST:
      return {
        ...state,
        posts: { ...state.posts, [action.payload.postId]: action.payload },
        profile:
          state.profile && state.profile.posts
            ? {
                ...state.profile,
                posts: {
                  ...state.profile.posts,
                  [action.payload.postId]: action.payload,
                },
              }
            : state.profile,
      };
    case dataTypes.SET_PROFILE:
      return {
        ...state,
        profile: {
          ...action.payload,
          posts: _.mapKeys(action.payload.posts, 'postId'),
        },
        loading: false,
      };
    case dataTypes.LOADING_DATA:
      return {
        ...state,
        loading: true,
      };

    default:
      return state;
  }
};
