import _ from 'lodash';
import { uiTypes } from '../actions/types';

const INITIAL_STATE = {
  isLoading: false,
  alert: {
    open: false,
    type: '',
    message: '',
  },
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case uiTypes.SHOW_ALERT:
      return {
        ...state,
        alert: {
          open: true,
          ...action.payload,
        },
      };
    case uiTypes.HIDE_ALERT:
      return {
        ...state,
        alert: {
          open: false,
          type: '',
          message: '',
        },
      };
    case uiTypes.LOADING_UI:
      return { ...state, isLoading: true };
    case uiTypes.LOADING_UI_FINISHED:
      return { ...state, isLoading: false };

    default:
      return state;
  }
};
