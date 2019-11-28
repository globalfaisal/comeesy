/* -- libs -- */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';

/* -- actions -- */
import { hideAlert } from '../../actions/UIActions';

/* -- components -- */
import Portal from '../Portal/Portal';

/* -- mui -- */
import { makeStyles } from '@material-ui/core/styles';
import { blue, green, amber, red } from '@material-ui/core/colors';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import InfoIcon from '@material-ui/icons/Info';
import ErrorIcon from '@material-ui/icons/Error';
import WarningIcon from '@material-ui/icons/Warning';
import CloseIcon from '@material-ui/icons/Close';

/* -- styles -- */
const useStyles = makeStyles(theme => ({
  root: {
    top: 50,
    width: 480,
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      transform: 'translateX(0)',
      left: 0,
    },
    display: 'block',
  },
  success: {
    color: green[300],
  },
  error: {
    color: red[300],
  },
  info: {
    color: blue[300],
  },
  warning: {
    color: amber[300],
  },
  icon: {
    borderRadius: '50%',
    fontSize: 32,
    position: 'absolute',
    top: 10,
    left: 4,
  },
  iconVariant: {
    opacity: 0.9,
  },
  content: {
    backgroundColor: theme.palette.colors.white,
    borderRadius: 0,
  },
  message: {
    display: 'flex',
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(4),
  },
  action: {
    position: 'absolute',
    top: 4,
    right: 4,
    color: theme.palette.text.secondary,
  },
}));

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const SnackAlert = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { isOpen, type, message } = useSelector(state => state.UI.alert);

  const Icon = variantIcon[type || 'info'];

  const onClose = (event, reason) => {
    dispatch(hideAlert());
  };

  return isOpen && type && message ? (
    <Portal>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={isOpen}
        onClose={onClose}
        autoHideDuration={8000}
        classes={{ root: classes.root }}
      >
        <SnackbarContent
          className={clsx(classes.content)}
          aria-describedby="alert"
          role="alert"
          message={
            <div id="alert" className={classes.message}>
              <Icon
                className={clsx(
                  classes.icon,
                  classes[type],
                  classes.iconVariant
                )}
              />
              <Typography variant="body2" color="textPrimary">
                {message}
              </Typography>
            </div>
          }
          action={
            <IconButton
              key="close"
              aria-label="close"
              onClick={onClose}
              className={classes.action}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        />
      </Snackbar>
    </Portal>
  ) : null;
};

export default SnackAlert;
