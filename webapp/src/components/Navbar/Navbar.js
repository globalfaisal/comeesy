/* -- libs -- */
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

/* -- components -- */
import LinearLoading from '../UI/LinearLoading';
import Logo from '../UI/Logo';
import PublicNavLinks from './PublicNavLinks';
import PrivateNavLinks from './PrivateNavLinks';

/* -- mui -- */
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

/* -- styles -- */
const useStyles = makeStyles(theme => ({
  appBar: {
    backgroundColor: theme.palette.colors.black,
  },
  grow: {
    flexGrow: 1,
  },
  nav: {
    marginLeft: theme.spacing(2),
    color: theme.palette.colors.grey,
    display: 'flex',
    alignItems: 'center',
  },
  navLink: {
    margin: theme.spacing(1),
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const { loading, isAuthenticated } = useSelector(state => state.user);
  const isDataLoading = useSelector(state => state.data.loading);

  return (
    <AppBar className={classes.appBar}>
      <LinearLoading loading={isDataLoading || loading} />

      <Toolbar variant="dense">
        <Link to="/">
          <Logo variant="white" />
        </Link>
        <div className={classes.grow} />

        <nav className={classes.nav}>
          {isAuthenticated ? <PrivateNavLinks /> : <PublicNavLinks />}
        </nav>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
