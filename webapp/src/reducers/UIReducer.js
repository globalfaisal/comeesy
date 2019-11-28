import _ from 'lodash';
import { uiTypes } from '../actions/types';

const INITIAL_STATE = {
  isLoading: false,
  errors: null,
  alert: {
    isOpen: true,
    type: 'success',
    message:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, molestias.',
  },
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case uiTypes.SHOW_ALERT:
      return {
        ...state,
        alert: {
          isOpen: true,
          ...action.payload,
        },
      };
    case uiTypes.HIDE_ALERT:
      return {
        ...state,
        alert: {
          isOpen: false,
          type: '',
          message: '',
        },
      };
    case uiTypes.SET_ERROR:
      return { ...state, isLoading: false, errors: action.payload };
    case uiTypes.CLEAR_ERRORS:
      return { ...state, isLoading: false, errors: null };
    case uiTypes.LOADING_UI:
      return { ...state, isLoading: true };
    case uiTypes.LOADING_UI_FINISHED:
      return { ...state, isLoading: false };

    default:
      return state;
  }
};
