import _ from 'lodash';
import { authTypes } from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case authTypes.LOGIN:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
