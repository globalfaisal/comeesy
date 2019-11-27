/* -- libs -- */
import React, { useState, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

/* -- actions -- */
import { updateUserCredentials } from '../../actions/userActions';
import { showAlert } from '../../actions/UIActions';

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

const UserNameSetting = ({ name, error, loading }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [input, setInput] = useState({ name: 'name', value: name });

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
      id="name"
      summary={
        <Fragment>
          <Typography className={classes.heading}>Name</Typography>
          <Typography className={classes.secondaryHeading}>{name}</Typography>
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
        <Typography variant="body2">Change your name!</Typography>
        <Typography variant="caption" color="secondary">
          Note: Name should be authentic. Don't add unusual capitalization,
          punctuation, numbers or characters.
        </Typography>

        <TextField
          name="name"
          id="name"
          type="text"
          required
          value={input.value}
          placeholder="What is your name?"
          onChange={handleChange}
          helperText={error && error.name}
          error={error && !!error.name}
          className={classes.textField}
          label="Name"
          variant="filled"
          fullWidth
          disabled={loading}
        />
      </Fragment>
    </ExpandPanel>
  );
};
UserNameSetting.propTypes = {
  name: PropTypes.string.isRequired,
  error: PropTypes.object,
  loading: PropTypes.bool,
};

export default UserNameSetting;
