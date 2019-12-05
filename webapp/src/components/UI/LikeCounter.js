/* -- libs -- */
import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';

/* -- actions -- */
import { like, unlike } from '../../actions/dataActions';

/* -- mui -- */
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import Typography from '@material-ui/core/Typography';

/* -- styles -- */
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    marginRight: 16,
  },
  likeIconBtn: {
    padding: 6,
    marginRight: 6,
    '&:hover': {
      color: red[500],
      backgroundColor: red[50],
    },
  },
  liked: {
    color: red[300],
  },
}));

const LikeCounter = ({ post }) => {
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
    <div className={classes.root}>
      <IconButton
        aria-label="like"
        size="small"
        className={classes.likeIconBtn}
        onClick={onLikeClick}
      >
        {liked ? (
          <FavoriteIcon fontSize="inherit" className={classes.liked} />
        ) : (
          <FavoriteBorderIcon fontSize="inherit" />
        )}
      </IconButton>
      <Typography variant="body2" color="textSecondary">
        {post.likeCount}
      </Typography>
    </div>
  );
  return renderContent();
};
LikeCounter.propTypes = {
  post: PropTypes.object.isRequired,
  // onLike: PropTypes.func.isRequired,
  // liked: PropTypes.bool.isRequired,
};
export default LikeCounter;
