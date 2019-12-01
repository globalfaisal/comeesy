/* -- libs -- */
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

/* -- components -- */
import LinearLoading from '../UI/LinearLoading';
import UserMenu from './UserMenu';
import Logo from '../UI/Logo';

/* -- mui -- */
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

/* -- styles -- */
const useStyles = makeStyles(theme => ({
  appBar: {
    backgroundColor: theme.palette.colors.black,
  },
  grow: {
    flexGrow: 1,
  },
  navMenu: {
    marginLeft: theme.spacing(2),
  },
  navLink: {
    margin: theme.spacing(1),
    color: theme.palette.colors.greylight,
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const { loading, isAuthenticated } = useSelector(state => state.user);
  const isDataLoading = useSelector(state => state.data.isLoading);

  return (
    <AppBar className={classes.appBar}>
      <LinearLoading loading={isDataLoading || loading} />

      <Toolbar variant="dense">
        <Link to="/">
          <Logo variant="white" />
        </Link>
        <div className={classes.grow} />
        <nav className={classes.navMenu}>
          <UserMenu />
          {!isAuthenticated && (
            <React.Fragment>
              <Button
                component={Link}
                to="/auth/login"
                size="small"
                className={classes.navLink}
              >
                Log in
              </Button>
              <Button
                component={Link}
                to="/auth/signup"
                variant="contained"
                color="primary"
                size="small"
                className={classes.navLink}
              >
                Sign up
              </Button>
            </React.Fragment>
          )}
        </nav>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
