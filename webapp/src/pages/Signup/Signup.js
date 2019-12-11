/* -- libs -- */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

/* -- actions -- */
import { signup } from '../../actions/userActions';
import { clearErrors } from '../../actions/UIActions';

/* -- mui -- */
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

/* -- styles -- */
import useStyles from './styles';

const Signup = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { loading, error } = useSelector(state => state.user);

  const [inputs, setInputs] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  useEffect(() => {
    dispatch(clearErrors());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = event => {
    event.persist();
    setInputs(prevInputs => ({
      ...prevInputs,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(signup(inputs)).catch(error => console.log('SIGNUP: ', error));
  };

  return (
    <div className="signup-page">
      <div className={classes.content}>
        <Typography variant="h6" paragraph>
          Sign up
        </Typography>
        <form
          name="signup-form"
          onSubmit={handleSubmit}
          noValidate
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
                helperText={error && error.name}
                error={error && !!error.name}
                disabled={loading}
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
                helperText={error && error.username}
                error={error && !!error.username}
                disabled={loading}
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
                disabled={loading}
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
                disabled={loading}
                label="Password"
                color="primary"
                autoComplete="new-password"
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
                disabled={loading}
                label="Confirm Password"
                color="primary"
                autoComplete="new-password"
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
              Sign up
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
