/* -- libs -- */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';

/* -- actions -- */
import { getPosts } from '../../actions/dataActions';
import { showAlert, closeModal } from '../../actions/UIActions';

/* -- components -- */
import PostList from '../../components/Posts/PostList.js';

/* -- mui -- */
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';

/* -- styles -- */
const useStyles = makeStyles(theme => ({
  homeWrapper: {
    padding: `${theme.spacing(8)}px 0px`,
  },
}));

const Home = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { posts, loading } = useSelector(state => state.data);

  useEffect(() => {
    dispatch(getPosts()).catch(({ message }) => {
      dispatch(showAlert('error', message || 'Something went wrong'));
    });
  }, [dispatch]);

  return (
    <div className={classes.homeWrapper}>
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={8} md={6}>
            <PostList posts={_.values(posts)} loading={loading} />
          </Grid>
          <Hidden only="xs">
            <Grid item sm={4}>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Assumenda voluptatum aut fugit? Id dolor deleniti aliquam
              excepturi explicabo voluptatibus delectus nam nisi illo, corporis
              ad. Voluptate consectetur eligendi assumenda officia.
            </Grid>
          </Hidden>
        </Grid>
      </Container>
    </div>
  );
};

export default Home;
