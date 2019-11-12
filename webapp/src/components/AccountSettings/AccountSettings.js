/* -- libs -- */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';

/* -- actions -- */
import { clearError } from '../../actions/UIActions';

/* -- mui -- */
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';

/* -- styles -- */
import useStyle from './styles';

const AccountSettings = props => {
  const classes = useStyle();
  const dispatch = useDispatch();

  const { credentials } = useSelector(state => state.user);
  const { isLoading, errors } = useSelector(state => state.UI);

  const [inputs, setInputs] = useState({});

  useEffect(
    () => () => {
      dispatch(clearError('settings'));
    },
    [dispatch]
  );

  const handleInputChange = e => {
    e.persist();
    setInputs(prevInputs => ({
      ...prevInputs,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (_.keys(inputs).length > 0) {
      // dispatch data
      console.log(inputs);
    }
  };

  const handleDeleteAccount = () => {
    console.log('Delete Account ....');
  };

  const renderContent = () => {
    if (!credentials) return null;
    return (
      <form onSubmit={handleSubmit} noValidate autoComplete="off">
        <div className={classes.content}>
          <TextField
            id="oldPassword"
            name="oldPassword"
            type="password"
            defaultValue={inputs.oldPassword}
            onChange={handleInputChange}
            helperText={errors.settings && errors.settings.oldPassword}
            error={errors.settings && !!errors.settings.oldPassword}
            disabled={isLoading}
            label="Old Password"
            color="primary"
            fullWidth
            className={classes.textField}
            variant="outlined"
            required
          />
          <TextField
            id="newPassword"
            name="newPassword"
            type="password"
            defaultValue={inputs.newPassword}
            onChange={handleInputChange}
            helperText={errors.settings && errors.settings.newPassword}
            error={errors.settings && !!errors.settings.newPassword}
            disabled={isLoading}
            label="New Password"
            color="primary"
            fullWidth
            className={classes.textField}
            variant="outlined"
            required
          />
        </div>
        <div className={classes.action}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isLoading || !_.keys(inputs).length}
            className={classes.button}
          >
            Save Changes
            {isLoading && (
              <CircularProgress size={22} className={classes.savingProgress} />
            )}
          </Button>
          <Button
            onClick={handleDeleteAccount}
            className={classes.deleteAccountButton}
          >
            Delete my account
          </Button>
        </div>
      </form>
    );
  };
  return renderContent();
};

AccountSettings.propTypes = {};
export default AccountSettings;
