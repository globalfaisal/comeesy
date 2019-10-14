/* -- libs -- */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

/* -- actions -- */
import { logout } from '../../actions/userActions';

/* -- mui -- */
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Menu as MuiMenu } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const Menu = withStyles({
  paper: {
    width: 120,
    marginTop: -6,
    borderRadius: 0,
  },
})(MuiMenu);

const useStyles = makeStyles(theme => ({
  userMenuIconBtn: {
    '&:hover': {
      background: 'transparent',
    },
  },
}));
const UserMenu = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.credentials);
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = useStyles();

  const onOpenMenu = e => {
    setAnchorEl(e.currentTarget);
  };
  const onCloseMenu = e => {
    setAnchorEl(null);
  };

  const onLogout = e => {
    dispatch(logout());
  };

  return (
    <div className="user-menu">
      <IconButton
        onClick={onOpenMenu}
        aria-controls="userMenu"
        aria-haspopup="true"
        className={classes.userMenuIconBtn}
      >
        <Avatar alt={user.username} src={user.imageUrl} />
        <ArrowDropDownIcon htmlColor="white" />
      </IconButton>
      <Menu
        id="userMenu"
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={onCloseMenu}
        elevation={3}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <MenuItem component={Link} to={`/u/${user.username}`}>
          Profile
        </MenuItem>
        <MenuItem component={Link} to="/u/settings">
          Settings
        </MenuItem>
        <MenuItem component={Link} to="#" onClick={onLogout}>
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
};
UserMenu.propTypes = {};
export default UserMenu;
