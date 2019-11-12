/* -- libs -- */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

/* -- actions -- */
import { getProfileData } from '../../actions/dataActions';

/* -- components -- */
import ProfileCover from '../../components/ProfileCover/ProfileCover';
import ProfileCard from '../../components/ProfileCard/ProfileCard';
import Posts from '../../components/Posts/Posts';
import CircularLoading from '../../components/UI/CircularLoading.js';

/* -- mui -- */
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';

/* -- styles -- */
import useStyles from './styles';

const Profile = ({ match: { params } }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { isAuthenticated, credentials } = useSelector(state => state.user);
  const { profile, isLoading } = useSelector(state => state.data);

  const isProfileOwner = () => {
    if (!isAuthenticated || !credentials) return false;
    return credentials.username === params.username;
  };

  useEffect(() => {
    dispatch(getProfileData(params.username));
  }, [dispatch, params.username]);

  const renderContent = () => {
    if (isLoading) return <CircularLoading />;
    return (
      <div className="profile-page">
        <ProfileCover user={profile.credentials} isOwner={isProfileOwner()} />
        <Container>
          <Grid container spacing={3} className={classes.grid}>
            <Grid item xs={12} sm={5} md={3}>
              <ProfileCard
                user={profile.credentials}
                canEdit={isProfileOwner()}
              />
            </Grid>
            <Grid item xs={12} sm={7}>
              <Hidden smUp>
                <Typography variant="h6" paragraph>
                  Posts
                </Typography>
              </Hidden>
              <Posts posts={profile.posts} />
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
