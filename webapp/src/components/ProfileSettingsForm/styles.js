/* -- mui -- */
import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  content: {
    marginTop: 32,
    width: '100%',
  },
  action: {
    marginTop: 32,
  },
  imageInputContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 22,
  },
  avatar: {
    width: 100,
    height: 100,
  },
  avatarIcon: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: 22,
  },
  imageTypes: {
    display: 'block',
    marginTop: 8,
    color: theme.palette.colors.steelblue,
  },

  textField: {
    marginTop: theme.spacing(4),
  },
  formControl: {
    marginTop: theme.spacing(4),
  },
  button: {
    position: 'relative',
  },
  savingProgress: {
    position: 'absolute',
    color: theme.palette.colors.dark,
  },
}));
