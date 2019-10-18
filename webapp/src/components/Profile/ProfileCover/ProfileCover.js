/* -- libs -- */
import React from 'react';
import PropTypes from 'prop-types';

/* -- mui -- */
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';

/* -- styles -- */
import useStyles from './styles';

const ProfileCover = ({ user }) => {
  const classes = useStyles();
  if (!user) return null;
  return (
    <section className={classes.profileCover}>
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
            <Typography variant="h6" className={classes.title}>{`${
              user.firstname
            } ${user.lastname}`}</Typography>
          }
        />
      </Card>
    </section>
  );
};

ProfileCover.propTypes = {
  user: PropTypes.object.isRequired,
};
export default ProfileCover;
