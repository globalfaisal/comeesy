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
    margin: '8px 0',
    background: theme.palette.colors.white,
    border: `1px solid ${theme.palette.colors.greylight}`,
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
