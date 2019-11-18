/* -- libs -- */
import React, { useState, useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';

/* -- actions -- */
import { updateUserCredentials } from '../../actions/userActions.js';
import { clearError } from '../../actions/UIActions';

/* -- components -- */
import ExpandPanel from '../UI/ExpandPanel';

/* -- mui -- */
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

/* -- styles -- */
const useStyles = makeStyles(theme => ({
  heading: {
    fontSize: theme.typography.pxToRem(14),
    marginRight: 6,
    flexBasis: '20%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(14),
    color: theme.palette.colors.steelblue,
  },
  textField: {
    marginTop: theme.spacing(2),
  },
}));

const UserPasswordSetting = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { errors, isLoading } = useSelector(state => state.UI);
  const INITIAL_STATE = {
    name: 'password',
    value: {
      password: '',
      confirmPassword: '',
    },
  };
  const [input, setInput] = useState(INITIAL_STATE);

  useEffect(() => {
    dispatch(clearError('settings'));
    return () => {
      dispatch(clearError('settings'));
    };
  }, [dispatch]);

  const handleChange = e => {
    e.persist();
    setInput(prevState => ({
      ...prevState,
      value: { ...prevState.value, [e.target.name]: e.target.value },
    }));
  };
  const handleSubmit = () => {
    // dispatch form data
    dispatch(updateUserCredentials(input));
  };

  return (
    <ExpandPanel
      id="password"
      summary={
        <Fragment>
          <Typography className={classes.heading}>Password</Typography>
          <Typography className={classes.secondaryHeading}>
            ************
          </Typography>
        </Fragment>
      }
      action={
        <Button
          onClick={handleSubmit}
          color="primary"
          disabled={
            isLoading || !input.value.password || !input.value.confirmPassword
          }
        >
          {isLoading && input.value.password && input.value.confirmPassword
            ? 'Please Wait...'
            : ' Save Changes'}
        </Button>
      }
    >
      <Fragment>
        <Typography variant="body2">Change password.</Typography>
        <Typography variant="caption" color="secondary">
          Password must be at least 6 characters long and must contain at least
          one letter and one number.
        </Typography>
        <TextField
          name="currentPassword"
          id="currentPassword"
          type="password"
          disabled
          value="123456"
          className={classes.textField}
          label="Current password"
          variant="filled"
          fullWidth
        />

        <TextField
          name="password"
          id="password"
          type="password"
          required
          value={input.value.password}
          placeholder="Enter new password?"
          onChange={handleChange}
          helperText={errors.settings && errors.settings.password}
          error={errors.settings && !!errors.settings.password}
          className={classes.textField}
          label="New password"
          variant="filled"
          fullWidth
          disabled={isLoading}
        />
        <TextField
          name="confirmPassword"
          id="confirmPassword"
          type="password"
          required
          value={input.value.confirmPassword}
          placeholder="Re-type new password?"
          onChange={handleChange}
          helperText={errors.settings && errors.settings.confirmPassword}
          error={errors.settings && !!errors.settings.confirmPassword}
          className={classes.textField}
          label="Re-type new Password"
          variant="filled"
          fullWidth
          disabled={isLoading}
        />
      </Fragment>
    </ExpandPanel>
  );
};

export default UserPasswordSetting;
