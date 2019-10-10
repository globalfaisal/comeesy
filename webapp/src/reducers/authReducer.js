import _ from 'lodash';
import { userTypes } from '../actions/types';

const INITIAL_STATE = {
  token: null,
  errors: null,
  loading: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case userTypes.AUTH_START:
      return { loading: true, errors: null };
    case userTypes.AUTH_SUCCESS:
      return { loading: false, errors: null, token: action.payload.token };
    case userTypes.AUTH_FAILURE:
      return { loading: false, errors: action.payload.errors };
    default:
      return state;
  }
};
