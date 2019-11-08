import _ from 'lodash';
import { uiTypes } from '../actions/types';

const INITIAL_STATE = {
  isLoading: false,
  errors: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case uiTypes.SET_ERROR:
      return {
        ...state,
        isLoading: false,
        errors: {
          ...state.errors,
          [action.payload.type]: action.payload.data,
        },
      };
    case uiTypes.CLEAR_ERROR:
      return {
        ...state,
        errors: { ..._.omit(state.errors, action.payload) },
      };

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
