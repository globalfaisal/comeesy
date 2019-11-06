/* -- libs -- */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

/* -- components -- */
import EditAccountForm from '../../components/EditAccountForm/EditAccountForm';
import EditProfileForm from '../../components/EditProfileForm/EditProfileForm';
import TabPanel from '../../components/UI/TabPanel';

/* -- utils -- */
import history from '../../utils/history/history';

/* -- mui -- */
import withWidth from '@material-ui/core/withWidth';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
/* -- styles -- */
import useStyles from './styles';

const Settings = props => {
  const classes = useStyles();
  const [selectedTab, setSelectedTab] = useState(0);
  const { pathname } = history.location;

  useEffect(() => {
    if (pathname === '/settings/profile') setSelectedTab(0);
    if (pathname === '/settings/account') setSelectedTab(1);
  }, [pathname]);

  const onTabSelect = (e, value) => {
    setSelectedTab(value);
  };

  const a11yProps = index => ({
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
  });

  const renderContent = () => (
    <div className={classes.root}>
      <Container>
        <Grid container spacing={3} className={classes.grid}>
          <Grid item xs={12} sm={3} md={2}>
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
          <Grid item xs={12} sm={6}>
            <TabPanel active={selectedTab === 0} index={0}>
              <Typography variant="h5" color="textPrimary" gutterBottom>
                Profile
              </Typography>
              <EditProfileForm />
            </TabPanel>
            <TabPanel active={selectedTab === 1} index={1}>
              <Typography variant="h5" color="textPrimary" gutterBottom>
                Account
              </Typography>
              <EditAccountForm />
            </TabPanel>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
  return renderContent();
};

Settings.propTypes = {
  match: PropTypes.object,
};

export default withWidth()(Settings);
