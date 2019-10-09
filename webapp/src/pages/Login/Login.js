/* -- libs -- */
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

/* -- actions -- */
import { login } from '../../actions/authActions';

/* -- custom hooks -- */
import useAuthForm from '../../hooks/useAuthForm';

/* -- mui -- */
import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyle = makeStyles(theme => ({
  content: {
    marginTop: theme.spacing(3),
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
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(2),
    },
  },
  signupHelperButton: {
    color: theme.palette.secondary.main,
  },
}));
const Login = props => {
  const { inputs, handleChange, handleSubmit } = useAuthForm(login);
  const errors = useSelector(state => state.auth.errors);
  const classes = useStyle();
  return (
    <div className="login-page">
      <div className={classes.content}>
        <div>
          <Typography variant="h4" gutterBottom>
            Welcome Back!
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
            value={inputs.email}
            onChange={handleChange}
            helperText={errors && errors.email}
            error={!!(errors && errors.email)}
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
            value={inputs.password}
            onChange={handleChange}
            helperText={errors && errors.password}
            error={errors && errors.password}
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
              className={classes.button}
            >
              Login
            </Button>
            <Typography variant="body2">
              New to Comeesy?
              <Button
                component={Link}
                to="/auth/signup"
                className={classes.signupHelperButton}
              >
                Sign up now »
              </Button>
            </Typography>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
