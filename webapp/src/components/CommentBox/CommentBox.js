/* -- libs -- */
import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

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

const CommentBox = ({
  handleSubmit,
  placeholder,
  errorMsg,
  charLimit = 500,
}) => {
  const classes = useStyles();
  const inputRef = useRef(null);
  const imageUrl = useSelector(state =>
    state.user.data ? state.user.data.credentials.imageUrl : ''
  );

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

  const checkAuth = () => {
    authenticate();
    inputRef.current.focus();
  };

  return (
    <div className={classes.commentBox}>
      <Avatar
        alt="avatar"
        src={imageUrl || deafultAvatarPath}
        className={classes.avatar}
      />
      <Paper
        component="form"
        elevation={0}
        className={classes.paper}
        onClick={checkAuth}
        onSubmit={e => {
          e.preventDefault();
          handleSubmit(input);
        }}
      >
        <FormControl fullWidth error={hasExceededLimit}>
          <InputBase
            id="comment"
            name="comment"
            type="text"
            multiline
            value={input}
            onChange={onChange}
            inputProps={{ 'aria-label': 'comment' }}
            placeholder={placeholder || 'Write a comment...'}
            inputRef={inputRef}
            rowsMax={6}
            autoFocus
            className={classes.input}
          />

          <div className={classes.action}>
            <FormHelperText className={classes.count}>
              <span>{errorMsg}</span>
              <span>
                {!hasExceededLimit
                  ? `${textLength}/${charLimit}`
                  : `-${textLength - charLimit}`}
              </span>
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
  handleSubmit: PropTypes.func.isRequired,
  errorMsg: PropTypes.string,
  placeholder: PropTypes.string,
  charLimit: PropTypes.number,
};

export default CommentBox;
