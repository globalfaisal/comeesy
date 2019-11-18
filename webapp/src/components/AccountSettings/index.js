/* -- libs -- */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

/* -- components -- */
import UserNameSetting from './UserNameSetting';
import UserPasswordSetting from './UserPasswordSetting';
import UserEmailSetting from './UserEmailSetting';

/* -- mui -- */
import Typography from '@material-ui/core/Typography';

/* -- styles -- */
import useStyle from './styles';

const AccountSettings = props => {
  const classes = useStyle();
  const dispatch = useDispatch();
  const { credentials } = useSelector(state => state.user);
  if (!credentials) return null;
  return (
    <div className="account-settings">
      <Typography variant="h6">Account Settings</Typography>
      <div className={classes.content}>
        <UserNameSetting name={credentials.name} />
        <UserEmailSetting email={credentials.email} />
        <UserPasswordSetting />
      </div>
    </div>
  );
};

export default AccountSettings;
