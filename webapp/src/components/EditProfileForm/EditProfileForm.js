/* -- libs -- */
import React, { useState, Fragment } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import clsx from 'clsx';

/* -- components -- */
import DatePicker from '../UI/DatePicker';

/* -- utils -- */
import {
  formatToYearMonthDay,
  subtractFromToday,
} from '../../utils/helpers/dates';

/* -- mui -- */
import Avatar from '@material-ui/core/Avatar';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ListItemText from '@material-ui/core/ListItemText';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

/* -- styles -- */
import useStyle from './styles';

/* -- constants -- */
const acceptedTypes = ['image/jpeg', 'image/png'];
const maxFileSize = 2097152;

const EditProfileForm = props => {
  const classes = useStyle();

  const { isAuthenticated, credentials } = useSelector(state => state.user);

  const [inputs, setInputs] = useState({});
  const [image, setImage] = useState({ thumbnail: '', file: null });

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
      birthdate: formatToYearMonthDay(date),
    }));
  };

  const handleImageInputChange = e => {
    e.persist();
    const file = e.target.files[0];
    if (!file) return null;
    // handle big file size
    if (file.size > maxFileSize) {
      console.error('ERROR: Large file size');
      setImage({ thumbnail: '', file: null });
      return;
    }
    // handle wrong file types
    if (!acceptedTypes.includes(file.type)) {
      console.error('ERROR: File type not supported');
      setImage({ thumbnail: '', file: null });
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage({
        thumbnail: reader.result,
        file,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log('Image: ', image);
    console.log('Inputs: ', inputs);
  };

  const renderContent = () => {
    if (!isAuthenticated) return null;
    return (
      <form onSubmit={handleSubmit} noValidate autoComplete="off">
        <div className={classes.content}>
          <FormGroup row>
            <Avatar
              alt={credentials.username}
              src={image.thumbnail || credentials.imageUrl}
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
              defaultValue={inputs.name || credentials.name}
              onChange={handleInputChange}
              label="Name"
              placeholder="What's your name?"
              fullWidth
              variant="outlined"
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
              value={inputs.gender || 'unspecified'}
              onChange={handleInputChange}
              labelWidth={50}
            >
              <MenuItem value="unspecified">Unspecified</MenuItem>
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </Select>
          </FormControl>

          <FormControl className={classes.formControl} fullWidth>
            <DatePicker
              name="birthdate"
              id="birthdate"
              label="Birth Date"
              value={inputs.birthdate || subtractFromToday(0)}
              onChange={handleDateInputChange}
              disableFuture
              maxDate={subtractFromToday(14)}
              inputVariant="outlined"
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
            />
          </FormControl>
        </div>
        <div className={classes.action}>
          <Button variant="contained" color="primary" type="submit">
            Save
          </Button>
        </div>
      </form>
    );
  };
  return renderContent();
};

EditProfileForm.propTypes = {};
export default EditProfileForm;
