/* -- libs -- */
import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/* -- mui -- */
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Skeleton from '@material-ui/lab/Skeleton';

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

const UserMenu = ({ user, onLogout, skeleton = false }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = useStyles();

  const onOpenMenu = e => {
    setAnchorEl(e.currentTarget);
  };
  const onCloseMenu = e => {
    setAnchorEl(null);
  };

  return (
    <div className="user-menu">
      {!skeleton ? (
        <Fragment>
          <IconButton
            onClick={onOpenMenu}
            aria-controls="userMenu"
            aria-haspopup="true"
            className={classes.userMenuIconBtn}
          >
            <Avatar alt={user.username} src={user.imageUrl} />
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
              to={`/u/${user.username}`}
              onClick={onCloseMenu}
            >
              Profile
            </MenuItem>
            <MenuItem
              component={Link}
              to="/u/settings"
              divider
              onClick={onCloseMenu}
            >
              Settings
            </MenuItem>
            <MenuItem component={Link} to="#" onClick={onLogout}>
              Logout
            </MenuItem>
          </PopupMenu>
        </Fragment>
      ) : (
        <Skeleton
          variant="circle"
          width={32}
          height={32}
          classes={{ root: classes.skeleton }}
        />
      )}
    </div>
  );
};
UserMenu.propTypes = {
  user: PropTypes.object.isRequired,
  onLogout: PropTypes.func.isRequired,
  skeleton: PropTypes.bool,
};
export default UserMenu;
