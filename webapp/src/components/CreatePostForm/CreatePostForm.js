/* -- libs -- */
import React, { useState, useRef, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import clsx from 'clsx';

/* -- action -- */
import { createPost } from '../../actions/dataActions';
import { showAlert } from '../../actions/UIActions';

/* -- hooks -- */
import useTextCounter from '../../hooks/useTextCounter';
import useAuthChecker from '../../hooks/useAuthChecker';

/* -- component -- */
import AlertDialog from '../UI/AlertDialog';

/* -- mui -- */
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Avatar from '@material-ui/core/Avatar';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import DialogTitle from '@material-ui/core/DialogTitle';

/* -- styles -- */
import useStyles from './styles';

/* -- constants -- */
const charLimit = 500;

const CreatePostForm = ({ isOpen, onClose }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const { isAuthenticated, data } = useSelector(state => state.user);

  const [input, setInput] = useState('');
  const [isOpenCancelAlertDialog, setOpenCancelAlertDialog] = React.useState(
    false
  );

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  const { authenticate } = useAuthChecker();
  const { hasExceededLimit, textLength, countTextLength } = useTextCounter(
    charLimit
  );

  const onChange = e => {
    e.persist();
    setInput(e.target.value);
    countTextLength(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!input.trim()) return;
    dispatch(createPost(input))
      .then(() => {
        dispatch(showAlert('success', 'Post created successfully'));
        setInput('');
        onClose();
      })
      .catch(({ message }) => {
        dispatch(showAlert('error', message));
      });
  };
  const handleCancel = () => {
    if (input.trim().length === 0) {
      onClose();
      return;
    }
    setOpenCancelAlertDialog(true);
  };
  if (!isAuthenticated || !data) return false;
  return (
    <Fragment>
      <Dialog
        open={isOpen}
        onClose={onClose}
        onClick={() => authenticate()}
        scroll="paper"
        fullScreen={fullScreen}
        fullWidth
        maxWidth="sm"
        disableBackdropClick
        disableEscapeKeyDown
        aria-labelledby="form-title"
      >
        <DialogTitle id="form-title" className={classes.header}>
          Create Post
        </DialogTitle>
        <DialogContent>
          <form
            component="form"
            id="postForm"
            onSubmit={handleSubmit}
            className={classes.form}
          >
            <Avatar
              alt={data.credentials.username}
              src={data.credentials.imageUrl}
              className={clsx(
                classes.avatar,
                input.length > 0 ? classes.avatarHidden : ''
              )}
            />

            <InputBase
              id="post"
              name="post"
              type="text"
              multiline
              value={input}
              onChange={onChange}
              inputProps={{ 'aria-label': 'post' }}
              placeholder="Write something..."
              inputRef={inputRef}
              autoFocus
              fullWidth
              className={classes.input}
            />
          </form>
        </DialogContent>
        <DialogActions className={classes.action}>
          <Typography
            variant="caption"
            color={!hasExceededLimit ? 'textSecondary' : 'error'}
          >
            {!hasExceededLimit
              ? `${textLength}/${charLimit}`
              : `-${textLength - charLimit}`}
          </Typography>
          <Divider
            orientation="vertical"
            variant="middle"
            className={classes.divider}
          />
          <Button onClick={handleCancel}>Cancel</Button>
          <Button
            type="submit"
            form="postForm"
            onClick={handleSubmit}
            color="primary"
            variant="contained"
            disabled={hasExceededLimit || !input.trim().length}
            className={classes.submitButton}
          >
            Post
          </Button>
        </DialogActions>
      </Dialog>
      <AlertDialog
        open={isOpenCancelAlertDialog}
        title="Warning"
        text="You haven't finished your post yet. Do you want to leave without finishing?"
        confirmButtonText="Yes"
        cancelButtonText="No"
        onConfirm={onClose}
        onCancel={() => setOpenCancelAlertDialog(false)}
      />
    </Fragment>
  );
};

CreatePostForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CreatePostForm;
