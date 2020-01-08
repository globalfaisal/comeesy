/* -- libs -- */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/* -- utils -- */
import { formatDateToRelTime, shortenNumbers } from '../../../utils/helperFns';

/* -- mui -- */
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import CommentReplyIcon from '@material-ui/icons/QuestionAnswer';

/* -- styles -- */
import useStyles from './styles';

const CommentList = ({ comments = [] }) => {
  const classes = useStyles();
  if (comments.length === 0) return null;

  return (
    <List className={classes.root}>
      {comments.map(comment => (
        <ListItem
          key={comment.commentId}
          id={comment.commentId}
          alignItems="flex-start"
        >
          <Avatar
            alt={comment.user.username}
            src={comment.user.imageUrl}
            component={Link}
            to={`/u/${comment.user.username}`}
            className={classes.avatar}
          />
          <ListItemText
            primary={
              <Fragment>
                <Typography
                  component={Link}
                  to={`/u/${comment.user.username}`}
                  variant="body2"
                  color="primary"
                  className={classes.title}
                >{`${comment.user.name}`}</Typography>
                <span className="dot inline small"></span>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.subtitle}
                >{`@${comment.user.username}`}</Typography>
                <Typography
                  component="div"
                  variant="caption"
                  className={classes.subtitle}
                >
                  {formatDateToRelTime(comment.createdAt)}
                </Typography>
              </Fragment>
            }
            secondary={
              <Fragment>
                <Typography
                  variant="body2"
                  className={classes.body}
                  color="textPrimary"
                >
                  {comment.body}
                </Typography>
                {comment.replyCount > 0 && (
                  <Fragment>
                    <Typography
                      component="div"
                      variant="caption"
                      color="textPrimary"
                      className={classes.viewReplies}
                      onClick={() => {
                        /* TODO: DISPATCH GET COMMENT REPLIES ACTION */
                        console.log('CLICKED');
                      }}
                    >
                      <CommentReplyIcon fontSize="inherit" />
                      {`View ${shortenNumbers(comment.replyCount)} `}
                      {`${comment.replyCount === 1 ? 'reply' : 'replies'}`}
                    </Typography>
                  </Fragment>
                )}
              </Fragment>
            }
          />
        </ListItem>
      ))}
    </List>
  );
};
CommentList.propTypes = {
  comments: PropTypes.array.isRequired,
};
export default CommentList;
