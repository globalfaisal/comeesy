/* -- libs -- */
import React, { useState } from 'react';
import clsx from 'clsx';

/* -- custom hooks -- */
import useAuthForm from '../../hooks/useAuthForm';

/* -- mui -- */
import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyle = makeStyles(theme => ({
  content: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    maxWidth: 320,
    '& > form': {
      display: 'flex',
      flexDirection: 'column',
    },
  },
  textField: {
    marginBottom: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(3),
    minWidth: 100,
    maxWidth: 100,
  },
}));
const Login = props => {
  const classes = useStyle();
  const action = data => {
    console.log(data);
  };
  const { inputs, handleChange, handleSubmit } = useAuthForm(action);
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
            label="Email"
            autoFocus
            color="primary"
            className={classes.textField}
          />
          <TextField
            id="password"
            name="password"
            type="password"
            value={inputs.password}
            onChange={handleChange}
            label="Password"
            color="primary"
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
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
