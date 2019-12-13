/* -- libs -- */
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

/* -- mui -- */
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

/* -- styles -- */
const useStyles = makeStyles(theme => ({
  navLink: {
    margin: theme.spacing(1),
  },
}));

const PublicNavLinks = () => {
  const classes = useStyles();

  return (
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
  );
};

export default PublicNavLinks;
