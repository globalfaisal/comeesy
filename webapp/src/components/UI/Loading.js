/* -- libs -- */
import React from 'react';
import PropTypes from 'prop-types';

/* -- components -- */
import Portal from '../Portal/Portal';
/* -- mui -- */
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

/* -- images -- */
import logoPath from '../../assets/images/logo-blue.svg';

/* -- styles -- */
const useStyles = makeStyles(theme => ({
  loading: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  content: {
    position: 'relative',
    maxWidth: 85,
    maxHeight: 85,
  },
  top: {
    color: theme.palette.primary.light,
  },
  bottom: {
    color: theme.palette.primary.main,
    animationDuration: '3s',
    position: 'absolute',
    left: 0,
  },
  center: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 30,
    height: 30,
    '& > img': {
      maxWidth: '100%',
    },
  },
}));

const Loading = props => {
  const classes = useStyles();
  return (
    <Portal>
      <div className={classes.loading}>
        <div className={classes.content}>
          <CircularProgress
            variant="determinate"
            value={100}
            size={80}
            thickness={1}
            className={classes.top}
            {...props}
          />
          <div className={classes.center}>
            <img src={logoPath} alt="logo" />
          </div>
          <CircularProgress
            variant="indeterminate"
            // disableShrink
            size={80}
            thickness={3}
            className={classes.bottom}
            {...props}
          />
        </div>
      </div>
    </Portal>
  );
};
Loading.propTypes = {};
export default Loading;
