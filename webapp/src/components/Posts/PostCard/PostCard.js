/* -- libs -- */
import React, { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

/* -- actions -- */
import { deletePost } from '../../../actions/dataActions';
import { showAlert } from '../../../actions/UIActions';

/* -- components -- */
import TypographyTruncate from '../../TypographyTruncate/TypographyTruncate';
import CommentPostIcon from '../CommentPostIcon/CommentPostIcon';
import LikePostIcon from '../LikePostIcon/LikePostIcon';

/* -- utils -- */
import { formatDateToRelTime, shortenNumbers } from '../../../utils/helperFns';

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
import ExtraMenuIcon from '@material-ui/icons/MoreVert';
import DeleteIcon from '@material-ui/icons/DeleteForeverRounded';

/* -- styles -- */
import useStyles from './styles';

const PostCard = ({ post }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const currentUser = useSelector(state =>
    state.user.data ? state.user.data.credentials : null
  );

  if (!post) return null;

  const handleDeletePost = postId => {
    dispatch(deletePost(postId))
      .then(({ message }) => {
        dispatch(showAlert('success', message));
      })
      .catch(({ message }) => {
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
            to={`/u/${post.user.username}`}
            className={classes.avatar}
          />
        }
        title={
          <Fragment>
            <Typography
              component={Link}
              to={`/u/${post.user.username}`}
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
          <Typography
            variant="caption"
            color="textSecondary"
            className={classes.createdAt}
          >
            {formatDateToRelTime(post.createdAt)}
          </Typography>
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
      </CardContent>
      <CardActions disableSpacing className={classes.cardAction}>
        <div>
          <LikePostIcon post={post} />
          <CommentPostIcon post={post} />
        </div>
        <div>
          <Typography variant="caption">
            {shortenNumbers(post.likeCount)} Likes
          </Typography>
          <Typography
            component={Link}
            to={`/post/${post.postId}#commentList`}
            className={classes.commentCount}
            variant="caption"
          >
            {shortenNumbers(post.commentCount)} Comments
          </Typography>
        </div>
      </CardActions>
    </Card>
  );
};

PostCard.propTypes = {
  post: PropTypes.object.isRequired,
};
export default PostCard;
