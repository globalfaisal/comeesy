/* -- libs -- */
import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import clsx from 'clsx';

/* -- action -- */
import { createPost } from '../../actions/dataActions';
import { showAlert } from '../../actions/UIActions';

/* -- hooks -- */
import useTextCounter from '../../hooks/useTextCounter';
import useAuthChecker from '../../hooks/useAuthChecker';

/* -- mui -- */
import { Modal as MuiModal } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

/* -- styles -- */
import useStyles from './styles';

/* -- styles -- */
const charLimit = 500;

const CreatePostForm = ({ isOpen, onClose }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const { isAuthenticated, data } = useSelector(state => state.user);

  const [input, setInput] = useState('');

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

  if (!isAuthenticated || !data) return false;
  return (
    <MuiModal
      aria-labelledby="modal-title"
      className={classes.modal}
      open={isOpen}
      onClose={onClose}
      disableAutoFocus
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={isOpen}>
        <Card className={classes.card} onClick={() => authenticate()}>
          <CardHeader
            className={classes.header}
            title={
              <Typography variant="h6" color="textSecondary">
                Create Post
              </Typography>
            }
            action={
              <IconButton
                key="close"
                aria-label="close"
                size="small"
                onClick={onClose}
              >
                <CloseIcon />
              </IconButton>
            }
          />
          <CardContent
            className={classes.content}
            component="form"
            id="postForm"
            onSubmit={handleSubmit}
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
          </CardContent>
          <CardActions className={classes.action}>
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
            <Button
              type="submit"
              form="postForm"
              color="primary"
              variant="contained"
              size="small"
              disabled={hasExceededLimit || !input.trim().length}
              className={classes.submitButton}
            >
              Post
            </Button>
          </CardActions>
        </Card>
      </Fade>
    </MuiModal>
  );
};

CreatePostForm.propTypes = {};

export default CreatePostForm;
