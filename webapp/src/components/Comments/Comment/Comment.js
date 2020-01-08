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

/* -- styles -- */
import useStyles from './styles';
import { Button } from '@material-ui/core';

const Comment = ({ comment }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [hidden, setHidden] = useState(true);
  if (!comment) return null;

  const handleViewReply = () => {
    dispatch(getCommentReplies(comment.postId, comment.commentId));
    setHidden(false);
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
        {hidden && comment.replyCount > 0 && (
          <Button size="small" onClick={handleViewReply}>
            View {shortenNumbers(comment.replyCount)}
            {comment.replyCount === 1 ? ' reply' : ' replies'}
          </Button>
        )}
      </div>
      <Replies comment={comment} hidden={hidden} />
    </ListItem>
  );
};
Comment.propTypes = {
  comment: PropTypes.object.isRequired,
};
export default Comment;
