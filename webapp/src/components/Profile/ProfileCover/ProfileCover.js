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

const ProfileCover = ({ user, loading }) => {
  const classes = useStyles();
  return (
    <section className={classes.profileCover}>
      <Card className={classes.card}>
        <CardHeader
          avatar={
            !loading && user ? (
              <Avatar
                alt={user.username}
                src={user.imageUrl}
                className={classes.avatar}
              />
            ) : (
              <Skeleton classes={{ root: classes.avatar }} variant="circle" />
            )
          }
          title={
            !loading && user ? (
              <Typography variant="h6" className={classes.title}>{`${
                user.firstname
              } ${user.lastname}`}</Typography>
            ) : (
              <Skeleton width={130} height={12} variant="text" />
            )
          }
        />
      </Card>
    </section>
  );
};

ProfileCover.propTypes = {
  user: PropTypes.object.isRequired,
  loading: PropTypes.bool,
};
export default ProfileCover;
