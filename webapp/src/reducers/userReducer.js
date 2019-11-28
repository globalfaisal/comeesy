import _ from 'lodash';
import { userTypes, uiTypes } from '../actions/types';

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
    default:
      return state;
  }
};
