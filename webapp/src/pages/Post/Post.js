/* -- libs -- */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';

/* -- actions -- */
import { getPost } from '../../actions/dataActions';
import { showAlert } from '../../actions/UIActions';

/* -- components -- */
import PostCard from '../../components/Posts/PostCard/PostCard';
import CircularLoading from '../../components/UI/CircularLoading';
import CommentBox from '../../components/CommentBox/CommentBox';

/* -- mui -- */
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

/* -- styles -- */
const useStyles = makeStyles(theme => ({
  root: {
    padding: `${theme.spacing(6)}px 0px`,
  },
  header: {
    padding: '16px 0',
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.text.secondary,
    borderBottom: '1px solid #e8e8e8',
  },
}));

const Post = ({ match }) => {
  const { posts } = useSelector(state => state.data);
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!posts) {
      dispatch(getPost(match.params.postId)).catch(({ message }) => {
        dispatch(showAlert('error', message));
      });
    }
  }, [dispatch, match.params, posts]);

  if (!posts) return <CircularLoading />;
  return (
    <div className={classes.root}>
      <Container maxWidth="md">
        <PostCard post={posts[match.params.postId]} />
        <CommentBox />
      </Container>
    </div>
  );
};

export default Post;
