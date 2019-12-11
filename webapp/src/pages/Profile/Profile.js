/* -- libs -- */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

/* -- actions -- */
import { getProfile } from '../../actions/dataActions';

/* -- components -- */
import PostList from '../../components/Posts/PostList/PostList';
import UserDetailsCard from '../../components/UserDetailsCard/UserDetailsCard';
import CircularLoading from '../../components/UI/CircularLoading.js';

/* -- mui -- */
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Hidden from '@material-ui/core/Hidden';

/* -- styles -- */
import useStyles from './styles';

const Profile = ({ match: { params } }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { profile, loading } = useSelector(state => state.data);

  useEffect(() => {
    dispatch(getProfile(params.username));
  }, [dispatch, params.username]);

  const renderContent = () => {
    if (loading || !profile) return <CircularLoading />;
    return (
      <div className="profile-page">
        <section className={classes.cover}>
          <div className={classes.coverContent}>
            <Avatar
              alt={profile.credentials.username}
              src={profile.credentials.imageUrl}
              className={classes.coverAvatar}
            />
            <Typography component="h3" className={classes.coverTitle}>
              {profile.credentials.name}
            </Typography>
          </div>
        </section>
        <Container>
          <Grid container spacing={3} className={classes.grid}>
            <Grid item xs={12} sm={5} md={3}>
              <UserDetailsCard user={profile.credentials} />
            </Grid>
            <Grid item xs={12} sm={7}>
              <Hidden smUp>
                <Typography variant="h6" paragraph>
                  Posts
                </Typography>
              </Hidden>
              <PostList posts={_.values(profile.posts)} />
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
