/* -- mui -- */
import { makeStyles } from '@material-ui/core';

export default makeStyles(theme => ({
  content: {
    marginBottom: theme.spacing(3),
    maxWidth: 320,
  },
  textField: {
    marginTop: theme.spacing(1),
  },
  button: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    minWidth: 100,
    maxWidth: 100,
    position: 'relative',
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(2),
    },
  },
  loginProgress: {
    position: 'absolute',
    color: theme.palette.colors.dark,
  },
  signupHelperButton: {
    marginLeft: theme.spacing(1),
    color: theme.palette.primary.main,
  },
}));
