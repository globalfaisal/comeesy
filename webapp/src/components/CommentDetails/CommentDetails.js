/* -- libs -- */
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';

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
import TimeIcon from '@material-ui/icons/AccessTime';

/* -- styles -- */
import useStyles from './styles';

const CommentDetails = ({ item, showOptions, onDelete, type }) => {
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

  if (!item) return null;
  return (
    <div className={classes.wrapper}>
      <Avatar
        alt={item.user.username}
        src={item.user.imageUrl}
        component={Link}
        to={`/user/${item.user.username}`}
        className={clsx(
          classes.avatar,
          type === 'reply' && classes.smallAvatar
        )}
      />
      <div
        className={clsx(
          classes.content,
          type === 'reply' ? classes.contentReply : classes.contentComment
        )}
      >
        <Typography
          component={Link}
          to={`/user/${item.user.username}`}
          variant="body2"
          color="primary"
          className={classes.name}
        >{`${item.user.name}`}</Typography>
        <span className="dot inline small"></span>
        <Typography
          component="span"
          variant="body2"
          className={classes.username}
        >{`@${item.user.username}`}</Typography>
        <div className={classes.createdAt}>
          <TimeIcon fontSize="inherit" />
          <Typography variant="caption" color="textSecondary">
            {formatDateToRelTime(item.createdAt)}
          </Typography>
        </div>
        <Typography
          variant="body2"
          color="textPrimary"
          className={classes.body}
        >
          {item.body}
        </Typography>
        {renderOptions()}
      </div>
    </div>
  );
};
CommentDetails.propTypes = {
  item: PropTypes.object.isRequired,
  showOptions: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  type: PropTypes.string,
};
export default CommentDetails;
