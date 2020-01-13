/* -- mui -- */
import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  liItem: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
  },
  commentActions: {
    marginLeft: 50,
    width: '70%',
    [theme.breakpoints.down('xs')]: {
      marginLeft: 10,
      width: '95%',
    },
  },
  toggleRepliesButton: {
    marginRight: 8,
    color: theme.palette.colors.steelblue,
    fontWeight: 400,
  },
  replyButton: {
    color: theme.palette.colors.steelblue,
    fontWeight: 400,
  },
  extraMenuButton: {
    position: 'absolute',
    right: 30,
    top: 10,
  },
}));
