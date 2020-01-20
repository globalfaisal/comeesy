/* -- libs -- */
import React, { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

/* -- actions -- */
import { deletePost } from '../../actions/dataActions';
import { showAlert } from '../../actions/UIActions';

/* -- components -- */
import TypographyTruncate from '../TypographyTruncate/TypographyTruncate';
import LikePostButton from '../LikePostButton/LikePostButton';
import CommentPostButton from '../CommentPostButton/CommentPostButton';

/* -- utils -- */
import { formatDateToRelTime, shortenNumbers } from '../../utils/helperFns';

/* -- mui -- */
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import ExtraMenuIcon from '@material-ui/icons/MoreHoriz';
import TimeIcon from '@material-ui/icons/AccessTime';
import DeleteIcon from '@material-ui/icons/DeleteForeverRounded';
import Divider from '@material-ui/core/Divider';

/* -- styles -- */
import useStyles from './styles';

const PostItem = ({ post }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const currentUser = useSelector(state =>
    state.user.data ? state.user.data.credentials : null
  );

  if (!post) return null;

  const handleDeletePost = postId => {
    dispatch(deletePost(postId)).catch(({ message }) => {
      dispatch(showAlert('error', message));
    });
  };

  const renderExtraMenu = () => {
    if (currentUser && currentUser.username === post.user.username) {
      return (
        <PopupState variant="popover" popupId="extraMenu">
          {popupState => (
            <Fragment>
              <IconButton {...bindTrigger(popupState)} size="small">
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
                  className={classes.extraMenuItem}
                  onClick={() => {
                    popupState.close();
                    handleDeletePost(post.postId);
                  }}
                  dense
                >
                  <DeleteIcon fontSize="inherit" />
                  <Typography variant="caption">Delete post</Typography>
                </MenuItem>
              </Menu>
            </Fragment>
          )}
        </PopupState>
      );
    }
    return null;
  };
  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar
            alt={post.user.username}
            src={post.user.imageUrl}
            component={Link}
            to={`/user/${post.user.username}`}
            className={classes.avatar}
          />
        }
        title={
          <Fragment>
            <Typography
              component={Link}
              to={`/user/${post.user.username}`}
              variant="subtitle1"
              color="primary"
              className={classes.name}
            >{`${post.user.name}`}</Typography>
            <span className="dot inline small"></span>
            <Typography
              component="span"
              variant="body2"
              className={classes.username}
            >{`@${post.user.username}`}</Typography>
          </Fragment>
        }
        subheader={
          <div className={classes.createdAt}>
            <TimeIcon fontSize="inherit" />
            <Typography variant="caption" color="textSecondary">
              {formatDateToRelTime(post.createdAt)}
            </Typography>
          </div>
        }
        action={renderExtraMenu()}
      />
      <CardContent className={classes.cardContent}>
        <TypographyTruncate
          variant="body1"
          color="textSecondary"
          line={3}
          more="Show More"
        >
          {post.body}
        </TypographyTruncate>
        <div className={classes.count}>
          <Typography variant="caption">
            {shortenNumbers(post.likeCount)} Likes
          </Typography>
          <span className="dot inline small"></span>
          <Typography
            component={Link}
            to={`/post/${post.postId}#commentList`}
            className={classes.commentCount}
            variant="caption"
          >
            {shortenNumbers(post.commentCount)} Comments
          </Typography>
        </div>
      </CardContent>
      <CardActions disableSpacing className={classes.cardAction}>
        <LikePostButton post={post} />
        <Divider orientation="vertical" variant="middle" />
        <CommentPostButton post={post} />
      </CardActions>
    </Card>
  );
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
};
export default PostItem;
