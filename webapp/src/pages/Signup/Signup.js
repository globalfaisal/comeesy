/* -- libs -- */
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

/* -- actions -- */
import { signup } from '../../actions/userActions';

/* -- custom hooks -- */
import useAuthForm from '../../hooks/useAuthForm';

/* -- mui -- */
import { makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyle = makeStyles(theme => ({
  content: {
    marginBottom: theme.spacing(1),
    maxWidth: 320,
  },
  textField: {
    margin: 0,
  },
  button: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    minWidth: 100,
    maxWidth: 100,
    position: 'relative',
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(1),
    },
  },
  singupProgress: {
    position: 'absolute',
    color: theme.palette.colors.dark,
  },
  loginHelperButton: {
    marginLeft: theme.spacing(3),
    color: theme.palette.primary.main,
  },
}));

const Signup = () => {
  const classes = useStyle();
  const { inputs, handleChange, handleSubmit } = useAuthForm(signup);
  const { isLoading, errors } = useSelector(state => state.UI);
  const error = errors && errors.form;

  return (
    <div className="signup-page">
      <div className={classes.content}>
        <div>
          <Typography variant="h5" paragraph>
            Join Us!
          </Typography>
        </div>
        <form
          noValidate
          name="signup-form"
          onSubmit={handleSubmit}
          className={classes.form}
        >
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                id="firstname"
                name="firstname"
                type="text"
                defaultValue={inputs.firstname}
                onChange={handleChange}
                helperText={error && error.firstname}
                error={error && !!error.firstname}
                label="First Name"
                color="primary"
                autoFocus
                className={classes.textField}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="lastname"
                name="lastname"
                type="text"
                defaultValue={inputs.lastname}
                onChange={handleChange}
                helperText={error && error.lastname}
                error={error && !!error.lastname}
                label="Last Name"
                color="primary"
                className={classes.textField}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="username"
                name="username"
                type="text"
                defaultValue={inputs.username}
                onChange={handleChange}
                helperText={error && error.username}
                error={error && !!error.username}
                label="Username"
                color="primary"
                fullWidth
                className={classes.textField}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="email"
                name="email"
                type="email"
                defaultValue={inputs.email}
                onChange={handleChange}
                helperText={error && error.email}
                error={error && !!error.email}
                label="Email"
                color="primary"
                fullWidth
                className={classes.textField}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="password"
                name="password"
                type="password"
                defaultValue={inputs.password}
                onChange={handleChange}
                helperText={error && error.password}
                error={error && !!error.password}
                label="Password"
                color="primary"
                className={classes.textField}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                defaultValue={inputs.confirmPassword}
                onChange={handleChange}
                helperText={error && error.confirmPassword}
                error={error && !!error.confirmPassword}
                label="Confirm Password"
                color="primary"
                className={classes.textField}
              />
            </Grid>
          </Grid>
          <div>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="small"
              disabled={isLoading}
              className={classes.button}
            >
              Sign up
              {isLoading && (
                <CircularProgress
                  size={22}
                  className={classes.singupProgress}
                />
              )}
            </Button>
            <Typography
              variant="body2"
              component={Link}
              to="/auth/login"
              className={classes.loginHelperButton}
            >
              I am already a member »
            </Typography>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
