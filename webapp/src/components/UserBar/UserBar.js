/* -- libs -- */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

/* -- utils -- */
// import history from '../../utils/history/history';
import { formatToMonthAndYear } from '../../utils/helpers/dates';

/* -- mui -- */
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
// import Tabs from '@material-ui/core/Tabs';
// import Tab from '@material-ui/core/Tab';

/* -- styles -- */
import useStyles from './styles.js';

const UserBar = ({ user }) => {
  const classes = useStyles();
  if (!user) return null;

  return (
    <section className={classes.userBar}>
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar
              alt={user.username}
              src={user.imageUrl}
              className={classes.avatar}
            />
          }
          title={
            <Typography variant="h5" className={classes.title}>{`${
              user.firstname
            } ${user.lastname}`}</Typography>
          }
          subheader={
            <Typography variant="caption" color="textPrimary">
              Joined {formatToMonthAndYear(user.createdAt)}
            </Typography>
          }
        />
      </Card>
    </section>
  );
};

UserBar.propTypes = {
  user: PropTypes.object.isRequired,
};
export default UserBar;
