/* -- libs -- */
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

/* -- actions -- */
import { uploadUserAvatar } from '../../actions/userActions.js';
import { clearError } from '../../actions/UIActions';

/* -- mui -- */
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';

/* -- styles -- */
const useStyles = makeStyles(theme => ({
  avatarWrapper: {
    height: 160,
    width: 160,

    alignSelf: 'center',
    position: 'relative',
  },
  avatar: {
    width: '100%',
    height: '100%',
    border: `4px solid ${theme.palette.colors.greylight}`,
    backgroundColor: theme.palette.colors.greylight,
  },
  fab: {
    position: 'absolute',
    bottom: 4,
    left: '90%',
    transform: 'translate(-90%, 0)',
  },
}));
/* -- constants -- */
const acceptedTypes = ['image/jpeg', 'image/png'];

const readImageFile = file => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  return new Promise((resolve, reject) => {
    reader.onloadend = () => resolve(reader.result);
  });
};

const UserAvatarSetting = ({ imageUrl, errors, loading }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const uploadErrorMsg = errors && errors.upload ? errors.upload.avatar : '';

  const [thumbnail, setThumbnail] = useState('');

  useEffect(() => {
    mapStateToCredentials(imageUrl);
    return () => {
      dispatch(clearError('upload'));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageUrl]);

  const mapStateToCredentials = imgUrl => {
    if (!imgUrl) return null;
    setThumbnail(imgUrl);
  };

  const handleChange = async e => {
    e.persist();
    const file = e.target.files[0];
    if (!file) return null;
    dispatch(uploadUserAvatar(file));
    const fileDataUrl = await readImageFile(file);
    setThumbnail(fileDataUrl);
  };

  return (
    <div className={classes.avatarWrapper}>
      <Avatar src={thumbnail} className={classes.avatar} />
      <Fab
        size="small"
        color="inherit"
        aria-label="add"
        component="label"
        htmlFor="userImageInput"
        className={classes.fab}
        disabled={loading}
      >
        <AddAPhotoIcon fontSize="small" />
      </Fab>
      <input
        name="userImage"
        id="userImageInput"
        type="file"
        onChange={handleChange}
        accept={acceptedTypes}
        disabled={loading}
        hidden="hidden"
      />
    </div>
  );
};

UserAvatarSetting.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  errors: PropTypes.object,
  loading: PropTypes.bool,
};
export default UserAvatarSetting;
