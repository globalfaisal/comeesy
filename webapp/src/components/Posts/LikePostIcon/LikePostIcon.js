/* -- libs -- */
import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';

/* -- actions -- */
import { like, unlike } from '../../../actions/dataActions';

/* -- mui -- */
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/FavoriteOutlined';

/* -- styles -- */
import useStyles from './styles';

const LikePost = ({ post }) => {
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
    <IconButton
      aria-label="like"
      size="medium"
      disableFocusRipple
      className={classes.likeIconBtn}
      onClick={onLikeClick}
    >
      <FavoriteIcon
        fontSize="inherit"
        className={liked ? classes.likeIconActive : classes.likeIconNormal}
      />
    </IconButton>
  );
  return renderContent();
};
LikePost.propTypes = {
  post: PropTypes.object.isRequired,
};
export default LikePost;
