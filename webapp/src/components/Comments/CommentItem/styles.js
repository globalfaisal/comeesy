/* -- mui -- */
import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  liItem: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  commentActions: {
    paddingLeft: 50,
    width: '100%',
    [theme.breakpoints.down('xs')]: {
      paddingLeft: 20,
    },
  },
  toggleRepliesButton: {
    marginRight: 2,
    color: theme.palette.colors.steelblue,
    fontWeight: 400,
    padding: '0 6px',
  },
  replyButton: {
    color: theme.palette.colors.steelblue,
    fontWeight: 400,
  },
}));
