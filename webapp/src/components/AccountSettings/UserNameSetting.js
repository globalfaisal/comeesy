/* -- libs -- */
import React, { useState, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

/* -- actions -- */
import { updateUserDetails } from '../../actions/userActions';

/* -- components -- */
import ExpandPanel from '../UI/ExpandPanel';

/* -- mui -- */
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';
import EditSharpIcon from '@material-ui/icons/EditSharp';

/* -- styles -- */
const useStyles = makeStyles(theme => ({
  textField: {
    marginTop: theme.spacing(2),
  },
}));

const UserNameSetting = ({ name }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { errors, isLoading } = useSelector(state => state.UI);
  const [value, setValue] = useState(name);

  const handleChange = e => {
    e.persist();
    setValue(e.target.value);
  };
  const handleSubmit = () => {
    dispatch(updateUserDetails({ name: value }));
  };

  return (
    <ExpandPanel
      id="name"
      heading="Name"
      secondaryHeading={name}
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
        <Typography variant="body2">Change your name!</Typography>

        <TextField
          name="name"
          id="name"
          type="text"
          required
          value={value}
          placeholder="What is your name?"
          onChange={handleChange}
          helperText={errors.settings && errors.settings.name}
          error={errors.settings && !!errors.settings.name}
          className={classes.textField}
          label="Name"
          variant="filled"
          fullWidth
          disabled={isLoading}
        />
        <FormHelperText color="secondary">
          Note: Don't add unusual capitalization, punctuation, numbers or
          characters.
        </FormHelperText>
      </Fragment>
    </ExpandPanel>
  );
};
UserNameSetting.propTypes = {
  name: PropTypes.string.isRequired,
};

export default UserNameSetting;
