/* -- libs -- */
import React, { Fragment, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

/* -- actions -- */
import { logout } from '../../actions/userActions';

/* -- mui -- */
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ExploreIcon from '@material-ui/icons/ExploreOutlined';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';

/* -- components -- */
import PopupMenu from '../UI/PopupMenu';
/* -- styles -- */
const useStyles = makeStyles(theme => ({
  navLink: {
    fontSize: 28,
  },
}));

const PrivateNavLinks = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const credentials = useSelector(state =>
    state.user.data ? state.user.data.credentials : null
  );

  const [anchorEl, setAnchorEl] = useState(null);

  const onOpenMenu = e => {
    setAnchorEl(e.currentTarget);
  };
  const onCloseMenu = () => {
    setAnchorEl(null);
  };

  const renderContent = user => {
    if (!user) return null;
    return (
      <Fragment>
        <IconButton
          component={Link}
          to="/"
          color="inherit"
          className={classes.navLink}
        >
          <ExploreIcon fontSize="inherit" />
        </IconButton>
        <div className="user-menu">
          <IconButton
            id="userMenuButton"
            onClick={onOpenMenu}
            aria-controls="userMenu"
            aria-haspopup="true"
            color="inherit"
            className={classes.navLink}
          >
            <Avatar
              alt={user.username}
              src={user.imageUrl}
              className={classes.avatar}
            />
          </IconButton>
          <PopupMenu
            id="userMenu"
            anchorEl={anchorEl || null}
            open={!!anchorEl}
            onClose={onCloseMenu}
          >
            <MenuItem
              component={Link}
              to={`/u/${user.username}`}
              onClick={onCloseMenu}
            >
              Profile
            </MenuItem>
            <MenuItem
              component={Link}
              to="/settings/profile"
              divider
              onClick={onCloseMenu}
            >
              Settings
            </MenuItem>
            <MenuItem
              component={Link}
              to="#"
              onClick={() => dispatch(logout())}
            >
              Logout
            </MenuItem>
          </PopupMenu>
        </div>
      </Fragment>
    );
  };

  return renderContent(credentials);
};

export default PrivateNavLinks;
