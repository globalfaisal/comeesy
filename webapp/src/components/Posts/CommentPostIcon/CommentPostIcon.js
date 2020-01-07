/* -- libs -- */
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

/* -- mui -- */
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/ModeComment';

/* -- styles -- */
import useStyles from './styles';

const CommentPostIcon = ({ post }) => {
  const classes = useStyles();
  const renderContent = () => (
    <IconButton
      component={Link}
      to={`/post/${post.postId}#comment`}
      aria-label="comment"
      size="medium"
      disableFocusRipple
      className={classes.commentIconBtn}
    >
      <CommentIcon fontSize="inherit" className={classes.commentIcon} />
    </IconButton>
  );
  return renderContent();
};
CommentPostIcon.propTypes = {
  post: PropTypes.object.isRequired,
};
export default CommentPostIcon;
