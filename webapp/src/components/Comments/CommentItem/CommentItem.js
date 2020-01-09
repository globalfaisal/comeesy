/* -- libs -- */
import React, { Fragment, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

/* -- actions-- */
import { getCommentReplies, deleteComment } from '../../../actions/dataActions';
import { showAlert } from '../../../actions/UIActions';

/* -- utils -- */
import { formatDateToRelTime, shortenNumbers } from '../../../utils/helperFns';

/* -- components -- */
import RepliesList from '../RepliesList/RepliesList';

/* -- mui -- */
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import ReplyIcon from '@material-ui/icons/Reply';
import ViewReplyIcon from '@material-ui/icons/QuestionAnswerOutlined';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import ExtraMenuIcon from '@material-ui/icons/MoreVert';
import DeleteIcon from '@material-ui/icons/DeleteForeverRounded';

/* -- styles -- */
import useStyles from './styles';
import { Button } from '@material-ui/core';

const CommentItem = ({ comment }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const currentUser = useSelector(state =>
    state.user.data ? state.user.data.credentials : null
  );
  const [expandReplies, setExpandReplies] = useState(false);

  const handleViewReply = () => {
    dispatch(getCommentReplies(comment.postId, comment.commentId)).then(() => {
      setExpandReplies(true);
    });
  };

  const handleDeleteComment = (postId, commentId) => {
    dispatch(deleteComment(postId, commentId))
      .then(({ message }) => {
        dispatch(showAlert('success', message));
      })
      .catch(({ message }) => {
        dispatch(showAlert('error', message));
      });
  };

  const renderExtraMenu = () => {
    if (currentUser && currentUser.username === comment.user.username) {
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
                    handleDeleteComment(comment.postId, comment.commentId);
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

  if (!comment) return null;
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
      {renderExtraMenu()}
    </ListItem>
  );
};
CommentItem.propTypes = {
  comment: PropTypes.object.isRequired,
};
export default CommentItem;
