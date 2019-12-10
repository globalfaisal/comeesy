/* -- libs -- */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';

/* -- utils -- */
import { formatDateToRelTime } from '../../utils/helperFns';

/* -- components -- */
import PopupMenu from '../UI/PopupMenu';

/* -- mui -- */
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
import NotificationIcon from '@material-ui/icons/NotificationsNoneOutlined';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';

/* -- styles -- */
const useStyles = makeStyles(theme => ({
  navLink: {
    fontSize: 28,
    position: 'relative',
  },
  paper: {
    width: 320,
    paddingTop: 8,
    paddingBottom: 8,
  },
  menuItem: {
    whiteSpace: 'normal',
    '&:not(:last-child)': {
      borderBottom: `1px solid ${theme.palette.colors.greylight}`,
    },
  },
  avatar: {
    marginRight: 6,
  },
  message: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 8,
  },
  unReadIndicator: {
    backgroundColor: theme.palette.error.main,
    marginTop: 4,
  },
  sender: {
    marginRight: 4,
    fontWeight: 400,
    letterSpacing: 0.3,
  },
  badge: {
    position: 'absolute',
    top: 15,
    right: 18,
  },
}));

const notificationTypes = {
  like: 'liked your post',
  comment: 'commented on your post',
  reply: 'replied on comment...',
};

const NotificationMenu = ({ notifications = [] }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const onOpenMenu = e => {
    setAnchorEl(e.currentTarget);
  };
  const onNotificationClick = () => {
    setAnchorEl(null);
    // TODO: MARK NOTIFICATION READ
  };

  const renderContent = () => {
    if (!notifications || notifications.length === 0) {
      return null;
    }

    return notifications.map(item => (
      <MenuItem
        component={Link}
        to={`/post/${item.postId}`}
        onClick={onNotificationClick}
        className={classes.menuItem}
        dense
      >
        <Avatar
          alt={item.sender.username}
          src={item.sender.imageUrl}
          className={classes.avatar}
        />
        <div className={classes.message}>
          <Typography
            variant="body2"
            color="textPrimary"
            className={classes.sender}
          >
            {item.sender.name}{' '}
            <div
              className={clsx(
                'dot inline medium',
                !item.read ? classes.unReadIndicator : ''
              )}
            />{' '}
            <Typography
              variant="caption"
              color="textSecondary"
              component="small"
            >
              {notificationTypes[item.type]}
            </Typography>
          </Typography>

          <Typography variant="caption" color="textSecondary">
            {formatDateToRelTime(item.createdAt)}
          </Typography>
        </div>
      </MenuItem>
    ));
  };
  return (
    <div className="notification-menu">
      <IconButton
        id="notificationMenuButton"
        onClick={onOpenMenu}
        aria-controls="notificationMenu"
        aria-haspopup="true"
        color="inherit"
        className={classes.navLink}
      >
        {notifications && notifications.some(el => el.read === false) && (
          <Badge color="secondary" variant="dot" className={classes.badge} />
        )}

        <NotificationIcon fontSize="inherit" />
      </IconButton>
      <PopupMenu
        id="notificationMenu"
        anchorEl={anchorEl || null}
        open={anchorEl}
        onClose={() => setAnchorEl(null)}
        classes={{ paper: classes.paper }}
      >
        {renderContent()}
      </PopupMenu>
    </div>
  );
};

NotificationMenu.propTypes = {
  notifications: PropTypes.array.isRequired,
};

export default NotificationMenu;
