/* -- libs -- */
import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

/* -- actions -- */
import { like, unlike } from '../actions/dataActions';

/* -- components -- */
import { showAlert } from '../actions/UIActions';

const useLikePost = likes => {
  const dispatch = useDispatch();

  const likePost = (postId, liked) => {
    if (!postId && liked === undefined) return;
    if (!liked) {
      dispatch(like(postId)).catch(({ message }) => {
        dispatch(showAlert('error', message));
      });
    } else {
      dispatch(unlike(postId)).catch(({ message }) => {
        dispatch(showAlert('error', message));
      });
    }
  };

  return { likePost };
};

useLikePost.propTypes = {
  // likes: PropTypes
};
export default useLikePost;
