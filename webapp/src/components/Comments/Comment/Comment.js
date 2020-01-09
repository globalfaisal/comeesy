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
import Replies from '../Replies/Replies';

/* -- mui -- */
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ReplyIcon from '@material-ui/icons/Reply';

/* -- styles -- */
import useStyles from './styles';
import { Button } from '@material-ui/core';

const Comment = ({ comment }) => {
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
      <ListItemText
        className={classes.title}
        primary={
          <Avatar
            alt={comment.user.username}
            src={comment.user.imageUrl}
            component={Link}
            to={`/u/${comment.user.username}`}
            className={classes.avatar}
          />
        }
        secondary={
          <Fragment>
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
          </Fragment>
        }
      />

      <div className={classes.body}>
        <Typography variant="body2" color="textSecondary">
          {comment.body}
        </Typography>
      </div>
      <div className={classes.commentAction}>
        {comment.replyCount > 0 && (
          <Button
            size="small"
            onClick={handleViewReply}
            className={classes.toggleRepliesButton}
            disableRipple
            startIcon={<ExpandMoreIcon />}
          >
            {shortenNumbers(comment.replyCount)}
            {comment.replyCount === 1 ? ' Reply' : ' Replies'}
          </Button>
        )}
        {/* TODO: HANDLE REPLY TOGGLER */}
        <Button size="small" startIcon={<ReplyIcon />} disableRipple>
          Reply
        </Button>
      </div>
      {expandReplies && <Replies comment={comment} />}
    </ListItem>
  );
};
Comment.propTypes = {
  comment: PropTypes.object.isRequired,
};
export default Comment;
