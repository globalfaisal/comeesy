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
import Slide from '@material-ui/core/Slide';
/* -- styles -- */
const useStyles = makeStyles(theme => ({
  root: {
    [theme.breakpoints.down('xs')]: {
      left: 0,
      bottom: 0,
    },
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
    fontSize: 22,
    position: 'absolute',
    top: 16,
    left: 6,
  },
  iconVariant: {
    opacity: 0.8,
  },
  content: {
    padding: 6,
    minWidth: 320,
    maxWidth: 320,
    minHeight: 100,
    maxHeight: 120,
    backgroundColor: theme.palette.colors.white,
    alignItems: 'flex-start',
  },
  label: {
    marginLeft: theme.spacing(3),
    fontSize: 16,
  },
  message: {
    fontSize: 13,
    lineHeight: 1,
    marginTop: 4,
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
  action: {
    position: 'absolute',
    top: 4,
    right: 1,
    color: theme.palette.colors.grey,
  },
}));

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

function SlideDown(props) {
  return <Slide {...props} direction="down" />;
}

const SnackAlert = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { isOpen, type, message } = useSelector(state => state.UI.alert);

  const Icon = variantIcon[type || 'info'];

  const onClose = (event, reason) => {
    if (reason !== 'clickaway') {
      dispatch(hideAlert());
    }
  };

  const getLabel = label => {
    if (label === 'info') return 'Heads up!';
    if (label === 'success') return 'Success!';
    if (label === 'warning') return 'Warning!';
    if (label === 'error') return 'Oh snap!';
    return null;
  };

  return isOpen ? (
    <Portal>
      <Snackbar
        open={isOpen}
        onClose={onClose}
        TransitionComponent={SlideDown}
        autoHideDuration={8000}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        classes={{ root: classes.root }}
      >
        <SnackbarContent
          className={clsx(classes.content)}
          aria-describedby="alert"
          role="alert"
          message={
            <div id="alert" className={classes.messageWrapper}>
              <Icon
                className={clsx(
                  classes.icon,
                  classes[type],
                  classes.iconVariant
                )}
              />
              <Typography
                variant="h6"
                color="textSecondary"
                className={classes.label}
              >
                {getLabel(type)}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                className={classes.message}
              >
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
