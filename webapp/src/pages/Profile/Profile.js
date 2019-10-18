/* -- libs -- */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

/* -- actions -- */
import { getUserData } from '../../actions/dataActions';

/* -- components -- */
import ProfileBanner from '../../components/ProfileBanner/ProfileBanner';
import ProfileCard from '../../components/ProfileCard/ProfileCard';
import Posts from '../../components/Posts/Posts';

/* -- mui -- */
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

/* -- styles -- */
import useStyles from './styles';
import { Hidden } from '@material-ui/core';

const Profile = ({ match: { params } }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {
    user: { credentials, posts },
    isLoading,
  } = useSelector(state => state.data);

  useEffect(() => {
    dispatch(getUserData(params.username));
  }, [dispatch, params.username]);

  if (credentials === null && isLoading) return 'Loading...';
  return (
    <div className={classes.profile}>
      <ProfileBanner user={credentials} />
      <Container>
        <Grid container spacing={3} className={classes.grid}>
          <Grid item xs={12} sm={5} md={3}>
            <ProfileCard user={credentials} />
          </Grid>
          <Grid item xs={12} sm={7}>
            <Hidden smUp>
              <Typography variant="h6" paragraph>
                Posts
              </Typography>
            </Hidden>
            {posts.length > 0 ? <Posts posts={posts} /> : 'No posts yet'}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};
Profile.propTypes = {
  match: PropTypes.object,
};

export default Profile;
