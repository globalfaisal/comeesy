/* -- libs -- */
import React from 'react';
import PropTypes from 'prop-types';

/* -- mui -- */
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

/* -- styles -- */
const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

const LinearLoading = ({ loading = false }) => {
  const classes = useStyles();
  if (!loading) return null;
  return (
    <div className={classes.root}>
      <LinearProgress color="primary" />
    </div>
  );
};
LinearLoading.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default LinearLoading;
