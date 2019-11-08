/* -- libs -- */
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

/* -- actions -- */
import { signup } from '../../actions/userActions';

/* -- custom hooks -- */
import useAuthForm from '../../hooks/useAuthForm';

/* -- mui -- */
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

/* -- styles -- */
import useStyles from './styles';

const Signup = () => {
  const classes = useStyles();
  const { inputs, handleChange, handleSubmit } = useAuthForm(signup);
  const { isLoading, errors } = useSelector(state => state.UI);

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
            <Grid item xs={12}>
              <TextField
                id="name"
                name="name"
                type="text"
                defaultValue={inputs.name}
                onChange={handleChange}
                helperText={errors.auth && errors.auth.name}
                error={errors.auth && !!errors.auth.name}
                disabled={isLoading}
                label="Name"
                color="primary"
                autoFocus
                fullWidth
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
                helperText={errors.auth && errors.auth.username}
                error={errors.auth && !!errors.auth.username}
                disabled={isLoading}
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
                helperText={errors.auth && errors.auth.email}
                error={errors.auth && !!errors.auth.email}
                disabled={isLoading}
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
                helperText={errors.auth && errors.auth.password}
                error={errors.auth && !!errors.auth.password}
                disabled={isLoading}
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
                helperText={errors.auth && errors.auth.confirmPassword}
                error={errors.auth && !!errors.auth.confirmPassword}
                disabled={isLoading}
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
