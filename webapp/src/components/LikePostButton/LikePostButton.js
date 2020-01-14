/* -- libs -- */
import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';

/* -- actions -- */
import { like, unlike } from '../../actions/dataActions';

/* -- mui -- */
import FavoriteIcon from '@material-ui/icons/FavoriteOutlined';
import Button from '@material-ui/core/Button';

/* -- styles -- */
import useStyles from './styles.js';

const LikePostButton = ({ post }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const likes = useSelector(state =>
    state.user.data ? state.user.data.likes : []
  );

  const liked = !!_.find(likes, { postId: post.postId });

  const onLikeClick = () => {
    if (!liked) {
      dispatch(like(post.postId));
    } else {
      dispatch(unlike(post.postId));
    }
  };

  const renderContent = () => (
    <Button
      aria-label="like"
      size="medium"
      disableFocusRipple
      className={classes.likeBtn}
      onClick={onLikeClick}
      startIcon={
        <FavoriteIcon
          className={liked ? classes.likeIconActive : classes.likeIconNormal}
        />
      }
    >
      Like
    </Button>
  );
  return renderContent();
};
LikePostButton.propTypes = {
  post: PropTypes.object.isRequired,
};
export default LikePostButton;
