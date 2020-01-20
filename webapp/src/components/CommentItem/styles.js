/* -- mui -- */
import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  liItem: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  commentActions: {
    display: 'flex',
    alignItems: 'center',
    height: 28,
    paddingLeft: 40,
    marginTop: 4,
    color: theme.palette.colors.steelblue,
  },
  toggleRepliesButton: {
    fontSize: 12,
    fontWeight: 400,
    '& svg': {
      color: theme.palette.colors.steelblue,
    },
  },
  replyButton: {
    fontSize: 12,
    fontWeight: 400,
    '& svg': {
      color: 'transparent',
      strokeWidth: 2,
      stroke: theme.palette.colors.steelblue,
    },
  },
}));
