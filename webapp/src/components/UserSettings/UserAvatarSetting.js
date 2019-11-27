/* -- libs -- */
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

/* -- actions -- */
import { uploadUserAvatar } from '../../actions/userActions.js';
import { showAlert } from '../../actions/UIActions';

/* -- mui -- */
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
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
    cursor: 'pointer',
    transition: 'all .2s ease-in-out',
    '&:hover': {
      transform: 'scale(1.1)',
    },
  },
  fab: {
    position: 'absolute',
    bottom: 4,
    left: '90%',
    transform: 'translate(-90%, 0)',
  },
}));
/* -- constants -- */
const acceptedTypes = ['image/jpeg', 'image/jpg', 'image/png'];

const readImageFile = file => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  return new Promise((resolve, reject) => {
    reader.onloadend = () => resolve(reader.result);
  });
};

const UserAvatarSetting = ({ imageUrl, loading }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [thumbnail, setThumbnail] = useState('');

  useEffect(() => {
    mapStateToCredentials(imageUrl);
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
    const fileDataUrl = await readImageFile(file);
    setThumbnail(fileDataUrl);
    // dispatch action
    dispatch(uploadUserAvatar(file))
      .then(({ message }) => {
        dispatch(showAlert({ type: 'success', message }));
      })
      .catch(({ message }) => {
        dispatch(showAlert({ type: 'error', message }));
      });
  };
  return (
    <div className={classes.avatarWrapper}>
      <Tooltip title="Update profile picture (maxsize: 2MB)">
        <Avatar
          src={thumbnail}
          className={classes.avatar}
          component="label"
          htmlFor="userImageInput"
        />
      </Tooltip>
      <Fab
        size="small"
        color="inherit"
        aria-label="add"
        component="label"
        htmlFor="userImageInput"
        className={classes.fab}
        disabled={loading}
      >
        <Tooltip title="Update profile picture (maxsize: 2MB)">
          <AddAPhotoIcon fontSize="small" />
        </Tooltip>
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
  loading: PropTypes.bool,
};
export default UserAvatarSetting;
