/* -- libs -- */
import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';

/* -- utils -- */
import { shortenNumbers } from '../../utils/helperFns';

/* -- actions -- */
import { like, unlike } from '../../actions/dataActions';

/* -- mui -- */
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/FavoriteOutlined';
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
      backgroundColor: red[50],
    },
  },
  likeIconActive: {
    color: red[300],
    transformOrigin: 'center',
    animation: `$beat .25s ${theme.transitions.easing.easeInOut}`,
  },
  likeIconNormal: {
    color: 'transparent',
    strokeWidth: 2,
    stroke: theme.palette.colors.steelblue,
    // transformOrigin: 'center',
    // animation: `$beat .15s ${theme.transitions.easing.easeInOut}`,
    // animationDelay: '.5s',
  },
  '@keyframes beat': {
    '0%': {
      transform: 'scale(1)',
    },
    '50%': {
      transform: 'scale(1.5)',
    },
    '100%': {
      transform: 'scale(1)',
    },
  },
}));

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
    <div className={classes.root}>
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
      <Typography variant="body2" color="textSecondary">
        {shortenNumbers(post.likeCount)}
      </Typography>
    </div>
  );
  return renderContent();
};
LikePost.propTypes = {
  post: PropTypes.object.isRequired,
};
export default LikePost;
