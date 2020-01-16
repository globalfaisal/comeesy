/* -- mui-- */
import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.colors.white,
    boxShadow: theme.shadows[5],
    borderRadius: 3,
    width: 580,
    maxWidth: '80%',
    minHeight: 250,
    maxHeight: '80%',
    [theme.breakpoints.down(420)]: {
      minWidth: '100%',
      minHeight: '100%',
    },
  },

  content: {
    flex: 1,
    overflowY: 'auto',
    overflowX: 'hidden',
    display: 'flex',
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
    '& h6': {
      fontWeight: 400,
    },
  },
  input: {
    paddingTop: 10,
    alignSelf: 'flex-start',
    fontWeight: 200,
    fontSize: 22,
    '& > textarea::-webkit-input-placeholder': {
      color: theme.palette.text.secondary,
      opacity: 0.9,
    },
  },
  submitButton: {
    marginLeft: '0 !important',
  },
  divider: {
    marginRight: 8,
  },
}));
