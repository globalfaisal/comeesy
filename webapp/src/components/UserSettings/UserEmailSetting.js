/* -- libs -- */
import React, { useState, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

/* -- actions -- */
import { updateUserCredentials } from '../../actions/userActions.js';
import { showAlert } from '../../actions/UIActions';

/* -- components -- */
import ExpandPanel from '../UI/ExpandPanel';

/* -- mui -- */
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
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

const UserEmailSetting = ({ email, error, loading }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [input, setInput] = useState({ name: 'email', value: email });

  const handleChange = e => {
    e.persist();
    setInput(prevState => ({ ...prevState, value: e.target.value }));
  };
  const handleSubmit = () => {
    dispatch(updateUserCredentials(input))
      .then(({ message }) => {
        dispatch(showAlert({ type: 'success', message }));
      })
      .catch(({ message }) => {
        dispatch(showAlert({ type: 'error', message }));
      });
  };

  return (
    <ExpandPanel
      id="email"
      summary={
        <Fragment>
          <Typography className={classes.heading}>Email</Typography>
          <Typography className={classes.secondaryHeading}>{email}</Typography>
        </Fragment>
      }
      action={
        <Button
          onClick={handleSubmit}
          color="primary"
          disabled={loading || !input.value || input.value.trim().length === 0}
        >
          {loading && input.value ? 'Please Wait...' : ' Save Changes'}
        </Button>
      }
    >
      <Fragment>
        <Typography variant="body2">Change your email accounts.</Typography>
        <Typography variant="caption" color="secondary">
          Please use a valid email address.
        </Typography>
        <TextField
          name="email"
          id="email"
          type="text"
          required
          value={input.value}
          placeholder="Enter new email?"
          onChange={handleChange}
          helperText={error && error.email}
          error={error && !!error.email}
          className={classes.textField}
          label="Email"
          variant="filled"
          fullWidth
          disabled={loading}
        />
      </Fragment>
    </ExpandPanel>
  );
};
UserEmailSetting.propTypes = {
  email: PropTypes.string.isRequired,
  error: PropTypes.object,
  loading: PropTypes.bool,
};

export default UserEmailSetting;
