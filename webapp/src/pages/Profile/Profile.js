/* -- libs -- */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

/* -- actions -- */
import { getUserData } from '../../actions/dataActions';

/* -- components -- */
import ProfileCover from '../../components/Profile/ProfileCover/ProfileCover';
import ProfileCard from '../../components/Profile/ProfileCard/ProfileCard';
import Posts from '../../components/Posts/Posts';

/* -- mui -- */
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

/* -- styles -- */
import useStyles from './styles';
import { Hidden } from '@material-ui/core';
import Loading from '../../components/UI/Loading';

const Profile = ({ match: { params } }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { isAuthenticated, credentials } = useSelector(state => state.user);
  const { user, isLoading } = useSelector(state => state.data);

  const canEditProfile = () => {
    if (!credentials) return false;
    return credentials.username === params.username;
  };

  useEffect(() => {
    dispatch(getUserData(params.username));
  }, [dispatch, params.username]);

  const renderContent = () => {
    if (isLoading) return <Loading />;
    return (
      <div className={classes.profile}>
        <ProfileCover user={user.credentials} canEdit={canEditProfile()} />
        <Container>
          <Grid container spacing={3} className={classes.grid}>
            <Grid item xs={12} sm={5} md={3}>
              <ProfileCard user={user.credentials} canEdit={canEditProfile()} />
            </Grid>
            <Grid item xs={12} sm={7}>
              <Hidden smUp>
                <Typography variant="h6" paragraph>
                  Posts
                </Typography>
              </Hidden>
              <Posts posts={user.posts} />
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  };
  return renderContent();
};
Profile.propTypes = {
  match: PropTypes.object,
};

export default Profile;
