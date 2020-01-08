/* -- libs -- */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';

/* -- actions -- */
import { getPost, submitComment } from '../../actions/dataActions';
import { showAlert } from '../../actions/UIActions';

/* -- components -- */
import PostCard from '../../components/Posts/PostCard/PostCard';
import CircularLoading from '../../components/UI/CircularLoading';
import CommentBox from '../../components/CommentBox/CommentBox';

/* -- mui -- */
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CommentList from '../../components/Comments/CommentList/CommentList';

/* -- styles -- */
const useStyles = makeStyles(theme => ({
  root: {
    padding: `${theme.spacing(6)}px 0px`,
  },
}));

const Post = ({ match }) => {
  const { posts, loading } = useSelector(state => state.data);
  const { data } = useSelector(state => state.user);
  const imageUrl = data ? data.credentials.imageUrl : '';
  const classes = useStyles();
  const dispatch = useDispatch();
  const [commentError, setCommentError] = useState('');

  useEffect(() => {
    dispatch(getPost(match.params.postId)).catch(({ message }) => {
      dispatch(showAlert('error', message));
    });
  }, [dispatch, match.params]);

  const handleCommentSubmit = value => {
    dispatch(submitComment(match.params.postId, value.trim()))
      .then(() => setCommentError(''))
      .catch(({ error }) => setCommentError(error));
  };

  if (loading && !posts) return <CircularLoading />;
  return (
    <div className={classes.root}>
      {posts && (
        <Container maxWidth="md">
          <PostCard post={posts[match.params.postId]} />
          <CommentList comments={posts[match.params.postId].comments} />
          <CommentBox
            handleSubmit={handleCommentSubmit}
            error={commentError}
            imageUrl={imageUrl}
            placeholder="Write a comment..."
          />
        </Container>
      )}
    </div>
  );
};

export default Post;
