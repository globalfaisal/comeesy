/* -- libs -- */
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

/* -- mui -- */
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';

/* -- styles -- */
import useStyles from './styles';
import { Hidden } from '@material-ui/core';

const ProfileCover = ({ user, isOwner = false }) => {
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
              user.name
            }`}</Typography>
          }
        />
        {isOwner && (
          <CardActions>
            <Hidden xsDown>
              <Button
                component={Link}
                to="/settings/profile"
                size="small"
                variant="contained"
                color="primary"
                startIcon={<EditIcon />}
              >
                Edit Profile
              </Button>
            </Hidden>
          </CardActions>
        )}
      </Card>
    </section>
  );
};

ProfileCover.propTypes = {
  user: PropTypes.object.isRequired,
  isOwner: PropTypes.bool.isRequired,
};
export default ProfileCover;
