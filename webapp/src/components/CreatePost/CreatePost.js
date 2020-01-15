/* -- libs -- */
import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

/* -- hooks -- */
import useTextCounter from '../../hooks/useTextCounter';
import useAuthChecker from '../../hooks/useAuthChecker';

/* -- mui -- */
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

/* -- styles -- */
import useStyles from './styles';

/* -- styles -- */
const charLimit = 500;

const CommentForm = () => {
  const classes = useStyles();
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
    console.log(input);
  };

  if (!isAuthenticated || !data) return false;
  return (
    <Card className={classes.root} onClick={() => authenticate()}>
      <CardHeader
        className={classes.header}
        title={
          <Typography variant="subtitle1" color="textPrimary">
            Create Post
          </Typography>
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
          className={classes.avatar}
        />
        <InputBase
          id="post"
          name="post"
          type="text"
          multiline
          value={input}
          onChange={onChange}
          inputProps={{ 'aria-label': 'post' }}
          placeholder="Have any short joke? Let's share the laughter with you."
          inputRef={inputRef}
          autoFocus
          className={classes.input}
        />
      </CardContent>
      <div className={classes.action}>
        <Typography
          variant="caption"
          color={!hasExceededLimit ? 'textSecondary' : 'error'}
        >
          {!hasExceededLimit
            ? `${textLength}/${charLimit}`
            : `-${textLength - charLimit}`}
        </Typography>
        <Divider orientation="vertical" variant="middle" />
        <Button
          type="submit"
          form="postForm"
          color="primary"
          size="small"
          disabled={hasExceededLimit || !input.trim().length}
          className={classes.button}
        >
          Post
        </Button>
      </div>
    </Card>
  );
};

CommentForm.propTypes = {};

export default CommentForm;
