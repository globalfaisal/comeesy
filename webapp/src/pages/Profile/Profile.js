/* -- libs -- */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

/* -- components -- */
import ProfileBanner from '../../components/ProfileBanner/ProfileBanner';
import ProfileCard from '../../components/ProfileCard/ProfileCard';
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
  const user = useSelector(state => state.user.credentials);

  const [tab, setTab] = useState(0);
  const onTabChange = (e, newValue) => {
    setTab(newValue);
  };

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
            label="Posts"
            icon={<DnsOutlinedIcon />}
            className={classes.tab}
          />
          <Tab
            label="Likes"
            icon={<FavoriteBorderIcon />}
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
              Posts....
            </TabPanel>
            <TabPanel active={tab === 1} className={classes.tabPanel}>
              Likes....
            </TabPanel>
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
