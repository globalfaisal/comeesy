/* -- libs -- */
import React from 'react';
import { useSelector } from 'react-redux';

/* -- components -- */
import UserHeader from '../../components/UserHeader/UserHeader';

/* -- styles -- */
import useStyles from './ProfileStyles';

const Profile = props => {
  const classes = useStyles();
  const { user } = useSelector(state => state);
  if (!user) return null;
  return (
    <div className={classes.profileWrapper}>
      <UserHeader />
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum,
      consectetur adipisci! Quasi sint sapiente eos quo deleniti accusantium,
      laudantium voluptatem cupiditate officiis, blanditiis dicta nam delectus
      voluptatum, deserunt pariatur quae?
    </div>
  );
};

export default Profile;
