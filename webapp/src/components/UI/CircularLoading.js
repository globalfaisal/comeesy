/* -- libs -- */
import React from 'react';

/* -- components -- */
import Portal from '../Portal/Portal';

/* -- mui -- */
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

/* -- images -- */
import logoPath from '../../assets/images/logo-white.svg';

/* -- styles -- */
const useStyles = makeStyles(theme => ({
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 9999,
    background: 'rgba(0, 0, 0, 0.6)',
  },
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
    color: theme.palette.colors.greylight,
  },
  bottom: {
    color: theme.palette.colors.white,
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

const CircularLoading = props => {
  const classes = useStyles();
  return (
    <Portal>
      <div className={classes.overlay}>
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
      </div>
    </Portal>
  );
};
export default CircularLoading;
