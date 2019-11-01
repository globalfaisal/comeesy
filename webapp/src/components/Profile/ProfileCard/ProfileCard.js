/* -- libs -- */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

/* -- utils -- */
import {
  formatToMonthYear,
  formatToMonthDayYear,
} from '../../../utils/helpers/dates';

/* -- mui -- */
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import WatchLaterOutlinedIcon from '@material-ui/icons/WatchLaterOutlined';
import CakeOutlinedIcon from '@material-ui/icons/CakeOutlined';
import Divider from '@material-ui/core/Divider';

/* -- styles -- */
import useStyles from './styles';

const ProfileCard = ({ user, canEdit = false }) => {
  const classes = useStyles();
  if (!user) return null;
  const { username, bio, location, birthdate, createdAt } = user;
  return (
    <section className={classes.UserProfile}>
      <Card className={classes.card} elevation={1}>
        <CardContent>
          <List className={classes.ul}>
            <Fragment>
              <ListItem className={classes.li}>
                <ListItemText
                  primary={
                    <Typography variant="body1" className={classes.title}>
                      @{username}
                    </Typography>
                  }
                  secondary={bio}
                />
              </ListItem>
              <Divider className={classes.divider} />
            </Fragment>
            {location && (
              <ListItem className={classes.li} dense>
                <HomeOutlinedIcon className={classes.liIcon} />
                <ListItemText>Lives in {user.location}</ListItemText>
              </ListItem>
            )}
            {birthdate && (
              <ListItem className={classes.li} dense>
                <CakeOutlinedIcon className={classes.liIcon} />
                <ListItemText>
                  Born {formatToMonthDayYear(user.birthdate)}
                </ListItemText>
              </ListItem>
            )}
            {createdAt && (
              <ListItem className={classes.li} dense>
                <WatchLaterOutlinedIcon className={classes.liIcon} />
                <ListItemText>
                  Joined {formatToMonthYear(createdAt)}
                </ListItemText>
              </ListItem>
            )}
          </List>
        </CardContent>
      </Card>
    </section>
  );
};

ProfileCard.propTypes = {
  user: PropTypes.object.isRequired,
  canEdit: PropTypes.bool.isRequired,
};
export default ProfileCard;
