import _ from 'lodash';
import { dataTypes, uiTypes } from '../actions/types.js';

const INITIAL_STATE = {
  posts: null,
  profile: null,
  error: null,
  loading: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case dataTypes.GET_POSTS:
      return {
        ...state,
        posts: _.mapKeys(action.payload, 'postId'),
        loading: false,
      };
    case dataTypes.GET_POST:
      if (!action.payload) return { ...state, loading: false };
      return {
        ...state,
        posts: {
          ...state.posts,
          [action.payload.postId]: action.payload,
        },
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
    case dataTypes.CREATE_POST:
      if (!action.payload) return { ...state, loading: false };
      return {
        ...state,
        loading: false,
        posts: {
          [action.payload.postId]: action.payload,
          ...state.posts,
        },
      };
    case dataTypes.CREATE_COMMENT:
      if (!action.payload) return { ...state, loading: false };
      return {
        ...state,
        loading: false,
        posts: {
          ...state.posts,
          [action.payload.postId]: {
            ...state.posts[action.payload.postId],
            comments: [
              ...state.posts[action.payload.postId].comments,
              action.payload,
            ],
          },
        },
      };
    case dataTypes.CREATE_COMMENT_REPLY:
      if (!action.payload) return { ...state, loading: false };
      return {
        ...state,
        loading: false,
        posts: {
          ...state.posts,
          [action.payload.postId]: {
            ...state.posts[action.payload.postId],
            comments: state.posts[action.payload.postId].comments.map(c => {
              if (c.commentId === action.payload.commentId) c.replyCount += 1;
              return c;
            }),

            replies: state.posts[action.payload.postId].replies
              ? [action.payload, ...state.posts[action.payload.postId].replies]
              : '',
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
            replies: state.posts[action.payload.post.postId].replies
              ? state.posts[action.payload.post.postId].replies.filter(
                  r => r.commentId !== action.payload.commentId
                )
              : [],
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
    case dataTypes.GET_COMMENT_REPLIES:
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
      if (!action.payload) return { ...state, loading: false };
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
    case dataTypes.GET_PROFILE:
      if (!action.payload) return { ...state, loading: false };

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
    case uiTypes.CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};
