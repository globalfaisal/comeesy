/* -- libs -- */
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

/* -- utils -- */
import { formatDateToRelTime } from '../../utils/helperFns';

/* -- mui -- */
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import ExtraMenuIcon from '@material-ui/icons/MoreHoriz';
import DeleteIcon from '@material-ui/icons/DeleteForeverRounded';

/* -- styles -- */
import useStyles from './styles';

const CommentItem = ({ comment, showOptions, onDelete, size }) => {
  const classes = useStyles();

  const renderOptions = () => {
    if (showOptions) {
      return (
        <PopupState variant="popover" popupId="optionMenu">
          {popupState => (
            <Fragment>
              <IconButton
                {...bindTrigger(popupState)}
                size="small"
                className={classes.optionMenuButton}
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
                    onDelete();
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
    <div className={classes.wrapper}>
      <Avatar
        alt={comment.user.username}
        src={comment.user.imageUrl}
        component={Link}
        to={`/u/${comment.user.username}`}
        className={classes.avatar}
      />
      <div className={classes.content}>
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
          component="span"
          variant="caption"
          className={classes.createdAt}
        >
          {formatDateToRelTime(comment.createdAt)}
        </Typography>
        <Typography
          variant="body2"
          color="textPrimary"
          className={classes.body}
        >
          {comment.body}
        </Typography>
      </div>
      {renderOptions()}
    </div>
  );
};
CommentItem.propTypes = {
  comment: PropTypes.object.isRequired,
  showOptions: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  size: PropTypes.string,
};
export default CommentItem;
