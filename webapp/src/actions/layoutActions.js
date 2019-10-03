import { layoutTypes } from './types';

export const toggleDarkTheme = () => {
  let isDarkTheme = window.localStorage.getItem('dark_theme');

  if (isDarkTheme === 'true') {
    window.localStorage.setItem('dark_theme', false);
    isDarkTheme = false;
  } else if (isDarkTheme === null || isDarkTheme === 'false') {
    window.localStorage.setItem('dark_theme', true);
    isDarkTheme = true;
  }

  return {
    type: layoutTypes.TOGGLE_DARK_THEME,
    payload: isDarkTheme,
  };
};

export const setDefaultTheme = () => {
  let isDarkTheme = window.localStorage.getItem('dark_theme');

  if (isDarkTheme === 'true') {
    isDarkTheme = true;
  } else if (isDarkTheme === null || isDarkTheme === 'false') {
    isDarkTheme = false;
  }

  return {
    type: layoutTypes.SET_DEFAULT_THEME,
    payload: isDarkTheme,
  };
};
