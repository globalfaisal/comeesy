/* -- libs -- */
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

/* -- actions -- */
import { logout } from '../../actions/userActions';

/* -- mui -- */
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

/* -- components -- */
import PopupMenu from '../UI/PopupMenu';

/* -- styles -- */
const useStyles = makeStyles(theme => ({
  userMenuIconBtn: {
    '&:hover': {
      background: 'transparent',
    },
  },
  skeleton: {
    background: theme.palette.colors.grey,
  },
}));

const UserMenu = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { isAuthenticated, data } = useSelector(state => state.user);
  const credentials = data ? data.credentials : null;
  const [anchorEl, setAnchorEl] = useState(null);

  const onOpenMenu = e => {
    setAnchorEl(e.currentTarget);
  };
  const onCloseMenu = e => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    isAuthenticated &&
    credentials && (
      <div className="user-menu">
        <IconButton
          onClick={onOpenMenu}
          aria-controls="userMenu"
          aria-haspopup="true"
          className={classes.userMenuIconBtn}
        >
          <Avatar alt={credentials.username} src={credentials.imageUrl} />
          <ArrowDropDownIcon htmlColor="white" />
        </IconButton>
        <PopupMenu
          id="userMenu"
          anchorEl={anchorEl}
          open={!!anchorEl}
          onClose={onCloseMenu}
        >
          <MenuItem
            component={Link}
            to={`/u/${credentials.username}`}
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
          <MenuItem component={Link} to="#" onClick={handleLogout}>
            Logout
          </MenuItem>
        </PopupMenu>
      </div>
    )
  );
};
export default UserMenu;
