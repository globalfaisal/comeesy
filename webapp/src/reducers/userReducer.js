import _ from 'lodash';
import { userTypes, dataTypes, uiTypes } from '../actions/types';

const INITIAL_STATE = {
  data: null,
  error: null,
  loading: false,
  isAuthenticated: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case userTypes.USER_AUTH_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        error: null,
      };
    case userTypes.USER_AUTH_FAILED:
      return {
        ...INITIAL_STATE,
        error: action.payload,
      };
    case userTypes.GET_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        data: action.payload,
      };
    case userTypes.GET_USER_FAILED:
      return {
        ...state,
        loading: false,
        data: null,
        error: action.payload,
      };
    case userTypes.UPDATE_USER_DATA_SUCCESS:
    case uiTypes.CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case userTypes.UPDATE_USER_DATA_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case userTypes.LOGOUT:
      return { ...INITIAL_STATE };
    case userTypes.LOADING_USER:
      return {
        ...state,
        loading: true,
      };
    case dataTypes.LIKE_POST:
      return {
        ...state,
        data: {
          ...state.data,
          likes: [...state.data.likes, { postId: action.payload.postId }],
        },
      };
    case dataTypes.UNLIKE_POST:
      return {
        ...state,
        data: {
          ...state.data,
          likes: state.data.likes.filter(
            like => like.postId !== action.payload.postId
          ),
        },
      };
    case userTypes.MARK_NOTIFICATIONS_READ:
      return {
        ...state,
        data: {
          ...state.data,
          notifications: state.data.notifications.map(item => {
            item.read = true;
            return item;
          }),
        },
      };
    default:
      return state;
  }
};
