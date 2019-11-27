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
import { amber, green } from '@material-ui/core/colors';
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
    bottom: 0,
    left: 0,
    transform: 'none',
    width: '100%',
    display: 'block',
  },
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.main,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  content: {
    borderRadius: 0,
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
  },
  message: {
    display: 'flex',
    justifyContent: 'space-between',
    marginRight: 10,
  },
  action: {
    position: 'absolute',
    top: 4,
    right: 4,
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
  const { open, type, message } = useSelector(state => state.UI.alert);

  const Icon = variantIcon[type || 'info'];

  const onClose = (event, reason) => {
    if (reason !== 'clickaway') dispatch(hideAlert());
  };

  return (
    open &&
    type &&
    message && (
      <Portal>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          open={open}
          autoHideDuration={10000}
          onClose={onClose}
          classes={{ root: classes.root }}
        >
          <SnackbarContent
            className={clsx(classes[type], classes.content)}
            aria-describedby="alert"
            role="alert"
            message={
              <div id="alert" className={classes.message}>
                <Icon className={clsx(classes.icon, classes.iconVariant)} />
                <Typography variant="subtitle2">{message}</Typography>
              </div>
            }
            action={
              <IconButton
                key="close"
                aria-label="close"
                color="inherit"
                onClick={onClose}
                className={classes.action}
              >
                <CloseIcon className={classes.icon} />
              </IconButton>
            }
          />
        </Snackbar>
      </Portal>
    )
  );
};

export default SnackAlert;
