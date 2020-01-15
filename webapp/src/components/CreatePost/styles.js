/* -- mui-- */
import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  root: {
    margin: '16px 0 32px',
  },

  content: {
    display: 'flex',
    paddingBottom: 0,
  },
  action: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 16,
    height: 50,
  },
  avatar: {
    width: 60,
    height: 60,
  },
  header: {
    backgroundColor: theme.palette.colors.whitesmoke,
    paddingTop: 6,
    paddingBottom: 6,
  },
  input: {
    marginLeft: 20,
    fontWeight: 200,
    fontSize: 22,
    width: '100%',
    '& > textarea::-webkit-input-placeholder': {
      color: theme.palette.text.secondary,
      opacity: 0.9,
    },
  },
  button: {
    marginLeft: 0,
  },
}));
