/* -- mui -- */
import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  wrapper: {
    display: 'flex',
    width: '100%',
  },

  content: {
    position: 'relative',
    width: '100%',
    padding: '8px 16px',
    overflowWrap: 'break-word',
    overflowX: 'hidden',
    borderRadius: '0 18px 18px 18px',
    backgroundColor: theme.palette.colors.whitesmoke,
  },
  contentComment: {
    position: 'relative',
  },
  contentReply: {
    position: 'relative',
  },
  avatar: {
    width: 32,
    height: 32,
    marginRight: 4,
  },
  smallAvatar: {
    width: 22,
    height: 22,
  },
  name: {
    textTransform: 'capitalize',
  },
  username: {
    color: theme.palette.colors.steelblue,
    fontWeight: 200,
  },
  createdAt: {
    marginRight: 24,
    float: 'right',
    [theme.breakpoints.down('xs')]: {
      float: 'none',
      display: 'block',
    },
  },
  body: {
    marginTop: 8,
  },
  optionMenuButton: {
    position: 'absolute',
    right: 16,
    top: 6,
  },
}));
