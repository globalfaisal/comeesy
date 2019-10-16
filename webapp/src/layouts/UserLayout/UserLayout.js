/* -- libs -- */
import React, { useState, useEffect, Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Switch, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

/* -- routes -- */
import routes from '../../routes/routes';

/* -- components -- */
import Navbar from '../../components/Navbar/Navbar';
import UserBar from '../../components/UserBar/UserBar';
import ProtectedRoute from '../../routes/ProtectedRoute';

/* -- mui -- */
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

/* -- styles -- */
import useStyles from './styles';

const UserLayout = ({ location, match: { params }, ...rest }) => {
  const classes = useStyles();
  const user = useSelector(state => state.user.credentials);

  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    if (location.pathname === `/u/${params.username}`) setSelectedTab(0);
    if (location.pathname === `/u/${params.username}/likes`) setSelectedTab(1);
  });

  const getRoutes = appRoutes =>
    appRoutes.map((route, idx) => {
      if (route.layout === '/user') {
        return (
          <ProtectedRoute
            {...rest}
            exact
            path={route.path}
            component={route.component}
            key={idx}
          />
        );
      }
      return null;
    });

  return (
    <Fragment>
      <Navbar />
      <main className={classes.main}>
        <UserBar user={user} />
        <Paper square className={classes.paper}>
          <Tabs
            value={selectedTab}
            indicatorColor="primary"
            textColor="primary"
            component="nav"
            variant="standard"
            centered
          >
            <Tab
              component={Link}
              to={`/u/${params.username}`}
              label="Posts"
              disableRipple
            />
            <Tab
              component={Link}
              to={`/u/${params.username}/likes`}
              label="Likes"
              disableRipple
            />
          </Tabs>
        </Paper>
        <Switch>{getRoutes(routes)}</Switch>
      </main>
    </Fragment>
  );
};
UserLayout.propTypes = {
  location: PropTypes.object,
  match: PropTypes.object,
};

export default UserLayout;
