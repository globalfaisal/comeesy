/* -- mui -- */
import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  root: {
    '&:not(:first-child)': {
      marginTop: theme.spacing(2),
    },
  },
  avatar: {
    width: 28,
    height: 28,
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  title: {
    textTransform: 'capitalize',
  },
  subtitle: {
    color: theme.palette.colors.steelblue,
    fontWeight: 200,
    marginRight: 4,
  },
  body: {
    marginTop: 6,
    marginBottom: 6,
  },
  viewReplies: {
    display: 'flex',
    alignItems: 'center',
    height: 20,
    width: 'fit-content',
    color: theme.palette.colors.steelblue,
    cursor: 'pointer',
    fontWeight: 500,
    letterSpacing: 0,
  },
}));
