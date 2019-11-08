/* -- libs -- */
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

/* -- mui -- */
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

/* -- styles -- */
const useStyle = makeStyles(theme => ({}));

const EditAccountForm = props => {
  const classes = useStyle();
  return <Typography>Edit Account</Typography>;
};

EditAccountForm.propTypes = {};
export default EditAccountForm;