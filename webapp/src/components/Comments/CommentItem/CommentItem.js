/* -- libs -- */
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

/* -- actions-- */
import {
  getCommentReplies,
  deleteComment,
  submitCommentReply,
} from '../../../actions/dataActions';
import { showAlert } from '../../../actions/UIActions';

/* -- utils -- */
import { shortenNumbers } from '../../../utils/helperFns';

/* -- components -- */
import CommentBox from '../../CommentBox/CommentBox';
import CommentDetails from '../../CommentDetails/CommentDetails';
import RepliesList from '../RepliesList/RepliesList';

/* -- mui -- */
import ListItem from '@material-ui/core/ListItem';
import ReplyIcon from '@material-ui/icons/Reply';
import ViewReplyIcon from '@material-ui/icons/QuestionAnswerOutlined';
import Button from '@material-ui/core/Button';

/* -- styles -- */
import useStyles from './styles';

const CommentItem = ({ comment }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const isCommentAuthor = useSelector(state =>
    state.user.data
      ? state.user.data.credentials.username === comment.user.username
      : false
  );

  const [toggleReplies, setToggleReplies] = useState(false);
  const [toggleCommentBox, setToggleCommentBox] = useState(false);

  const handleViewReplies = () => {
    if (!toggleReplies) {
      dispatch(getCommentReplies(comment.postId, comment.commentId)).then(
        () => {
          setToggleReplies(true);
        }
      );
    } else setToggleReplies(false);
  };

  const handleDeleteComment = () => {
    dispatch(deleteComment(comment.postId, comment.commentId)).catch(
      ({ message }) => {
        dispatch(showAlert('error', message));
      }
    );
  };

  const handleReplySubmit = value =>
    dispatch(submitCommentReply(comment.postId, comment.commentId, value))
      .then(() => {
        setToggleCommentBox(false);
        handleViewReplies();
      })
      .catch(({ message }) => {
        dispatch(showAlert('error', message));
      });

  if (!comment) return null;
  return (
    <ListItem
      key={comment.commentId}
      className={classes.liItem}
      alignItems="flex-start"
      dense
    >
      <CommentDetails
        comment={comment}
        showOptions={isCommentAuthor}
        onDelete={handleDeleteComment}
        size="small"
      />

      <div className={classes.commentActions}>
        {comment.replyCount > 0 && (
          <Button
            size="small"
            onClick={handleViewReplies}
            className={classes.toggleRepliesButton}
            disableRipple
            startIcon={<ViewReplyIcon />}
          >
            {`${toggleReplies ? 'Hide' : 'View'} replies(${shortenNumbers(
              comment.replyCount
            )})`}
          </Button>
        )}
        {/* TODO: HANDLE REPLY TOGGLER */}
        <Button
          onClick={() => {
            setToggleCommentBox(prevState => !prevState);
            setToggleReplies(false);
          }}
          size="small"
          startIcon={<ReplyIcon />}
          disableRipple
          className={classes.replyButton}
        >
          Reply
        </Button>
        {toggleCommentBox && (
          <CommentBox
            handleSubmit={handleReplySubmit}
            placeholder="Write a reply..."
          />
        )}
      </div>

      {toggleReplies && <RepliesList comment={comment} />}
    </ListItem>
  );
};
CommentItem.propTypes = {
  comment: PropTypes.object.isRequired,
};
export default CommentItem;
