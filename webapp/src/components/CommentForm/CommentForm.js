/* -- libs -- */
import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

/* -- hooks -- */
import useTextCounter from '../../hooks/useTextCounter';

/* -- mui -- */
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import FormHelperText from '@material-ui/core/FormHelperText';

/* -- styles -- */
import deafultAvatarPath from '../../assets/images/default-avatar.png';

/* -- styles -- */
import useStyles from './styles';

const CommentForm = ({
  handleSubmit,
  placeholder,
  initValue = '',
  charLimit = 280,
}) => {
  const classes = useStyles();
  const inputRef = useRef(null);
  const { loading } = useSelector(state => state.data);
  const imageUrl = useSelector(state =>
    state.user.data ? state.user.data.credentials.imageUrl : ''
  );

  const [input, setInput] = useState(initValue);
  const { hasExceededLimit, textLength, countTextLength } = useTextCounter(
    charLimit
  );

  useEffect(() => {
    // Move cursor to the end of the input
    inputRef.current.selectionStart = input.length;
    inputRef.current.selectionEnd = input.length;
  }, []);

  const onChange = e => {
    e.persist();
    setInput(e.target.value);
    countTextLength(e.target.value);
  };

  const checkAuth = () => {
    inputRef.current.focus();
  };

  return (
    <div className={classes.root}>
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
          handleSubmit(input.trim());
          // TODO: REFACTOR (CLEAR INPUT ONLY IF THE COMMENT IS SUCCESSFULLY SUBMITTED)
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
              <span>
                {!hasExceededLimit
                  ? `${textLength}/${charLimit}`
                  : `(-${textLength - charLimit})`}
              </span>
            </FormHelperText>
            <Divider orientation="vertical" variant="middle" />
            <Button
              type="submit"
              color="primary"
              size="small"
              // variant="contained"
              disabled={hasExceededLimit || !input.trim().length || loading}
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

CommentForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  initValue: PropTypes.string,
  charLimit: PropTypes.number,
};

export default CommentForm;
