/* -- libs -- */
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

/* -- hooks -- */
import useTextCounter from '../../hooks/useTextCounter';

/* -- mui -- */
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';

/* -- styles -- */
import deafultAvatarPath from '../../assets/images/default-avatar.png';

/* -- styles -- */
const useStyles = makeStyles(theme => ({
  commentBox: {
    marginTop: 8,
    marginBottom: 8,
    display: 'flex',
  },
  avatar: {
    width: 30,
    height: 30,
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    marginLeft: 8,
    padding: theme.spacing(1),
    backgroundColor: theme.palette.colors.white,
    border: `1px solid ${theme.palette.colors.greylight}`,
  },
  input: {
    padding: '6px 8px',
    color: theme.palette.text.secondary,
  },
  action: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingTop: 8,
  },
  button: {
    padding: '0 6px',
    minWidth: 0,
  },
  count: {
    margin: '0 8px',
  },
}));

const MAX_CHAR = 500;

const CommentBox = () => {
  const classes = useStyles();
  const { data, isAuthenticated } = useSelector(state => state.user);
  const user = data ? data.credentials : null;
  const { hasExceededLimit, textLength, countTextLength } = useTextCounter(
    MAX_CHAR
  );
  const [input, setInput] = useState('');

  const handleChange = e => {
    e.persist();
    setInput(e.target.value);
    countTextLength(e.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    // TODO: Dispatch action
    console.log(input.trim());
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
            rowsMax={6}
            className={classes.input}
          />

          <div className={classes.action}>
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

export default CommentBox;
