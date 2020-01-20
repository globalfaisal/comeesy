/* -- libs -- */
import React, { useState, useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

/* -- actions -- */
import { updateUserDetails } from '../../actions/userActions';
import { showAlert, clearErrors } from '../../actions/UIActions';

/* -- hooks -- */
import useTextCounter from '../../hooks/useTextCounter';

/* -- components -- */
import DatePickerInput from '../UI/DatePickerInput';

/* -- utils -- */
import { subtractDateFromToday } from '../../utils/helperFns';

/* -- mui -- */
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';

/* -- styles -- */
const useStyle = makeStyles(theme => ({
  action: {
    marginTop: 32,
  },
  formControl: {
    marginTop: theme.spacing(4),
  },
  button: {
    position: 'relative',
  },
  savingProgress: {
    position: 'absolute',
    color: theme.palette.colors.dark,
  },
  count: {
    '& > span:last-child': { float: 'right' },
  },
}));

/* -- constants -- */
const locationCharLimit = 50;
const bioCharLimit = 160;

const UserDetailsSetting = ({ credentials, loading }) => {
  const classes = useStyle();
  const dispatch = useDispatch();
  const { error } = useSelector(state => state.user);

  const {
    hasExceededLimit: locationExceededLimit,
    textLength: locationLength,
    countTextLength: countLocationLength,
  } = useTextCounter(locationCharLimit);

  const {
    hasExceededLimit: bioExceededLimit,
    textLength: bioLength,
    countTextLength: countBioLength,
  } = useTextCounter(bioCharLimit);

  const [inputs, setInputs] = useState({
    gender: '',
    birthdate: null,
    location: '',
    bio: '',
  });

  useEffect(() => {
    mapStateToCredentials(credentials);
    dispatch(clearErrors());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const mapStateToCredentials = c => {
    if (!c) return null;
    setInputs({
      gender: c.gender || '',
      birthdate: c.birthdate || null,
      location: c.location || '',
      bio: c.bio || '',
    });
    countBioLength(c.bio || '');
    countLocationLength(c.location || '');
  };

  const handleInputChange = e => {
    e.persist();
    setInputs(prevInputs => ({
      ...prevInputs,
      [e.target.name]: e.target.value,
    }));
    if (e.target.id === 'location') countLocationLength(e.target.value);
    if (e.target.id === 'bio') countBioLength(e.target.value);
  };

  const handleDateInputChange = date => {
    setInputs(prevInputs => ({
      ...prevInputs,
      birthdate: date,
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    // dispatch data
    dispatch(updateUserDetails(inputs))
      .then(({ message }) => {
        dispatch(showAlert('success', message));
      })
      .catch(({ message }) => {
        dispatch(showAlert('error', message));
      });
  };

  return (
    <form onSubmit={handleSubmit} noValidate autoComplete="off">
      <FormControl variant="outlined" className={classes.formControl} fullWidth>
        <InputLabel htmlFor="gender">Gender</InputLabel>
        <Select
          name="gender"
          id="gender"
          value={inputs.gender}
          onChange={handleInputChange}
          labelWidth={50}
          disabled={loading}
        >
          <MenuItem value="">None</MenuItem>
          <MenuItem value="unspecified">Unspecified</MenuItem>
          <MenuItem value="male">Male</MenuItem>
          <MenuItem value="female">Female</MenuItem>
        </Select>
      </FormControl>

      <FormControl className={classes.formControl} fullWidth>
        <DatePickerInput
          name="birthdate"
          id="birthdate"
          label="Birth Date"
          value={inputs.birthdate}
          onChange={handleDateInputChange}
          openTo="year"
          format="YYYY/MM/DD"
          views={['year', 'month', 'date']}
          inputVariant="outlined"
          disableFuture
          maxDate={subtractDateFromToday(14)}
          maxDateMessage="Oops! you are too young for this 🤦‍"
          clearable
          disabled={loading}
        />
      </FormControl>

      <FormControl
        className={classes.formControl}
        fullWidth
        error={(error && error.location) || locationExceededLimit}
      >
        <TextField
          name="location"
          id="location"
          type="text"
          value={inputs.location}
          onChange={handleInputChange}
          label="Location"
          placeholder="Add your location"
          variant="outlined"
          disabled={loading}
          error={(error && error.location) || locationExceededLimit}
        />
        <FormHelperText className={classes.count}>
          <span>{error && error.location}</span>
          <span>
            {' '}
            {!locationExceededLimit
              ? `${locationLength}/${locationCharLimit}`
              : `-${locationLength - locationCharLimit}`}
          </span>
        </FormHelperText>
      </FormControl>
      <FormControl
        className={classes.formControl}
        fullWidth
        error={(error && error.bio) || bioExceededLimit}
      >
        <TextField
          name="bio"
          id="bio"
          type="text"
          value={inputs.bio}
          onChange={handleInputChange}
          label="Bio"
          placeholder="Say something about yourself"
          multiline
          rows={4}
          rowsMax={4}
          variant="outlined"
          disabled={loading}
          error={(error && error.bio) || bioExceededLimit}
        />
        <FormHelperText className={classes.count}>
          <span>{error && error.bio}</span>
          <span>
            {!bioExceededLimit
              ? `${bioLength}/${bioCharLimit}`
              : `-${bioLength - bioCharLimit}`}
          </span>
        </FormHelperText>
      </FormControl>
      <div className={classes.action}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading || bioExceededLimit || locationExceededLimit}
          className={classes.button}
        >
          Save Changes
          {loading && (
            <CircularProgress size={22} className={classes.savingProgress} />
          )}
        </Button>
      </div>
    </form>
  );
};
UserDetailsSetting.propTypes = {
  credentials: PropTypes.object.isRequired,
  loading: PropTypes.bool,
};
export default UserDetailsSetting;
