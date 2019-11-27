/* -- libs -- */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

/* -- components -- */
import UserNameSetting from '../../components/UserSettings/UserNameSetting';
import UserPasswordSetting from '../../components/UserSettings/UserPasswordSetting';
import UserEmailSetting from '../../components/UserSettings/UserEmailSetting';
import UserAvatarSetting from '../../components/UserSettings/UserAvatarSetting';
import UserDetailsSetting from '../../components/UserSettings/UserDetailsSetting';
import TabPanel from '../../components/UI/TabPanel';

/* -- utils -- */
import history from '../../utils/history';

/* -- mui -- */
import withWidth from '@material-ui/core/withWidth';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

/* -- styles -- */
import useStyles from './styles';

const Settings = props => {
  const classes = useStyles();
  const { data, loading, error } = useSelector(state => state.user);

  const [selectedTab, setSelectedTab] = useState(0);
  const { pathname } = history.location;

  useEffect(() => {
    if (pathname === '/settings/profile') setSelectedTab(0);
    if (pathname === '/settings/account') setSelectedTab(1);
  }, [pathname]);

  const a11yProps = index => ({
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
  });

  return (
    data && (
      <Container maxWidth="md">
        <div className={classes.settingsPage}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={3}>
              <Tabs
                value={selectedTab}
                indicatorColor="primary"
                component="nav"
                variant="standard"
                aria-label="settings tabs"
                orientation={`${
                  props.width !== 'xs' ? 'vertical' : 'horizontal'
                }`}
                className={classes.tabs}
              >
                <Tab
                  component={Link}
                  to="/settings/profile"
                  label="Profile"
                  classes={{ root: classes.tab }}
                  {...a11yProps(0)}
                />
                <Tab
                  component={Link}
                  to="/settings/account"
                  label="Account"
                  classes={{ root: classes.tab }}
                  {...a11yProps(1)}
                />
              </Tabs>
            </Grid>
            <Grid item xs={12} sm={8}>
              <TabPanel active={selectedTab === 0} index={0}>
                <Typography variant="h6">Profile Settings</Typography>
                <div className={classes.content}>
                  <UserAvatarSetting
                    imageUrl={data.credentials.imageUrl}
                    loading={loading}
                  />
                  <UserDetailsSetting
                    credentials={data.credentials}
                    error={error}
                    loading={loading}
                  />
                </div>
              </TabPanel>
              <TabPanel active={selectedTab === 1} index={1}>
                <Typography variant="h6">Account Settings</Typography>
                <div className={classes.content}>
                  <UserNameSetting
                    name={data.credentials.name}
                    error={error}
                    loading={loading}
                  />
                  <UserEmailSetting
                    email={data.credentials.email}
                    error={error}
                    loading={loading}
                  />
                  <UserPasswordSetting error={error} loading={loading} />
                </div>
              </TabPanel>
            </Grid>
          </Grid>
        </div>
      </Container>
    )
  );
};

Settings.propTypes = {
  match: PropTypes.object,
};

export default withWidth()(Settings);
