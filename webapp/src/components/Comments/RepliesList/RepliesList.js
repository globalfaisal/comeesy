/* -- libs -- */
import React, { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import _ from 'lodash';

/* -- actions-- */
import { deleteCommentReply } from '../../../actions/dataActions';
import { showAlert } from '../../../actions/UIActions';

/* -- utils -- */
import { formatDateToRelTime } from '../../../utils/helperFns';

/* -- mui -- */
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import ExtraMenuIcon from '@material-ui/icons/MoreVert';
import DeleteIcon from '@material-ui/icons/DeleteForeverRounded';

/* -- styles -- */
import useStyles from './styles';

const RepliesList = ({ comment }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const currentUser = useSelector(state =>
    state.user.data ? state.user.data.credentials : null
  );

  const replies = useSelector(state =>
    state.data.posts ? state.data.posts[comment.postId].replies : []
  );

  const commentReplies = replies.filter(r => r.commentId === comment.commentId);

  const handleDeleteComment = (postId, commentId, replyId) => {
    dispatch(deleteCommentReply(postId, commentId, replyId))
      .then(({ message }) => {
        dispatch(showAlert('success', message));
      })
      .catch(({ message }) => {
        dispatch(showAlert('error', message));
      });
  };

  const renderExtraMenu = reply => {
    if (currentUser && currentUser.username === reply.user.username) {
      return (
        <PopupState variant="popover" popupId="extraMenu">
          {popupState => (
            <Fragment>
              <IconButton
                {...bindTrigger(popupState)}
                size="small"
                className={classes.extraMenuButton}
              >
                <ExtraMenuIcon fontSize="inherit" />
              </IconButton>
              <Menu
                {...bindMenu(popupState)}
                getContentAnchorEl={null}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                variant="menu"
                elevation={2}
              >
                <MenuItem
                  onClick={() => {
                    popupState.close();
                    handleDeleteComment(
                      comment.postId,
                      comment.commentId,
                      reply.replyId
                    );
                  }}
                  dense
                >
                  <DeleteIcon fontSize="inherit" />
                  <Typography variant="caption">Delete comment</Typography>
                </MenuItem>
              </Menu>
            </Fragment>
          )}
        </PopupState>
      );
    }
    return null;
  };

  if (commentReplies.length === 0) return null;
  return (
    <List dense className={classes.root}>
      {commentReplies.map(reply => (
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
          {renderExtraMenu(reply)}
        </ListItem>
      ))}
    </List>
  );
};
RepliesList.propTypes = {
  comment: PropTypes.object.isRequired,
};
export default RepliesList;
