/* -- libs -- */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

/* -- actions -- */
import { getProfile } from '../../actions/dataActions';

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
  const { user } = useSelector(state => state.data);
  const { loading } = useSelector(state => state.UI);

  useEffect(() => {
    dispatch(getProfile(params.username));
  }, [dispatch, params.username]);

  const renderContent = () => {
    if (loading) return <CircularLoading />;
    if (!user) return null;
    return (
      <div className="profile-page">
        <ProfileCover user={user.credentials} />
        <Container>
          <Grid container spacing={3} className={classes.grid}>
            <Grid item xs={12} sm={5} md={3}>
              <ProfileCard user={user.credentials} />
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
