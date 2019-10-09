import axios from 'axios';
import { authTypes } from './types';
import history from '../utils/history/history';

export const login = ({ email = '', password = '' }) => async dispatch => {
  try {
    // send user data
    const userData = { email, password };
    const response = await axios.post('/login', userData);

    // redirect to home
    history.push('/');

    // dispatch action
    dispatch({
      type: authTypes.LOGIN,
      payload: { token: response.data.token, errors: null },
    });
  } catch (err) {
    // dispatch action with errors found
    dispatch({
      type: authTypes.LOGIN,
      payload: {
        token: undefined,
        errors: err.response.data.errors,
      },
    });
  }
};
