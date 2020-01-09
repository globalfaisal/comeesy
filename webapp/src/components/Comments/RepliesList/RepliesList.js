/* -- libs -- */
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import _ from 'lodash';

/* -- utils -- */
import { formatDateToRelTime } from '../../../utils/helperFns';

/* -- mui -- */
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

/* -- styles -- */
import useStyles from './styles';

const RepliesList = ({ comment }) => {
  const classes = useStyles();
  const { posts } = useSelector(state => state.data);

  if (!comment) return null;
  const replies = _.filter(posts[comment.postId].replies, [
    'commentId',
    comment.commentId,
  ]);

  if (replies.length === 0) return null;
  return (
    <div className={classes.root}>
      <List dense>
        {replies.map(reply => (
          <ListItem
            key={reply.replyId}
            className={classes.liItem}
            alignItems="flex-start"
            dense
          >
            <div className={classes.header}>
              <Avatar
                alt={reply.user.username}
                src={reply.user.imageUrl}
                component={Link}
                to={`/u/${reply.user.username}`}
                className={classes.avatar}
              />
              <div>
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
              </div>
            </div>

            <div className={classes.body}>
              <Typography variant="body2" color="textSecondary">
                {reply.body}
              </Typography>
            </div>
          </ListItem>
        ))}
      </List>
    </div>
  );
};
RepliesList.propTypes = {
  comment: PropTypes.object.isRequired,
};
export default RepliesList;
