import _ from 'lodash';
import { uiTypes } from '../actions/types';

const INITIAL_STATE = {
  isLoading: false,
  errors: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case uiTypes.SET_ERRORS:
      return {
        ...state,
        isLoading: false,
        errors: {
          ...state.errors,
          [_.keys(action.payload)[0]]: _.values(action.payload)[0],
        },
      };
    case uiTypes.CLEAR_ERROR:
      return {
        ...state,
        isLoading: false,
        errors: { ..._.omit(state.errors, action.payload) },
      };

    case uiTypes.CLEAR_ERRORS:
      return { ...state, isLoading: false, errors: null };
    case uiTypes.LOADING_UI:
      return { ...state, isLoading: true };
    default:
      return state;
  }
};
