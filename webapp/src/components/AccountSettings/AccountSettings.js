/* -- libs -- */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';

/* -- mui -- */
import Typography from '@material-ui/core/Typography';

/* -- styles -- */
import useStyle from './styles';

const AccountSettings = props => {
  const classes = useStyle();
  const dispatch = useDispatch();

  return (
    <div className="account-settings">
      <Typography variant="h6">General Account Settings</Typography>
    </div>
  );
};

AccountSettings.propTypes = {};
export default AccountSettings;
