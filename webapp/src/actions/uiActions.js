import { uiTypes } from './types';

export const loadingUI = () => ({ type: uiTypes.LOADING_UI });
export const loadingUIFinished = () => ({ type: uiTypes.LOADING_UI_FINISHED });

export const setError = error => ({ type: uiTypes.SET_ERROR, payload: error });
export const clearErrors = () => ({ type: uiTypes.CLEAR_ERRORS });

export const showAlert = (type, message) => ({
  type: uiTypes.SHOW_ALERT,
  payload: { type, message },
});
export const hideAlert = () => ({
  type: uiTypes.HIDE_ALERT,
});

export const openModal = content => ({
  type: uiTypes.OPEN_MODAL,
  payload: content,
});
export const closeModal = () => ({
  type: uiTypes.CLOSE_MODAL,
});
