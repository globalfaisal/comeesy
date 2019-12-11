/* -- libs -- */
import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';

/* -- actions -- */
import { like, unlike } from '../../../actions/dataActions';

/* -- utils -- */
import { shortenNumbers } from '../../../utils/helperFns';

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
    color: theme.palette.colors.steelblue,
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
    strokeWidth: 1,
    stroke: theme.palette.colors.steelblue,
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

const LikePostIcon = ({ post }) => {
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
      <Typography variant="body2">{shortenNumbers(post.likeCount)}</Typography>
    </div>
  );
  return renderContent();
};
LikePostIcon.propTypes = {
  post: PropTypes.object.isRequired,
};
export default LikePostIcon;
