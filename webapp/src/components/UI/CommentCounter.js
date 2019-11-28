/* -- libs -- */
import React from 'react';
import PropTypes from 'prop-types';

/* -- mui -- */
import { makeStyles } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';
import Typography from '@material-ui/core/Typography';

/* -- styles -- */
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    marginRight: 16,
  },

  commentIconBtn: {
    padding: 6,
    marginRight: 6,
    '&:hover': {
      color: blue[500],
      backgroundColor: blue[50],
    },
  },
}));

const CommentCounter = ({ count = 0 }) => {
  const classes = useStyles();
  const renderContent = () => (
    <div className={classes.root}>
      <IconButton
        aria-label="comment"
        size="small"
        className={classes.commentIconBtn}
      >
        <CommentIcon fontSize="inherit" />
      </IconButton>
      <Typography variant="body2" color="textSecondary">
        {count}
      </Typography>
    </div>
  );
  return renderContent();
};
CommentCounter.propTypes = {
  count: PropTypes.number.isRequired,
};
export default CommentCounter;
