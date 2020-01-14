/* -- libs -- */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

/* -- actions-- */
import { deleteCommentReply } from '../../../actions/dataActions';
import { showAlert } from '../../../actions/UIActions';

/* -- components -- */
import CommentDetails from '../../CommentDetails/CommentDetails';

/* -- mui -- */
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

/* -- styles -- */
import useStyles from './styles';

const RepliesList = ({ comment }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const currentUser = useSelector(state =>
    state.user.data ? state.user.data.credentials : null
  );

  const replies = useSelector(state =>
    state.data.posts ? state.data.posts[comment.postId].replies : null
  );

  const commentReplies = replies
    ? replies.filter(r => r.commentId === comment.commentId)
    : null;

  const handleDeleteReply = (postId, commentId, replyId) => {
    dispatch(deleteCommentReply(postId, commentId, replyId)).catch(
      ({ message }) => {
        dispatch(showAlert('error', message));
      }
    );
  };

  if (!commentReplies || !commentReplies.length === 0) return null;
  return (
    <List dense>
      {commentReplies.map(reply => (
        <ListItem
          key={reply.replyId}
          className={classes.liItem}
          alignItems="flex-start"
          dense
        >
          <CommentDetails
            item={reply}
            showOptions={
              currentUser ? currentUser.username === reply.user.username : false
            }
            onDelete={() =>
              handleDeleteReply(reply.postId, reply.commentId, reply.replyId)
            }
            type="reply"
          />
        </ListItem>
      ))}
    </List>
  );
};
RepliesList.propTypes = {
  comment: PropTypes.object.isRequired,
};
export default RepliesList;
