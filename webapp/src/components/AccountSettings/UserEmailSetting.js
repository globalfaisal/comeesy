/* -- libs -- */
import React, { useState, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

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
  textField: {
    marginTop: theme.spacing(2),
  },
}));

const UserEmailSetting = ({ email }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { errors, isLoading } = useSelector(state => state.UI);
  const [value, setValue] = useState(email);

  const handleChange = e => {
    e.persist();
    setValue(e.target.value);
  };
  const handleSubmit = () => {
    console.log(value);
  };

  return (
    <ExpandPanel
      id="email"
      heading="Email"
      secondaryHeading={email}
      actionContent={
        <Button
          onClick={handleSubmit}
          color="primary"
          disabled={isLoading || !value || value.trim().length === 0}
        >
          {isLoading && value ? 'Please Wait...' : ' Update Changes'}
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
          value={value}
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
