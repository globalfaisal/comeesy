/* -- libs -- */
import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import _ from 'lodash';

/* -- utils -- */
import { formatDateToRelTime } from '../../../utils/helperFns';

/* -- mui -- */
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

/* -- styles -- */
import useStyles from './styles';

const Replies = ({ comment, hidden = false }) => {
  const classes = useStyles();
  const { posts, loading } = useSelector(state => state.data);

  if (!comment) return null;
  const replies = _.filter(posts[comment.postId].replies, [
    'commentId',
    comment.commentId,
  ]);

  const renderReplies = () => (
    <List dense>
      {replies.map(reply => (
        <ListItem
          key={reply.replyId}
          className={classes.liItem}
          alignItems="flex-start"
          dense
          divider
        >
          <ListItemText
            className={classes.title}
            primary={
              <Avatar
                alt={reply.user.username}
                src={reply.user.imageUrl}
                component={Link}
                to={`/u/${reply.user.username}`}
                className={classes.avatar}
              />
            }
            secondary={
              <Fragment>
                <Typography
                  component={Link}
                  to={`/u/${reply.user.username}`}
                  variant="body2"
                  color="primary"
                  className={classes.name}
                >{`${reply.user.name}`}</Typography>
                <span className="dot inline small"></span>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.username}
                >{`@${reply.user.username}`}</Typography>
                <Typography
                  component="div"
                  variant="caption"
                  className={classes.createdAt}
                >
                  {formatDateToRelTime(reply.createdAt)}
                </Typography>
              </Fragment>
            }
          />

          <Typography
            variant="body2"
            color="textSecondary"
            className={classes.body}
          >
            {reply.body}
          </Typography>
        </ListItem>
      ))}
    </List>
  );
  return (
    <div className={classes.root} hidden={hidden}>
      {loading && replies.length === 0 ? (
        <CircularProgress size={20} />
      ) : (
        renderReplies()
      )}
    </div>
  );
};
Replies.propTypes = {
  comment: PropTypes.object.isRequired,
  hidden: PropTypes.bool.isRequired,
};
export default Replies;
