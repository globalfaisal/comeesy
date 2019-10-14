/* -- libs -- */
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

/* -- actions -- */
import { login } from '../../actions/userActions';

/* -- custom hooks -- */
import useAuthForm from '../../hooks/useAuthForm';

/* -- mui -- */
import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyle = makeStyles(theme => ({
  content: {
    marginBottom: theme.spacing(3),
    maxWidth: 320,
  },
  textField: {
    marginTop: theme.spacing(1),
  },
  button: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    minWidth: 100,
    maxWidth: 100,
    position: 'relative',
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(2),
    },
  },
  loginProgress: {
    position: 'absolute',
    color: theme.palette.colors.dark,
  },
  signupHelperButton: {
    marginLeft: theme.spacing(1),
    color: theme.palette.primary.main,
  },
}));

const Login = () => {
  const classes = useStyle();
  const { inputs, handleChange, handleSubmit } = useAuthForm(login);
  const { isLoading, errors } = useSelector(state => state.UI);
  const error = errors && errors.form;

  return (
    <div className="login-page">
      <div className={classes.content}>
        <div>
          <Typography variant="h5" gutterBottom>
            Login
          </Typography>
          <Typography variant="body1" color="textSecondary" paragraph>
            To keep connected with us please login with your personal info.
          </Typography>
        </div>
        <form
          noValidate
          name="login-form"
          onSubmit={handleSubmit}
          className={classes.form}
        >
          <TextField
            id="email"
            name="email"
            type="email"
            defaultValue={inputs.email}
            onChange={handleChange}
            helperText={error && error.email}
            error={error && !!error.email}
            label="Email"
            autoFocus
            color="primary"
            fullWidth
            className={classes.textField}
          />

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
            fullWidth
            className={classes.textField}
          />
          <div>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="small"
              disabled={isLoading}
              className={classes.button}
            >
              Log in
              {isLoading && (
                <CircularProgress size={22} className={classes.loginProgress} />
              )}
            </Button>
            <Typography variant="body2">
              New to Comeesy?
              <Typography
                variant="body2"
                component={Link}
                to="/auth/signup"
                className={classes.signupHelperButton}
              >
                Sign up now »
              </Typography>
            </Typography>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
