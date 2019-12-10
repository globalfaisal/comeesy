/* -- libs -- */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';

/* -- utils -- */
import { formatDateToRelTime } from '../../utils/helperFns';

/* -- components -- */
import PopupMenu from '../UI/PopupMenu';
import RippleBadge from '../UI/RippleBadge';
import EmptyData from '../UI/EmptyData';

/* -- mui -- */
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
import NotificationIcon from '@material-ui/icons/NotificationsNoneOutlined';
import Typography from '@material-ui/core/Typography';

/* -- image -- */
import imagePath from '../../assets/images/notification.svg';

/* -- styles -- */
const useStyles = makeStyles(theme => ({
  navLink: {
    fontSize: 28,
    position: 'relative',
  },
  paper: {
    width: 320,
    minHeight: 150,
    maxHeight: 350,
    paddingTop: 8,
    paddingBottom: 8,
    overflowY: 'auto',
    display: 'flex',
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
    backgroundColor: theme.palette.colors.whitesmoke,
    marginTop: 4,
  },
  sender: {
    marginRight: 4,
    fontWeight: 400,
    letterSpacing: 0.3,
  },
  empty: {
    minHeight: 130,
  },
}));

const notificationTypes = {
  like: 'liked your post',
  comment: 'commented on your post',
  reply: 'replied on comment...',
};

const NotificationMenu = ({ notifications = [], onMarkRead }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const onOpenMenu = e => {
    // 1. Set anchor element
    setAnchorEl(e.currentTarget);

    // 2. Mark notification read
    if (notifications && notifications.length > 0) {
      setTimeout(() => {
        const unReadNotificationIds = notifications
          .filter(item => !item.read)
          .map(item => item.notificationId);

        if (unReadNotificationIds.length > 0) onMarkRead(unReadNotificationIds);
      }, 3000);
    }
  };
  const onCloseMenu = e => {
    setAnchorEl(null);
  };

  const renderNotifications = () =>
    notifications.map(item => (
      <MenuItem
        component={Link}
        to={`/post/${item.postId}`}
        onClick={onCloseMenu}
        className={clsx(
          classes.menuItem,
          !item.read ? classes.unReadIndicator : ''
        )}
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
          <RippleBadge>
            <NotificationIcon fontSize="inherit" />
          </RippleBadge>
        )}
      </IconButton>
      <PopupMenu
        id="notificationMenu"
        anchorEl={anchorEl || null}
        open={Boolean(anchorEl)}
        onClose={onCloseMenu}
        classes={{ paper: classes.paper }}
      >
        {notifications && notifications.length > 0 ? (
          renderNotifications()
        ) : (
          <EmptyData
            text="You don't have any notifications"
            image={imagePath}
            className={classes.empty}
          />
        )}
      </PopupMenu>
    </div>
  );
};

NotificationMenu.propTypes = {
  notifications: PropTypes.array.isRequired,
  onMarkRead: PropTypes.func.isRequired,
};

export default NotificationMenu;
