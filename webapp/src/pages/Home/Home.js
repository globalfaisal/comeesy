/* -- libs -- */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';

/* -- actions -- */
import { getPosts } from '../../actions/dataActions';
import { showAlert } from '../../actions/UIActions';

/* -- components -- */
import PostList from '../../components/Posts/PostList/PostList';

/* -- mui -- */
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

/* -- styles -- */
const useStyles = makeStyles(theme => ({
  root: {
    padding: `${theme.spacing(6)}px 0px`,
  },
}));

const Home = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { posts, loading } = useSelector(state => state.data);

  useEffect(() => {
    dispatch(getPosts()).catch(({ message }) => {
      dispatch(showAlert('error', message));
    });
  }, [dispatch]);

  return (
    <div className={classes.root}>
      <Container maxWidth="md">
        <PostList posts={_.values(posts)} loading={loading} />
      </Container>
    </div>
  );
};

export default Home;
