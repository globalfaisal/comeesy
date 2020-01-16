/* -- libs -- */
import React, { useState, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

/* -- actions-- */
import {
  getCommentReplies,
  deleteComment,
  createCommentReply,
} from '../../actions/dataActions';
import { showAlert } from '../../actions/UIActions';

/* -- utils -- */
import { shortenNumbers } from '../../utils/helperFns';

/* -- components -- */
import CommentForm from '../CommentForm/CommentForm';
import CommentDetails from '../CommentDetails/CommentDetails';
import RepliesList from '../RepliesList/RepliesList';

/* -- mui -- */
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import ReplyIcon from '@material-ui/icons/ReplyOutlined';
import ListRepliesIcon from '@material-ui/icons/TextsmsOutlined';

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
    dispatch(createCommentReply(comment.postId, comment.commentId, value))
      .then(() => {
        setToggleCommentBox(false);
        dispatch(getCommentReplies(comment.postId, comment.commentId)).then(
          () => {
            setToggleReplies(true);
          }
        );
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
        item={comment}
        showOptions={isCommentAuthor}
        onDelete={handleDeleteComment}
        type="comment"
      />

      <div className={classes.commentActions}>
        {comment.replyCount > 0 && (
          <Fragment>
            <Button
              onClick={handleViewReplies}
              size="small"
              color="inherit"
              className={classes.toggleRepliesButton}
              startIcon={<ListRepliesIcon fontSize="inherit" color="inherit" />}
            >
              {`${shortenNumbers(comment.replyCount)} Replies`}
            </Button>
            <Divider orientation="vertical" variant="middle" />
          </Fragment>
        )}
        <Button
          onClick={() => {
            setToggleCommentBox(prevState => !prevState);
          }}
          size="small"
          color="inherit"
          className={classes.replyButton}
          startIcon={<ReplyIcon fontSize="inherit" color="inherit" />}
        >
          Reply
        </Button>
      </div>
      {toggleReplies && <RepliesList comment={comment} />}
      {toggleCommentBox && (
        <CommentForm
          handleSubmit={handleReplySubmit}
          placeholder="Write a reply..."
          initValue={`@${comment.user.username} `}
        />
      )}
    </ListItem>
  );
};
CommentItem.propTypes = {
  comment: PropTypes.object.isRequired,
};
export default CommentItem;
