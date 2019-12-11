/* -- libs -- */
import React from 'react';
import PropTypes from 'prop-types';

/* -- utils -- */
import { shortenNumbers } from '../../../utils/helperFns';

/* -- mui -- */
import { makeStyles } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/ModeComment';
import Typography from '@material-ui/core/Typography';

/* -- styles -- */
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    marginRight: 16,
    color: theme.palette.colors.steelblue,
  },

  commentIconBtn: {
    padding: 6,
    marginRight: 6,
    '&:hover': {
      backgroundColor: blue[50],
    },
  },
  commentIcon: {
    color: 'transparent',
    strokeWidth: 1,
    stroke: theme.palette.colors.steelblue,
  },
}));

const CommentPostIcon = ({ post }) => {
  const classes = useStyles();
  const renderContent = () => (
    <div className={classes.root}>
      <IconButton
        aria-label="comment"
        size="medium"
        disableFocusRipple
        className={classes.commentIconBtn}
      >
        <CommentIcon fontSize="inherit" className={classes.commentIcon} />
      </IconButton>
      <Typography variant="body2">
        {shortenNumbers(post.commentCount)}
      </Typography>
    </div>
  );
  return renderContent();
};
CommentPostIcon.propTypes = {
  post: PropTypes.object.isRequired,
};
export default CommentPostIcon;
