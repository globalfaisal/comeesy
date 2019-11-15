/* -- libs -- */
import React, { useState, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

/* -- actions -- */
import { updateUserCredentials } from '../../actions/userActions.js';

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

const UserEmailSetting = ({ email }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { errors, isLoading } = useSelector(state => state.UI);
  const [input, setInput] = useState({ name: 'email', value: email });

  const handleChange = e => {
    e.persist();
    setInput(prevState => ({ ...prevState, value: e.target.value }));
  };
  const handleSubmit = () => {
    dispatch(updateUserCredentials(input));
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
          disabled={
            isLoading || !input.value || input.value.trim().length === 0
          }
        >
          {isLoading && input.value ? 'Please Wait...' : ' Save Changes'}
        </Button>
      }
    >
      <Fragment>
        <Typography variant="body2">Change your email accounts.</Typography>

        <TextField
          name="email"
          id="email"
          type="text"
          required
          value={input.value}
          placeholder="Enter new email?"
          onChange={handleChange}
          helperText={errors.settings && errors.settings.email}
          error={errors.settings && !!errors.settings.email}
          className={classes.textField}
          label="Email"
          variant="filled"
          fullWidth
          disabled={isLoading}
        />
        <FormHelperText color="secondary">
          Please use a valid email address. Email verification link will be sent
          to your new account.
        </FormHelperText>
      </Fragment>
    </ExpandPanel>
  );
};
UserEmailSetting.propTypes = {
  email: PropTypes.string.isRequired,
};

export default UserEmailSetting;
