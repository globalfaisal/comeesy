/* -- libs -- */
import React, { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

/* -- actions -- */
import { logout, markNotificationsRead } from '../../actions/userActions';

/* -- components -- */

/* -- components -- */
import LinearLoading from '../UI/LinearLoading';
import Logo from '../UI/Logo';
import UserMenu from './UserMenu';
import NotificationMenu from './NotificationMenu';
import CreatePostNavLink from './CreatePostNavLink';

/* -- mui -- */
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

/* -- styles -- */
const useStyles = makeStyles(theme => ({
  appBar: {
    backgroundColor: theme.palette.colors.black,
  },
  grow: {
    flexGrow: 1,
  },
  nav: {
    marginLeft: 16,
    color: theme.palette.colors.grey,
    display: 'flex',
    alignItems: 'center',
  },
  navLink: {
    margin: theme.spacing(1),
  },
  brand: {
    paddingTop: 6,
    display: 'flex',
    alignItems: 'center',
    fontSize: 18,
    fontWeight: 500,
    letterSpacing: -1,
  },
  logo: {
    width: 26,
    height: 26,
    marginRight: 6,
  },
}));

const Navbar = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { loading, isAuthenticated, data } = useSelector(state => state.user);
  const isDataLoading = useSelector(state => state.data.loading);

  return (
    <AppBar className={classes.appBar}>
      <LinearLoading loading={isDataLoading || loading} />

      <Toolbar variant="dense">
        <Typography
          component={Link}
          to="/"
          className={classes.brand}
          color="inherit"
        >
          <Logo variant="white" className={classes.logo} />
          COMEESY
        </Typography>

        <div className={classes.grow} />

        <nav className={classes.nav}>
          {isAuthenticated && data ? (
            <Fragment>
              <CreatePostNavLink />
              <NotificationMenu
                notifications={data.notifications}
                onMarkRead={ids => dispatch(markNotificationsRead(ids))}
              />
              <UserMenu
                user={data.credentials}
                onLogout={() => dispatch(logout())}
              />
            </Fragment>
          ) : (
            <Fragment>
              <Button
                component={Link}
                to="/auth/login"
                color="inherit"
                size="small"
                className={classes.navLink}
              >
                Log in
              </Button>
              <Button
                component={Link}
                to="/auth/login"
                variant="contained"
                color="primary"
                size="small"
                className={classes.navLink}
              >
                Sign up
              </Button>
            </Fragment>
          )}
        </nav>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
