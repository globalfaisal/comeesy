/* -- libs -- */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';

/* -- actions -- */
import { addUserDetails, uploadUserAvatar } from '../../actions/userActions';
import { clearError } from '../../actions/UIActions';

/* -- components -- */
import DatePickerInput from '../UI/DatePickerInput';
import Loading from '../UI/Loading';

/* -- utils -- */
import { subtractFromToday } from '../../utils/helpers/dates';

/* -- mui -- */
import Avatar from '@material-ui/core/Avatar';
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';

/* -- styles -- */
import useStyle from './styles';

/* -- constants -- */
const acceptedTypes = ['image/jpeg', 'image/png'];

const EditProfileForm = props => {
  const classes = useStyle();
  const dispatch = useDispatch();

  const { credentials } = useSelector(state => state.user);
  const { isLoading, errors } = useSelector(state => state.UI);

  const uploadErrorMsg = errors && errors.upload ? errors.upload.avatar : '';

  const [inputs, setInputs] = useState({});
  const [imageInput, setImageInput] = useState({ thumbnail: '', file: null });

  useEffect(
    () => () => {
      dispatch(clearError('settings'));
      dispatch(clearError('upload'));
    },
    [dispatch]
  );

  const handleInputChange = e => {
    e.persist();
    setInputs(prevInputs => ({
      ...prevInputs,
      [e.target.name]: e.target.value,
    }));
  };
  const handleDateInputChange = date => {
    setInputs(prevInputs => ({
      ...prevInputs,
      birthdate: date,
    }));
  };

  const handleImageInputChange = e => {
    e.persist();
    const file = e.target.files[0];
    if (!file) return null;

    // handle wrong file types
    // if (!acceptedTypes.includes(file.type)) {
    //   console.error('ERROR: File type not supported');
    //   setImageInput({ thumbnail: '', file: null });
    //   return;
    // }

    // add file to  state
    setImageInput(prevState => ({
      ...prevState,
      file,
    }));
    // create thumbnail and add to state
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageInput(prevState => ({
        ...prevState,
        thumbnail: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (_.keys(inputs).length > 0) {
      const data = { ...inputs };
      if (data.name === undefined) data.name = credentials.name;
      // dispatch data
      dispatch(addUserDetails(data));
    }
    if (imageInput.file !== null) {
      dispatch(uploadUserAvatar(imageInput.file));
    }
  };

  const renderContent = () => {
    if (!credentials) return null;
    return (
      <form onSubmit={handleSubmit} noValidate autoComplete="off">
        <div className={classes.content}>
          <FormGroup row>
            <Avatar
              alt={credentials.username}
              src={imageInput.thumbnail || credentials.imageUrl}
              classes={{ root: classes.avatar }}
            />
            <div className={classes.imageInputContainer}>
              <input
                name="image"
                id="image"
                type="file"
                onChange={handleImageInputChange}
                accept={acceptedTypes}
                hidden="hidden"
              />
              <div className={classes.imageInputContent}>
                <Button
                  size="small"
                  variant="outlined"
                  component="label"
                  htmlFor="image"
                  disabled={isLoading}
                >
                  Choose Image
                </Button>
                <FormHelperText> JPG or PNG, Max size: 2MB</FormHelperText>
              </div>
            </div>
          </FormGroup>
          <FormControl className={classes.formControl} fullWidth>
            <TextField
              name="name"
              id="name"
              type="text"
              required
              defaultValue={inputs.name || credentials.name}
              placeholder="What is your name?"
              onChange={handleInputChange}
              helperText={errors.settings && errors.settings.name}
              error={errors.settings && !!errors.settings.name}
              label="Name"
              fullWidth
              variant="outlined"
              disabled={isLoading}
            />
          </FormControl>
          <FormControl
            variant="outlined"
            className={classes.formControl}
            fullWidth
          >
            <InputLabel htmlFor="gender">Gender</InputLabel>
            <Select
              name="gender"
              id="gender"
              value={inputs.gender || credentials.gender}
              onChange={handleInputChange}
              labelWidth={50}
              disabled={isLoading}
            >
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
              value={
                inputs.birthdate === null
                  ? null
                  : inputs.birthdate || credentials.birthdate
              }
              onChange={handleDateInputChange}
              openTo="year"
              format="YYYY/MM/DD"
              views={['year', 'month', 'date']}
              inputVariant="outlined"
              disableFuture
              maxDate={subtractFromToday(14)}
              maxDateMessage="Oops! you are too young for this 🤦‍"
              clearable
              disabled={isLoading}
            />
          </FormControl>
          <FormControl className={classes.formControl} fullWidth>
            <TextField
              name="location"
              id="location"
              type="text"
              defaultValue={inputs.location || credentials.location}
              onChange={handleInputChange}
              label="Location"
              placeholder="Add your location"
              variant="outlined"
              disabled={isLoading}
            />
          </FormControl>
          <FormControl className={classes.formControl} fullWidth>
            <TextField
              name="bio"
              id="bio"
              type="text"
              defaultValue={inputs.bio || credentials.bio}
              onChange={handleInputChange}
              label="Bio"
              placeholder="Say something about yourself"
              multiline
              rows={4}
              rowsMax={4}
              variant="outlined"
              disabled={isLoading}
            />
          </FormControl>
        </div>
        <div className={classes.action}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isLoading || (!_.keys(inputs).length && !imageInput.file)}
            className={classes.button}
          >
            Save Changes
            {isLoading && (
              <CircularProgress size={22} className={classes.savingProgress} />
            )}
          </Button>
        </div>
      </form>
    );
  };
  return renderContent();
};

EditProfileForm.propTypes = {};
export default EditProfileForm;
