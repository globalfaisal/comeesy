/* -- mui-- */
import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  form: {
    display: 'flex',
    minHeight: 100,
    padding: '8px 0',
  },
  action: {
    height: 50,
    padding: 16,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    marginRight: 20,
    transition: 'all 0.75s ease-in-out',
  },
  avatarHidden: {
    opacity: 0,
    width: 0,
    height: 0,
    marginRight: 0,
    transition: 'all 0.75s ease-in-out',
  },
  header: {
    backgroundColor: theme.palette.colors.whitesmoke,
    '& > h2': {
      fontWeight: 400,
      [theme.breakpoints.down(480)]: {
        fontSize: '1rem',
        fontWeight: 500,
      },
    },
  },
  input: {
    paddingTop: 10,
    alignSelf: 'flex-start',
    fontWeight: 300,
    fontSize: 22,
    '& > textarea::-webkit-input-placeholder': {
      color: theme.palette.text.secondary,
      opacity: 0.9,
    },
    [theme.breakpoints.down(480)]: {
      fontSize: 'inherit',
      fontWeight: 400,
    },
  },
  submitButton: {
    maringLeft: 16,
  },
  divider: {
    marginRight: 8,
  },
}));
