/* -- libs -- */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

/* -- components -- */
import PopupMenu from '../UI/PopupMenu';

/* -- mui -- */
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';

/* -- styles -- */
const useStyles = makeStyles(theme => ({
  navLink: {
    fontSize: 28,
  },
}));

const UserMenu = ({ user, onLogout }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const onOpenMenu = e => {
    setAnchorEl(e.currentTarget);
  };
  const onCloseMenu = (event, reason) => {
    setAnchorEl(null);
  };

  if (!user) return null;
  return (
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
        anchorEl={anchorEl}
        open={anchorEl}
        onClose={onCloseMenu}
      >
        <MenuItem
          component={Link}
          to={`/u/${user.username}`}
          onClick={onCloseMenu}
          dense
        >
          Profile
        </MenuItem>
        <MenuItem
          component={Link}
          to="/settings/profile"
          onClick={onCloseMenu}
          dense
          divider
        >
          Settings
        </MenuItem>
        <MenuItem component={Link} to="#" onClick={onLogout} dense>
          Logout
        </MenuItem>
      </PopupMenu>
    </div>
  );
};

UserMenu.propTypes = {
  user: PropTypes.object.isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default UserMenu;
