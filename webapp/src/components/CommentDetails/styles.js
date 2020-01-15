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
    padding: '8px 22px 10px 12px',
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
    display: 'flex',
    alignItems: 'center',
    marginRight: 24,
    fontSize: '0.75rem',
    float: 'right',
    '& > span': {
      marginLeft: 4,
      lineHeight: 0,
      letterSpacing: -0.5,
    },
    [theme.breakpoints.down('xs')]: {
      float: 'none',
    },
  },

  body: {
    marginTop: 8,
  },
  optionMenuButton: {
    position: 'absolute',
    right: 3,
    top: 6,
  },
}));
