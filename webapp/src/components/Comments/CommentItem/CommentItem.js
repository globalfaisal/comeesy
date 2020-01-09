/* -- libs -- */
import React, { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

/* -- actions-- */
import { getCommentReplies } from '../../../actions/dataActions';

/* -- utils -- */
import { formatDateToRelTime, shortenNumbers } from '../../../utils/helperFns';

/* -- components -- */
import RepliesList from '../RepliesList/RepliesList';

/* -- mui -- */
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import ReplyIcon from '@material-ui/icons/Reply';
import ViewReplyIcon from '@material-ui/icons/QuestionAnswerOutlined';

/* -- styles -- */
import useStyles from './styles';
import { Button } from '@material-ui/core';

const CommentItem = ({ comment }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [expandReplies, setExpandReplies] = useState(false);
  if (!comment) return null;

  const handleViewReply = () => {
    dispatch(getCommentReplies(comment.postId, comment.commentId)).then(() => {
      setExpandReplies(true);
    });
  };
  return (
    <ListItem
      key={comment.commentId}
      className={classes.liItem}
      alignItems="flex-start"
      dense
      divider
    >
      <div className={classes.header}>
        <Avatar
          alt={comment.user.username}
          src={comment.user.imageUrl}
          component={Link}
          to={`/u/${comment.user.username}`}
          className={classes.avatar}
        />
        <div>
          <Typography
            component={Link}
            to={`/u/${comment.user.username}`}
            variant="body2"
            color="primary"
            className={classes.name}
          >{`${comment.user.name}`}</Typography>
          <span className="dot inline small"></span>
          <Typography
            component="span"
            variant="body2"
            className={classes.username}
          >{`@${comment.user.username}`}</Typography>
          <Typography
            component="div"
            variant="caption"
            className={classes.createdAt}
          >
            {formatDateToRelTime(comment.createdAt)}
          </Typography>
        </div>
      </div>

      <div className={classes.body}>
        <Typography variant="body2" color="textSecondary">
          {comment.body}
        </Typography>
      </div>
      <div className={classes.commentActions}>
        {comment.replyCount > 0 && (
          <Button
            size="small"
            onClick={handleViewReply}
            className={classes.toggleRepliesButton}
            disableRipple
            startIcon={<ViewReplyIcon />}
          >
            View {shortenNumbers(comment.replyCount)}
            {comment.replyCount === 1 ? ' Reply' : ' Replies'}
          </Button>
        )}
        {/* TODO: HANDLE REPLY TOGGLER */}
        <Button size="small" startIcon={<ReplyIcon />} disableRipple>
          Reply
        </Button>
      </div>
      {expandReplies && <RepliesList comment={comment} />}
    </ListItem>
  );
};
CommentItem.propTypes = {
  comment: PropTypes.object.isRequired,
};
export default CommentItem;
