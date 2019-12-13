/* -- libs -- */
import React, { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';

/* -- actions -- */
import { logout, markNotificationsRead } from '../../actions/userActions';

/* -- components -- */
import UserMenu from '../Menus/UserMenu';
import NotificationMenu from '../Menus/NotificationMenu';

const PrivateNavLinks = () => {
  const dispatch = useDispatch();

  const credentials = useSelector(state =>
    state.user.data ? state.user.data.credentials : null
  );
  const notifications = useSelector(state =>
    state.user.data ? state.user.data.notifications : null
  );

  return (
    <Fragment>
      <NotificationMenu
        notifications={notifications}
        onMarkRead={ids => dispatch(markNotificationsRead(ids))}
      />
      <UserMenu user={credentials} onLogout={() => dispatch(logout())} />
    </Fragment>
  );
};

export default PrivateNavLinks;
