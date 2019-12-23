/* -- libs -- */
import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

/* -- actions -- */
import { submitComment } from '../../actions/dataActions';

/* -- hooks -- */
import useTextCounter from '../../hooks/useTextCounter';
import useAuthChecker from '../../hooks/useAuthChecker';

/* -- mui -- */
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';

/* -- styles -- */
import deafultAvatarPath from '../../assets/images/default-avatar.png';

/* -- styles -- */
import useStyles from './styles';

const MAX_CHAR = 500;

const CommentBox = ({ postId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const { data } = useSelector(state => state.user);
  const user = data ? data.credentials : null;

  const [input, setInput] = useState('');
  const [commentError, setCommentError] = useState('');
  const { authenticate } = useAuthChecker();
  const { hasExceededLimit, textLength, countTextLength } = useTextCounter(
    MAX_CHAR
  );

  const handleChange = e => {
    e.persist();
    setInput(e.target.value);
    countTextLength(e.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(submitComment(postId, input.trim()))
      .then(() => setCommentError(''))
      .catch(({ error }) => setCommentError(error));
  };

  const checkAuth = () => {
    authenticate();
    inputRef.current.focus();
  };

  return (
    <div className={classes.commentBox}>
      <Avatar
        alt="avatar"
        src={user ? user.imageUrl : deafultAvatarPath}
        className={classes.avatar}
      />
      <Paper
        component="form"
        elevation={0}
        className={classes.paper}
        onSubmit={handleSubmit}
        onClick={checkAuth}
      >
        <FormControl fullWidth error={hasExceededLimit}>
          <InputBase
            id="comment"
            name="comment"
            type="text"
            multiline
            value={input}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'comment' }}
            placeholder="Write a comment..."
            inputRef={inputRef}
            rowsMax={6}
            autoFocus
            className={classes.input}
          />

          <div className={classes.action}>
            {commentError && (
              <FormHelperText className={classes.errorMsg}>
                {commentError}
              </FormHelperText>
            )}
            <FormHelperText className={classes.count}>
              {!hasExceededLimit
                ? `${textLength}/${MAX_CHAR}`
                : `-${textLength - MAX_CHAR}`}
            </FormHelperText>
            <Button
              type="submit"
              color="primary"
              size="small"
              variant="contained"
              disabled={hasExceededLimit || !input.trim().length}
              className={classes.button}
            >
              Post
            </Button>
          </div>
        </FormControl>
      </Paper>
    </div>
  );
};

CommentBox.propTypes = {
  postId: PropTypes.string.isRequired,
};

export default CommentBox;
