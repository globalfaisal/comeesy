/* -- mui -- */
import { makeStyles } from '@material-ui/core';

export default makeStyles(theme => ({
  content: {
    marginBottom: theme.spacing(1),
    maxWidth: 320,
  },
  textField: {
    margin: 0,
  },
  button: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    minWidth: 100,
    maxWidth: 100,
    position: 'relative',
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(1),
    },
  },
  singupProgress: {
    position: 'absolute',
    color: theme.palette.colors.dark,
  },
  loginHelperButton: {
    marginLeft: theme.spacing(3),
    color: theme.palette.primary.main,
  },
}));
