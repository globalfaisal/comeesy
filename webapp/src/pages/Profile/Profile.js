/* -- libs -- */
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

/* -- components -- */
import UserBar from '../../components/UserBar/UserBar';

const Profile = ({ match }) => {
  const currentUser = useSelector(state => state.user);
  // TODO: compare the username param to the user data in store
  // const otherUser = null;
  // useEffect(() => {
  //   const { username } = match.params;
  //   if (currentUser.credentials.username !== username) {
  //     console.log('NO');
  //   }
  // }, [currentUser.credentials, match.params]);

  return (
    <section className="profile">
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Recusandae,
      ducimus!
    </section>
  );
};

Profile.propTypes = {
  match: PropTypes.object,
};
export default Profile;
