/* -- libs -- */
import React, { Fragment, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

/* -- actions -- */
import { logout } from '../../actions/userActions';

/* -- components -- */
import UserMenu from './UserMenu';
import NotificationMenu from './NotificationMenu';

/* -- mui -- */
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ExploreIcon from '@material-ui/icons/ExploreOutlined';

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
  const notifications = useSelector(state =>
    state.user.data ? state.user.data.notifications : null
  );

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
      <NotificationMenu notifications={notifications} />
      <UserMenu user={credentials} onLogout={() => dispatch(logout())} />
    </Fragment>
  );
};

export default PrivateNavLinks;
