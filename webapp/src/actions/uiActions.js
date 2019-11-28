import { uiTypes } from './types';

export const loadingUI = () => ({ type: uiTypes.LOADING_UI });
export const loadingUIFinished = () => ({ type: uiTypes.LOADING_UI_FINISHED });

export const setError = error => ({ type: uiTypes.SET_ERROR, payload: error });
export const clearErrors = () => ({ type: uiTypes.CLEAR_ERRORS });

export const showAlert = ({ type, message }) => ({
  type: uiTypes.SHOW_ALERT,
  payload: { type, message },
});
export const hideAlert = () => ({
  type: uiTypes.HIDE_ALERT,
});
