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
    case dataTypes.DELETE_POST:
      if (!action.payload) return { ...state, loading: false };
      return {
        ...state,
        loading: false,
        posts: { ..._.omit(state.posts, [action.payload.postId]) },
        profile:
          state.profile && state.profile.posts
            ? {
                ...state.profile,
                posts: {
                  ..._.omit(state.profile.posts, [action.payload.postId]),
                },
              }
            : state.profile,
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
    case dataTypes.DELETE_COMMENT: {
      if (!action.payload) return { ...state, loading: false };

      return {
        ...state,
        loading: false,
        posts: {
          ...state.posts,
          [action.payload.post.postId]: {
            ...action.payload.post,

            comments: state.posts[action.payload.post.postId].comments.filter(
              c => c.commentId !== action.payload.commentId
            ),
            replies: state.posts[action.payload.post.postId].replies.filter(
              r => r.commentId !== action.payload.commentId
            ),
          },
        },
      };
    }
    case dataTypes.DELETE_COMMENT_REPLY: {
      if (!action.payload) return { ...state, loading: false };
      return {
        ...state,
        loading: false,
        posts: {
          ...state.posts,
          [action.payload.comment.postId]: {
            ...state.posts[action.payload.comment.postId],
            comments: state.posts[
              action.payload.comment.postId
            ].comments.map(c =>
              c.commentId === action.payload.comment.commentId
                ? action.payload.comment
                : c
            ),
            replies: state.posts[action.payload.comment.postId].replies.filter(
              r => r.replyId !== action.payload.replyId
            ),
          },
        },
      };
    }
    case dataTypes.SET_COMMENT_REPLIES:
      if (!action.payload) return { ...state, loading: false };
      return {
        ...state,
        loading: false,
        posts: {
          ...state.posts,
          [action.payload.postId]: {
            ...state.posts[action.payload.postId],
            replies: action.payload.replies,
          },
        },
      };
    case dataTypes.LIKE_POST:
    case dataTypes.UNLIKE_POST:
      return {
        ...state,
        posts: {
          ...state.posts,
          [action.payload.postId]: {
            ...state.posts[action.payload.postId],
            ...action.payload,
          },
        },
        profile:
          state.profile && state.profile.posts
            ? {
                ...state.profile,
                posts: {
                  ...state.profile.posts,
                  [action.payload.postId]: {
                    ...state.profile.posts[action.payload.postId],
                    ...action.payload,
                  },
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
