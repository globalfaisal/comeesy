import _ from 'lodash';
import { uiTypes } from '../actions/types';
import Modal from '../components/UI/Modal';

const INITIAL_STATE = {
  loading: false,
  errors: null,
  modal: {
    isOpen: false,
    content: null,
  },
  alert: {
    isOpen: false,
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
      return { ...state, loading: false, errors: action.payload };
    case uiTypes.CLEAR_ERRORS:
      return { ...state, loading: false, errors: null };
    case uiTypes.LOADING_UI:
      return { ...state, loading: true };
    case uiTypes.LOADING_UI_FINISHED:
      return { ...state, loading: false };
    case uiTypes.OPEN_MODAL:
      return { ...state, modal: { isOpen: true, content: action.payload } };
    case uiTypes.CLOSE_MODAL:
      return { ...state, modal: { isOpen: false, content: null } };

    default:
      return state;
  }
};
