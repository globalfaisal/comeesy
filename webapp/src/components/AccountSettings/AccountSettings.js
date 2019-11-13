/* -- libs -- */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

/* -- mui -- */
import Typography from '@material-ui/core/Typography';

/* -- styles -- */
import useStyle from './AccountSettingsStyles';
import EditName from './EditName';

const AccountSettings = props => {
  const classes = useStyle();
  const dispatch = useDispatch();
  const { credentials } = useSelector(state => state.user);
  if (!credentials) return null;
  return (
    <div className="account-settings">
      <Typography variant="h6">Account Settings</Typography>
      <div className={classes.content}>
        <EditName name={credentials.name} />
      </div>
    </div>
  );
};

AccountSettings.propTypes = {};
export default AccountSettings;
