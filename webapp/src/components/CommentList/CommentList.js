/* -- libs -- */
import React from 'react';
import PropTypes from 'prop-types';

/* -- utils -- */

/* -- components -- */
import CommentItem from '../CommentItem/CommentItem';

/* -- mui -- */
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';

/* -- styles -- */
const useStyles = makeStyles(theme => ({
  root: {
    borderRadius: '0px 0px 3px 3px',
    background: theme.palette.colors.white,
    border: `1px solid ${theme.palette.colors.greylight}`,
    borderTop: '1px solid transparent',
  },
}));

const CommentList = ({ comments = [] }) => {
  const classes = useStyles();
  if (comments.length === 0) return null;
  return (
    <List dense className={classes.root} id="commentList">
      {comments.map((comment, key) => (
        <CommentItem comment={comment} key={key} />
      ))}
    </List>
  );
};
CommentList.propTypes = {
  comments: PropTypes.array.isRequired,
};
export default CommentList;
