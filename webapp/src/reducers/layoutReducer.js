import { layoutTypes } from '../actions/types';

const INITIAL_STATE = {
  isDarkTheme: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case layoutTypes.SET_DEFAULT_THEME:
      return { ...state, isDarkTheme: action.payload };
    case layoutTypes.TOGGLE_DARK_THEME:
      return { ...state, isDarkTheme: action.payload };
    default:
      return state;
  }
};
