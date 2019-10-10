/* -- libs -- */
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

/* -- actions -- */
import { signup } from '../../actions/authActions';

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

const Signup = props => {
  const { inputs, handleChange, handleSubmit } = useAuthForm(signup);
  const auth = useSelector(state => state.auth);
  const { loading, errors } = auth;
  const classes = useStyle();
  return (
    <div className="login-page">
      <div className={classes.content}>
        <div>
          <Typography variant="h4">Join Us!</Typography>
        </div>
        <form
          noValidate
          name="signup-form"
          onSubmit={handleSubmit}
          className={classes.form}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                id="username"
                name="username"
                type="text"
                value={inputs.username}
                onChange={handleChange}
                helperText={errors && errors.username}
                error={errors && errors.username}
                label="Username"
                autoFocus
                color="primary"
                fullWidth
                className={classes.textField}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="firstname"
                name="firstname"
                type="text"
                value={inputs.firstname}
                onChange={handleChange}
                helperText={errors && errors.firstname}
                error={errors && errors.firstname}
                label="First Name"
                color="primary"
                className={classes.textField}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="lastname"
                name="lastname"
                type="text"
                value={inputs.lastname}
                onChange={handleChange}
                helperText={errors && errors.lastname}
                error={errors && errors.lastname}
                label="Last Name"
                color="primary"
                className={classes.textField}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="email"
                name="email"
                type="email"
                value={inputs.email}
                onChange={handleChange}
                helperText={errors && errors.email}
                error={errors && errors.email}
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
                value={inputs.password}
                onChange={handleChange}
                helperText={errors && errors.password}
                error={errors && errors.password}
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
                value={inputs.confirmPassword}
                onChange={handleChange}
                helperText={errors && errors.confirmPassword}
                error={errors && errors.confirmPassword}
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
              disabled={loading}
              className={classes.button}
            >
              Sign Up
              {loading && (
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
