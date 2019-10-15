/* -- libs -- */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

/* -- utils -- */
import history from '../../utils/history/history';
import { formatToMonthAndYear } from '../../utils/helpers/dates';

/* -- mui -- */
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

/* -- styles -- */
import useStyles from './UserHeaderStyles';

const UserHeader = props => {
  const classes = useStyles();
  const { credentials } = useSelector(state => state.user);

  const [selectedTab, setSelectedTab] = useState(0);

  const { location } = history;
  useEffect(() => {
    if (location.pathname === `/u/${credentials.username}/posts`)
      setSelectedTab(0);
    if (location.pathname === `/u/${credentials.username}/comments`)
      setSelectedTab(1);
    if (location.pathname === `/u/${credentials.username}/likes`)
      setSelectedTab(2);
  }, [credentials.username, location.pathname]);

  return (
    <section className={classes.header}>
      <Card className={classes.headerContent}>
        <CardHeader
          avatar={
            <Avatar
              alt={credentials.username}
              src={credentials.imageUrl}
              className={classes.profileImage}
            />
          }
          title={
            <Typography variant="h5" color="textPrimary">{`${
              credentials.firstname
            } ${credentials.lastname}`}</Typography>
          }
          subheader={
            <Typography
              variant="caption"
              color="textSecondary"
              className={classes.createdAt}
            >
              Joined {formatToMonthAndYear(credentials.createdAt)}
            </Typography>
          }
        />
      </Card>
      <div className={classes.headerActions}>
        <Tabs
          value={selectedTab}
          indicatorColor="primary"
          textColor="primary"
          component="nav"
          variant="standard"
        >
          <Tab
            component={Link}
            to={`/u/${credentials.username}/posts`}
            label="Posts"
            disableRipple
            classes={{ root: classes.tab }}
          />
          <Tab
            component={Link}
            to={`/u/${credentials.username}/comments`}
            label="Comments"
            disableRipple
            classes={{ root: classes.tab }}
          />
          <Tab
            component={Link}
            to={`/u/${credentials.username}/likes`}
            label="Likes"
            disableRipple
            classes={{ root: classes.tab }}
          />
        </Tabs>
      </div>
    </section>
  );
};

export default UserHeader;
