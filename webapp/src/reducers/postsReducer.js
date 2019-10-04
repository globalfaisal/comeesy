import _ from 'lodash';
import { postTypes } from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case postTypes.FETCH_POSTS:
      return { ...state, ..._.mapKeys(action.payload, 'postId') };

    default:
      return state;
  }
};
