/* -- libs -- */
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

/* -- mui -- */
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import CommentIcon from '@material-ui/icons/ModeComment';

/* -- styles -- */
import useStyles from './styles';

const CommentPostButton = ({ post }) => {
  const classes = useStyles();
  const renderContent = () => (
    <Button
      component={Link}
      to={`/post/${post.postId}#comment`}
      aria-label="comment"
      size="medium"
      disableFocusRipple
      className={classes.commentBtn}
      startIcon={<CommentIcon className={classes.commentIcon} />}
    >
      Comment
    </Button>
  );
  return renderContent();
};
CommentPostButton.propTypes = {
  post: PropTypes.object.isRequired,
};
export default CommentPostButton;
