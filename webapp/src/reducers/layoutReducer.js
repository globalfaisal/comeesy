import { layoutTypes } from '../actions/types';

const INITIAL_STATE = {
  isDarkTheme: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action) {
    case layoutTypes.TOGGLE_DARK_THEME:
      return { ...state, isDarkTheme: action.payload };
    case layoutTypes.GET_DEFAULT_THEME:
      return { ...state, isDarkTheme: action.payload };
    default:
      return state;
  }
};
