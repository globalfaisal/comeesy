/* -- libs -- */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';

/* -- actions -- */
import { getPost, submitComment } from '../../actions/dataActions';
import { showAlert } from '../../actions/UIActions';

/* -- components -- */
import PostItem from '../../components/PostItem/PostItem';
import CircularLoading from '../../components/UI/CircularLoading';
import CommentForm from '../../components/CommentForm/CommentForm';
import CommentList from '../../components/CommentList/CommentList.js';

/* -- mui -- */
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

/* -- styles -- */
const useStyles = makeStyles(theme => ({
  root: {
    padding: `${theme.spacing(6)}px 0px`,
  },
}));

const PostDetails = ({ match }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { posts, loading } = useSelector(state => state.data);
  const [commentError, setCommentError] = useState('');

  useEffect(() => {
    dispatch(getPost(match.params.postId)).catch(({ message }) => {
      dispatch(showAlert('error', message));
    });
  }, [dispatch, match.params]);

  const handleCommentSubmit = value => {
    dispatch(submitComment(match.params.postId, value))
      .then(() => {
        setCommentError('');
      })
      .catch(({ error }) => {
        setCommentError(error);
      });
  };

  if (loading && !posts) return <CircularLoading />;
  return (
    <div className={classes.root}>
      {posts && (
        <Container maxWidth="md">
          <PostItem post={posts[match.params.postId]} />
          <CommentList comments={posts[match.params.postId].comments} />
          <CommentForm
            handleSubmit={handleCommentSubmit}
            errorMsg={commentError}
          />
        </Container>
      )}
    </div>
  );
};

export default PostDetails;
