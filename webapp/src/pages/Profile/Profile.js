/* -- libs -- */
import React, { useState, useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

/* -- actions -- */
import { getUserData } from '../../actions/dataActions';

/* -- components -- */
import ProfileBanner from '../../components/ProfileBanner/ProfileBanner';
import ProfileCard from '../../components/ProfileCard/ProfileCard';
import Posts from '../../components/Posts/Posts';
import TabPanel from '../../components/UI/TabPanel';

/* -- mui -- */
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import DnsOutlinedIcon from '@material-ui/icons/DnsOutlined';

/* -- styles -- */
import useStyles from './styles';

const Profile = ({ location, match: { params }, ...rest }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {
    profile: { user, posts },
    isLoading,
  } = useSelector(state => state.data);

  useEffect(() => {
    dispatch(getUserData(params.username));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [tab, setTab] = useState(0);
  const onTabChange = (e, newValue) => {
    setTab(newValue);
  };
  if (user === null && isLoading) return 'Loading...';
  return (
    <div className={classes.profile}>
      <ProfileBanner user={user} />
      <Paper square className={classes.paper}>
        <Tabs
          value={tab}
          onChange={onTabChange}
          indicatorColor="primary"
          textColor="primary"
          component="nav"
          variant="standard"
          centered
        >
          <Tab
            label={
              <Fragment>
                <DnsOutlinedIcon fontSize="small" /> Posts
              </Fragment>
            }
            className={classes.tab}
          />
          <Tab
            label={
              <Fragment>
                <FavoriteBorderIcon fontSize="small" /> Likes
              </Fragment>
            }
            className={classes.tab}
          />
        </Tabs>
      </Paper>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <ProfileCard user={user} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TabPanel active={tab === 0} className={classes.tabPanel}>
              {posts.length > 0 ? <Posts posts={posts} /> : 'No posts yet'}
            </TabPanel>
            <TabPanel active={tab === 1} className={classes.tabPanel} />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};
Profile.propTypes = {
  location: PropTypes.object,
  match: PropTypes.object,
};

export default Profile;
