/* -- libs -- */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

/* -- actions -- */
import { getProfile } from '../../actions/dataActions';

/* -- components -- */
import PostList from '../../components/Posts/PostList';
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
  const { user } = useSelector(state => state.data);
  const { data } = useSelector(state => state.user);
  const { loading } = useSelector(state => state.UI);

  useEffect(() => {
    dispatch(getProfile(params.username));
  }, [dispatch, params.username]);

  const getLikes = () => {
    if (!data) return [];
    return data.likes;
  };

  const renderContent = () => {
    if (loading || !user) return <CircularLoading />;
    return (
      <div className="profile-page">
        <section className={classes.cover}>
          <div className={classes.coverContent}>
            <Avatar
              alt={user.credentials.username}
              src={user.credentials.imageUrl}
              className={classes.coverAvatar}
            />
            <Typography component="h3" className={classes.coverTitle}>
              {user.credentials.name}
            </Typography>
          </div>
        </section>
        <Container>
          <Grid container spacing={3} className={classes.grid}>
            <Grid item xs={12} sm={5} md={3}>
              <UserDetailsCard user={user.credentials} />
            </Grid>
            <Grid item xs={12} sm={7}>
              <Hidden smUp>
                <Typography variant="h6" paragraph>
                  Posts
                </Typography>
              </Hidden>
              <PostList posts={user.posts} likes={getLikes()} />
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
