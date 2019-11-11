/* -- mui -- */
import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  content: {
    marginTop: 32,
    width: '100%',
  },
  action: {
    marginTop: 32,
    display: 'flex',
    justifyContent: 'space-between',
  },

  textField: {
    marginTop: theme.spacing(4),
  },

  button: {
    position: 'relative',
  },
  savingProgress: {
    position: 'absolute',
    color: theme.palette.colors.dark,
  },
  deleteAccountButton: {
    color: theme.palette.colors.red,

    '&:hover': {
      backgroundColor: theme.palette.colors.redlight,
    },
  },
}));
