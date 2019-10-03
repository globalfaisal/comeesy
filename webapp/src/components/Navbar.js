/* -- libs -- */
import React from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

/* -- logo -- */
import logo from '../asset/images/logo.svg';

/* -- mui -- */
import { makeStyles } from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

const useStyles = makeStyles(theme => ({
  brand: {
    width: 28,
    height: 28,
    '& img': {
      height: '100%',
    },
  },
  grow: {
    flexGrow: 1,
  },
}));

const Navbar = props => {
  const classes = useStyles();
  return (
    <AppBar>
      <Toolbar>
        <div className={classes.brand}>
          <Link to="/">
            <img src={logo} alt="comeesy logo" />
          </Link>
        </div>
        <div className={classes.grow} />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
