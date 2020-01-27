/* -- libs -- */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

/* -- actions -- */
import { login } from '../../actions/userActions';
import { clearErrors, closeModal, showAlert } from '../../actions/UIActions';

/* -- mui -- */
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

/* -- styles -- */
import useStyles from './styles';

const Login = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { loading, error } = useSelector(state => state.user);

  const [inputs, setInputs] = useState({ email: '', password: '' });

  useEffect(
    () => () => {
      dispatch(clearErrors());
    },
    []
  );

  const handleChange = event => {
    event.persist();
    setInputs(prevInputs => ({
      ...prevInputs,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(login(inputs))
      .then(() => dispatch(closeModal()))
      .catch(({ message }) => dispatch(showAlert('error', message)));
  };

  return (
    <div className="login-page">
      <div className={classes.content}>
        <Typography variant="h6" gutterBottom>
          Login
        </Typography>

        {error && error.account && (
          <Typography variant="body2" color="error" gutterBottom>
            {error.account}
          </Typography>
        )}

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
            disabled={loading}
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
            disabled={loading}
            label="Password"
            color="primary"
            autoComplete="new-password"
            fullWidth
            className={classes.textField}
          />
          <div>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="small"
              disabled={loading}
              className={classes.button}
            >
              Log in
              {loading && (
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
